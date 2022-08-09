import { Component, ReactNode } from 'react';
import {
  Keyboard,
  LayoutAnimation as DefaultLayoutAnimation,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

const LayoutAnimation: any = DefaultLayoutAnimation;

export interface KeyboardSpacerProps {
  topSpacing?: number | undefined;
  onToggle?: ((keyboardIsOpen: boolean, keyboardSpace: number) => void) | undefined;
  style?: StyleProp<ViewStyle> | undefined;
}

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

export class KeyboardSpacer extends Component<KeyboardSpacerProps, any> {
  private _listeners: any;

  constructor(props: any) {
    super(props);
    this.state = {
      keyboardSpace: 0,
      isKeyboardOpened: false,
    };
    this._listeners = null;
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  componentDidMount() {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace),
    ];
  }

  componentWillUnmount() {
    this._listeners.forEach((listener: any) => listener.remove());
  }

  updateKeyboardSpace(event: any) {
    if (!event.endCoordinates) {
      return;
    }

    let animationConfig: any = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    const screenHeight = Dimensions.get('window').height;
    const keyboardSpace = screenHeight - event.endCoordinates.screenY + (this.props.topSpacing || 0);
    this.setState(
      {
        keyboardSpace,
        isKeyboardOpened: true,
      },
      () => {
        if (this.props.onToggle) this.props.onToggle(true, keyboardSpace);
      },
    );
  }

  resetKeyboardSpace(event: any) {
    let animationConfig: any = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    this.setState(
      {
        keyboardSpace: 0,
        isKeyboardOpened: false,
      },
      () => {
        if (this.props.onToggle) this.props.onToggle(false, 0);
      },
    );
  }

  render(): ReactNode {
    return <View style={[styles.container, { height: this.state.keyboardSpace }, this.props.style]} />;
  }
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});
