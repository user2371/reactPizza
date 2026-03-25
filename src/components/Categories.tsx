import { useAppSelector } from "../hooks.ts";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, setCurrentPage, setActiveCategory } from "../redux/slices/filterSlice.tsx";


const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const { activeCategory }= useAppSelector(selectFilters);
  const dispatch = useDispatch();
  
  function onSelectCategory(index: number) {
    dispatch(setActiveCategory(index));
    dispatch(setCurrentPage(1));
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

