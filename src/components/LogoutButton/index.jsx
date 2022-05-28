import { MaterialIcons } from "@expo/vector-icons";
import { Flex, Button, Text } from "native-base";
import useStore from "../../store/user-store";

const LogoutButton = ({ closeDrawer }) => {
  const logOut = useStore((state) => state.logOut);
  return (
    <Button
      variant="unstyled"
      style={{
        paddingVertical: 10,
        marginHorizontal: 50,
        borderRadius: 30,
        backgroundColor: "#58c8df",
      }}
      onPress={async () => {
        await logOut();
        // closeDrawer();
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
