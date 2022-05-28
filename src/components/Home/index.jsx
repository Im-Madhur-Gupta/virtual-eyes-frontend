import { Flex, Heading, Text } from "native-base";
import useStore from "../../store/user-store";

const Home = () => {
  const { email, name } = useStore((state) => ({
    email: state.email,
    name: state.name,
  }));
  return (
    <Flex direction="column">
      <Heading>Virtual Eyes</Heading>
      <Text>An app to help you visualize your images.</Text>
      {name && <Text>Welcome {name}</Text>}
      <Text>Your Email - {email}</Text>
    </Flex>
  );
};

export default Home;
