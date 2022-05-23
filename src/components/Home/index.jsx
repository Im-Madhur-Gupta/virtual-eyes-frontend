import { Flex, Heading, Text } from "native-base";
import useStore from "../../store/user-store";

const Home = () => {
  const { email, first_name, last_name } = useStore((state) => ({
    email: state.email,
    first_name: state.first_name,
    last_name: state.last_name,
  }));
  return (
    <Flex direction="column">
      <Heading>Virtual Eyes</Heading>
      <Text>An app to help you visualize your images.</Text>
      {first_name && last_name && <Text>Welcome {first_name + last_name}</Text>}
      <Text>You Email - {email}</Text>
    </Flex>
  );
};

export default Home;
