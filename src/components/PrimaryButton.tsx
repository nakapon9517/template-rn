import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@/hooks';
import { Color, Colors, FontSize, Layout } from '@/constants';
import { AppTouchableOpacity } from '@/appComponents';

type PrimaryButtonProps = {
  text: string;
  disabled?: boolean;
  leftIcon?: JSX.Element;
  onSubmit: () => void;
};
export const SubmitButton = ({ text, disabled = false, leftIcon, onSubmit }: PrimaryButtonProps) => {
  const { theme } = useTheme();
  return (
    <AppTouchableOpacity
      name="submit"
      disabled={disabled}
      style={[submitStyles.button, { backgroundColor: Colors[theme].submit, opacity: disabled ? 0.4 : 1 }]}
      onPress={onSubmit}
    >
      {leftIcon}
      <Text style={submitStyles.text}>{text}</Text>
    </AppTouchableOpacity>
  );
};

const submitStyles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.isLargeDevice ? 16 : 12,
    borderRadius: 12,
  },
  text: {
    color: Color.brand5,
    fontWeight: 'bold',
    fontSize: FontSize.middle,
  },
});
