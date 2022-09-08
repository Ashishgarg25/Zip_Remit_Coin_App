import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import ProgressStepper from '../components/ProgressStepper';
import KycStep1 from '../components/KYC/KycStep1';
import KycStep2 from '../components/KYC/KycStep2';
import KycStep3 from '../components/KYC/KycStep3';
import CommonHeader from '../components/CommonHeader';
import {useSelector} from 'react-redux';

const StandardKyc = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.userDetails.loginData);

  const content = [
    <KycStep1 user={user} />,
    <KycStep2 user={user} />,
    <KycStep3 user={user} />,
  ];

  return (
    <View style={styles.container}>
      <CommonHeader title={'KYC Process'} navigation={navigation} />
      <ProgressStepper navigation={navigation} content={content} />
    </View>
  );
};

export default StandardKyc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  formContainer: {
    marginHorizontal: 16,
  },
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
  },
  heading: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GREY,
    height: 55,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
  },
  checkboxText: {
    fontWeight: '400',
    fontFamily: Fonts.SORA_REGULAR,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  paymentMethodText: {
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  title: {
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontSize: 18,
    lineHeight: 28.8,
    color: Colors.PRIMARY,
    paddingTop: 24,
  },
  imageContainer: {
    backgroundColor: Colors.LIGHT_GREEN,
    height: 140,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.GREEN,
    borderStyle: 'dashed',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
