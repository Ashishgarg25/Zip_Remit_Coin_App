import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Check from './icons/Check';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const CommonCheck = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.setChecked(!props.checked);
      }}>
      <View
        style={[
          styles.checkContainer,
          {backgroundColor: !props.checked ? Colors.GREY : Colors.GREEN},
        ]}>
        <Check />
      </View>
      <Text style={styles.checkboxText}>
        {props.text1}
        <Text style={styles.text}>{props.text2}</Text>
        <Text style={styles.text}>{props.text3}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default CommonCheck;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 16,
  },
  text: {
    fontWeight: '400',
    fontFamily: Fonts.SORA_REGULAR,
    color: Colors.ORANGE,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 64,
    padding: 7,
  },
  checkboxText: {
    fontWeight: '400',
    fontFamily: Fonts.SORA_REGULAR,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.DARK_BLUE,
    paddingLeft: 8,
  },
});
