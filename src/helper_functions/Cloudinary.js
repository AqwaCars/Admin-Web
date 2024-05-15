import axios from "axios";

export const cloudinaryUpload = async (file, folderName) => {
  const cloudName = "dl9cp8cwq";
  const myUploadPreset = "aqwa_cars";

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", myUploadPreset);

    // Append the folder name to the formData if it exists
    if (folderName) {
      formData.append("folder", folderName);
    }

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    if (response.status === 200) {
      console.log("Full response from Cloudinary:", response.data);
      return response.data.secure_url;
    } else {
      console.error("Image upload failed");
    }
    
  } catch (error) {
    console.log("Full response from Cloudinary:", error.message);
    console.error("Cloudinary upload error:", JSON.stringify(error));
  }
};
