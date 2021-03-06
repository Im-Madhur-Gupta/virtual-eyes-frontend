import { useState } from "react";
import { Button, Flex, FormControl, Input, Text, useToast } from "native-base";
import globalStyles from "../../layouts/globalStyleSheet";

const AddFaceForm = ({ onAddFace, containerPaddingY = 3 }) => {
  const toast = useToast();

  const [facename, setFacename] = useState("");

  const facenameChangeHandler = (facename) => {
    setFacename(facename);
  };

  return (
    <Flex align="center" justify="center" paddingY={containerPaddingY}>
      <FormControl isRequired>
        <FormControl.Label>
          <Text style={globalStyles.infoText}>Enter Name</Text>
        </FormControl.Label>
        <Input
          placeholder="Enter Name"
          placeholderTextColor="#f2f2f2"
          onChangeText={facenameChangeHandler}
          value={facename}
          width="80%"
          marginBottom={5}
        />
      </FormControl>
      <Button
        onPress={() => onAddFace(facename, toast)}
        style={globalStyles.primaryBtn}
      >
        <Text style={globalStyles.primaryBtnTxt}>Add Person</Text>
      </Button>
    </Flex>
  );
};

export default AddFaceForm;
