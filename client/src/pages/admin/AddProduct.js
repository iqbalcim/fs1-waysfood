import { useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { GlobalButton } from "../../components";
import { API } from "../../config/api";

const AddProduct = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    image: "",
    price: 0,
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

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("price", form.price);

      const data = await API.post("/product/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/product/" + data.data.id);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <section className="container px-4 mt-8 xl:px-[197px] xl:mt-14">
      <h1 className="text-3xl font-bold my-6">Add Product</h1>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className="lg:grid grid-cols-4 lg:gap-5">
          <div className="col-span-3">
            <input
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="Title"
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
            hidden
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="price"
            onChange={handleChange}
            type="text"
            placeholder="Price"
            className="shadow-lg w-full border-2 h-14 rounded-md px-3 mb-5 lg:mb-10"
          />
        </div>
        <div className="lg:text-end">
          <GlobalButton title="Save" styled="w-full lg:w-2/6 h-14" />
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
