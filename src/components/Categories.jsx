import React, { useState } from "react"


const Categories = ({setActiveCategory, activeCategory, setPage}) => {
  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  function onSelectCategory(index) {
    setActiveCategory(index);
    setPage(1);
  }
  return (
    <div>
      <div className="categories">
        <ul>
          {categories.map((item, index) => {
            return <li key={index} className={activeCategory === index ? "active" : ""} onClick={() => { onSelectCategory(index) }}>{item}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
export default Categories;

