import { useContext, useEffect, useState } from "react";
import {
  BrandLogo,
  IconUser,
  CartIcon,
  IconLogout,
  IconPerson,
  AddProduct,
} from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { Login, Register } from "../components";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [state, dispacth] = useContext(UserContext);
  const { cartLength, setCartLength } = useContext(CartContext);
  console.log(cartLength);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen((current) => !current);
  };

  const handleLogout = () => {
    dispacth({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const drowDownClick = () => {
    setdropdownOpen((current) => !current);
  };

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await API.get(`/user/${state.user.id}`);
    console.log(response);
    setUser(response.data.data);
  };

  const getCart = async () => {
    const response = await API.get(`/carts`);
    setCartLength(response.data.data.length);
  };

  useEffect(() => {
    getUser();
  }, [state]);

  return (
    <nav className="bg-primary max-w-full">
      <div className="container px-3 lg:px-[65px] mx-auto flex justify-between items-center">
        <Link to="/">
          <div>
            <img src={BrandLogo} alt="BrandLogo" className="py-3" />
          </div>
        </Link>
        <div className="flex items-center px-4">
          <button
            className={`${isOpen ? "hamburger-active" : ""}  xl:hidden ${
              state.isLogin ? "hidden" : "absolute right-4"
            }`}
            onClick={handleClick}
          >
            <span className="block w-[30px] h-[2px] my-2 bg-black transition duration-300 ease-in-out origin-top-left"></span>
            <span className="block w-[30px] h-[2px] my-2 bg-black transition duration-300 ease-in-out "></span>
            <span className="block w-[30px] h-[2px] my-2 bg-black transition duration-300 ease-in-out origin-bottom-left"></span>
          </button>

          {!state.isLogin ? (
            <nav
              className={`absolute pl-3 py-5 bg-white shadow-lg border-2 xl:border-0 rounded-lg max-w-[150px] w-full right-4 top-16 lg:block lg:static lg:max-w-full lg:shadow-none lg:bg-transparent ${
                isOpen ? "" : "hidden"
              }`}
              onClick={handleClick}
            >
              <ul className="block xl:flex">
                <li>
                  <button
                    className="xl:bg-secondary xl:text-white xl:px-3 xl:py-2 xl:mr-3 rounded-md"
                    onClick={() => setShowModalRegister(true)}
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    className="xl:bg-secondary xl:text-white xl:px-3 xl:py-2 rounded-md"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Login
                  </button>
                </li>
              </ul>
            </nav>
          ) : state.user.role === "user" ? (
            <div className="py-3 ">
              <div className="flex items-center">
                <Link to="/cart-order">
                  <img src={CartIcon} alt="" className="mr-5" />
                  {cartLength > 0 && (
                    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full absolute top-4 right-36">
                      {cartLength}
                    </span>
                  )}
                </Link>
                <img
                  src={user?.image}
                  alt="usericon"
                  className="w-10 h-10 rounded-full mr-5"
                  onClick={() => {
                    drowDownClick();
                    console.log("clicked");
                  }}
                />
              </div>
              <div>
                <ul
                  className={`${
                    dropdownOpen ? "" : "hidden"
                  } absolute bg-white p-5 rounded-lg shadow-lg lg:right-10 lg:top-24 right-0 top-[85px] border-2`}
                >
                  <Link to="/user-profile">
                    <li className="flex items-center px-2 mb-4 border-b-2 pb-4">
                      <img src={IconPerson} alt="iconperson" className="pr-4" />
                      <span>Profile</span>
                    </li>
                  </Link>
                  <li className="flex items-center px-2 mt-4 pr-12 cursor-pointer">
                    <img src={IconLogout} alt="IconLogout" className="pr-4" />
                    <span onClick={handleLogout}>Logout</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-3 ">
              <div className="flex items-center">
                <img
                  src={user?.image}
                  alt="partnericon"
                  className="w-10 h-10 rounded-full mr-5"
                  onClick={() => {
                    drowDownClick();
                    console.log("clicked");
                  }}
                />
              </div>
              <div>
                <ul
                  className={`${
                    dropdownOpen ? "" : "hidden"
                  } absolute bg-white p-5 rounded-lg shadow-lg lg:right-10 lg:top-24 right-0 top-[85px] border-2`}
                >
                  <Link to="/profile-admin">
                    <li className="flex items-center px-2 mb-4 pb-4">
                      <img src={IconPerson} alt="iconperson" className="pr-4" />
                      <span>Profile</span>
                    </li>
                  </Link>
                  <Link to="/add-product">
                    <li className="flex items-center px-2 mb-4 border-b-2 pb-4">
                      <img src={AddProduct} alt="iconperson" className="pr-4" />
                      <span>Add Product</span>
                    </li>
                  </Link>
                  <li className="flex items-center px-2 mt-4 pr-12 cursor-pointer">
                    <img src={IconLogout} alt="IconLogout" className="pr-4" />
                    <span onClick={handleLogout}>Logout</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <Login
        showModal={showModal}
        setShowModal={setShowModal}
        setShowModalRegister={setShowModalRegister}
        setIsLogin={setIsLogin}
      />
      <Register
        showModalRegister={showModalRegister}
        setShowModalRegister={setShowModalRegister}
        setShowModal={setShowModal}
      />
    </nav>
  );
};

export default Navbar;
