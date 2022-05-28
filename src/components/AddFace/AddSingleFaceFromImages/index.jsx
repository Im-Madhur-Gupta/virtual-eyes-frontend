import { useState } from "react";
import { Button, Flex, Text, useToast, Heading } from "native-base";

import AddFaceForm from "../../AddFaceForm";

import MediaAccessibiltyBtns from "../../../layouts/MediaAccessiblityBtns";
import styles from "../../../layouts/globalStyleSheet";

import openCameraImagePicker from "../../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../../hooks/useGalleryImagePicker";
import addFaceToPersonGroup from "../../../utils/addFaceToPersonGroup";
import FaceImageCarousel from "./FaceImageCarousel";
import LoadingSpinner from "../../LoadingSpinner";
import useStore from "../../../store/user-store";

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
  const openCameraHandler = () => {
    openCameraImagePicker(setSelectedImages);
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
    <Flex width="100%" height="100%">
      {showGalleryImagePicker ? (
        GallerImagePicker
      ) : (
        <>
          <Heading>Selected Images</Heading>

          {selectedImages.length > 0 ? (
            <FaceImageCarousel images={selectedImages} />
          ) : (
            <Text>You havent selected any images yet.</Text>
          )}

          <MediaAccessibiltyBtns
            onOpenCamera={openCameraHandler}
            onOpenGallery={openGalleryHandler}
          />

          <AddFaceForm onAddFace={addFaceHandler} />
        </>
      )}
    </Flex>
  );
};

export default AddSingleFaceFromImages;
