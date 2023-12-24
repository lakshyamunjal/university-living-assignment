import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {styles} from './button.styles';

interface IButtonProps {
  text: string;
  handlePress: () => void;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = props => {
  const {
    text,
    handlePress,
    textStyle = {},
    containerStyle = {},
    disabled = false,
  } = props;

  const touchableStyle = [styles.container, containerStyle];

  if (disabled) {
    touchableStyle.push(styles.disabled);
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={touchableStyle}
      onPress={handlePress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export {Button};
