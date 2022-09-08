/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import ArrowRight from './icons/ArrowRight';

const PaymentCard = ({
  image,
  name,
  time,
  amount,
  currency,
  status,
  bgColor,
  onPress,
  tags,
  showIcon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.paymentCard,
        {backgroundColor: bgColor ? bgColor : Colors.WHITE},
      ]}
      onPress={onPress}>
      <View style={styles.cardLeftSide}>
        {image && (
          <View style={styles.image}>
            {image === 'visa' ? (
              <Image
                source={{
                  uri: 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
                }}
                style={{width: 22, height: 7, marginTop: 12, marginLeft: 4.5}}
              />
            ) : image.length > 10 ? (
              <Image
                source={{
                  uri: image,
                }}
                style={{width: 21, height: 22, marginTop: 3, marginLeft: 4.5}}
              />
            ) : (
              <Text style={styles.defaultImage}>{image}</Text>
            )}
          </View>
        )}
        <View style={{paddingLeft: 8}}>
          <View style={[styles.tagContainer]}>
            {tags &&
              tags.map((tag, idx) => (
                <Text
                  style={[
                    styles.tag,
                    {
                      color:
                        tag === 'Mobile'
                          ? Colors.GREEN
                          : tag === 'Minutes'
                          ? Colors.ORANGE
                          : Colors.RED,
                      backgroundColor:
                        tag === 'Mobile'
                          ? Colors.LIGHT_GREEN
                          : tag === 'Minutes'
                          ? Colors.LIGHT_ORANGE
                          : Colors.LIGHT_RED,
                    },
                  ]}>
                  {tag}
                </Text>
              ))}
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.date}>
            {time}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
        {amount && (
          <Text
            style={[
              styles.amount,
              {
                color:
                  amount > 0 && (status === 'Pending' || status === 'Failed')
                    ? Colors.PRIMARY
                    : Colors.GREEN,
              },
            ]}>
            {amount} {currency}
          </Text>
        )}
        {showIcon && <ArrowRight color={Colors.PRIMARY} />}
        {(status === 'Failed' || status === 'Pending') && (
          <Text
            style={[
              styles.status,
              {
                color: status === 'Failed' ? Colors.RED : Colors.ORANGE,
              },
            ]}>
            {status}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  paymentCard: {
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: Colors.LIGHT_BLUE,
  },
  cardLeftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
  },
  tag: {
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 18,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  date: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    color: Colors.SECONDARY_GREY,
    width: 180,
  },
  amount: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
  },
  defaultImage: {
    color: Colors.WHITE,
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 11,
    paddingVertical: 9,
    paddingHorizontal: 5,
  },
  status: {
    color: Colors.RED,
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'right',
  },
});
