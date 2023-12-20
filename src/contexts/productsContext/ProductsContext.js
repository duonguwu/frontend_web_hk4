import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, productsReducer } from "../../reducers/productsReducer";
import {
  getAllCategoriesService,
  getAllProductsService,
  getAllAddressesService,
} from "../../api/apiServices";
import {
  actionTypes,
  addressTypes,
  filterTypes,
} from "../../utils/actionTypes";
import { useAuthContext } from "..";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [currentAddress, setCurrentAddress] = useState(state.addressList[0]);
  const [isOrderPlaced, setisOrderPlaced] = useState(false);

  useEffect(() => {
    //console.log("Token:", token); // Kiểm tra giá trị của token
    setLoading(true);
    (async () => {
      try {
        const productsRes = await getAllProductsService();
        console.log("productsRes:", productsRes); // Kiểm tra dữ liệu trả về từ API

        if (productsRes.status === 200) {
          const productsData = productsRes.data.products || []; // Kiểm tra dữ liệu
          console.log("productsData:", productsData); // Kiểm tra dữ liệu sau khi xử lý

          const maxValue = productsData.reduce(
            (acc, { price }) => (acc > price ? acc : price),
            0
          );

          dispatch({
            type: actionTypes.INITIALIZE_PRODUCTS,
            payload: productsData,
          });

          // Cập nhật maxRange nếu dữ liệu hợp lệ
          dispatch({
            type: filterTypes.FILTERS,
            payload: { filterType: "priceRange", filterValue: maxValue },
          });
        }
        await getAddressesService();
        const categoryRes = await getAllCategoriesService();
        console.log("categoryRes:", categoryRes); // Kiểm tra dữ liệu trả về từ API

        if (categoryRes.status === 200) {
          dispatch({
            type: actionTypes.INITIALIZE_CATEGORIES,
            payload: categoryRes.data.categories,
          });
          console.log("categoryList after initialization:", state.categoryList);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const getProductById = (productId) =>
    state.allProducts.find((product) => product._id === productId);

  const updateInCartOrInWish = (productId, type, value) => {
    console.log("Product ID is receive:", productId);
    if (productId) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) =>
          item._id === productId ? { ...item, [type]: value } : item
        ),
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) => ({
          ...item,
          inCart: false,
          qty: 0,
        })),
      });
    }
  };

  const applyFilters = (filterType, filterValue) => {
    //console.log("Value: ", filterValue);
    dispatch({
      type: filterTypes.FILTERS,
      payload: { filterType, filterValue },
    });
  };
  const clearFilters = () => {
    dispatch({
      type: filterTypes.CLEAR_FILTER,
    });
  };
  const trendingProducts = state.allProducts.filter(
    (product) => product.trending
  );

  ///// Add ress
  const getAddressesService = async () => {
    try {
      const addressesRes = await getAllAddressesService(token);
      console.log("addressesRes:", addressesRes); // Kiểm tra dữ liệu trả về từ API

      if (addressesRes.status === 200) {
        const addressesData = addressesRes.data.addresses || []; // Kiểm tra dữ liệu
        console.log("addressesData:", addressesData); // Kiểm tra dữ liệu sau khi xử lý

        dispatch({
          type: addressTypes.INITIALIZE_ADDRESSES,
          payload: addressesData,
        });
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const addAddress = (newAddress) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: [newAddress, ...state.addressList],
    });
  };

  const updateAddress = (addressId, updatedAddress) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: state.addressList.map((item) =>
        item.id === addressId ? updatedAddress : item
      ),
    });
    if (currentAddress.id === addressId) {
      setCurrentAddress(updatedAddress);
    }
  };
  const deleteAddress = (addressId) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: state.addressList.filter(({ id }) => id !== addressId),
    });
    if (currentAddress.id === addressId) {
      setCurrentAddress({});
    }
  };
  const isInCart = (productId) =>
    state.allProducts.find((item) => item._id === productId && item.inCart);
  const isInWish = (productId) =>
    state.allProducts.find((item) => item._id === productId && item.inWish);

  return (
    <ProductsContext.Provider
      value={{
        allProducts: state.allProducts,
        wishlist: state.wishlist,
        filters: state.filters,
        maxRange: state.maxRange,
        categoryList: state.categoryList,
        addressList: state.addressList,
        isInCart,
        isInWish,
        isOrderPlaced,
        currentAddress,
        loading,
        trendingProducts,
        updateInCartOrInWish,
        getProductById,
        applyFilters,
        clearFilters,
        getAddressesService,
        addAddress,
        updateAddress,
        deleteAddress,
        setCurrentAddress,
        setisOrderPlaced,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
