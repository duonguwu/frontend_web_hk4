import { Cart, Wishlist, Checkout, Profile, Orders } from "../pages";
import Invoice from "../pages/admin/invoice/Invoice";
import Customer from "../pages/admin/customer/Customer";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Product from "../pages/admin/product/Product";

const adminRoutes = [
  {
    path: "/admininvoice",
    element: <Invoice />,
  },
  {
    path: "/admincustomer",
    element: <Customer />,
  },
  {
    path: "/adminproduct/*",
    element: <Product />,
  },
  {
    path: "/admindashboard",
    element: <Dashboard />,
  },
];

const privateRoutes = [
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];
export { privateRoutes, adminRoutes };
