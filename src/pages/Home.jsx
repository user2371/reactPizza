import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { AppContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import PizzaCardSkeleton from "../components/PizzaBlock/PizzaCardSkeleton";
import Sort from "../components/Sort";



const sortList = ["rating", "price", "title"]

const Home = () => {
    const { searchStr, page, setPage } = useContext(AppContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { activeCategory, sortBy, orderAsc } = useSelector((state) => state.filterReducer);

    let [notFound, setNotFound] = useState(false);
    const pageSize = 8;
    const [totalPizzasCount, setTotalPizzasCount] = useState(0);

    function fetchPizzas(page, pageSize) {
        setPage(page);
        setIsLoading(true)

        const order = orderAsc ? "asc" : "desc";
        const category = activeCategory > 0 ? activeCategory : "";
        const title = searchStr ? `&title=${searchStr}` : "";
        fetch(`https://694f0a738531714d9bcd36d3.mockapi.io/items?category=${category}&sortBy=${sortList[sortBy]}&order=${order}${title}&limit=${pageSize}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                setIsLoading(false);
                if (json === "Not found") {
                    setNotFound(true);
                } else {
                    setNotFound(false);
                    setPizzas(json)
                }
            });
    }


    function fetchPizzasCount() {
        const order = orderAsc ? "asc" : "desc";
        const category = activeCategory > 0 ? activeCategory : "";
        const title = searchStr ? `&title=${searchStr}` : "";
        fetch(`https://694f0a738531714d9bcd36d3.mockapi.io/items?category=${category}&sortBy=${sortList[sortBy]}&order=${order}${title}`)
            .then(res => res.json())
            .then(json => {
                setTotalPizzasCount(json.length)
            })
    }


    useEffect(() => {
        fetchPizzas(page, pageSize)
        fetchPizzasCount()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [sortBy, orderAsc, activeCategory, searchStr, page, pageSize]);



    function onPageChanged(page) {
        fetchPizzas(page, pageSize)
    }

    function onFirstPageDoubleArrowClick() {
        if (page <= 1) {
            return
        }
        fetchPizzas(1, pageSize)
    }

    function onLastPageDoubleArrowClick() {
        if (page >= Math.ceil(totalPizzasCount / pageSize)) {
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
        let previousPage = page - 1
        if (previousPage < 1) {
            return
        }
        fetchPizzas(previousPage, pageSize)
    }

    function onRightArrowClick() {
        let nextPage = page + 1
        if (nextPage > Math.ceil(totalPizzasCount / pageSize)) {
            return
        }
        fetchPizzas(nextPage, pageSize)
    }
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories setPage={setPage} />
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
                    currentPage={page}
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
