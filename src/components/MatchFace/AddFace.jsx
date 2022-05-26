import { useState } from "react";
import { Button, Flex, Image, Text, useToast, Heading } from "native-base";

import AddFaceForm from "../AddFaceForm";

import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";
import addFaceToPersonGroup from "../../utils/addFaceToPersonGroup";

const AddFace = () => {
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
        await addFaceToPersonGroup(selectedImages, facename);
        toast.show({ description: "Face will be added shortly." });
      } catch (err) {
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
            selectedImages.map((image) => (
              <Image
                key={image.uri}
                source={{ uri: image.uri }}
                alt={image.filename}
                style={{
                  borderColor: "red",
                  borderWidth: 2,
                  width: 200,
                  height: 200,
                  resizeMode: "cover",
                }}
              />
            ))
          ) : (
            <Text>You havent selected any images yet.</Text>
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

          <AddFaceForm onAddFace={addFaceHandler} />
        </>
      )}
    </Flex>
  );
};

export default AddFace;
