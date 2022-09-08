/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm, Controller} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import CommonInput from '../components/CommonInput';
import RadioButton from '../components/RadioButton';
import {useStripe} from '@stripe/stripe-react-native';
import PaymentCard from '../components/PaymentCard';
import CloseIcon from '../components/icons/CloseIcon';
import Tags from '../components/Tags';
import {useDispatch, useSelector} from 'react-redux';
import {getWalletTransaction} from '../store/slice/transactionSlice';
import WalletIcon from '../components/icons/WalletIcon';
import PeerIcon from '../components/icons/PeerIcon';
import {API_URL} from 'react-native-dotenv';

const FundWallet = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);
  const {
    initPaymentSheet,
    presentPaymentSheet,
    retrievePaymentIntent,
    collectBankAccountForPayment,
  } = useStripe();

  const [walletTransactions, setWalletTransactions] = useState([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    watch,
    reset,
    formState,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      wallet: '',
      amount: 0,
      payment_method: '',
    },
  });

  useEffect(() => {
    watch('amount');
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactions = async () => {
    const transaction = await dispatch(
      getWalletTransaction({auth: loginData?.token, type: 'Fund Wallet'}),
    );

    const {data, status} = transaction.payload;

    console.log('DATTAAAAAA===++++++', data);

    if (status === 'success') {
      setWalletTransactions(data);
    }
  };

  const fetchPaymentSheetParams = async prevFund => {
    const {payment_method, wallet, amount} = getValues();

    console.log(wallet);
    console.log(payment_method);

    const response = await fetch(`${API_URL}/api/v1/wallet/sendMoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: loginData?.token,
      },
      body: JSON.stringify({
        paymentMethodTypes: payment_method.toLowerCase(),
        currency: wallet.toLowerCase(),
        amount: prevFund
          ? amount * 100
          : (Number((amount * 4.75) / 100) + Number(amount)) * 100,
      }),
    });

    const {clientSecret, ephemeralKey, customer} = await response.json();

    console.log('CLIENT SECRET =======>', clientSecret);

    return {
      clientSecret,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async prevFund => {
    const {clientSecret, ephemeralKey, customer} =
      await fetchPaymentSheetParams(prevFund);

    const {payment_method} = getValues();

    if (payment_method === 'card') {
      const {error} = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: clientSecret,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
      });
      if (!error) {
        openPaymentSheet(clientSecret);
      } else {
        console.log('ERROR ========>', error);
      }
    } else if (payment_method === 'USBankAccount') {
      console.log('ACS DEBIT', clientSecret);

      const {error, paymentIntent} = await collectBankAccountForPayment(
        clientSecret,
        {
          paymentMethodData: {
            billingDetails: {
              name: 'Ashish Garg',
            },
          },
          paymentMethodType: 'USBankAccount',
        },
      );

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        console.log('PAYMENT INTENT FOR US BANK =====>', paymentIntent);
      }
    }
  };

  const openPaymentSheet = async clientSecret => {
    const {error} = await presentPaymentSheet();

    if (error) {
      console.log('ERROR ==========>', error);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      // Alert.alert('Success', 'Your order is confirmed!');
      showStatus(clientSecret);
    }
  };

  const showStatus = async secret => {
    console.log('Payment Intent Secret ======>', secret);
    const {paymentIntent} = await retrievePaymentIntent(secret);
    console.log('Payment Intent ======>', paymentIntent.paymentMethodId);
    switch (paymentIntent.status) {
      case 'Succeeded':
        Alert.alert('Success', 'Your order is confirmed!');
        console.log('PAYMENT INTENT ============>', paymentIntent);
        break;
      case 'Processing':
        Alert.alert('Success', 'Your order is processing!');
        break;
      case 'requires_payment_method':
        Alert.alert('Success', 'Your order requires a payment method!');
        break;
      default:
        Alert.alert('Success', 'Your order failed!');
        break;
    }

    fetch(`${API_URL}/api/v1/transactions/walletTransactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: loginData?.token,
      },
      body: JSON.stringify({
        paymentIntent: paymentIntent,
        wallet_id: getValues('wallet'),
      }),
    })
      .then(res => res.json())
      .then(resJson => console.log('RESJOSN =========>', resJson));
  };

  const onSubmit = data => {
    initializePaymentSheet();
  };

  const paymentMethods = [
    {
      name: 'Debit / Credit Card',
      type: 'card',
    },
    {
      name: 'Bank Debit',
      type: 'USBankAccount',
    },
    {
      name: 'Email Payment',
      type: 'interac',
    },
    {
      name: 'Zelle Payment',
      type: 'zelle',
    },
  ];

  const fund = item => {
    setValue('payment_method', item.type);
    setValue('wallet', item.currency);
    setValue('amount', item.amount / 100);

    const prevFund = true;
    initializePaymentSheet(prevFund);
  };

  const previousWalletTransactions = ({item}) => {
    return (
      <View key={item.transaction_id}>
        <PaymentCard
          image={item.card_brand}
          name={`${item.firstname} ${item.lastname}`}
          time={`**** **** **** ${item.card_last4}`}
          amount={(item.amount / 100)?.toFixed(2)}
          currency={item?.currency?.toUpperCase()}
          status={
            item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)
          }
          bgColor={Colors.LIGHT_BLUE}
          onPress={() => fund(item)}
        />
      </View>
    );
  };

  return (
    <View>
      <CommonHeader title={'Fund Wallet'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            style={[
              styles.topBar,
              {backgroundColor: Colors.LIGHT_BLUE, borderRadius: 16},
            ]}>
            <WalletIcon color={Colors.BLUE} width={18} height={18} />
            <Text style={styles.topBarTextSelected}>Fund Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topBar}
            onPress={() => navigation.navigate('PeerTransfer')}>
            <PeerIcon color={Colors.PRIMARY} width={18} height={18} />
            <Text style={styles.topBarText}>Peer to Peer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{paddingHorizontal: 16}}
          nestedScrollEnabled>
          <View>
            <CommonInput
              control={control}
              errors={errors?.wallet}
              labelStyle={styles.label}
              placeholder={'Select Wallet'}
              label={'Source Wallet'}
              rules={{
                required: {
                  value: true,
                  message: 'Please select your wallet',
                },
              }}
              content={[`${loginData?.user?.currency?.toUpperCase()}`]}
              name={'wallet'}
              isDropdown={true}
              setValue={setValue}
            />
          </View>
          {getValues().wallet === '' && walletTransactions.length > 0 ? (
            <View>
              <Text style={[styles.label, {marginBottom: 8}]}>
                Recent Fundings ({walletTransactions.length})
              </Text>
              <View style={{height: 600}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={walletTransactions}
                  keyExtractor={item => item.transaction_id}
                  renderItem={item => previousWalletTransactions(item)}
                />
              </View>
            </View>
          ) : (
            // <PreviousWalletTransactions />
            <View
              contentContainerStyle={styles.formContainer}
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.WHITE,
                  position: 'absolute',
                  top: -48,
                  right: 24,
                  padding: 6,
                  borderRadius: 12,
                  zIndex: 999,
                }}
                onPress={() => reset()}>
                <CloseIcon width={12} height={12} color={Colors.PRIMARY} />
              </TouchableOpacity>
              <View style={{marginVertical: 8}}>
                <Text style={styles.label}>Payment Method</Text>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    marginTop: 8,
                  }}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <>
                        {paymentMethods.map((method, idx) => (
                          <RadioButton
                            key={idx}
                            name={method.name}
                            type={method.type}
                            id={idx}
                            value={value}
                            onChange={onChange}
                            showImage={true}
                          />
                        ))}
                      </>
                    )}
                    name="payment_method"
                  />
                  {errors.payment_method && (
                    <Text>{errors.payment_method.message}</Text>
                  )}
                </View>
              </View>
              <CommonInput
                control={control}
                errors={errors?.amount}
                label={'Amount'}
                placeholder={'010010'}
                labelStyle={styles.label}
                isNumeric
                rules={{
                  required: {
                    value: true,
                    message: 'Please enter your amount',
                  },
                }}
                name={'amount'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Tags
                  title={'100'}
                  currency={getValues('wallet')}
                  onPress={() =>
                    setValue('amount', '100', {shouldValidate: true})
                  }
                />
                <Tags
                  title={'200'}
                  currency={getValues('wallet')}
                  onPress={() =>
                    setValue('amount', '200', {shouldValidate: true})
                  }
                />
                <Tags
                  title={'500'}
                  currency={getValues('wallet')}
                  onPress={() =>
                    setValue('amount', '500', {shouldValidate: true})
                  }
                />
                <Tags
                  title={'1000'}
                  currency={getValues('wallet')}
                  onPress={() =>
                    setValue('amount', '1000', {shouldValidate: true})
                  }
                />
                <Tags
                  title={'1500'}
                  currency={getValues('wallet')}
                  onPress={() =>
                    setValue('amount', '1500', {shouldValidate: true})
                  }
                />
              </View>
              <View style={styles.reviewContainer}>
                <View>
                  <Text style={[styles.label, {marginBottom: 8}]}>
                    Payment Summary
                  </Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Total Fee</Text>
                    <Text style={styles.text}>
                      {((getValues('amount') * 4.75) / 100).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Total Amount Received</Text>
                    <Text style={styles.text}>
                      {Number((getValues('amount') * 4.75) / 100) +
                        Number(getValues('amount'))}
                    </Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>Processing Time</Text>
                    <Text
                      style={[
                        styles.text,
                        {color: Colors.ORANGE, fontWeight: '700'},
                      ]}>
                      Instant
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 48, marginBottom: 64}}>
                <Button
                  text={'Continue'}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!formState.isValid}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FundWallet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 24,
    marginBottom: 8,
  },
  topBar: {
    padding: 16,
    flexDirection: 'row',
  },
  topBarText: {
    color: Colors.PRIMARY,
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    paddingLeft: 8,
  },
  topBarTextSelected: {
    color: Colors.BLUE,
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    paddingLeft: 8,
  },
  formContainer: {
    marginHorizontal: 16,
  },
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GREY,
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  checkboxText: {
    fontWeight: '400',
    fontFamily: Fonts.SORA_REGULAR,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  paymentMethodText: {
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  reviewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.LIGHT_BLACK,
  },
});
