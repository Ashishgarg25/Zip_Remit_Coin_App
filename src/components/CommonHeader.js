/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BackIcon from './icons/BackIcon';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const CommonHeader = props => {
  return (
    <View style={styles.headerContainer}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={{width: 60}}
          onPress={() => props.navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.heading}>{props.title}</Text>
        <View style={{width: 60}} />
      </SafeAreaView>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    backgroundColor: Colors.PRIMARY,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  heading: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 27.2,
    color: Colors.WHITE,
    width: 200,
    textAlign: 'center',
  },
});
