import { useState, useRef } from "react";
import useStore from "../../../../store/user-store";
import Carousel, { Pagination } from "react-native-snap-carousel";

import FaceDetailsCard, { SLIDER_WIDTH, ITEM_WIDTH } from "./FaceDetailsCard";

import { Flex } from "native-base";

const AddFacesToGroup = () => {
  const detectedFaces = useStore((state) => state.detectedFaces);
  const [index, setIndex] = useState(0);

  const isCarousel = useRef(null);

  return (
    <Flex align="center" justify="center" padding="50">
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
    </Flex>
  );
};
export default AddFacesToGroup;
