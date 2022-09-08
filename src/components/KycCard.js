import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopupIcon from './icons/TopupIcon';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const KycCard = props => {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor:
            props.status === 'Approved' ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
        },
      ]}>
      <View>
        <Text style={styles.smallText}>{props.kycType}</Text>
        <Text style={styles.text}>{props.amount}</Text>
        <Text
          style={[
            styles.status,
            {color: props.status === 'Approved' ? Colors.GREEN : Colors.RED},
          ]}>
          {props.status}
        </Text>
      </View>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              props.status === 'Not Approved' ? Colors.RED : Colors.GREEN,
          },
        ]}>
        <TopupIcon />
      </View>
    </View>
  );
};

export default KycCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  smallText: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20.4,
    color: Colors.PRIMARY,
  },
  text: {
    fontFamily: Fonts.SORA_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 27.2,
    color: Colors.PRIMARY,
  },
  status: {
    fontFamily: Fonts.SORA_BOLD,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 27.2,
    color: Colors.PRIMARY,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
});
