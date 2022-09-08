/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from './Button';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const PinModal = props => {
  const [pinCode, setPinCode] = useState(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => {
        props.setIsVisible(!props.isModalVisible);
      }}>
      <ScrollView centerContent showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{marginVertical: 24}}>{props.icon}</View>
          </View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.label}>{props.text}</Text>
          <OTPInputView
            style={styles.otpContainer}
            pinCount={4}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              setPinCode(code);
            }}
            editable
            keyboardType="number-pad"
          />

          <View style={{marginTop: 16}}>
            <Button
              text={props.buttonText}
              onPress={() => props.createPin(pinCode)}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

export default PinModal;

const styles = StyleSheet.create({
  otpContainer: {
    width: '100%',
    height: 120,
  },
  modalContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 24,
    paddingBottom: 48,
    elevation: 6,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: -8},
    marginTop: 220,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 16,
    marginBottom: 0,
    fontFamily: Fonts.SORA_REGULAR,
    color: Colors.LIGHT_BLACK,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28.8,
    marginTop: 16,
    marginBottom: 0,
    fontFamily: Fonts.SORA_BOLD,
    color: Colors.PRIMARY,
  },
  underlineStyleBase: {
    backgroundColor: Colors.LIGHT_GREEN,
    borderColor: Colors.LIGHT_GREEN,
    borderRadius: 8,
    width: 75,
    height: 60,
    color: Colors.PRIMARY,
    fontFamily: Fonts.SORA_BOLD,
    fontWeight: '700',
    fontSize: 18,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.GREEN,
    color: Colors.PRIMARY,
    fontFamily: Fonts.SORA_BOLD,
    fontWeight: '700',
    fontSize: 18,
  },
  checkContainer: {
    width: 48,
    height: 48,
    borderRadius: 64,
    padding: 16,
  },
  checkWrapper: {
    width: 88,
    height: 88,
    borderRadius: 88,
    padding: 16,
    marginVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
