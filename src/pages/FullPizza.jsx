import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

const FullPizza = (props) => {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchPizza() {
            try {
                const res = await axios.get(`https://694f0a738531714d9bcd36d3.mockapi.io/items/${id}`);
                setPizza(res.data)
            } catch (error) {
                alert("Fetch pizza error");
                navigate('/')
            }
        }

        fetchPizza();
    }
        , []);
    if (!pizza) {
        return <div className="container">"Загрузка"</div>
    }
    return (
        <div className="container">
            <h3>{pizza.title}</h3>
            <div><img src={pizza.imageUrl} alt="pizza" /></div>
            <div><b>Price</b> {pizza.price} ₽</div>

        </div>
    )
};

export default FullPizza;
