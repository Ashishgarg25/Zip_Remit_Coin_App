import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import CreditIcon from './icons/CreditIcon';
import BankDebitIcon from './icons/BankDebitIcon';
import InteracIcon from './icons/InteracIcon';

const RadioButton = props => {
  return (
    <TouchableOpacity
      style={styles.radioBtnContainer}
      onPress={() => props.onChange(props.type)}>
      <View
        style={[
          styles.outerBorder,
          {
            borderColor:
              props.value !== undefined && props.value === props.type
                ? Colors.GREEN
                : Colors.PRIMARY,
          },
        ]}>
        <View
          style={[
            styles.selectedBorder,
            {
              backgroundColor:
                props.value !== undefined && props.value === props.type
                  ? Colors.GREEN
                  : Colors.WHITE,
            },
          ]}
        />
      </View>
      <Text style={styles.paymentMethodText}>{props.name}</Text>
      {props.showImage ? (
        <View style={styles.iconStyle}>
          {props.name === 'Debit / Credit Card' ? (
            <CreditIcon />
          ) : props.name === 'Bank Debit' ? (
            <BankDebitIcon />
          ) : props.name === 'Email Payment' ? (
            <InteracIcon />
          ) : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  outerBorder: {
    borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 64,
    padding: 1,
  },
  selectedBorder: {
    borderRadius: 24,
    width: 18,
    height: 18,
  },
  paymentMethodText: {
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  iconStyle: {
    marginLeft: 8,
  },
});
