/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import {getTransactionById} from '../store/slice/transactionSlice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const TransactionDetails = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);

  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactions = async () => {
    console.log('id1111', props.route.params.id);

    const transaction = await dispatch(
      getTransactionById({auth: loginData?.token, id: props.route.params.id}),
    );

    console.log('transaction', transaction.payload);

    setTransactions(transaction.payload.result);

    // if (status === 'success') {
    //   setTransactions(data);
    // }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Transactions Details'} navigation={navigation} />

      <View style={styles.transactionContainer}>
        <Text style={styles.label}>Transaction Date</Text>
        <Text style={styles.title}>
          {moment(transactions?.created, 'x').format('MMMM Do YYYY, h:mm a')}
        </Text>
        <View style={styles.textContainer}>
          <View>
            <View
              style={{
                width: 2,
                backgroundColor: Colors.LIGHT_GREEN,
                height: 220,
                borderRadius: 16,
                position: 'absolute',
                top: 16,
                left: 6.8,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 80,
              }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 24,
                  backgroundColor: Colors.GREY,
                  marginRight: 8,
                  marginLeft: 1.5,
                }}
              />
              <View>
                <Text style={styles.text}>Checking Account</Text>
                <Text style={styles.label}>
                  {moment(transactions?.created, 'x').format(
                    'MMMM Do YYYY, h:mm a',
                  )}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 80,
              }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 24,
                  backgroundColor: Colors.GREY,
                  marginRight: 8,
                  marginLeft: 1.5,
                }}
              />
              <View>
                <Text style={styles.text}>Pending</Text>
                <Text style={styles.label}>
                  {moment(transactions?.created, 'x').format(
                    'MMMM Do YYYY, h:mm a',
                  )}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 80,
              }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 24,
                  backgroundColor: Colors.LIGHT_GREEN,
                  marginRight: 8,
                  padding: 2,
                }}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 24,
                    backgroundColor: Colors.GREEN,
                  }}
                />
              </View>
              <View>
                <Text style={styles.text}>{transactions?.status}</Text>
                <Text style={styles.label}>
                  {moment(transactions?.created, 'x').format(
                    'MMMM Do YYYY, h:mm a',
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            borderTopWidth: 1,
            borderTopColor: Colors.LIGHT_GREY,
            marginTop: 16,
            paddingTop: 8,
          }}>
          <View style={[styles.textContainer, {width: 177}]}>
            <Text style={styles.label}>Processing Fees</Text>
            <Text style={styles.text}>1.00 CAD</Text>
          </View>
          <View style={[styles.textContainer, {width: 177}]}>
            <Text style={styles.label}>Total Amount</Text>
            <Text style={styles.text}>{transactions?.amount?.toFixed(2)}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}>
          <View style={[styles.textContainer, {width: 177}]}>
            <Text style={styles.label}>currency</Text>
            <Text style={styles.text}>{transactions?.currency}</Text>
          </View>
          <View style={[styles.textContainer, {width: 177}]}>
            <Text style={styles.label}>Product Type</Text>
            <Text style={styles.text}>{transactions?.payment_type}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}>
          <View style={[styles.textContainer, {width: 177}]}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.text}>
              {transactions?.topup_account_number}
            </Text>
          </View>
          <View style={[styles.textContainer, {width: 177}]}>
            <Text style={styles.label}>SKU Code</Text>
            <Text style={styles.text}>{transactions?.sku_code}</Text>
          </View>
        </View>
        <View
          style={[
            styles.textContainer,
            {
              borderTopWidth: 1,
              borderTopColor: Colors.LIGHT_GREY,
              marginTop: 24,
              paddingTop: 16,
            },
          ]}>
          <Text style={styles.label}>Reference ID</Text>
          <Text
            style={
              styles.text
            }>{`${transactions?.paymentMethodId}_${transactions?.created}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  transactionContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    color: Colors.GREEN,
    paddingVertical: 2,
  },
  label: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    color: Colors.SECONDARY_GREY,
    letterSpacing: 0.3,
  },
  textContainer: {
    paddingVertical: 12,
  },
  text: {
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.LIGHT_BLACK,
  },
});
