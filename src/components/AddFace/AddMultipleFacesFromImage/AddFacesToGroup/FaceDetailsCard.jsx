import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image, Text, useToast } from "native-base";

import useStore from "../../../../store/user-store";

import AddFaceForm from "../../../AddFaceForm";
import addFaceToPersonGroup from "../../../../utils/addFaceToPersonGroup";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const FaceDetailsCard = ({ item: face, index }) => {
  const setIsLoading = useStore.getState().setIsLoading;
  // const toast = useToast();

  // Parsing the face attributes so that it can be displayed to the user
  const ageTextComponent = (
    <Text style={styles.body}>{"Age: " + face.faceAttributes.age}</Text>
  );

  // Get the accessories of the face
  const accessories = face.faceAttributes.accessories
    .map((accessory) => accessory.type)
    .join();
  const accessoriesTextComponent = (
    <Text style={styles.body}>
      {accessories.length !== 0
        ? "Accessories: " + accessories
        : "No accessories detected."}
    </Text>
  );

  // Get emotion on the face
  let emotions = "";
  let emotion_threshold = 0.8;
  if (face.faceAttributes.emotion.anger > emotion_threshold) {
    emotions += "anger, ";
  }
  if (face.faceAttributes.emotion.contempt > emotion_threshold) {
    emotions += "contempt, ";
  }
  if (face.faceAttributes.emotion.disgust > emotion_threshold) {
    emotions += "disgust, ";
  }
  if (face.faceAttributes.emotion.fear > emotion_threshold) {
    emotions += "fear, ";
  }
  if (face.faceAttributes.emotion.happiness > emotion_threshold) {
    emotions += "happiness, ";
  }
  if (face.faceAttributes.emotion.neutral > emotion_threshold) {
    emotions += "neutral, ";
  }
  if (face.faceAttributes.emotion.sadness > emotion_threshold) {
    emotions += "sadness, ";
  }
  if (face.faceAttributes.emotion.surprise > emotion_threshold) {
    emotions += "surprise, ";
  }
  const emotionsTextComponent = (
    <Text style={styles.body}>
      {emotions.length > 0
        ? "Emotions: " + emotions.slice(0, -2)
        : "No emotions detected."}
    </Text>
  );

  // Get info regarding facial hairs
  const facialHairTextComponent = (
    <Text style={styles.body}>
      {face.faceAttributes.facialHair.moustache +
        face.faceAttributes.facialHair.beard +
        face.faceAttributes.facialHair.sideburns >
      0 >
      0
        ? "FacialHair: Yes"
        : "FacialHair: No"}
    </Text>
  );

  // Get info regarding glasses
  const glassesTextComponent = (
    <Text style={styles.body}>{"Glasses: " + face.faceAttributes.glasses}</Text>
  );

  // Get info regarding hair
  let color = "";
  if (face.faceAttributes.hair.hairColor.length === 0) {
    if (face.faceAttributes.hair.invisible) {
      color = "Invisible";
    } else {
      color = "Bald";
    }
  } else {
    color = "Unknown";
    let highest_confidence = 0.9;
    face.faceAttributes.hair.hairColor.forEach((hair_color) => {
      if (hair_color.confidence > highest_confidence) {
        highest_confidence = hair_color.confidence;
        color = hair_color.color;
      }
    });
  }
  const hairTextComponent = <Text style={styles.body}>{"Hair: " + color}</Text>;

  const addFaceHandler = async (facename) => {
    const uri = face.cropData.uri;

    // obtaining the filename from uri
    const filename = uri.substring(uri.lastIndexOf("/") + 1);

    if (uri && facename) {
      try {
        setIsLoading(true);
        await addFaceToPersonGroup({ filename, uri }, facename, false);
        // toast.show({ description: "Face will be added shortly." });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: face.cropData.uri }} style={styles.image} />

      <AddFaceForm onAddFace={addFaceHandler} />

      {/* Face describing components start from here */}
      {ageTextComponent}
      {accessoriesTextComponent}
      {emotionsTextComponent}
      {facialHairTextComponent}
      {glassesTextComponent}
      {hairTextComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default FaceDetailsCard;
