import { useState, useRef } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";

import FaceImageCard, { SLIDER_WIDTH, ITEM_WIDTH } from "./FaceImageCard";
import { Flex } from "native-base";

const FaceImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <>
      <Carousel
        layout="stack"
        layoutCardOffset={18}
        ref={isCarousel}
        data={images}
        renderItem={FaceImageCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={images.length}
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
        // paddingBottom={0}
      />
    </>
  );
};

export default FaceImageCarousel;
