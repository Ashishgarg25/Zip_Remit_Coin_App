import {StyleSheet, SafeAreaView, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../components/icons/Logo';

const Header = () => {
  return (
    <LinearGradient
      colors={['#303549', '#303549', '#97805D']}
      style={styles.container}>
      <SafeAreaView style={styles.logoContainer}>
        <Logo />
      </SafeAreaView>
      <Image
        source={require('../assets/images/Pattern.png')}
        style={styles.launchImage}
      />
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 300,
  },
  logoContainer: {
    marginTop: 120,
  },
  launchImage: {
    position: 'relative',
    width: '100%',
    bottom: 90,
  },
});
