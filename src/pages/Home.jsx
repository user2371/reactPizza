import React, { useEffect, useState } from "react"
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaCardSkeleton from "../components/PizzaBlock/PizzaCardSkeleton";
import Sort from "../components/Sort";

const Home = (props) => {
    const [pizzas, setPizzas] = useState([]);    
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [sortBy, setSortBy] = useState(0);
    const [orderAsc, setOrderAsc] = useState(true)    
    const sortList = ["rating", "price", "title"]

    useEffect(() => {
        setIsLoading(true)
        const order = orderAsc ? "asc" : "desc";
        const category = activeCategory > 0 ? activeCategory : "";
        fetch(`https://694f0a738531714d9bcd36d3.mockapi.io/items?category=${category}&sortBy=${sortList[sortBy]}&order=${order}`)
            .then(res => res.json())
            .then(json => {
                setIsLoading(false);
                setPizzas(json)
            });

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [sortBy, orderAsc, activeCategory])


    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory} />
                    <Sort setPizzas={setPizzas}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        setOrderAsc={setOrderAsc}
                        orderAsc={orderAsc} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? [...new Array(10)].map((_, index) => <PizzaCardSkeleton key={index} />)
                        : pizzas.map(pizza => <PizzaBlock {...pizza} key={pizza.id} />)}

                </div>
            </div>
        </>
    )
};

export default Home;
