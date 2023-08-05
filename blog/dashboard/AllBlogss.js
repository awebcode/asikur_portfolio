import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";



import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";

import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { deleteProduct, getAllProducts, getAllUserProducts } from "../../actions/productAction";
import { PRODUCT_CLEAR_ERRORS } from "../../constants/productConstants";
import Sidebar from "../sidebar/Sidebar";
import { useRouter } from "next/router";
import Link from "next/link";

function AllProducts({products}) {
  const navigate = useRouter();
  const dispatch = useDispatch();
 const { user } = useSelector((state) => state.user);
 
  const { isDeleted, isUpdated, error } = useSelector((state) => state.updDelProduct);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are You Sure Want To Delete This Blog?.😘🥰")) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
   
    if (error) {
      toast.error(error);
      dispatch({ type: PRODUCT_CLEAR_ERRORS });
    }
    if (isUpdated?.success === true) {
      toast.success("Product Updated successfully");
      dispatch({ type: PRODUCT_CLEAR_ERRORS });
      navigate.push("/dashboard/Blog");
      dispatch(getAllProducts());
    }
    if (isDeleted?.success === true) {
      toast.success("Product deleted successfully");
      dispatch({ type: PRODUCT_CLEAR_ERRORS });
      navigate.push("/dashboard/Blog");
      dispatch(getAllProducts());
    }
  }, [dispatch, isDeleted, isUpdated]);

  const columns = [
    { field: "id", headerName: "Blog ID", minWidth: 200, flex: 0.5 },

    {
      field: "title",
      headerName: "Title",

      flex: 0.2,
    },
    {
      field: "category",
      headerName: "Category",

      flex: 0.2,
    },
    {
      field: "tag",
      headerName: "Tag",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "desc",
      headerName: "Desc",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
         
        return (
     
      
          <>
          
            <Link href={`/Create/${params.id}`}>
              <EditIcon />
            </Link>

            <a  style={{cursor:"pointer"}}
              onClick={() => deleteProductHandler(params.id)}
            >
              <DeleteIcon />
            </a>
            <Link href={`/blog/${params.id}`}>
              <LaunchIcon />
            </Link> 
          </>
        )
      }      
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        category: item.category,
        tag: item.tag,
      desc: item.desc,
        title: item.title,
      });
    });
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          {" "}
          <Sidebar />
        </div>
        <div className="data-container">
          <div className="productListContainer">
            <h1 id="productListHeading">
              ALL Your Blogs{" "}
              <span style={{ color: "greenyellow" }}>({products?.length})</span>
            </h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick
              // className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
