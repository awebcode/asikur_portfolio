import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../actions/productAction';
import { loadUser } from '../../actions/userAction';
import Blog from '../Blog';
import FooterBlog from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import SideRight from '../sideright/SideRight';
import Topbar from '../topbar/Topbar';
import PageTransition from '@/components/pageTransition';
import Head from 'next/head';

const BlogHome = () => {
  const dispatch=useDispatch()
   useEffect(() => {
     dispatch(getAllProducts());
    //  dispatch(loadUser())
   }, [dispatch]);
  return (
    <>
      
      <PageTransition />
      <Topbar />

      <Blog />
      <FooterBlog />
    </>
  );
}

export default BlogHome