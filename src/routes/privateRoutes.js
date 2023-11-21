import { Cart, Wishlist, Checkout, Profile, Orders } from "../pages";
import Invoice from "../pages/Invoice";
import Customer from "../pages/Customer";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";

const adminRoutes = [
  {
    path: "/admin_invoice",
    element: <Invoice />,
  },
  {
    path: "/admin_customer",
    element: <Customer />
  },
  {
    path: "/admin_product",
    element: <Product />
  },
  {
    path: "/admin_dashboard",
    element: <Dashboard />
  }
]

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
  }
];
export { privateRoutes, adminRoutes };
