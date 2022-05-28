import { useState } from "react";
import { Dimensions } from "react-native";
import {
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Flex,
  useToast,
} from "native-base";
import { Link } from "@react-navigation/native";

import authAnimation from "../../assets/animations/auth.json";

import Animation from "../Animation";
import AxiosInstance from "../../services/AxiosInstance";
import useStore from "../../store/user-store";
import LoadingSpinner from "../LoadingSpinner";
import styles from "../../layouts/globalStyleSheet";

const Register = () => {
  const toast = useToast();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

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

  const registerHandler = async () => {
    setShowLoadingSpinner(true);
    try {
      const response = await AxiosInstance.post(
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

      setShowLoadingSpinner(false);

      console.log(response.data);

      // saving the user details in secure store as well as global zustand state
      await logIn(response.data.token, {
        email: response.data.email,
        name: response.data.name,
      });
    } catch (err) {
      setShowLoadingSpinner(false);
      toast.show({
        description: "Something went wrong, please try again.",
      });
      console.log(err);
    }
  };
  return (
    <Flex w="100%">
      <Flex
        style={{
          height: Dimensions.get("window").height / 3,
          backgroundColor: styles.colors.purple,
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
        {showLoadingSpinner ? (
          <LoadingSpinner accessibilityLabel="Signing up" />
        ) : (
          <>
            <Heading
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
                <Input onChangeText={nameChangeHandler} value={name} />
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Email</FormControl.Label>
                <Input onChangeText={emailChangeHandler} value={email} />
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  onChangeText={passwordChangeHandler}
                  value={password}
                  type="password"
                />
              </FormControl>

              <Button mt="2" colorScheme="indigo" onPress={registerHandler}>
                Sign up
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
                    color: styles.colors.purple,
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
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Register;
