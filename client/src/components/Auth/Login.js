import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import GlobalButton from "../Atom/GlobalButton";

import { useMutation } from "react-query";

import { API } from "../../config/api";

const Login = ({
  showModal,
  setShowModal,
  setShowModalRegister,
  setIsLogin,
}) => {
  let navigate = useNavigate();

  const [state, dispacth] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <div>Success Login</div>;

      setMessage(alert);

      let payload = data.data.data;

      dispacth({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");

      console.log("ini response login", data);
      console.log("ini payload", payload);
    } catch (error) {
      console.log(error);
      const alert = <div>Email Password Salah</div>;
      setMessage(alert);
    }
  });

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[400px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Login</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-slate-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {message && message}
                  <form>
                    <input
                      type="Email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="shadow-md p-3 rounded-md w-full border mb-5"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      className="shadow-md p-3 rounded-md w-full border mb-5"
                    />
                    <GlobalButton
                      title="Login"
                      styled="w-full py-[9px] mb-5"
                      type="submit"
                      onClick={(e) => {
                        handleSubmit.mutate(e);
                        setShowModal(false);
                      }}
                    />
                    <p className="text-center">
                      Don't have an account ?{" "}
                      <span
                        onClick={() => {
                          setShowModalRegister(true);
                          setShowModal(false);
                        }}
                        className="text-blue-500 cursor-pointer"
                      >
                        Click Here
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Login;
