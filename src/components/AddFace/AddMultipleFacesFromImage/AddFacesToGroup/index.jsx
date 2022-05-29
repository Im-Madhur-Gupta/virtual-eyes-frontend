import { useState, useRef } from "react";
import useStore from "../../../../store/user-store";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import { KeyboardAvoidingView, Flex, ScrollView, Fab } from "native-base";

import FaceDetailsCard, { SLIDER_WIDTH, ITEM_WIDTH } from "./FaceDetailsCard";

import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../../../../layouts/globalStyleSheet";

const AddFacesToGroup = ({ navigation }) => {
  const detectedFaces = useStore((state) => state.detectedFaces);

  const [index, setIndex] = useState(0);

  const isCarousel = useRef(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
      keyboardVerticalOffset={Dimensions.get("window").height * 0.2}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Flex align="center" justify="center" paddingTop={30}>
            <Carousel
              layout="stack"
              layoutCardOffset={18}
              ref={isCarousel}
              data={detectedFaces}
              renderItem={FaceDetailsCard}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
            />
            <Pagination
              dotsLength={detectedFaces.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: "rgba(0, 0, 0, 0.92)",
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />

            <Fab
              accessibilityLabel="Go Back"
              renderInPortal={false}
              placement="bottom-left"
              bottom={125}
              shadow={2}
              size="sm"
              backgroundColor={globalStyles.colors.primary}
              icon={<Ionicons name="arrow-back" size={20} color="white" />}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </Flex>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default AddFacesToGroup;
