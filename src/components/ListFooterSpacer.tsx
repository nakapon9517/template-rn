import React from 'react';
import { View } from 'react-native';

type Props = {
  size?: 'large' | 'normal' | 'footer';
  addHeight?: number;
};
export const ListFooterSpacer = ({ size, addHeight: add = 0 }: Props) => {
  switch (size) {
    case 'large':
      return <View style={{ height: 48 + add }} />;
    case 'normal':
      return <View style={{ height: 24 + add }} />;
    case 'footer':
      return <View style={{ height: 48 + add }} />;
    default:
      return <View style={{ height: 24 + add }} />;
  }
};
