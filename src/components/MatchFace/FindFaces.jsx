import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, Flex, Image, Text, Heading } from "native-base";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";

const FindFaces = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(false, setSelectedImage, () => {
      console.log("cancelled");
    });

  const openCameraHandler = () => {
    openCameraImagePicker(setSelectedImage);
  };
  const openGalleryHandler = () => {
    setShowGalleryImagePicker(true);
  };

  const findFacesHandler = () => {
    if (selectedImage) {
      console.log("SELECTEDIMAGE", selectedImage);
      const data = createFormData(selectedImage, "image");
      console.log("DATA", data);
      AxiosInstance.post("/match-face/find-faces", data, {
        headers: {
          "Content-Type": `multipart/form-data`,
          transformRequest: (data) => {
            return data;
          },
          responseType: "json",
        },
      })
        .then((res) => {
          console.log("DECRIPTION", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex width="100%" height="100%">
        {showGalleryImagePicker ? (
          GallerImagePicker
        ) : (
          <>
            <Heading>Selected Images</Heading>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                style={{
                  borderColor: "red",
                  borderWidth: 2,
                  width: 350,
                  height: 350,
                  resizeMode: "cover",
                }}
              />
            ) : (
              <Text>You havent selected any image yet.</Text>
            )}

            <Flex direction="row">
              <Button
                onPress={openCameraHandler}
                style={{
                  margin: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "maroon",
                }}
              >
                <Text>Open Camera</Text>
              </Button>

              <Button
                onPress={openGalleryHandler}
                style={{
                  margin: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "maroon",
                }}
              >
                <Text>Open Gallery</Text>
              </Button>
            </Flex>
            <Button onPress={findFacesHandler}>Find Faces</Button>
          </>
        )}
      </Flex>
    </SafeAreaView>
  );
};

export default FindFaces;
