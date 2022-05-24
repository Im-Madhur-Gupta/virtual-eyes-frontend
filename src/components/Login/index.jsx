import { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Text,
  useToast,
  Flex,
} from "native-base";

import useLoadingSpinner from "../../hooks/useLoadingSpinner";
import AxiosInstance from "../../services/AxiosInstance";
import saveInSecureStorage from "../../utils/saveInSecureStorage";
import useStore from "../../store/user-store";

const Login = () => {
  const toast = useToast();

  const [LoadingSpinner, showLoadingSpinner, setShowLoadingSpinner] =
    useLoadingSpinner("Signing you in");

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

  const loginHandler = () => {
    setShowLoadingSpinner(true);
    AxiosInstance.post(
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
    )
      .then((res) => {
        setShowLoadingSpinner(false);
        console.log(res.data);
        const { email, first_name, last_name, token } = res.data;
        // storing the token in Secure Storage
        saveInSecureStorage("token", token);
        // saving the user details in the global zustand state
        logIn(email, first_name, last_name);
      })
      .catch((err) => {
        setShowLoadingSpinner(false);
        toast.show({
          description:
            "Email or Password you entered don't match, please try again.",
        });
        console.log(err);
      });
  };
  return (
    <Center w="100%">
      <Flex
        direction="column"
        justify="center"
        safeArea
        p="2"
        py="8"
        w="90%"
        maxW="290"
        h="80%"
      >
        {showLoadingSpinner ? (
          LoadingSpinner
        ) : (
          <>
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
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
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={loginHandler}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  href="#"
                >
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </>
        )}
      </Flex>
    </Center>
  );
};

export default Login;
