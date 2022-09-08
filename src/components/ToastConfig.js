/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import Check from './icons/Check';
import CloseIcon from './icons/CloseIcon';
import WarnIcon from './icons/WarnIcon';

const ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.LIGHT_GREEN,
        borderLeftColor: Colors.GREEN,
        marginTop: 16,
        zIndex: 9999,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
        fontFamily: Fonts.SORA_MEDIUM,
        fontWeight: '500',
        color: Colors.GREEN,
      }}
      text2Style={{
        fontSize: 11,
        fontFamily: Fonts.SORA_MEDIUM,
        fontWeight: '500',
        color: Colors.LIGHT_BLACK,
      }}
      renderIcon={
        <View
          style={{
            backgroundColor: Colors.GREEN,
            width: 32,
            height: 32,
            borderRadius: 32,
            padding: 11,
            marginLeft: 16,
          }}>
          <Check />
        </View>
      }
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: Colors.LIGHT_RED,
        borderLeftColor: Colors.RED,
        marginTop: 16,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
        fontFamily: Fonts.SORA_MEDIUM,
        fontWeight: '500',
        color: Colors.RED,
      }}
      text2Style={{
        fontSize: 11,
        fontFamily: Fonts.SORA_MEDIUM,
        fontWeight: '500',
        color: Colors.LIGHT_BLACK,
      }}
      renderIcon={
        <View
          style={{
            backgroundColor: Colors.RED,
            width: 32,
            height: 32,
            borderRadius: 32,
            padding: 10.5,
            marginLeft: 16,
          }}>
          <CloseIcon />
        </View>
      }
    />
  ),

  warning: props => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.LIGHT_ORANGE,
        borderLeftColor: Colors.ORANGE,
        marginTop: 16,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
        fontFamily: Fonts.SORA_MEDIUM,
        fontWeight: '500',
        color: Colors.ORANGE,
      }}
      text2Style={{
        fontSize: 11,
        fontFamily: Fonts.SORA_MEDIUM,
        fontWeight: '500',
        color: Colors.LIGHT_BLACK,
      }}
      renderIcon={
        <View
          style={{
            backgroundColor: Colors.ORANGE,
            width: 32,
            height: 32,
            borderRadius: 32,
            paddingVertical: 4,
            paddingHorizontal: 4.2,
            marginLeft: 16,
          }}>
          <WarnIcon color={Colors.LIGHT_ORANGE} width={32} height={24} />
        </View>
      }
    />
  ),

  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export default ToastConfig;
