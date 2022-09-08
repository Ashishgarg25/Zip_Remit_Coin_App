/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import HamburgerIcon from './icons/HamburgerIcon';
import BellIcon from './icons/BellIcon';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';
import Sidebar from './Sidebar';

const DashboardHeader = ({navigation, firstName, balance, currency}) => {
  const [isVisibleFromDashboard, setIsVisibleFromDashboard] = useState(false);

  const updateSidebarVisibility = data => {
    console.log('=======>', data);
    setIsVisibleFromDashboard(data);
  };

  return (
    <>
      <LinearGradient
        colors={['#303549', '#303549', '#97805D']}
        style={[styles.container, {height: balance !== null ? 300 : 200}]}>
        <SafeAreaView style={styles.logoContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => setIsVisibleFromDashboard(true)}>
              <HamburgerIcon />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.heading}>
              Hi, {firstName}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}>
              <BellIcon />
            </TouchableOpacity>
          </View>

          {balance !== null && (
            <View style={styles.textContainer}>
              <Text style={styles.label}>Balance</Text>
              <Text
                style={
                  styles.amount
                }>{`${balance} ${currency?.toUpperCase()}`}</Text>
            </View>
          )}
        </SafeAreaView>
        <Image
          source={require('../assets/images/Pattern.png')}
          style={[styles.launchImage, {bottom: balance !== null ? 180 : 150}]}
        />
      </LinearGradient>
      <Sidebar
        isVisibleFromDashboard={isVisibleFromDashboard}
        updateVisibility={updateSidebarVisibility}
        navigation={navigation}
      />
    </>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 70,
  },
  launchImage: {
    position: 'relative',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '100%',
  },
  heading: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 28.9,
    color: Colors.WHITE,
    paddingHorizontal: 48,
    width: 260,
    textAlign: 'center',
  },

  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 48,
  },
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 27.2,
    color: Colors.WHITE,
  },
  amount: {
    fontFamily: Fonts.SORA_BOLD,
    fontWeight: '700',
    fontSize: 29,
    lineHeight: 43.5,
    color: Colors.WHITE,
  },
});
