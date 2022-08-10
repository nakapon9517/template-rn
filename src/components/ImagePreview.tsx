import { Layout } from '@/constants';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  uri?: string;
  onClose: () => void;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);
// const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

export const ImagePreview = (props: Props) => {
  const scale = useSharedValue(1);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  const source = useMemo(() => {
    return { uri: props.uri };
  }, [props]);

  const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <AnimatedView style={{ flex: 1, backgroundColor: 'yellow' + '1a' }}>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <AnimatedView style={[animatedStyle]}>
            <AnimatedImage style={[styles.image, animateStyle]} source={source} />
          </AnimatedView>
        </PinchGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Layout.window.width,
    height: 'auto',
    aspectRatio: 1,
  },
});
