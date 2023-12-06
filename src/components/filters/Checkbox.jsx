import { useProductsContext } from "../../contexts";

const Checkbox = ({ data }) => {
  const {
    applyFilters,
    filters: { categories },
  } = useProductsContext();
  const checkboxHandler = (e) => {
    let catArr = categories;

    if (e.target.checked) {
      catArr.push(e.target.value);
    } else {
      catArr = catArr.filter((cat) => cat !== e.target.value);
    }
    //console.log("Updated categories:", catArr);
    applyFilters(e.target.name, catArr);
  };

  // const checkboxHandler = (e) => {
  //   // Tạo một bản sao mới của Set categories để không ảnh hưởng trực tiếp đến state
  //   const newCategories = new Set(categories);

  //   if (e.target.checked) {
  //     newCategories.add(e.target.value);
  //   } else {
  //     newCategories.delete(e.target.value);
  //   }

  //   console.log("Updated categories:", Array.from(newCategories));
  //   applyFilters(e.target.name, Array.from(newCategories));
  // };

  return (
    <label className="capitalize cursor-pointer">
      <input
        className="accent-[--primary-text-color] me-2 cursor-pointer"
        type="checkbox"
        name="categories"
        checked={categories.includes(data)}
        value={data}
        onChange={checkboxHandler}
      />
      {data}
    </label>
  );
};

export default Checkbox;
