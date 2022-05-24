const createFormData = (media, body = {}, hasMultiplePhotos = false) => {
  const data = new FormData();
  if (hasMultiplePhotos) {
    media.forEach((item) => {
      data.append("images", {
        name: item.filename,
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? item.uri.replace("file://", "") : item.uri,
      });
    });
  } else {
    data.append("image", {
      name: media.filename,
      type: "image/jpeg",
      uri: Platform.OS === "ios" ? media.uri.replace("file://", "") : media.uri,
    });
  }

  //   data.append(
  //     "photo",
  //     Platform.OS === "ios" ? media.uri.replace("file://", "") : media.uri
  //   );

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default createFormData;
