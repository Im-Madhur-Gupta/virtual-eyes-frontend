import { useState } from "react";
import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  Center,
  Flex,
  Text,
  useToast,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";

import AddFaceForm from "../../AddFaceForm";

import MediaAccessibiltyBtns from "../../../layouts/MediaAccessiblityBtns";

import openCameraImagePicker from "../../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../../hooks/useGalleryImagePicker";
import addFaceToPersonGroup from "../../../utils/addFaceToPersonGroup";
import FaceImageCarousel from "./FaceImageCarousel";
import useStore from "../../../store/user-store";

import globalStyles from "../../../layouts/globalStyleSheet";

/**
 * This component will be used to add a single face present in multiple images to a person group.
 *
 * Typically, this will be used to improve the accuracy of the face detection model for the supplied face.
 *
 * Know more about Azure Face API's Person Group {@link https://docs.microsoft.com/en-in/azure/cognitive-services/face/concepts/face-recognition here}.
 *
 * @returns JSX.Element
 */
const AddSingleFaceFromImages = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);
  const toast = useToast();

  const [selectedImages, setSelectedImages] = useState([]);

  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(true, setSelectedImages, () => {
      console.log("cancelled");
    });

  // change handler functions
  const openCameraHandler = async () => {
    const capturedImage = await openCameraImagePicker();
    setSelectedImages([capturedImage]);
  };
  const openGalleryHandler = () => {
    setShowGalleryImagePicker(true);
  };

  const addFaceHandler = async (facename) => {
    if (selectedImages.length > 0 && facename) {
      try {
        setIsLoading(true);
        await addFaceToPersonGroup(selectedImages, facename);
        setIsLoading(false);
        toast.show({ description: "Face will be added shortly." });
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  };
  return (
    <>
      {showGalleryImagePicker ? (
        GallerImagePicker
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
          }}
          keyboardVerticalOffset={Dimensions.get("window").height * 0.2}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <Flex style={globalStyles.flexContainerColumn}>
                <Flex align="center" justify="center" width={450} height={450}>
                  {selectedImages.length > 0 ? (
                    <FaceImageCarousel images={selectedImages} />
                  ) : (
                    <Text style={globalStyles.infoText}>
                      Please select an image.
                    </Text>
                  )}
                </Flex>

                <MediaAccessibiltyBtns
                  onOpenCamera={openCameraHandler}
                  onOpenGallery={openGalleryHandler}
                />

                <AddFaceForm onAddFace={addFaceHandler} />
              </Flex>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default AddSingleFaceFromImages;
