import { MaterialIcons } from "@expo/vector-icons";
import { Flex, Button, Text } from "native-base";
import globalStyles from "../../layouts/globalStyleSheet";
import useStore from "../../store/user-store";

const LogoutButton = () => {
  const logOut = useStore((state) => state.logOut);
  return (
    <Button
      variant="unstyled"
      style={globalStyles.primaryBtn}
      marginTop={50}
      onPress={async () => {
        await logOut();
      }}
    >
      <Flex direction="row" align="center" justify="center">
        <MaterialIcons name="logout" size={24} color="white" />
        <Text fontSize={18} paddingLeft={2} color="white">
          Logout
        </Text>
      </Flex>
    </Button>
  );
};

export default LogoutButton;
