import axios from "axios";
// import cloudName from './env.js'
// import apiKey from './env.js'
// import apiSecret from './env.js'
// import myUploadPreset from './env.js'

export const cloudinaryUpload = async (imageUri) => {
  const cloudName = "dl9cp8cwq";
  const myUploadPreset = "r0xpswmo";

  try {
    // console.log('Image URI:', imageUri);
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg", // Change the content type as needed
      name: "my_image.jpg",
    });

    formData.append("upload_preset", myUploadPreset); // Replace with your Cloudinary upload preset
    
    // console.log('Uploading to Cloudinary...');
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    // console.log(response.data);
    if (response.status === 200) {
      // console.log('Uploaded to cloudinary')
      return response.data.secure_url;
    } else {
      console.error("Image upload failed");
    }
  } catch (error) {
    console.error("Cloudinary upload error:", JSON.stringify(error));
  }
};

export default cloudinaryUpload;
