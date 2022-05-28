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
  useToast,
  Flex,
} from "native-base";
import { Link } from "@react-navigation/native";

import AxiosInstance from "../../services/AxiosInstance";
import useStore from "../../store/user-store";
import Animation from "../Animation";
import styles from "../../layouts/globalStyleSheet";
import authAnimation from "../../assets/animations/auth.json";

const Login = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);
  const toast = useToast();

  const logIn = useStore((state) => state.logIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // change handler functions
  const emailChangeHandler = (email) => {
    setEmail(email);
  };
  const passwordChangeHandler = (password) => {
    setPassword(password);
  };

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.post(
        "/login",
        JSON.stringify({
          email,
          password,
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
        description: "Entered Email or Password don't match, please try again.",
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
        <Heading
          size="lg"
          textAlign="center"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Login
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input onChangeText={emailChangeHandler} value={email} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChangeText={passwordChangeHandler}
              value={password}
              type="password"
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={loginHandler}>
            Sign in
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
              I'm a new user.
            </Text>
            <Link
              to={{ screen: "Signup" }}
              style={{
                color: styles.colors.purple,
                fontWeight: "500",
                fontSize: 16,
                textDecorationLine: "underline",
              }}
              href="#"
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Login;
