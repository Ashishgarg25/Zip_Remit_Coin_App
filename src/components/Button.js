/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const Button = ({text, disabled, onPress, width, outline, loading, danger}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          opacity: disabled ? 0.4 : 1,
          width: width,
          backgroundColor: outline
            ? Colors.WHITE
            : danger
            ? Colors.RED
            : Colors.GREEN,
          borderWidth: outline ? 2 : 2,
          borderColor: outline
            ? Colors.PRIMARY
            : danger
            ? Colors.RED
            : Colors.GREEN,
          shadowColor: outline
            ? Colors.WHITE
            : danger
            ? Colors.RED
            : Colors.GREEN,
          shadowOpacity: 0.2,
          shadowRadius: 6,
          shadowOffset: {width: 0, height: 6},
        },
      ]}
      disabled={disabled}
      onPress={onPress}>
      {loading === 'pending' ? (
        <ActivityIndicator
          size="small"
          color={Colors.GREEN}
          style={{paddingVertical: 16}}
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {color: outline ? Colors.PRIMARY : Colors.WHITE},
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 0,
    borderRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    lineHeight: 27.2,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
