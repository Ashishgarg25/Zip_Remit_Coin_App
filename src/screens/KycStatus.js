/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import KycCard from '../components/KycCard';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';

const KycStatus = props => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.userDetails.loginData);

  useEffect(() => {
    if (!user?.is_standard_kyc || !user?.is_advance_kyc) {
      Toast.show({
        type: 'warning',
        text1: 'Pending KYC',
        text2: 'Please complete your KYC.',
      });
    }
  }, [user?.is_advance_kyc, user?.is_standard_kyc]);

  return (
    <View style={styles.container}>
      <CommonHeader title={'KYC Status'} navigation={navigation} />
      <View style={{margin: 16}}>
        <Text style={styles.title}>Know Your Customer (KYC)</Text>
        <Text style={styles.description}>
          For the safety of your information, please enter and review your
          personal information correctly and accurately. You will not be able to
          modify your personal information once the form has been submitted.
        </Text>
        <View style={{marginTop: 32}}>
          <TouchableOpacity onPress={() => navigation.navigate('StandardKyc')}>
            <KycCard
              kycType={'Standard KYC'}
              amount={'$5.00 - $999.00'}
              status={user?.is_standard_kyc ? 'Approved' : 'Not Approved'}
            />
          </TouchableOpacity>
          <KycCard
            kycType={'Advanced KYC'}
            amount={'$1000+'}
            status={user?.is_advance_kyc ? 'Approved' : 'Not Approved'}
          />
        </View>
        <Text style={[styles.title, {fontSize: 13, letterSpacing: 0.3}]}>
          This is ONLY a one time KYC process completion.
        </Text>
      </View>
    </View>
  );
};

export default KycStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 27.2,
    color: Colors.PRIMARY,
    paddingVertical: 16,
  },
  description: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
  },
});
