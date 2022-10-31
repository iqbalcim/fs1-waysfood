import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GlobalButton } from "../components";
import { API } from "../config/api";
import { CartContext } from "../context/CartContext";
import convertRupiah from "rupiah-format";
import { UserContext } from "../context/userContext";
import { BensuMenuList } from "../data/BensuMenuList";

const Product = () => {
  const [state, dispacth] = useContext(UserContext);

  const { dataCart, setDataCart } = useContext(CartContext);

  const params = useParams();

  const { cartLength, setCartLength } = useContext(CartContext);
  console.log(cartLength);

  let { data: productbyuser } = useQuery("productsbyuserCache", async () => {
    const response = await API.get(
      `/products/${params.id ? params.id : user.id}`
    );
    return response.data.data;
  });

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get(`/user/${params.id}`);
    return response.data.data;
  });

  const addToCartHandler = async (productId, productPrice) => {
    try {
      const response = await API.post(`/cart/add/${productId}`, {
        price: productPrice,
      });
      const getCart = await API.get("/carts");
      setCartLength(getCart.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container px-4 mt-8 xl:px-[197px] xl:mt-14">
      <h1 className="text-3xl font-bold my-6">{user?.fullName}, Menus</h1>
      <div className="xl:flex xl:flex-wrap xl:gap-3">
        {productbyuser?.map((item) => (
          <div
            key={item.id}
            className="shadow-lg border rounded-md p-3 mb-5 xl:w-[272px] xl:h-[380px] xl:flex flex-col justify-between  "
          >
            <img src={item.image} alt="" className="w-full h-48" />
            <h2 className="font-bold text-2xl my-3 lg:m-0 xl:text-lg">
              {item.title}
            </h2>
            <p className="text-red-500 my-3 lg:m-0 text-xl font-light">
              {convertRupiah.convert(item.price)}
            </p>
            <GlobalButton
              title="Add To Cart"
              bg="bg-primary"
              styled="w-full text-black font-bold my-3 lg:m-0 py-[10px]"
              onClick={() => addToCartHandler(item.id, item.price)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;
