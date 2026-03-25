import { useDispatch, useSelector } from "react-redux";
import { selectFilters, setActiveCategory } from "../redux/slices/filterSlice.tsx";

type CategoriesProps = {
  setCurrentPage: any
}

const Categories = ({ setCurrentPage } : CategoriesProps) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const { activeCategory }= useSelector(selectFilters);
  const dispatch = useDispatch();
  
  function onSelectCategory(index: any) {
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

