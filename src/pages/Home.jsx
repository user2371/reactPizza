import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import PizzaCardSkeleton from "../components/PizzaBlock/PizzaCardSkeleton";
import Sort from "../components/Sort";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";


const sortList = ["rating", "price", "title"]

const Home = () => {
    const navigate = useNavigate();
    const { searchStr } = useContext(AppContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { activeCategory, sortBy, orderAsc, currentPage } = useSelector((state) => state.filterReducer);
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    let isMounted = useRef(false);

    let [notFound, setNotFound] = useState(false);
    const pageSize = 8;
    const [totalPizzasCount, setTotalPizzasCount] = useState(0);

    function fetchPizzas(page, pageSize) {
        dispatch(setCurrentPage(page));
        setIsLoading(true);
        const order = orderAsc ? "asc" : "desc";
        const category = activeCategory > 0 ? activeCategory : "";
        const search = searchStr ? searchStr : "";
        axios
            .get(
                `https://694f0a738531714d9bcd36d3.mockapi.io/items?category=${category}&sortBy=${sortList[sortBy]}&order=${order}&title=${search}&limit=${pageSize}&page=${page}`,
                { validateStatus: () => true } // ⬅️ THIS MAKES AXIOS BEHAVE LIKE FETCH
            )
            .then((res) => {
                setIsLoading(false);
                if (typeof res.data === "string" && res.data === "Not found") {
                    setNotFound(true);
                    setPizzas([]);
                } else {
                    setNotFound(false);
                    setPizzas(res.data);
                }
            });
    }


    function fetchPizzasCount() {
        const order = orderAsc ? "asc" : "desc";
        const category = activeCategory > 0 ? activeCategory : "";
        const title = searchStr ? `&title=${searchStr}` : "";
        axios.get(`https://694f0a738531714d9bcd36d3.mockapi.io/items?category=${category}&sortBy=${sortList[sortBy]}&order=${order}${title}`,
            { validateStatus: () => true })
            .then(res => {
                setTotalPizzasCount(res.data.length)
            })
    }

    useEffect(() => {
        if (window.location.search) {
            const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
            const sortBy = sortList.indexOf(query.sortBy);
            const orderAsc = query.order === "asc";
            const activeCategory = query.category ? +query.category : 0;
            const currentPage = query.page ? +query.page : 1;
            const search = searchStr ? searchStr : "";
            dispatch(setFilters({
                sortBy,
                orderAsc,
                activeCategory,
                currentPage,
                search
            }))
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                category: activeCategory > 0 ? activeCategory : "",
                sortBy: sortList[sortBy],
                order: orderAsc ? "asc" : "desc",
                title: searchStr ? searchStr : "",
                page: currentPage,
            }, { ignoreQueryPrefix: true });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [sortBy, orderAsc, activeCategory, searchStr, currentPage, pageSize]);

    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas(currentPage, pageSize)
            fetchPizzasCount()
        }
        
        isSearch.current = false;
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [sortBy, orderAsc, activeCategory, searchStr, currentPage, pageSize]);



    function onPageChanged(page) {
        fetchPizzas(page, pageSize)
    }

    function onFirstPageDoubleArrowClick() {
        if (currentPage <= 1) {
            return
        }
        fetchPizzas(1, pageSize)
    }

    function onLastPageDoubleArrowClick() {
        if (currentPage >= Math.ceil(totalPizzasCount / pageSize)) {
            return
        }
        let lastPage = Math.ceil(totalPizzasCount / pageSize);
        fetchPizzas(lastPage, pageSize)
    }

    function onNumberInputChange(page) {
        if (typeof (page) !== "number") {
            page = +page
        }
        if (page < 1 || page === null || page > Math.ceil(totalPizzasCount / pageSize)) {
            return
        } else {
            fetchPizzas(page, pageSize)
        }
    }

    function onLeftArrowClick() {
        let previousPage = currentPage - 1
        if (previousPage < 1) {
            return
        }
        fetchPizzas(previousPage, pageSize)
    }

    function onRightArrowClick() {
        let nextPage = currentPage + 1
        if (nextPage > Math.ceil(totalPizzasCount / pageSize)) {
            return
        }
        fetchPizzas(nextPage, pageSize)
    }
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories setCurrentPage={setCurrentPage} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? [...new Array(10)].map((_, index) => <PizzaCardSkeleton key={index} />)
                        : notFound ? <h2 className="content__title">Пиццы не найдены</h2> : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
                    }
                </div>
                <Pagination
                    totalPizzasCount={totalPizzasCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    onFirstPageDoubleArrowClick={onFirstPageDoubleArrowClick}
                    onLastPageDoubleArrowClick={onLastPageDoubleArrowClick}
                    onNumberInputChange={onNumberInputChange}
                    onLeftArrowClick={onLeftArrowClick}
                    onRightArrowClick={onRightArrowClick}
                    notFound={notFound}
                />
            </div>
        </>
    )
};

export default Home;
