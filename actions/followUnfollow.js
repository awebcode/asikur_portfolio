import axios from "axios";

export const addFriend = async (id,userId, token) => {
  try {
    const { data } = await axios.put(
      `/api/auth/friendsApi/addfriend/${id}`,
      {userId},

    );
    console.log(data)
    return "ok";
  } catch (error) {
    console.log(error)
    return error.response?.data.message;
  }
};
export const cancelRequest = async (id, userId, token) => {
  try {
    const { data } = await axios.put(`/api/auth/friendsApi/cancelrequest/${id}`, {
      userId,
    });
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
};
export const follow = async (id, userId, token) => {
  try {
    const { data } = await axios.put(`/api/auth/friendsApi/follow/${id}`, { userId });
    return "ok";
  } catch (error) {
    console.log(error.response?.data.message);

    return error.response?.data.message;
  }
};
export const unfollow = async (id, userId, token) => {
  try {
    const { data } = await axios.put(`/api/auth/friendsApi/unfollow/${id}`, { userId });
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
};
export const acceptRequest = async (id, userId, token) => {
  try {
    const { data } = await axios.put(`/api/auth/friendsApi/acceptrequest/${id}`, {
      userId,
    });
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
};
export const unfriend = async (id, userId, token) => {
  try {
    const { data } = await axios.put(`/api/auth/friendsApi/unfriend/${id}`, { userId });
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
};
export const deleteRequest = async (id, userId, token) => {
  try {
    const { data } = await axios.put(`/api/auth/friendsApi/deleterequest/${id}`, {
      userId,
    });
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
};
export const getFriendsPageInfos = async (token) => {
  try {
    const { data } = await axios.get(
      `/api/auth/friendsApi/friendpageinfo`,

      
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};