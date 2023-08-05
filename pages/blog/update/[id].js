import UpdateBlog from '@/blog/AllBlog/UpdateBlog'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

const Update = (props) => {
    console.log("details", props.data.blogDetails);
    const router = useRouter()
    const {id}=router.query
  return (
    <div>
      <UpdateBlog id={id} details={props.data.blogDetails} />
    </div>
  );
}

export default Update
export async function getServerSideProps(context) {
  // const res = await fetch("http://localhost:3000/api/blog/get");
  const { data } = await axios.get(
    `https://asikur.vercel.app/api/blog/${context.params.id}`
  );

  return {
    props: { data },
  };
}