


import axios from 'axios';
import { 
  
  GET_COMMENTS,
  
  UPDATE_COMMENT,
  UPDATE_REPLY,
 
  DELETE_COMMENT,
  DELETE_REPLY,
 
  REPLY_COMMENT,
  ALERT,
  CREATE_COMMENT
} from '../constants/CommentConstant'


import { postAPI, getAPI, patchAPI, deleteAPI } from "./FetchData";



export const createComment = (
  datas,id
) => async(dispatch) => {
 
  
  try {
   const res= await postAPI(`comment/${id}`, datas)
    // socket.emit("new message", {...res.data,user: res.data.user});
    dispatch({
      type: CREATE_COMMENT,
      payload: { ...res.data, user: res.data.user },
    });
   
     
   
    
  } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.response} })
    console.log(err)
  }
}


export const getComments = (
  id, num
) => async (dispatch) => {
  console.log("id", id,num);
  try {
    
    let limit = 5;

    const res = await axios.get(
      `/api/comment/get/${id}?page=${num}&limit=${limit}`
    );

    dispatch({
      type: GET_COMMENTS,
      payload: {
        data: res.data.comments, //res.data.comments

        total: res.data.total,
      },
    });
    
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response?.data?.msg } })
  }
}


export const replyComment = (data) => async (dispatch) => {
  try {
     const config = { headers: { "Content-Type": "application/json" } };

    const res = await axios.post(
      `/api/comment/reply`,
      data,
      config
    );
    // console.log("repdta",res)
    //  socket.emit("new message", {
    //    ...res.data,
    //    user: data.user,
    //    reply_user: data.reply_user,
    //  });
    dispatch({
      type: REPLY_COMMENT,
      payload: {
        ...res.data,
        user: data.user,
        reply_user: data.reply_user,
      },
    });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data?.msg } });
  }
};

export const updateComment = (
  data
) => async(dispatch) => {
 
  try {
    //  socket.emit("new message", 
    //   data
    //  );
    dispatch({ 
      type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT, 
      payload: data 
    })

    await patchAPI(`comment/${data._id}`, { data })

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const deleteComment = (
  data
) => async(dispatch) => {
  
  try {
   
    dispatch({ 
      type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT, 
      payload: data 
      
    })
    console.log("data",data);
    await deleteAPI(`comment/${data._id}`)

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}