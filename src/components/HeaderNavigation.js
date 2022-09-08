/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BackIcon from './icons/BackIcon';

const Header = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <BackIcon />
        </TouchableOpacity>
        <Text>{props.title}</Text>
        <View style={{width: 50}} />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 150,
  },
});
