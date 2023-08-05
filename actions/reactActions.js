import axios from "axios";
export const reactPost = async (postId, react,userId,userName,postCreatorId, token) => {
  try {
    const { data } = await axios.put(`/api/reactpost/create`, {
      postId,
      react,
      userId,
      userName,
      postCreatorId,
    });
    return "ok";
  } catch (error) {
    return error.response?.data?.message;
  }
};
export const getPostReacts = async (postId) => {
  try {
    const { data } = await axios.get(`/api/reactpost/${postId}`);
    return data;
  } catch (error) {
    return error.response?.data?.message;
  }
};
//unauth
export const getPostReactsUnauth = async (postId) => {
  try {
    const { data } = await axios.get(`/api/reactpost/unauth/${postId}`);
    return data;
  } catch (error) {
    return error.response?.data?.message;
  }
};
//react comments
export const reactComment = async (postId, react, userId, userName, commentCreatorId) => {
  try {
    const { data } = await axios.put(`/api/reactCm/create`, {
      postId,
      react,
      userId,
      userName,
      commentCreatorId,
    });
    return "ok";
  } catch (error) {
    return error.response?.data?.message;
  }
};
export const getCommentReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(`/api/reactCm/${postId}`);
    return data;
  } catch (error) {
    return error.response?.data?.message
  }
};
export const getCommentReactsUnAuth = async (postId, token) => {
  try {
    const { data } = await axios.get(`/api/reactCm/unauth/${postId}`);
    return data;
  } catch (error) {
    return error.response?.data?.message;
  }
};

