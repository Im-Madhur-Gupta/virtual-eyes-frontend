import { useState } from "react";
import { ImagePicker } from "expo-image-multiple-picker";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather, Entypo } from "@expo/vector-icons";

const WhatsAppHeader = (props) => {
  return (
    <View
      style={{
        paddingTop: 40,
        padding: 10,
        height: 80,
        width: "100%",
        backgroundColor: "#252f39",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {props.view == "album" && (
        <Text style={{ color: "white", fontSize: 20 }}>Select an album</Text>
      )}
      {props.view == "gallery" && (
        <>
          <TouchableOpacity onPress={props.goToAlbum}>
            <Ionicons name="arrow-back" size={30} color="#EDF8F5" />
          </TouchableOpacity>
          {props.imagesPicked > 0 && (
            <>
              <Text style={{ color: "white", fontSize: 20 }}>
                {props.imagesPicked} selected
              </Text>
              <TouchableOpacity onPress={props.save}>
                <Text style={{ color: "white", fontSize: 16 }}>OK</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

const WhatsAppAlbum = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.goToGallery(props.album)}
      style={{ flex: 1, height: 200 }}
    >
      <Image
        source={{ uri: props.thumb.uri }}
        style={{ width: "100%", height: "100%" }}
        blurRadius={10}
      ></Image>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ padding: 5, flexDirection: "row" }}>
          <Entypo name="folder" color="white" size={16} />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginLeft: 5,
            }}
          >
            {props.album.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const WhatsAppCheck = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <Feather color="white" name="check" size={32} />
    </View>
  );
};

function useGalleryImagePicker(allowMultipleSelection, onSave, onCancel) {
  const [showGalleryImagePicker, setShowGalleryImagePicker] = useState(false);

  const onSaveHandler = (assets) => {
    if (allowMultipleSelection) {
      onSave(
        assets.map((asset) => ({
          uri: asset.uri,
          filename: asset.filename,
        }))
      );
    } else {
      onSave({
        uri: assets[0].uri,
        filename: assets[0].filename,
      });
    }
    setShowGalleryImagePicker(false);
  };

  const onCancelHandler = () => {
    onCancel();
    setShowGalleryImagePicker(false);
  };

  return [
    showGalleryImagePicker,
    setShowGalleryImagePicker,
    <ImagePicker
      theme={{
        header: WhatsAppHeader,
        album: WhatsAppAlbum,
        check: WhatsAppCheck,
      }}
      onSave={onSaveHandler}
      onCancel={onCancelHandler}
      galleryColumns={3}
      multiple={allowMultipleSelection}
    />,
  ];
}

export default useGalleryImagePicker;
