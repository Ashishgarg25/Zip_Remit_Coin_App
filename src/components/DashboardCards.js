/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FundIcon from './icons/FundIcon';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import CurrencyIcon from './icons/CurrencyIcon';
import TransactionIcon from './icons/TransactionIcon';
import ContactIcon from './icons/ContactIcon';

const DashboardCards = ({
  heading,
  title,
  label,
  title2,
  label2,
  title3,
  label3,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: Colors.PRIMARY,
            // heading === 'Account Status'
            //   ? Colors.PRIMARY
            //   : heading === 'Refer & Earn'
            //   ? Colors.PRIMARY
            //   : heading === 'Wallet Balance'
            //   ? Colors.PRIMARY
            //   : Colors.PRIMARY,

            paddingLeft:
              heading === 'Refer & Earn'
                ? 9
                : heading === 'Transactions'
                ? 10
                : 8,

            paddingTop:
              heading === 'Refer & Earn'
                ? 9
                : heading === 'Transactions'
                ? 10
                : 8,
          },
        ]}>
        {heading === 'Account Status' ? (
          <ContactIcon color={Colors.WHITE} />
        ) : heading === 'Refer & Earn' ? (
          <CurrencyIcon color={Colors.WHITE} />
        ) : heading === 'Wallet Balance' ? (
          <FundIcon />
        ) : (
          <TransactionIcon color={Colors.WHITE} />
        )}
      </View>
      <Text style={styles.title}>{heading}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.label}>
          {title}:{' '}
          <Text
            style={{
              color:
                label === 'Verified' || heading === 'Refer & Earn'
                  ? Colors.GREEN
                  : label === 'Unverified'
                  ? Colors.RED
                  : Colors.PRIMARY,
            }}>
            {label}
          </Text>{' '}
        </Text>
        <Text style={styles.label}>
          {title2}:{' '}
          <Text
            style={{
              color:
                label2 === 'Verified'
                  ? Colors.GREEN
                  : label2 === 'Unverified'
                  ? Colors.RED
                  : Colors.PRIMARY,
            }}>
            {label2}
          </Text>{' '}
        </Text>
        <Text style={styles.label}>
          {title3}:{' '}
          <Text
            style={{
              color:
                label3 === 'Verified'
                  ? Colors.GREEN
                  : label3 === 'Unverified'
                  ? Colors.RED
                  : Colors.PRIMARY,
            }}>
            {label3}
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
};

export default DashboardCards;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 18,
    borderRadius: 8,
    width: 170,
    borderBottomWidth: 4,
    borderBottomColor: Colors.GREEN,
  },
  iconContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 8,
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  title: {
    fontFamily: Fonts.SORA_BOLD,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17.6,
    color: Colors.PRIMARY,
    paddingVertical: 12,
  },
  label: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 17,
    color: Colors.BLACK,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  cardContent: {
    width: 125,
  },
});
