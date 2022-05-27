import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flexContainerColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  selectedImageContainer: {
    width: 350,
    height: 350,
    marginTop: 10,
    marginBottom: 15,
    boxSizing: "border-box",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  resultContainer: { width: 350, height: 100 },
});

export default styles;
