import "./scss/app.scss"
import "./scss/_variables.scss"
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import { useEffect, useState } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    fetch("https://694f0a738531714d9bcd36d3.mockapi.io/items")
      .then(res => res.json())
      .then(json => setPizzas(json))
  }, [])
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map(pizza => {
              return <PizzaBlock {...pizza} key={pizza.id} />
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
