const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function fileUpload(file, filename) {
    try {
        const response = await imagekit.upload({
            file: file,         // required
            fileName: filename, // required
            folder:"social-media-project"
        });
        return response;
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error; // propagate the error so caller can handle it
    }
}

module.exports = fileUpload;
