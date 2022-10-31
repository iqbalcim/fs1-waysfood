import { useContext, useEffect, useState } from "react";
import { TfiMapAlt } from "react-icons/tfi";
import { useQuery } from "react-query";
import convertRupiah from "rupiah-format";
import { PaketGeprekKeranjang, Bin } from "../assets";
import { API } from "../config/api";
import { CartContext } from "../context/CartContext";

const CartOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  const { cartLength, setCartLength } = useContext(CartContext);

  console.log(cartLength);
  // add to cart
  const addToCartHandler = async (productId, productPrice) => {
    try {
      const response = await API.post(`/cart/add/${productId}`, {
        price: productPrice,
      });
      refetch();
      const getCart = await API.get("/carts");
      setCartLength(getCart.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartHandler = async (productId) => {
    try {
      const response = await API.patch(`/cart/update/${productId}`);
      if (response.data.data.qty === 0) {
        const response = await API.delete(`/cart/delete/${productId}`);
        setCartLength((prev) => prev - 1);
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const { data: cartData, refetch } = useQuery("cartCache", async () => {
    try {
      const response = await API.get("/carts");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });

  // calculate
  const allCartPrice = cartData?.map((item) => item.product.price * item.qty);
  const subTotal = allCartPrice?.reduce((a, b) => a + b, 0);
  console.log(subTotal);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <section className="mt-8 px-4 xl:px-[197px] xl:mt-14">
      <h1 className="text-3xl font-bold my-6">Geprek Bensu</h1>
      <h3 className="text-xl mb-4">Delivery Location</h3>
      <div className="xl:grid grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Harboud Building"
          className="border px-3 rounded-md xl:col-span-3 my-5 w-full py-3 shadow-lg lg:my-0"
        />
        <button className="w-full bg-secondary text-white py-3 rounded-md">
          Select On Map
          <TfiMapAlt className="inline-block ml-2" />
        </button>
      </div>
      <h3 className="my-5 text-xl">Review Your Order</h3>
      <div className="xl:grid grid-cols-5 lg:gap-10 mb-10 lg:mb-0">
        <div className="xl:col-span-3 ">
          <hr className="h-[3px] bg-amber-900 " />
          <div className="overflow-y-auto h-[250px]">
            {cartData?.map((item) => (
              <div>
                <div className="py-4 flex ">
                  <img
                    src={item.product.image}
                    alt="menu"
                    className="w-[80px] h-[80px]"
                  />
                  <div className="flex justify-between w-full">
                    <div className="ml-3 font-bold">
                      <h3>{item.product.name}</h3>
                      <div className="flex mt-2 items-center">
                        <p
                          className="mr-2 text-2xl cursor-pointer"
                          onClick={() => {
                            deleteCartHandler(item.product.id);
                          }}
                        >
                          -
                        </p>
                        <p className="px-2 mt-1 py-0 rounded bg-orange-200 font-light">
                          {item.qty}
                        </p>
                        <p
                          className="ml-2 text-2xl cursor-pointer"
                          onClick={() => {
                            addToCartHandler(
                              item.product.id,
                              item.product.price
                            );
                          }}
                        >
                          +
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-red-600">
                        {convertRupiah.convert(item.price)}
                      </p>
                      <img
                        src={Bin}
                        alt="bin"
                        width={20}
                        className="mt-3 lg:mt-2"
                        onClick={async () => {
                          const response = await API.delete(
                            `/cart/delete/${item.product.id}`
                          );
                          refetch();
                          setCartLength((prev) => prev - 1);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <hr className="h-[2px] bg-amber-900 " />
              </div>
            ))}
          </div>
        </div>
        {cartData?.length > 0 && (
          <div className="col-span-2">
            <hr className="h-[3px] bg-amber-900 w-full invisible lg:visible" />
            <div className="flex justify-between py-5">
              <div>
                <p>Subtotal</p>
                <p>Qty</p>
                <p>Ongkir</p>
              </div>
              <div>
                <p className="text-red-600">
                  {convertRupiah.convert(subTotal)}
                </p>
                <p className="text-end">{cartLength}</p>
                <p className="text-red-600">
                  {convertRupiah.convert(cartLength * 10000)}
                </p>
              </div>
            </div>
            <hr className="h-[2px] bg-amber-900 w-full" />
            <div className="flex justify-between py-4">
              <p>Total</p>
              <p className="text-red-600">
                {convertRupiah.convert(subTotal + 10000 * cartLength)}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartOrder;
