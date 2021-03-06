import { useState } from "react";
import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  KeyboardAvoidingView,
  Heading,
  VStack,
  FormControl,
  Button,
  HStack,
  Text,
  useToast,
  Flex,
  ScrollView,
} from "native-base";
import { TextInput } from "react-native";
import { Link } from "@react-navigation/native";

import authAnimation from "../../assets/animations/auth.json";

import Animation from "../Animation";
import axiosInstance from "../../services/axiosInstance.js";
import useStore from "../../store/user-store";
import styles from "../../layouts/globalStyleSheet";
import globalStyles from "../../layouts/globalStyleSheet";

const Register = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);
  const toast = useToast();

  const logIn = useStore((state) => state.logIn);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // change handler functions
  const nameChangeHandler = (enteredName) => {
    setName(enteredName);
  };
  const emailChangeHandler = (email) => {
    setEmail(email);
  };
  const passwordChangeHandler = (password) => {
    setPassword(password);
  };

  const signupHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/register",
        JSON.stringify({
          email,
          password,
          name,
        }),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );

      console.log(response.data);

      // saving the user details in secure store as well as global zustand state
      await logIn(response.data.token, {
        email: response.data.email,
        name: response.data.name,
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.show({
        description: "Something went wrong, please try again.",
      });
      console.log(err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
      keyboardVerticalOffset={Dimensions.get("window").height * 0.03}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Flex w="100%">
            <Flex
              style={{
                height: Dimensions.get("window").height / 3,
                backgroundColor: styles.colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animation
                source={authAnimation}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            </Flex>
            <Flex
              direction="column"
              justify="center"
              safeArea
              px="10"
              py="8"
              w="100%"
            >
              <Heading
                fontFamily="Poppins_700Bold"
                size="lg"
                textAlign="center"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                fontWeight="semibold"
              >
                Sign Up
              </Heading>
              <VStack space={3} mt="5">
                <FormControl isRequired>
                  <FormControl.Label>Name</FormControl.Label>
                  <TextInput
                    accessibilityLabel="name"
                    style={globalStyles.input}
                    onChangeText={nameChangeHandler}
                    value={name}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormControl.Label>Email ID</FormControl.Label>
                  <TextInput
                    accessibilityLabel="Email ID"
                    style={globalStyles.input}
                    onChangeText={emailChangeHandler}
                    value={email}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormControl.Label>Password</FormControl.Label>
                  <TextInput
                    accessibilityLabel="Password"
                    style={globalStyles.input}
                    onChangeText={passwordChangeHandler}
                    value={password}
                    textContentType="password"
                  />
                </FormControl>

                <Button style={globalStyles.primaryBtn} onPress={signupHandler}>
                  <Text style={globalStyles.primaryBtnTxt}>Sign up</Text>
                </Button>

                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="md"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    paddingRight="2"
                  >
                    Already a user?
                  </Text>
                  <Link
                    to={{ screen: "Login" }}
                    style={{
                      color: styles.colors.primary,
                      fontWeight: "500",
                      fontSize: 16,
                      textDecorationLine: "underline",
                    }}
                    href="#"
                  >
                    Login
                  </Link>
                </HStack>
              </VStack>
            </Flex>
          </Flex>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
