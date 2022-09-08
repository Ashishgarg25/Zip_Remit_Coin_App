import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const Tags = ({title, currency, onPress}) => {
  return (
    <TouchableOpacity style={styles.tagContainer} onPress={onPress}>
      <Text style={styles.title}>{`+${title} ${currency}`}</Text>
    </TouchableOpacity>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: Colors.LIGHT_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    margin: 6,
    marginLeft: 0,
    width: 110,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 13,
    color: Colors.BLUE,
    textAlign: 'center',
  },
});
