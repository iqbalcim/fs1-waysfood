import { PartnerProfileImg, BrandLogo } from "../../assets";
import { GlobalButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { API } from "../../config/api";

const PartnerProfile = () => {
  const navigate = useNavigate();

  const [state, dispacth] = useContext(UserContext);

  const handleNavigate = () => {
    navigate("/edit-admin");
  };

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await API.get(`/user/${state.user.id}`);
    console.log(response);
    setUser(response.data.data);
  };

  useEffect(() => {
    getUser();
  }, [state]);

  return (
    <section className="mt-8 px-4 container xl:px-[197px] xl:mt-14">
      <div className="grid xl:grid-cols-2 ">
        <div className="xl:col-start-1 xl:col-end-2 ">
          <h1 className="text-3xl font-bold my-6">Profile Partner</h1>
          <div className="xl:grid grid-cols-2">
            <img src={user?.image} alt="" className="w-full" />
            <div className="my-5 lg:my-0 lg:flex flex-col justify-evenly lg:ml-5">
              <div>
                <h2 className="text-2xl font-bold xl:text-xl">Full Name</h2>
                <p className="text-xl mb-4">{user?.fullName}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold xl:text-xl">Email</h2>
                <p className="text-xl mb-4">{user?.email}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold xl:text-xl">Phone</h2>
                <p className="text-xl">{user?.phone}</p>
              </div>
            </div>
            <GlobalButton
              title="Edit Profile"
              styled="w-full py-4 xl:py-2 xl:mt-4"
              onClick={handleNavigate}
            />
          </div>
        </div>
        <div className="xl:col-end-7 xl:col-span-2">
          <h1 className="text-3xl font-bold my-6">History Transaction</h1>
          <div>
            <div className="shadow-xl border grid grid-cols-2 p-5 rounded-md gap-2 mb-5">
              <div>
                <h4 className="text-sm">Geprek Bensu</h4>
                <h5 className="text-sm">Saturday, 12 March 2021</h5>
                <p className="text-sm mt-3 font-bold text-red-600">
                  Total : Rp 45.000
                </p>
              </div>
              <div className="grid justify-items-end">
                <img src={BrandLogo} alt="" />
                <GlobalButton
                  title="Finished"
                  styled="text-[#00FF47] bg-green-100 mt-3"
                />
              </div>
            </div>
            <div className="shadow-xl border grid grid-cols-2 p-5 rounded-md gap-2 mb-5">
              <div>
                <h4 className="text-sm">Geprek Bensu</h4>
                <h5 className="text-sm">Saturday, 12 March 2021</h5>
                <p className="text-sm mt-3 font-bold text-red-600">
                  Total : Rp 45.000
                </p>
              </div>
              <div className="grid justify-items-end">
                <img src={BrandLogo} alt="" />
                <GlobalButton
                  title="Finished"
                  styled="text-[#00FF47] bg-green-100 mt-3"
                />
              </div>
            </div>
            <div className="shadow-xl border grid grid-cols-2 p-5 rounded-md gap-2 mb-5">
              <div>
                <h4 className="text-sm">Geprek Bensu</h4>
                <h5 className="text-sm">Saturday, 12 March 2021</h5>
                <p className="text-sm mt-3 font-bold text-red-600">
                  Total : Rp 45.000
                </p>
              </div>
              <div className="grid justify-items-end">
                <img src={BrandLogo} alt="" />
                <GlobalButton
                  title="Finished"
                  styled="text-[#00FF47] bg-green-100 mt-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerProfile;
