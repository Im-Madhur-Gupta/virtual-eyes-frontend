import { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Button,
  Flex,
  Image,
  Text,
  useToast,
  Heading,
  FormControl,
  Input,
} from "native-base";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";

const AddFace = () => {
  const toast = useToast();
  const [facename, setFacename] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(true, setSelectedImages, () => {
      console.log("cancelled");
    });

  // change handler functions
  const facenameChangeHandler = (facename) => {
    setFacename(facename);
  };

  const openCameraHandler = () => {
    openCameraImagePicker(setSelectedImages);
  };
  const openGalleryHandler = () => {
    setShowGalleryImagePicker(true);
  };

  const addFaceHandler = () => {
    if (selectedImages.length > 0 && facename) {
      console.log("SELECTEDIMAGES", selectedImages);
      const data = createFormData(
        selectedImages,
        { face_name: facename },
        true
      );
      console.log("DATA", data);
      AxiosInstance.post("/match-face/add-face", data, {
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
          toast.show({ description: "Face will be added shortly." });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex
        width="100%"
        height="100%"
      >
        {showGalleryImagePicker ? (
          GallerImagePicker
        ) : (
          <>
            <FormControl>
              <FormControl.Label>Enter Name</FormControl.Label>
              <Input onChangeText={facenameChangeHandler} value={facename} />
            </FormControl>

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
            <Button onPress={addFaceHandler}>Add Face</Button>
          </>
        )}
      </Flex>
    </SafeAreaView>
  );
};

export default AddFace;
