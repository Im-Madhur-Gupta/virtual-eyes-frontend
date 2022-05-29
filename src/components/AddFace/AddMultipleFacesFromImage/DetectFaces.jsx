import { useState } from "react";
import { Button, Flex, Image, Text, Center, useToast } from "native-base";

import MediaAccessibiltyBtns from "../../../layouts/MediaAccessiblityBtns";

import globalStyles from "../../../layouts/globalStyleSheet";

import axiosInstance from "../../../services/AxiosInstance.js.temp";
import createFormData from "../../../utils/createFormData";
import openCameraImagePicker from "../../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../../hooks/useGalleryImagePicker";
import getCroppedImage from "../../../utils/getCroppedImage";
import useStore from "../../../store/user-store";

const DetectFaces = ({ navigation }) => {
  const toast = useToast();

  const setIsLoading = useStore((state) => state.setIsLoading);
  const setDetectedFaces = useStore((state) => state.setDetectedFaces);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(false, setSelectedImage, () => {
      console.log("cancelled");
    });

  const openCameraHandler = async () => {
    const capturedImage = await openCameraImagePicker();
    setSelectedImage(capturedImage);
  };
  const openGalleryHandler = () => {
    setShowGalleryImagePicker(true);
  };

  const detectFacesHandler = async () => {
    try {
      if (selectedImage) {
        setIsLoading(true);

        console.log("DetectFaces - SELECTED IMAGE - ", selectedImage);

        const formData = createFormData(selectedImage, "image");
        console.log("DetectFaces - FORM DATA - ", formData);

        const res = await axiosInstance.post("/detect-faces", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            transformRequest: (data) => {
              return data;
            },
            responseType: "json",
          },
        });

        // res.data.map(async ()=>{...}) returns an array of Promise Objects
        // So, to handle all of the promises I had to use Promise.all()
        const detectedFaces = await Promise.all(
          res.data.map(async (face) => {
            const { height, width, left, top } = face.faceRectangle;
            return {
              ...face,
              cropData: await getCroppedImage(selectedImage.uri, {
                height,
                width,
                originX: left,
                originY: top,
              }),
            };
          })
        );

        setIsLoading(false);
        setDetectedFaces(detectedFaces);
        navigation.navigate("AddFacesToGroup");
      }
    } catch (err) {
      setIsLoading(false);
      toast.show({
        description: "Something went wrong, please try again.",
      });
      console.log(err);
    }
  };
  return (
    <Flex style={globalStyles.flexContainerColumn}>
      {showGalleryImagePicker ? (
        GallerImagePicker
      ) : (
        <>
          <Center style={globalStyles.selectedImageContainer}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                style={globalStyles.selectedImage}
              />
            ) : (
              <Text style={globalStyles.infoText}>Please select an image.</Text>
            )}
          </Center>

          <MediaAccessibiltyBtns
            onOpenCamera={openCameraHandler}
            onOpenGallery={openGalleryHandler}
          />

          <Button onPress={detectFacesHandler} style={globalStyles.primaryBtn}>
            <Text style={globalStyles.primaryBtnTxt}>Extract Faces</Text>
          </Button>
        </>
      )}
    </Flex>
  );
};

export default DetectFaces;
