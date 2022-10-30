import GlobalButton from "../Atom/GlobalButton";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { useState } from "react";
import { AlertSuccess, AlertFail } from "../Atom/Alert";

const Register = ({
  showModalRegister,
  setShowModalRegister,
  setShowModal,
}) => {
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    role: "",
  });

  const { email, password, fullname, gender, phone, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/register", form);
      const alert = (
        <AlertSuccess title="Success, " desc="Registration Successfull" />
      );

      setTimeout(() => {
        setShowModalRegister(false);
        setShowModal(true);
      }, 2000);

      setMessage(alert);
    } catch (error) {
      console.log(error);
      const alert = (
        <AlertFail title="Failed !" desc={error.response.data.message} />
      );

      setMessage(alert);
    }
  });

  return (
    <>
      {showModalRegister ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[400px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Register</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalRegister(false)}
                  >
                    <span className="text-slate-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {message && message}
                  <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <input
                      name="email"
                      value={email}
                      type="Email"
                      placeholder="Email"
                      onChange={handleChange}
                      className="shadow-md p-3 rounded-md w-full border mb-5 mt-5"
                      required
                    />
                    <input
                      name="password"
                      value={password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      className="shadow-md p-3 rounded-md w-full border mb-5"
                      required
                    />
                    <input
                      type="text"
                      name="fullname"
                      onChange={handleChange}
                      value={fullname}
                      placeholder="Full Name"
                      className="shadow-md p-3 rounded-md w-full border mb-5"
                      required
                    />
                    <select
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={handleChange}
                      className="shadow-md p-3 rounded-md w-full border mb-5"
                      required
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="femaale">Female</option>
                    </select>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      value={phone}
                      placeholder="Phone"
                      className="shadow-md p-3 rounded-md w-full border mb-5"
                      required
                    />
                    <select
                      name="role"
                      value={role}
                      onChange={handleChange}
                      id="role"
                      className="shadow-md p-3 rounded-md w-full border mb-5 "
                      required
                    >
                      <option value="" className="">
                        Role
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <GlobalButton
                      title="Register"
                      styled="w-full py-[9px] mb-5"
                    />
                    <p className="text-center">
                      Already have an account ?{" "}
                      <span
                        onClick={() => {
                          setShowModalRegister(false);
                          setShowModal(true);
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

export default Register;
