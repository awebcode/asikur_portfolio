import { getAllProducts, getProductDetails } from "@/actions/productAction";
import { loadUser } from "@/actions/userAction";
import DetailsNext from "@/blog/blogDetails/DetailsNext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeAction from "@/actions/ThemeAction";
import Head from "next/head";
const Details = (props) => {
  
  // const { product } = useSelector((s) => s.productDetails)
  // console.log("props",props.data)
  const [data, setData] = useState()
 
  const dispatch=useDispatch()
  const router = useRouter();
  const { id } = router.query;
  // useEffect(()=>setData(product))
  useEffect(() => {
    // dispatch(getProductDetails(id))
    if (id) {
      const blogDetails = async () => {
        const { data } = await axios.get(`/api/blog/getsingle/${id}`);
        setData(data.blogDetails);
      };
      blogDetails();
   }
    
  }, [id])
  
  
   const themeReducer = useSelector((s) => s.Theme);
   const { user } = useSelector((s) => s.user);
   useEffect(() => {
     const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

     const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

     dispatch(ThemeAction.setMode(themeClass));

     dispatch(ThemeAction.setColor(colorClass));
    //  dispatch(loadUser());
     dispatch(getAllProducts());
   }, [dispatch]);
  
 
  return (
    <div className={`${themeReducer.mode} ${themeReducer.color}`}>
      <Head>
        <title>Blog Details -Asikur Portfolio Website</title>
        <meta
          name="description"
          content={`Blog Details -Asikur Portfolio Website | Read the insightful blog post "${data?.title}" on the Asikur Portfolio Website and delve into a world of knowledge and inspiration. Explore in-depth articles, thought-provoking content, and expert perspectives on topics ranging from web development to design trends. Designed for a seamless user experience and accessible to Google bot count, our blog details page provides valuable insights and fosters meaningful discussions in the creative and technology community.`}
        />
      </Head>
      <DetailsNext slug={id} data={data} />
    </div>
  );
};

export default Details
// export async function getServerSideProps(context) {
//   const {data} = await axios.get(
//     `${process.env.SERVER_URl}/api/blog/getsingle/${context.params?.id}`
//   );
//   // const data = res?.data;
//   return {
//     props: {
//       data: data?.blogDetails,
//     },
//   };
// }