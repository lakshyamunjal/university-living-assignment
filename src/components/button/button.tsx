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
}

const Button: React.FC<IButtonProps> = props => {
  const {text, handlePress, textStyle = {}, containerStyle = {}} = props;

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export {Button};
