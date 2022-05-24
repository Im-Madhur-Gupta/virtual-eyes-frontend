import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";

const DescribeImage = () => {
  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(true, setSelectedImage, () => {
      console.log("cancelled");
    });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDescription, setImageDescription] = useState(null);

  const openCameraHandler = () => {
    openCameraImagePicker(setSelectedImage);
  };
  const openGalleryHandler = () => {
    setShowGalleryImagePicker(true);
    openGalleryImagePicker(setSelectedImage);
  };

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage);
      // console.log(selectedImage.uri);
      // const data = createFormData(selectedImage);
      // console.log("data", data);
      // AxiosInstance
      //   .post("/visualize-image", data, {
      //     headers: {
      //       "Content-Type": `multipart/form-data`,
      //       transformRequest: (data) => {
      //         return data;
      //       },
      //       responseType: "json",
      //     },
      //   })
      //   .then((res) => {
      //     console.log("DECRIPTION", res.data);
      //     setImageDescription(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [selectedImage]);
  return (
    <View style={styles.container}>
      {showGalleryImagePicker ? (
        <GallerImagePicker />
      ) : (
        <>
          {/* {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.thumbnail} />
        )}
        {imageDescription && (
        <>
        <Text>Description of the image {imageDescription.description}</Text>
          <Text>Confidence {imageDescription.confidence}</Text>
        </>
      )} */}

          <TouchableOpacity
            onPress={openCameraHandler}
            style={{
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "maroon",
            }}
          >
            <Text>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openGalleryHandler}
            style={{
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "maroon",
            }}
          >
            <Text>Open Gallery</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightyellow",
    borderColor: "red",
    borderWidth: 2,
  },
  thumbnail: {
    borderColor: "red",
    borderWidth: 2,
    width: 350,
    height: 350,
    resizeMode: "cover",
  },
});

export default DescribeImage;
