import React, { useState, useEffect } from "react";
import { register } from "../../actions/userAction";

import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllProducts, updateProduct } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CLEAR_ERRORS } from "../../constants/productConstants";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { uploadFile } from "@/utils/upload";
import Link from "next/link";
const UpdateBlog = (props) => {
  const { id, details } = props;
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
   const { isUpdated, error, loading } = useSelector((state) => state.updDelProduct);
  // const categories = useSelector((state) => state.category);
  const tags = useSelector((state) => state.tags);
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  // const [category, setCategory] = useState();
  //  const [tag, setTag] = useState();
  const [blog, setBlog] = useState({
    title: details?.title,
    desc: details?.desc,
    category: details?.category,
    tag: details?.tag,
  });
  const { title, desc, tag, category } = blog;
  const [images, setImages] = useState([]);
  const [showAvatar, setShowAvatar] = useState([]);
   const [oldImages, setOldImages] = useState([...details?.images]);
  const registerDataChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const handleUploadInput = (e) => {
    if (e.target.name === "avatar") {
      const filess = Array.from(e.target.files);

      setImages([]);
      setShowAvatar([]);
      filess.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setShowAvatar((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({ type: "NOTIFY", payload: { error: "Files does not exist." } });

    files.forEach((file) => {
      if (file.size > 1024 * 1024) return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 20) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 20)
      return dispatch({ type: "NOTIFY", payload: { error: "Select up to 20 images." } });
     setImages([...images, ...newImages]);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await uploadFile(imgNewURL);
    dispatch(updateProduct(id,{ ...blog, images: [...imgOldURL, ...media] }));
  };

  useEffect(() => {
    // if (isAuthenticated === false) {
    //   navigate.push("/login");
    // }
   if (error) {
     toast.warning(error);

     dispatch({ type: PRODUCT_CLEAR_ERRORS });
   }
   if (isUpdated?.success === true) {
     toast.success("Blog Updated Successfully!");

     navigate.push("/blog/Home");
     dispatch({ type: PRODUCT_CLEAR_ERRORS });
     dispatch(getAllProducts());
   }
  }, [isAuthenticated, error, isUpdated, toast, dispatch]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          <span>Update Blog. </span>
        </h1>
        <div className="contact-main">
          <div class="container">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <form  onSubmit={registerSubmit}>
                  <input
                    type="text"
                    class="field"
                    placeholder="Give Simple Title"
                    value={title}
                    name="title"
                    onChange={registerDataChange}
                  />
                  <textarea
                    placeholder="Short category"
                    class="field"
                    value={desc}
                    name="desc"
                    onChange={registerDataChange}
                  ></textarea>
                  <select
                    className="field"
                    value={category}
                    // onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    onChange={registerDataChange}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((c, i) => {
                      return (
                        <option key={c?._id} value={c}>
                          {/* {c.name} */}
                          {c}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="field"
                    value={tag}
                    // onChange={(e) => setTag(e.target.value)}
                    name="tag"
                    onChange={registerDataChange}
                  >
                    <option value="">Choose Tag</option>
                    {categories.map((c, i) => {
                      return (
                        <option key={c?._id} value={c}>
                          {c}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="file"
                    class="field"
                    name="avatar"
                    multiple
                    accept="image/*"
                    onChange={handleUploadInput}
                  />
                  {showAvatar?.map((av) => {
                    return (
                      <img
                        src={av}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          overflow: "scroll",
                        }}
                      />
                    );
                  })}
                  {showAvatar.length===0 && oldImages?.map((av) => {
                    return (
                      <img
                        src={av?.url}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          margin: "5px",
                          overflowY: "scroll",
                        }}
                      />
                    );
                  })}
                  <p>
                    do you want to go back? <Link href="/blog/Home">back</Link>
                  </p>
                  <button class="btn" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Update"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
