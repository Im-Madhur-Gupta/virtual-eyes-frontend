import { useState } from "react";
import {
  Button,
  Flex,
  Image,
  Text,
  Center,
  ScrollView,
  useToast,
} from "native-base";

import globalStyles from "../../layouts/globalStyleSheet";
import MediaAccessibiltyBtns from "../../layouts/MediaAccessiblityBtns";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";
import useStore from "../../store/user-store";

const FindFaces = () => {
  const toast = useToast();

  const setIsLoading = useStore((state) => state.setIsLoading);

  const [selectedImage, setSelectedImage] = useState(null);
  const [foundFacesData, setFoundFacesData] = useState({
    detectedPersons: [],
    message: "",
  });

  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(false, setSelectedImage, () => {
      console.log("cancelled");
    });

  const openCameraHandler = async () => {
    const capturedImage = openCameraImagePicker();
    setSelectedImage(capturedImage);
  };
  const openGalleryHandler = () => {
    setShowGalleryImagePicker(true);
  };

  const findFacesHandler = async () => {
    try {
      if (selectedImage) {
        setIsLoading(true);
        console.log("FindFaces - SELECTEDIMAGE - ", selectedImage);

        const formData = createFormData(selectedImage, "image");
        console.log("FindFaces - DATA - ", formData);

        const response = await AxiosInstance.post(
          "/match-face/find-faces",
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
              transformRequest: (data) => {
                return data;
              },
              responseType: "json",
            },
          }
        );

        console.log("FindFaces - RESPONSE.DATA - ", response.data);
        setIsLoading(false);
        setFoundFacesData(response.data);
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
          <ScrollView
            contentContainerStyle={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Center style={globalStyles.selectedImageContainer}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={globalStyles.selectedImage}
                />
              ) : (
                <Text style={globalStyles.infoText}>
                  Please select an image.
                </Text>
              )}
            </Center>

            <MediaAccessibiltyBtns
              onOpenCamera={openCameraHandler}
              onOpenGallery={openGalleryHandler}
            />

            <Center style={globalStyles.resultContainer}>
              <Text style={globalStyles.infoText}>
                People present in the Image
              </Text>
              {/* Conditional rendering of output content */}
              {foundFacesData.detectedPersons.length > 0 ? (
                <>
                  {foundFacesData.detectedPersons.map((face) => (
                    <Text
                      key={face.id}
                      style={globalStyles.resultText}
                      paddingY={0}
                    >
                      {face.name}
                    </Text>
                  ))}
                </>
              ) : foundFacesData.message !== "" ? (
                <Text style={globalStyles.infoText}>
                  {foundFacesData.message}
                </Text>
              ) : (
                ""
              )}
            </Center>

            <Button onPress={findFacesHandler} style={globalStyles.primaryBtn}>
              <Text style={globalStyles.primaryBtnTxt}>Find People</Text>
            </Button>
          </ScrollView>
        </>
      )}
    </Flex>
  );
};

export default FindFaces;
