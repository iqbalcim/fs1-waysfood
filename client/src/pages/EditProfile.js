import { useContext, useEffect, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { TfiMapAlt } from "react-icons/tfi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GlobalButton } from "../components";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    image: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  let { data: user } = useQuery("editUserCache", async () => {
    const response = await API.get(`/user/${state.user.id}`);
    console.log(response.data.data);
    return response.data.data;
  });

  useEffect(() => {
    if (user) {
      setPreview(user.image);
      setForm({
        ...form,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("fullname", form.fullName);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location);

      const response = await API.patch("/user/update/" + user.id, formData);
      console.log("ini data updated user", response.data);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload: payload,
      });

      navigate("/user-profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container px-4 mt-8 xl:px-[197px] xl:mt-14">
      <h1 className={`text-3xl font-bold my-6 ${!preview ? "" : "lg:mb-24"}`}>
        Edit Profile
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="lg:grid grid-cols-4 lg:gap-5">
          <div className="col-span-3">
            <input
              name="fullName"
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className="shadow-lg w-full border-2 h-14 rounded-md px-3 mb-5 lg:mb-10"
            />
          </div>
          <div className="shadow-xl lg:shadow-none">
            {preview && (
              <div>
                <img
                  src={preview}
                  className="w-30 h-40 object-cover absolute -z-1 top-24"
                  alt={preview}
                />
              </div>
            )}
            <label
              htmlFor="upload"
              className="flex items-center p-5 justify-between border-2 h-14 rounded-md mb-5 lg:mb-10"
            >
              <span className="text-slate-400">Attach Image</span>
              <FiPaperclip />
            </label>
          </div>
          <input
            type="file"
            id="upload"
            onChange={handleChange}
            name="image"
            hidden
          />
        </div>
        <div>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="shadow-lg w-full border-2 h-14 rounded-md px-3 mb-5 lg:mb-10"
          />
        </div>
        <div>
          <input
            name="phone"
            onChange={handleChange}
            type="text"
            placeholder="Phone"
            className="shadow-lg w-full border-2 h-14 rounded-md px-3 mb-5 lg:mb-10"
          />
        </div>
        <div className="lg:grid grid-cols-4 lg:gap-5">
          <div className="col-span-3">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Location"
              className="shadow-lg w-full border-2 h-14 rounded-md px-3 mb-5 lg:mb-10"
            />
          </div>
          <div>
            <button className="w-full bg-secondary text-white py-3 rounded-md h-14 mb-5 lg:mb-28">
              Select On Map
              <TfiMapAlt className="inline-block ml-2" />
            </button>
          </div>
        </div>
        <div className="lg:text-end">
          <GlobalButton title="Save" styled="w-full lg:w-2/6 h-14" />
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
