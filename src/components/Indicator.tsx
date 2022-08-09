import React, { useMemo } from 'react';
import { ActivityIndicatorProps, StyleSheet, View } from 'react-native';
import { Layout } from '@/constants';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

// const LOTTIE_JSON = require('@/assets/lottie/loader.json');
// const LOTTIE_JSON = require('@/assets/lottie/bouncing-balls.json');
// const LOTTIE_JSON = require('@/assets/lottie/balls-morphing');
const LOTTIE_JSON = require('@/assets/lottie/loader-water-bounce.json');

type Props = {
  loading: boolean;
} & ActivityIndicatorProps;
export const Indicator = (props: Props) => {
  if (!props.loading) return null;

  return useMemo(
    () => (
      <Modal
        isVisible={props.loading}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        swipeDirection={undefined}
      >
        <View style={styles.animationView}>
          <LottieView source={LOTTIE_JSON} autoPlay loop speed={1} resizeMode="contain" />
        </View>
      </Modal>
    ),
    [props],
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationView: {
    width: Layout.window.width / 2,
    height: Layout.window.height,
  },
});
