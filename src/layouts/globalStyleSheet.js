import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  colors: {
    primary: "#4a304b",
    secondary: "#6a6a6a",
  },
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
    marginTop: 30,
    marginBottom: 15,
    boxSizing: "border-box",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  resultContainer: { width: 350, height: 200 },
  resultText: {
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    textDecorationLine: "underline",
  },
  infoText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#4a304b",
  },
  primaryBtn: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#4a304b",
  },
  primaryBtnTxt: {
    width: "100%",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  secondaryBtn: {
    width: "40%",
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#6a6a6a",
  },
  secondaryBtnTxt: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "white",
    paddingVertical: 5,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default globalStyles;
