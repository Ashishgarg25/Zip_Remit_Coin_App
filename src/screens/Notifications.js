/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import AmountCard from '../components/AmountCard';
import Fonts from '../utils/Fonts';

const Notifications = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CommonHeader title={'Notifications'} navigation={navigation} />
      <View style={styles.headWrapper}>
        <Text style={styles.text}>Notifications (1)</Text>
        <TouchableOpacity>
          <Text style={styles.markAll}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 16}}>
        <AmountCard
          title={'You have received 100 CAD from Catherine Chivhima'}
          description={'5 Hours Ago'}
          alignItems={'flex-start'}
          marginBottom={8}
          status={'read'}
          isNotification
        />
        <AmountCard
          title={'Promo 40% Discount for special day in the long weekend'}
          description={'5 Hours Ago'}
          alignItems={'flex-start'}
          marginBottom={8}
          status={'unread'}
          isNotification
        />
        <AmountCard
          title={'Promo 40% Discount for special day in the long weekend'}
          description={'5 Hours Ago'}
          alignItems={'flex-start'}
          marginBottom={8}
          status={'read'}
          isNotification
        />
        <AmountCard
          title={'Promo 40% Discount for special day in the long weekend'}
          description={'5 Hours Ago'}
          alignItems={'flex-start'}
          marginBottom={8}
          status={'read'}
          isNotification
        />
        <AmountCard
          title={'Promo 40% Discount for special day in the long weekend'}
          description={'5 Hours Ago'}
          alignItems={'flex-start'}
          marginBottom={8}
          status={'read'}
          isNotification
        />
        <AmountCard
          title={'Promo 40% Discount for special day in the long weekend'}
          description={'5 Hours Ago'}
          alignItems={'flex-start'}
          marginBottom={8}
          status={'read'}
          isNotification
        />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    fontFamily: Fonts.SORA_BOLD,
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
  },
  markAll: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 12,
    color: Colors.GREEN,
  },
});
