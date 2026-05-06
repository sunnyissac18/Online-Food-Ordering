const upload_preset =
  process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET ||
  "your_cloudinary_upload_preset";
const cloud_name =
  process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your_cloudinary_cloud_name";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  const res = await fetch(api_url, {
    method: "post",
    body: data,
  });

  const fileData = await res.json();
  console.log(fileData);
  return fileData.url;
};
