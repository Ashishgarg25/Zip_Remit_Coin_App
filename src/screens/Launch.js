import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import LaunchImg from '../components/icons/LaunchImg';
import Logo from '../components/icons/Logo';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
// import Pattern from '../components/icons/Pattern';

const Launch = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#303549', '#DBA84E']} style={styles.container}>
      <View style={styles.mainImg}>
        <LaunchImg />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <Text style={styles.launchText}>
          Community & Low Cost {'\n'} Money Transfer
        </Text>
      </View>
      <Image
        source={require('../assets/images/Pattern.png')}
        style={styles.launchImage}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Onboard')}>
        <Image
          source={require('../assets/images/dollarImg.png')}
          style={styles.dollarImg}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Launch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainImg: {
    marginTop: 112,
    marginHorizontal: 36,
  },
  logoContainer: {
    marginTop: 78,
  },
  launchText: {
    fontSize: 16,
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 22,
    marginHorizontal: 24,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  launchImage: {
    marginTop: 29,
    position: 'relative',
    width: '100%',
    bottom: 0,
    top: 16,
  },
  dollarImg: {
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 64,
    right: -32,
  },
});
