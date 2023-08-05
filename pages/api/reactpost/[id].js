
import postReactModel from "@/models/ReactModel/ProductReactModel";
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import mongoose from "mongoose";

db();
export default async (req, res) => {
  switch (req.method) {
    

    case "GET":
      await getReacts(req, res);
      break;
   
  }
};
 
const getReacts = async (req, res) => {
    const result = await isAuthenticatedUser(req, res);
    try {
      const { id } = req.query;
      const reactsArray = await postReactModel.find({ postRef: id }).populate("reactBy");

      /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
      const newReacts = reactsArray.reduce((group, react) => {
        let key = react["react"];
        group[key] = group[key] || [];
        group[key].push(react);
        return group;
      }, {});

      const reacts = [
        {
          react: "like",
          count: newReacts.like ? newReacts.like.length : 0,
        },
        {
          react: "love",
          count: newReacts.love ? newReacts.love.length : 0,
        },
        {
          react: "haha",
          count: newReacts.haha ? newReacts.haha.length : 0,
        },
        {
          react: "sad",
          count: newReacts.sad ? newReacts.sad.length : 0,
        },
        {
          react: "wow",
          count: newReacts.wow ? newReacts.wow.length : 0,
        },
        {
          react: "angry",
          count: newReacts.angry ? newReacts.angry.length : 0,
        },
      ];
      //const user = await userModel.findById(req.user.id);
      const check = await postReactModel.findOne({
        postRef: id,
        reactBy: result._id,
      });
      const user = await User.findById(result._id);
      const checkSaved = user?.savedPosts.find((x) => x.post.toString() === id);
      res.json({
        reacts,
        check: check?.react,
        all: reactsArray,
        total: reactsArray.length,
        checkSaved: checkSaved ? true : false,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
};