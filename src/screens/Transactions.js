/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import PaymentCard from '../components/PaymentCard';
import {getWalletTransaction} from '../store/slice/transactionSlice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const Transactions = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactions = async () => {
    const transaction = await dispatch(
      getWalletTransaction({auth: loginData?.token, type: '*'}),
    );

    const {data, status} = transaction.payload;

    if (status === 'success') {
      setTransactions(data);
    }
  };

  const allTransactions = ({item}) => {
    return (
      <View key={item.transaction_id}>
        <PaymentCard
          image={item.card_brand}
          name={`${item.payment_type}`}
          time={moment(item.created, 'x').fromNow()}
          amount={(item.amount / 100).toFixed(2)}
          currency={item.currency.toUpperCase()}
          status={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          onPress={() => console.log(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Transactions'} navigation={navigation} />

      <View style={styles.transactionContainer}>
        <Text style={styles.title}>All Transactions</Text>
        <View style={{height: 600}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={transactions}
            keyExtractor={item => item.transaction_id}
            renderItem={item => allTransactions(item)}
          />
        </View>
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.WHITE,
  },
  transactionContainer: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 25.6,
    color: Colors.BLACK,
    marginBottom: 16,
    paddingBottom: 0,
  },
  table: {
    width: '100%',
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 4,
    borderBottomColor: Colors.GREY,
  },
  tableHeaderText: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.SECONDARY_GREY,
    paddingHorizontal: 24,
  },
  tableBody: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.WHITE,
  },
  tableRow: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY,
  },
  tableBodyText: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.BLACK,
    paddingHorizontal: 24,
  },
});
