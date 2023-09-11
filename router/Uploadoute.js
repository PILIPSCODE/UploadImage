import express from "express";
import path from "path";

const router = express.Router();


router.post("/Upload",(req,res) => {
   
    if(req.files === null) return res.status(400).json({msg:"missing files"})
    const file = req.files.image
    const fileSize = file.size
    const ext = path.extname(file.name)
    const filename = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    const allowedType = ['.png','.jpg','.jpeg','.mp4'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"invalid Image type"})
    if(fileSize > 5000000) return res.status(422).json({msg:"file bigger than 5mb"})

    file.mv(`./public/images/${filename}`, async (err) => {
        try {
            if(err) return res.status(500).json({msg:err});
            return res.status(200).json(url)
        } catch (error) {
            console.log(error)
        }
    })
})


export default router;