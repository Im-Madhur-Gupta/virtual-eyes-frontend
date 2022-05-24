import { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";

import useLoadingSpinner from "../../hooks/useLoadingSpinner";
import AxiosInstance from "../../services/AxiosInstance";
import saveInSecureStorage from "../../utils/saveInSecureStorage";
import useStore from "../../store/user-store";

const Register = () => {
  const [LoadingSpinner, showLoadingSpinner, setShowLoadingSpinner] =
    useLoadingSpinner("Signing you in");

  const logIn = useStore((state) => state.logIn);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // change handler functions
  const firstnameChangeHandler = (firstname) => {
    setFirstname(firstname);
  };
  const lastnameChangeHandler = (lastname) => {
    setLastname(lastname);
  };
  const emailChangeHandler = (email) => {
    setEmail(email);
  };
  const passwordChangeHandler = (password) => {
    setPassword(password);
  };

  const registerHandler = () => {
    setShowLoadingSpinner(true);
    AxiosInstance.post(
      "/register",
      JSON.stringify({
        email,
        password,
        first_name: firstname,
        last_name: lastname,
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
          description: "Something went wrong, please try again.",
        });
        console.log(err);
      });
  };
  return (
    <Center w="100%">
      <Box
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
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl isRequired>
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  onChangeText={firstnameChangeHandler}
                  value={firstname}
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>Last Name</FormControl.Label>
                <Input onChangeText={lastnameChangeHandler} value={lastname} />
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
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={registerHandler}>
                Sign up
              </Button>
            </VStack>
          </>
        )}
      </Box>
    </Center>
  );
};

export default Register;
