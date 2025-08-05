const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const fileUpload = require('../service/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
    try {
        const file = req.file;
        console.log('File received 👍', file);

        const base64Image = Buffer.from(file.buffer).toString('base64');
        const caption = await generateCaption(base64Image);
        const result = await fileUpload(file.buffer, `${uuidv4()}`);

        const post = await postModel.create({
            caption: caption,
            Image: result.url,
            user: req.user._id, // assuming user is attached to req by auth middleware
        });

        res.status(201).json({
            message: "Post created successfully",
            post,
        });

        console.log(result);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createPostController };
