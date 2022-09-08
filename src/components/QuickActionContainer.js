/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';
import SendIcon from './icons/SendIcon';
import FundIcon from './icons/FundIcon';
import TopupIcon from './icons/TopupIcon';
import ScheduleIcon from './icons/ScheduleIcon';

const QuickActionContainer = ({
  navigation,
  user,
  setShowVerification,
  setShowKyc,
}) => {
  const actions = [
    {
      image: (
        <View style={[styles.iconContainer, {backgroundColor: Colors.BLUE}]}>
          <SendIcon />
        </View>
      ),
      text: 'Send',
    },
    {
      image: (
        <View style={[styles.iconContainer, {backgroundColor: Colors.GREEN}]}>
          <FundIcon />
        </View>
      ),
      text: 'Fund',
    },
    {
      image: (
        <View style={[styles.iconContainer, {backgroundColor: Colors.ORANGE}]}>
          <TopupIcon />
        </View>
      ),
      text: 'Topup',
    },
    {
      image: (
        <View style={[styles.iconContainer, {backgroundColor: Colors.RED}]}>
          <View style={{position: 'relative', left: 2, top: 2}}>
            <ScheduleIcon />
          </View>
        </View>
      ),
      text: 'Schedule',
    },
  ];

  const routePage = idx => {
    if (user.is_phone_verified) {
      if (user.is_standard_kyc || user.is_advance_kyc) {
        idx === 0
          ? navigation.navigate('SendMoney')
          : idx === 1
          ? navigation.navigate('FundWallet')
          : idx === 2
          ? navigation.navigate('Topup')
          : navigation.navigate('Schedule');
      } else {
        navigation.navigate('kycStatus', {user: user});
      }
    } else {
      setShowVerification(true);
    }
  };

  return (
    <View style={styles.container}>
      {actions.map((action, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.actionContainer}
          onPress={() => routePage(idx)}>
          <Text>{action.image}</Text>
          <Text style={styles.actionText}>{action.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickActionContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: -48,
    borderRadius: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionText: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23.8,
    color: Colors.BLACK,
    marginTop: 4,
  },
  actionContainer: {
    paddingBottom: 16,
    paddingTop: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    // backgroundColor: Colors.PRIMARY,
    padding: 8,
    borderRadius: 8,
  },
});
