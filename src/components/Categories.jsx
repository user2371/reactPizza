import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../redux/slices/filterSlice";


const Categories = ({ setPage }) => {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const activeCategory = useSelector((state) => state.filterReducer.activeCategory);
  const dispatch = useDispatch();
  function onSelectCategory(index) {
    dispatch(setActiveCategory(index));
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

