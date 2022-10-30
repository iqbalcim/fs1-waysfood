import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { PopularList } from "../data/PopularList";

const Popular = () => {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShow = () => {
    setShowLogin(true);
  };

  let { data: user } = useQuery("popularCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  const partner = user?.filter((item) => item.role === "admin");
  console.log(partner);
  return (
    <section className="mt-8 px-4 container xl:px-[197px] xl:mt-14">
      <h1 className="text-3xl font-bold my-6">Popular Restaurant</h1>
      <div className="flex flex-col lg:flex-row xl:gap-3 xl:flex-wrap">
        {partner?.map((item) => (
          <div key={item?.id}>
            <div
              className="shadow-lg border flex items-center px-5 py-3 rounded-md justify-start mb-5  xl:flex-none xl:w-[272px]"
              onClick={() => {
                !state.isLogin
                  ? setShowLogin(true)
                  : navigate(`/product/${item.id}`);
              }}
            >
              <img src={item?.image} alt="bk" />
              <h2 className="pl-5 text-2xl font-bold">{item.fullName}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
