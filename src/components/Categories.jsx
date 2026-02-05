import React, { useState } from "react"


const Categories = (props) => {
  const [activeCategory, setActiveCategory] = useState('Все');
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  function onSelectCategory(index) {
    setActiveCategory(index);
  }
  return (
    <div>
      <div className="categories">
        <ul>
          {categories.map((item, index) => {
            return <li key={index} className={activeCategory === item ? "active" : ""} onClick={() => { onSelectCategory(item) }}>{item}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
export default Categories;

