import React, { useEffect, useState } from "react"
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import PizzaCardSkeleton from "../components/PizzaBlock/PizzaCardSkeleton";
import Sort from "../components/Sort";

const Home = (props) => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch("https://694f0a738531714d9bcd36d3.mockapi.io/items")
            .then(res => res.json())
            .then(json => {
                setIsLoading(false);
                setPizzas(json)
            })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth" 
        });
    }, [])
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
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
