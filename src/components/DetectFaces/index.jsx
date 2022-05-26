import { useState } from "react";
import { Button, Flex, Image, Text, Heading, ScrollView } from "native-base";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";
import getCroppedImages from "./getCroppedImages";

const DetectFaces = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [croppedImagesData, setCroppedImagesData] = useState([]);

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

  const detectFacesHandler = async () => {
    try {
      if (selectedImage) {
        console.log("SELECTEDIMAGE", selectedImage);

        const data = createFormData(selectedImage);
        console.log("DATA", data);

        const res = await AxiosInstance.post("/detect-faces", data, {
          headers: {
            "Content-Type": `multipart/form-data`,
            transformRequest: (data) => {
              return data;
            },
            responseType: "json",
          },
        });

        setDetectedFaces(res.data);

        const croppedImagesData = await getCroppedImages(
          selectedImage.uri,
          res.data.map(({ faceRectangle }) => {
            const { height, width, left, top } = faceRectangle;
            return {
              height,
              width,
              originX: left,
              originY: top,
            };
          })
        );

        console.log(croppedImagesData);
        setCroppedImagesData(croppedImagesData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {showGalleryImagePicker ? (
        GallerImagePicker
      ) : (
        <ScrollView
          maxW="100%"
          h="80"
          _contentContainerStyle={{
            px: "20px",
            mb: "4",
            minW: "72",
          }}
        >
          <Flex width="100%" height="100%" align="center">
            <Heading>Selected Image</Heading>
            {selectedImage ? (
              <Image
                alt={selectedImage.filename}
                source={{ uri: selectedImage.uri }}
                style={{
                  width: 200,
                  height: 200,
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
            <Button onPress={detectFacesHandler}>Detect Faces</Button>

            {croppedImagesData.map((croppedImage) => (
              <Image
                key={croppedImage.uri}
                alt={croppedImage.uri}
                source={{ uri: croppedImage.uri }}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: "cover",
                }}
              />
            ))}
          </Flex>
        </ScrollView>
      )}
    </>
  );
};

export default DetectFaces;
