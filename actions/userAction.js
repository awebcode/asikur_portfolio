import axios from "axios"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_PICTURE_FAIL, UPDATE_USER_PICTURE_REQUEST, UPDATE_USER_PICTURE_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_ROLE_FAIL, UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants"
import { signOut } from "next-auth/react"

export const register = (userdata,token) => async (dispatch) => {
  console.log("userData",userdata)
    try {
        dispatch({ type: REGISTER_REQUEST })
        const config = {
          headers: { "Content-Type": "application/json", 'Authorization': token },
        };
      const { data } = await axios.post(`/api/auth/register`, userdata, config)
       
        
        dispatch({ type: REGISTER_SUCCESS,payload:data.user });
       Cookies.set("nexttoken", data.token, {
        expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        
      });
localStorage.setItem("currentUser", JSON.stringify(data.user));
         localStorage.setItem("firstLogin", true);
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
}
export const login = (userdata,token) => async (dispatch,getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    const { data } = await axios.post(`/api/auth/login`, userdata, config);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
     localStorage.setItem("role", data.user.role);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    console.log("actionLogin",data)
    Cookies.set("nexttoken", data.token, {
      expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
     
    });

      localStorage.setItem("firstLogin", true);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
  }
};
export const loadUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    const { data } = await axios.get(`/api/auth/userDetails`,config);
   
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });//data.user
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.msg });
  }
};
export const loadUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_PROFILE_REQUEST" });
    const config = {
      headers: { "Content-Type": "application/json"},
    };
    const { data } = await axios.get(`/api/auth/userProfile/${id}`, config);

    dispatch({ type: "LOAD_USER_PROFILE_SUCCESS", payload: data }); //data.user
  } catch (error) {
    dispatch({ type: "LOAD_USER_PROFILE_FAIL", payload: error.response });
  }
};
//allusers
export const getallUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const { data } = await axios.get(`/api/auth/getAllUser`);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data.allUsers });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error.response.data.msg });
  }
};
//LOGOUT
export const logoutAction = (navigate) => async (dispatch) => {
  try {
   
 localStorage.removeItem("currentUser");
 localStorage.removeItem("role");
 Cookies.remove("nexttoken", "", {
   expires: new Date(Date.now()),
 });
    navigate.push("/login");
   await signOut()

    const { data } = await axios.get(`/api/auth/logout`);
     
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
     
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
// Update Profile
export const updateProfile = (name,email,image,userId) => async (dispatch) => {
  
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.patch(`/api/auth/updateUser`,  {name, email, image,userId} , config);
   
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data.message,
    });
  }
};
export const updateProfilePic = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PICTURE_REQUEST });
 
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/user/update/pic`, userData, config);

    dispatch({ type: UPDATE_USER_PICTURE_SUCCESS, payload: data });
   
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PICTURE_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
export const clearHistoryAction = () => async (dispatch) => {

  dispatch({type:CLEAR_ERRORS})
};
//update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/auth/updatePassword`, passwords, config);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.msg });
  }
};
// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/auth/updateRole/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};
//delete user
// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/auth/updateRole/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

// Update User role
export const updateUserRole = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ROLE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/auth/updateRole/${id}`, userData, config);

    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ROLE_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

