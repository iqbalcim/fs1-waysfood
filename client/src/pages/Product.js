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
  const [state] = useContext(UserContext);

  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/products");
    const response2 = response.data.data.filter((p) => p.id == id);
    return response2;
  });
  console.log(product);

  return (
    <section className="container px-4 mt-8 xl:px-[197px] xl:mt-14">
      {product?.map((item, index) => (
        <div key={item.id}>
          <h1 className="text-3xl font-bold my-6">
            {item.user.fullName}, Menus
          </h1>
          <div className="xl:flex xl:flex-wrap xl:gap-3">
            <div className="shadow-lg border rounded-md p-3 mb-5 xl:w-[272px] xl:h-[350px] xl:flex flex-col justify-between ">
              <img src={item.image} alt="" className="w-full h-44" />
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
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Product;
