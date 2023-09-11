import express from "express";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import UploadRouter from "./router/Uploadoute.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(expressFileUpload())
app.use(express.static("public"))
app.use(UploadRouter)

app.listen(5000,() => {
    console.log("server running on port " + 5000);
});
