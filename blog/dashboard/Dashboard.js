import { getAllProducts } from '@/actions/productAction'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '../sidebar/Sidebar'
// import "./dashboard.css"
const Dashboard = ({allUser,products}) => {
     const navigate=useRouter()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
  
   
    
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="container">
        <div className="dashboard-main">
          <div className="dash-sec">
            <Link href="/dashboard/AllUsers">
              {" "}
              <h1>All Users</h1>
              <span>{allUser?.length}</span>
            </Link>
          </div>
          <div className="dash-sec">
            <Link href="/dashboard/Blogs">
              <h1>All Blogs</h1>
              <span>{products?.length}</span>
            </Link>
          </div>
          <div className="dash-sec">
            <Link href="/dashboard/AllComments">
              <h1>All Comments</h1>
              {/* <span>{data?.comments?.length}</span> */}
              <span>3035</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard