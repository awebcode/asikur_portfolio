import db from "@/utils/db";
import mongoose from "mongoose";
import Comments from "../../../../models/commentModel";
db();
export default async (req, res) => {
  switch (req.method) {
   
    case "GET":
      await getComments(req, res);
      break;
   
  }
};
const Pagination = (req) => {
 
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};
const getComments = async (req, res) => {
  const { limit, skip } = Pagination(req);

    try {
        const { id } = req.query;
    const data = await Comments.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                blog_id: new mongoose.Types.ObjectId(id),
                comment_root: { $exists: false },
                reply_user: { $exists: false },
              },
            },
            {
              $lookup: {
                from: "users",
                let: { user_id: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  { $project: { name: 1, avatar: 1 } },
                ],
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $lookup: {
                from: "comments",
                let: { cm_id: "$replyCM" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                  {
                    $lookup: {
                      from: "users",
                      let: { user_id: "$user" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                        { $project: { name: 1, avatar: 1 } },
                      ],
                      as: "user",
                    },
                  },
                  { $unwind: "$user" },
                  {
                    $lookup: {
                      from: "users",
                      let: { user_id: "$reply_user" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                        { $project: { name: 1, avatar: 1 } },
                      ],
                      as: "reply_user",
                    },
                  },
                  { $unwind: "$reply_user" },
                ],
                as: "replyCM",
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [
            {
              $match: {
                blog_id: new mongoose.Types.ObjectId(id),
                comment_root: { $exists: false },
                reply_user: { $exists: false },
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$totalCount.count", 0] },
          totalData: 1,
        },
      },
    ]);

    const comments = data[0].totalData;
    const count = data[0].count;

    let total = 0;

    if (count % limit === 0) {
      total = count / limit;
    } else {
      total = Math.floor(count / limit) + 1;
    }

    res.status(200).json({success:true, comments, total });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}