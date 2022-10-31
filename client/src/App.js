import { useContext, useState } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
  Link,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Product,
  UserProfile,
  CartOrder,
  EditProfile,
  EditProfilePartner,
  PartnerProfile,
  AddProduct,
  Transaction,
} from "./pages";
import Navbars from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartContext } from "./context/CartContext";

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" />;
  };

  const AdminRoute = () => {
    const role = state.user.role;
    return role === "admin" ? <Outlet /> : <Navigate to="/" />;
  };

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");
      console.log(response);

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();

  const [cartLength, setCartLength] = useState(0);

  return (
    <CartContext.Provider value={{ cartLength, setCartLength }}>
      <QueryClientProvider client={client}>
        <Router>
          <Navbars />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/edit-admin" element={<EditProfilePartner />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/edit-profile-user" element={<EditProfile />} />
              <Route path="/cart-order" element={<CartOrder />} />
            </Route>
            <Route exact path="/" element={<AdminRoute />}>
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/profile-admin" element={<PartnerProfile />} />
              <Route path="/transaction" element={<Transaction />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </CartContext.Provider>
  );
};

export default App;
