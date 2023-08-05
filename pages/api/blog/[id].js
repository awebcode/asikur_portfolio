import { blog } from "@/models/blogModel";

import db from "@/utils/db";

db();

export default async (req, res) => {
  switch (req.method) {
  
    
    case "PUT":
      await update(req, res);
      break;
    case "DELETE":
      try {
        const { id } = req.query;

        const Blog = await blog.findById(id);
        await Blog.deleteOne();
        return res.status(200).json({ success: true, msg: "Blog Deleted Successfully" });
      } catch (error) {
        return res.status(500).json({ success: false, msg: error.msg });
      }
  }
};
const update = async(req, res) => {
  try {
        const {id} = req.query
        const {title, desc,tag, category, images} = req.body

        // if(!title || !desc || !tag  || category || images.length === 0)
        // return res.status(400).json({err: 'Please add all the fields.'})

        await blog.findOneAndUpdate({_id: id}, {
            title: title.toLowerCase(), desc, tag,   category, images
        })

        res.json({msg: 'Success! Updated a product'})
      } catch (err) {
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
  
}
