import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>();
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
            <div className="fullPizza-wrapper">
                <div className="fullPizza-image-block"><img src={pizza.imageUrl} alt="pizza" /></div>
                <div className="fullPizza-info-block">
                    <h3>{pizza.title}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ipsam mollitia in dignissimos, corporis impedit et recusandae. </p><br />
                    <div><b>Состав:</b>
                        <ul className="fullPizza-list">
                            <li>Пепперони</li>
                            <li>Моцарелла</li>
                            <li>Сладкий перец</li>
                            <li>Горчица</li>
                        </ul>
                    </div>
                    <div className="price-block">
                        <div className="price"><b>Price:</b> {pizza.price} ₽</div>
                        <button className="button">+ Добавить в корзину</button>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default FullPizza;
