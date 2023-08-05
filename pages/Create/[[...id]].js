import Head from "next/head";
import { useState, useContext, useEffect } from "react";

import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import { uploadFile } from "@/utils/upload";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/actions/userAction";
import Link from "next/link";
import { createProduct, getAllProducts, updateProduct } from "@/actions/productAction";
import { toast } from "react-toastify";
import { PRODUCT_CLEAR_ERRORS } from "@/constants/productConstants";
import { getCategories } from "@/actions/categoryAction";
import { getTags } from "@/actions/tagAction";
import { useSession } from "next-auth/react";

const Create = () => {
  const { data: session } = useSession()
  console.log("sessionCreate",session)
    const categories = useSelector((state) => state.category);
     const tags = useSelector((state) => state.tags);
    const dispatch = useDispatch();
   
  const { user,token } = useSelector(s => s.user)
 
  const navigate=useRouter()
  const { isUpdated, error: updError, loading } = useSelector((state) => state.updDelProduct);
    const {
    success,loading:loadingCreate
    } = useSelector((state) => state.products);
  const initialState = {
    title: "",
    desc: "",
    tag: "",
    category: "",
  
  };
  const [product, setProduct] = useState(initialState);
  const { title, desc, tag, category } = product;

  const [images, setImages] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  // console.log("id",id)
  const [onEdit, setOnEdit] = useState(false);
  const [catC, setCat] = useState([]);
  const [tagC, setTag] = useState([]);

 
  
  useEffect(() => setTag(tags))
  useEffect(() => setCat(categories));
    useEffect(() => {
      dispatch(loadUser())
      dispatch(getCategories())
      dispatch(getTags());
     
      
      
      if (id) {
      // console.log("I am Into Update")
      setOnEdit(true);
      getData(`blog/getsingle/${id}`).then((res) => {
        setProduct(res.blogDetails);
        setImages(res.blogDetails?.images);
        // console.log(res.blogDetails);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
      }
      if (updError) {
        toast.warning(updError);

        dispatch({ type: PRODUCT_CLEAR_ERRORS });
      }
      if (isUpdated?.msg) {
        toast.success(isUpdated?.msg);

        navigate.push("/blog/Home");
        dispatch({ type: PRODUCT_CLEAR_ERRORS });
        dispatch(getAllProducts());
      }
       if (success?.msg) {
         toast.success(success?.msg);

         navigate.push("/blog/Home");
         dispatch({ type: PRODUCT_CLEAR_ERRORS });
         dispatch(getAllProducts());
       }
  }, [dispatch,id,isUpdated?.msg,success?.msg]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
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
      if (num <= 10) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 10)
      return dispatch({ type: "NOTIFY", payload: { error: "Select up to 10 images." } });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (user.role !== "admin")
    //   return dispatch({
    //     type: "NOTIFY",
    //     payload: { error: "Authentication is not valid." },
    //   });

    if (
      !title ||
     
      !tag ||
      !category ||
      !desc ||
      category === "all" ||
      images.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await uploadFile(imgNewURL);

    let res;
    if (onEdit) {
      // res = await putData(
      //   `blog/${id}`,
      //   { ...product, images: [...imgOldURL, ...media] },
      //  user.token
      // );
      // if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
       dispatch(
        updateProduct(id, { ...product, images: [...imgOldURL, ...media] },token)
      );
      // if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      // res = await postData(
      //   "blog/create",
      //   { ...product, images: [...imgOldURL, ...media] },
      //   user.token
      // );
      // if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
       dispatch(
        createProduct({ ...product, images: [...imgOldURL, ...media],user:user._id },token)
      );
    }

    // return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <>
      <Head>
        <title>
          {onEdit ? "Update/Blog":"Create/Blog"} -Asikur
          Portfolio Website
        </title>
        <meta
          name="description"
          content="Create or update your blog post on the Asikur Portfolio Website and share your thoughts with the world. Harness the power of our intuitive and user-friendly interface to craft engaging and informative articles. From brainstorming ideas to publishing, our platform supports you every step of the way. Designed for a seamless user experience and accessible to Google bot count, our create or update blog page provides a hassle-free process to bring your ideas to life and reach a wider audience."
        />

        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="next-head-count" content="*" />
        <link rel="icon" type="image/png" href="/icon1.png" />
      </Head>
      <div className="contact" id="contact">
        <div className="container">
          <h1 className="main-title">
            {onEdit ? <span>Update Blog.</span> : <span>Create Blog.</span>}
          </h1>
          <div className="contact-main">
            <div class="container">
              <div class="contact-box">
                <div class="left"></div>
                <div class="right">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      class="field"
                      placeholder="Give Simple Title"
                      value={title}
                      name="title"
                      onChange={handleChangeInput}
                    />
                    <textarea
                      placeholder="Short desc"
                      class="field"
                      value={desc}
                      name="desc"
                      onChange={handleChangeInput}
                    ></textarea>
                    <select
                      className="field"
                      value={category}
                      // onChange={(e) => setCategory(e.target.value)}
                      name="category"
                      onChange={handleChangeInput}
                    >
                      <option value="">Choose Category</option>
                      {catC &&
                        catC.map((c, i) => {
                          return (
                            <option key={c?._id} value={c?.name}>
                              {c?.name}
                            </option>
                          );
                        })}
                    </select>
                    <select
                      className="field"
                      value={tag}
                      // onChange={(e) => setTag(e.target.value)}
                      name="tag"
                      onChange={handleChangeInput}
                    >
                      <option value="">Choose Tag</option>
                      {tagC &&
                        tagC.map((c, i) => {
                          return (
                            <option key={c?._id} value={c?.name}>
                              {c?.name}
                            </option>
                          );
                        })}
                    </select>

                    <p>
                      do you want to go back? <Link href="/blog/Home">back</Link>
                    </p>
                    <button
                      class="btn"
                      type="submit"
                      disabled={loadingCreate ? true : loading ? true : false}
                    >
                      {loadingCreate
                        ? "Creating..."
                        : loading
                        ? "Updating..."
                        : onEdit
                        ? "Update"
                        : "Create"}
                    </button>
                    <div className="col-md-6 my-4">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Upload</span>
                        </div>
                        <div className="custom-file border rounded">
                          <input
                            type="file"
                            className="custom-file-input"
                            onChange={handleUploadInput}
                            multiple
                            accept="image/*"
                          />
                        </div>
                      </div>

                      <div className="row img-up mx-0">
                        {images.map((img, index) => (
                          <div key={index} className="file_img my-1">
                            <img
                              src={img.url ? img.url : URL.createObjectURL(img)}
                              alt=""
                              className="img-thumbnail rounded"
                            />

                            <span onClick={() => deleteImage(index)}>X</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
