import postReactModel from "@/models/ReactModel/ProductReactModel";
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    

    case "GET":
      await getReactsUnauth(req, res);
      break;
  }
};

//un auth get
const getReactsUnauth = async (req, res) => {
  try {
    const { id } = req.query;
    const reactsArray = await postReactModel.find({ postRef: id }).populate("reactBy");

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
    res.json({
      reacts,
      total: reactsArray.length,
      all: reactsArray,
    });
  } catch (error) {
    console.log("reactPost Unauth",error)
    return res.status(500).json({ message: error.message });
  }
};
