import { Flex, Heading, Text } from "native-base";
import globalStyles from "../../layouts/globalStyleSheet";
import useStore from "../../store/user-store";
import Animation from "../Animation";

const Home = () => {
  const { email, name } = useStore((state) => ({
    email: state.email,
    name: state.name,
  }));
  return (
    <Flex
      width="100%"
      direction="column"
      align="center"
      justify="center"
      height="100%"
      paddingY={10}
      paddingX={5}
    >
      <Heading
        color={globalStyles.colors.primary}
        fontFamily="Poppins_700Bold"
        fontSize={34}
        textAlign="center"
      >
        Virtual Eyes
      </Heading>

      <Text
        style={{
          ...globalStyles.infoText,
          fontSize: 18,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        A pair of eyes for those who can't see.
      </Text>

      <Animation
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../../assets/animations/onboarding.json")}
      />

      {name && (
        <Text
          style={{
            ...globalStyles.infoText,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Welcome, {name}!
        </Text>
      )}

      <Text
        style={{ ...globalStyles.infoText, fontSize: 18, textAlign: "center" }}
      >
        Your Email - {email}.
      </Text>

      <Text
        style={{
          ...globalStyles.infoText,
          fontSize: 18,
          fontWeight: "700",
          marginTop: 60,
          textAlign: "center",
        }}
      >
        Made with Love ❤️, Respect 🙏 and Passion 👨🏽‍💻.
      </Text>
    </Flex>
  );
};

export default Home;
