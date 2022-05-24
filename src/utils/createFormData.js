const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("image", {
    name: photo.filename,
    type: "image/jpeg",
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  //   data.append(
  //     "photo",
  //     Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri
  //   );

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default createFormData;
