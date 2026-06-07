const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "e-commerce",
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    const error = new Error("Failed to upload image to Cloudinary");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { uploadToCloudinary };
