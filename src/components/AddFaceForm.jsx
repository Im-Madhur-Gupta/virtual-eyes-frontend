import { useState } from "react";
import { Button, Flex, FormControl, Input } from "native-base";

const AddFaceForm = ({ onAddFace }) => {
  const [facename, setFacename] = useState("");

  const facenameChangeHandler = (facename) => {
    setFacename(facename);
  };
  
  return (
    <Flex>
      <FormControl>
        <FormControl.Label>Enter Name</FormControl.Label>
        <Input onChangeText={facenameChangeHandler} value={facename} />
      </FormControl>
      <Button onPress={() => onAddFace(facename)}>Add Face</Button>
    </Flex>
  );
};

export default AddFaceForm;
