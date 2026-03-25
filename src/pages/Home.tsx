import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.tsx";
import PizzaCardSkeleton from "../components/PizzaBlock/PizzaCardSkeleton.jsx";
import Sort from "../components/Sort.tsx";
import { selectFilters, setCurrentPage, setFilters } from "../redux/slices/filterSlice.tsx";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import { fetchPizzasThunk, selectPizzas } from "../redux/slices/pizzasSlice.tsx";
import { ParsedQs } from 'qs';
import { useAppDispatch } from "../hooks.ts";
import { useAppSelector } from "../hooks.ts";

const sortList = ["rating", "price", "title"]

const Home = () => {
    const navigate = useNavigate();
    const { activeCategory, sortBy, orderAsc, currentPage, searchString } = useAppSelector(selectFilters);
    const { pizzas, status } = useAppSelector(selectPizzas)
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const [totalPizzasCount, setTotalPizzasCount] = useState(0);
    const pageSize = 8;
    const order = orderAsc ? "asc" : "desc";
    const category = activeCategory > 0 ? activeCategory : "";
    const search = searchString ? searchString : "";




    async function fetchPizzas(page: number, pageSize: number) {
        dispatch(setCurrentPage(page));

        dispatch(fetchPizzasThunk(
            {
                category,
                sortBy,
                order,
                search,
                pageSize,
                page
            }
        ))
    }

    function fetchPizzasCount() {
        axios.get(`https://694f0a738531714d9bcd36d3.mockapi.io/items?category=${category}&sortBy=${sortList[sortBy]}&order=${order}&title=${search}`)
            .then(res => {
                setTotalPizzasCount(res.data.length)
            })
            .catch(err => console.log("FetchPizzasCount error" + err))
    }



    useEffect(() => {
        if (window.location.search) {
            const query = qs.parse(window.location.search.substring(1),);
            const sortValue =
                typeof query.sortBy === "string"
                    ? query.sortBy
                    : Array.isArray(query.sortBy) && typeof query.sortBy[0] === "string"
                        ? query.sortBy[0]
                        : "";

            const sortBy = sortList.indexOf(sortValue)
            const orderAsc = query.order === "asc";
            const activeCategory = query.category ? +query.category : 0;
            const currentPage = query.page ? +query.page : 1;
            const search = searchString ? searchString : "";
            dispatch(setFilters({
                sortBy,
                orderAsc,
                activeCategory,
                currentPage,
                searchString: search
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
                title: searchString ? searchString : "",
                page: currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [sortBy, orderAsc, activeCategory, searchString, currentPage, pageSize]);

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
    }, [sortBy, orderAsc, activeCategory, searchString, currentPage, pageSize]);



    function onPageChanged(page: number) {
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
        const lastPage = Math.ceil(totalPizzasCount / pageSize);
        fetchPizzas(lastPage, pageSize)
    }

    function onNumberInputChange(page: number) {
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
        const previousPage = currentPage - 1
        if (previousPage < 1) {
            return
        }
        fetchPizzas(previousPage, pageSize)
    }

    function onRightArrowClick() {
        const nextPage = currentPage + 1
        if (nextPage > Math.ceil(totalPizzasCount / pageSize)) {
            return
        }
        fetchPizzas(nextPage, pageSize)
    }
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>

                {status === "error"
                    ?
                    <h2 className="content__title" style={{ textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="100px" width="100px" version="1.1" id="_x32_" viewBox="0 0 512 512" fill="#EBC106">
                            <g>
                                <path d="M505.095,407.125L300.77,53.208c-9.206-15.944-26.361-25.849-44.774-25.849
                               c-18.412,0-35.552,9.905-44.751,25.849L6.905,407.109c-9.206,15.944-9.206,35.746,0,51.69 
                                 c9.206,15.944,26.354,25.842,44.758,25.842h408.674c18.405,0,35.568-9.897,44.759-25.842 
                                   C514.302,442.855,514.302,423.053,505.095,407.125z M256.004,426.437c-17.668,0-32.013-14.33-32.013-32.004 
                                     c0-17.668,14.345-31.997,32.013-31.997c17.667,0,31.997,14.329,31.997,31.997C288.001,412.108,273.671,426.437,256.004,426.437z 
                                        M275.72,324.011c0,10.89-8.834,19.709-19.716,19.709c-10.898,0-19.717-8.818-19.717-19.709l-12.296-144.724 
                                          c0-17.676,14.345-32.005,32.013-32.005c17.667,0,31.997,14.33,31.997,32.005L275.72,324.011z" />
                            </g>
                        </svg> <br />
                        Произошла ошибка повторите попытку позже</h2>
                    : <h2 className="home-title"> Все пиццы</h2>}
                <div className="content__items">
                    {status === "loading"
                        ? [...new Array(10)].map((_, index) => <PizzaCardSkeleton key={index} />)
                        : pizzas === "Not found" ? <h2><br />Пиццы ненайдени</h2> : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
                    }
                </div>
                {pizzas === "Not found" ? "" :
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
                        status={status}
                    />}
            </div>
        </>
    )
};

export default Home;
