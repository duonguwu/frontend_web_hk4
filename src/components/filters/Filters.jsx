import { AiOutlineClose } from "react-icons/ai";
import Checkbox from "./Checkbox";
import InputRange from "./InputRange";
import InputRadio from "./InputRadio";
import InputRadioType2 from "./InputRadioType2";
import { useProductsContext } from "../../contexts";
import {
  checkboxCategories,
  gendersList,
  ratings,
} from "../../utils/constants";

const FilterHeading = ({ text }) => <h2 className="text-xl mb-4">{text}</h2>;
// const Filters = ({ isFilterOpen, setIsFilterOpen }) => {
  const Filters = () => {
  const { clearFilters } = useProductsContext();

  return (
    <aside
    //   className={`filtersContainer fixed  top-0 h-screen z-10 flex flex-col p-3 gap-3 overflow-auto
    // transition-all ease-in-out duration-300  ${
    //   isFilterOpen ? "left-0 " : "-left-96"
    // }
    // `}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lọc sản phẩm</h1>
        {/* <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        /> */}
      </div>
      <button
        className="py-0.5 px-2 w-16 text-center bg-black/[0.2]  text-sm font-semibold shadow-sm rounded-md hover:bg-gray-800 hover:text-white transition-colors "
        onClick={clearFilters}
      >
        Bỏ lọc
      </button>
      <section>
        <FilterHeading text="Giới tính" />
        <div className="grid grid-rows-2 grid-cols-2 gap-2">
          {gendersList.map((data, index) => (
            <InputRadioType2 data={data} key={index} />
          ))}
        </div>
      </section>
      <section>
        <FilterHeading text="Khoảng giá" />
        <InputRange />
      </section>
      <section>
        <FilterHeading text="Loại" />
        <div className="flex flex-col gap-2">
          {checkboxCategories.map((data, index) => (
            <Checkbox data={data} key={index} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <FilterHeading text="Đánh giá" />
        {ratings.map((data, index) => (
          <InputRadio data={data} key={index} name="rating" />
        ))}
      </section>
    </aside>
  );
};

export default Filters;
