/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import WalletIcon from './icons/WalletIcon';

const AmountCard = ({
  title,
  description,
  amount,
  alignItems,
  marginBottom,
  status,
  icon,
  isNotification,
}) => {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: status === 'read' ? Colors.WHITE : Colors.LIGHT_BLUE,
          borderBottomWidth: status === 'read' && 2,
          borderBottomColor: status === 'read' && Colors.LIGHT_BLUE,
        },
      ]}>
      <View style={[styles.textContainer, {alignItems: alignItems}]}>
        <View style={styles.iconContainer}>
          {!icon && <WalletIcon color={Colors.BLUE} />}
        </View>
        <View>
          <Text
            style={[
              styles.text,
              {
                marginBottom: marginBottom,
                color:
                  status === 'read' ? Colors.PRIMARY_LIGHT : Colors.PRIMARY,
                fontWeight: status === 'read' ? '500' : '600',
                width: isNotification ? 290 : 180,
              },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {title}
          </Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

export default AmountCard;

const styles = StyleSheet.create({
  cardContainer: {
    // borderWidth: 1,
    // borderColor: Colors.BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 8,
  },
  description: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.SECONDARY_GREY,
    paddingLeft: 8,
  },
  amount: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 23.8,
    color: Colors.PRIMARY,
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_BLUE,
    padding: 8,
    borderRadius: 8,
  },
});
