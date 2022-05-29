import { Box, Flex, Text } from "native-base";
import Animation from "../Animation";

import globalStyles from "../../layouts/globalStyleSheet";

const AddFaceSubtitle = ({ styles }) => {
  return (
    <Box>
      <Box>
        <Flex style={styles.subtitleStepContainer}>
          <Text style={styles.subtitleStepHead}>Step 1 -</Text>
          <Text style={styles.subtitleStepText}>Select an image.</Text>
        </Flex>

        <Flex style={styles.subtitleStepContainer}>
          <Text style={styles.subtitleStepHead}>Step 2 -</Text>
          <Text style={styles.subtitleStepText}>
            Identify people using a description of their faces.
          </Text>
        </Flex>

        <Flex style={styles.subtitleStepContainer}>
          <Text style={styles.subtitleStepHead}>Step 3 -</Text>
          <Text style={styles.subtitleStepText}>
            Add the identified people to your Group.
          </Text>
        </Flex>
      </Box>

      <Text
        color={globalStyles.colors.primary}
        fontFamily="Poppins_700Bold"
        paddingY={2}
        fontSize={20}
        textAlign="center"
      >
        OR
      </Text>

      <Box>
        <Flex style={styles.subtitleStepContainer}>
          <Text style={styles.subtitleStepHead}>Step 1 -</Text>
          <Text style={styles.subtitleStepText}>
            Select multiple images of a person.
          </Text>
        </Flex>

        <Flex style={styles.subtitleStepContainer}>
          <Text style={styles.subtitleStepHead}>Step 2 -</Text>
          <Text style={styles.subtitleStepText}>
            Add the person to your Group.
          </Text>
        </Flex>
      </Box>

      <Text
        color={globalStyles.colors.primary}
        fontFamily="Poppins_700Bold"
        paddingTop={6}
        fontSize={20}
        textAlign="center"
      >
        Voila! It's done!
      </Text>

      <Flex align="center" justify="center">
        <Animation
          style={{
            width: 300,
            height: 300,
          }}
          source={require("../../assets/animations/add-face.json")}
        />
      </Flex>
    </Box>
  );
};

export default AddFaceSubtitle;
