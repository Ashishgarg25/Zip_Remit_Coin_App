/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_URL} from 'react-native-dotenv';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import CommonInput from '../components/CommonInput';
import Tags from '../components/Tags';
import WalletIcon from '../components/icons/WalletIcon';
import PeerIcon from '../components/icons/PeerIcon';
import {authRequest, request} from '../process/request';
import {useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const PeerTransfer = props => {
  const navigation = useNavigation();
  const {loginData} = useSelector(state => state.userDetails);
  const [users, setUsers] = useState([]);
  const [rateValue, setRateValue] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    watch,
    formState,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      peer_name: '',
      peer_currency: '',
      peer_id: '',
      amount: 0,
      total_amount: 0,
    },
  });

  const peer_currency = watch('peer_currency');
  const amt = watch('amount');

  useEffect(() => {
    watch('amount');
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peer_currency, amt]);

  const getConversion = async () => {
    setLoading(true);

    const conversion1 = await authRequest(
      `sendMoney/conversion?currency=${
        loginData?.user?.currency
      }&convertCurrency=${getValues('peer_currency')}`,
    );

    const {rate} = conversion1.data;

    const total = Math.round(getValues('amount') * rate * 100) / 100 + 0.25;

    console.log('total ======', total);

    setValue('total_amount', total);

    setRateValue(rate);

    setLoading(false);
  };

  const initials = (firstname, lastname) => {
    const inital = firstname.charAt(0) + lastname.charAt(0);
    return inital.toUpperCase();
  };

  const getUsers = async () => {
    const allUsers = await authRequest('user/', 'GET');

    console.log('ALL USERS', allUsers);

    let usersArr = [];

    allUsers.result.map(item => {
      usersArr.push({
        id: item?.user_id,
        flags:
          item?.profile_pic_file_path !== ''
            ? `${API_URL}/${item?.profile_pic_file_path}`
            : initials(item?.firstname, item?.lastname),
        name: `${item?.firstname} ${item?.lastname}`,
        region: item?.phone,
        currency: item?.currency,
      });
    });

    console.log(usersArr);
    setUsers(usersArr);
  };

  const onSubmit = async data => {
    console.log(data);

    const walletData = await request(
      `wallet/${getValues('peer_id')}`,
      loginData?.token,
      'GET',
    );

    walletData.json().then(res => {
      console.log(res);
      if (res.result[0].total_amount >= getValues('total_amount')) {
        const newData = {
          amount: getValues('total_amount'),
          source_wallet_id: res.result[0].wallet_id,
          dest_wallet_id: res.result[1].wallet_id,
        };

        transferToPeer(newData);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Insufficient Funds. Please fund your wallet!',
        });
        navigation.navigate('FundWallet');
      }
    });
  };

  const transferToPeer = async data => {
    const transfer = await request(
      'wallet/transferWalletToWallet',
      loginData?.token,
      'POST',
      data,
    );

    transfer.json().then(res => {
      if (res.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res.msg,
        });

        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong. Please try again later!',
        });
      }
    });
  };

  return (
    <View>
      <CommonHeader title={'Fund Wallet'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            style={styles.topBar}
            onPress={() => navigation.goBack()}>
            <WalletIcon color={Colors.PRIMARY} width={18} height={18} />
            <Text style={styles.topBarText}>Fund Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topBar,
              {backgroundColor: Colors.LIGHT_BLUE, borderRadius: 16},
            ]}>
            <PeerIcon color={Colors.BLUE} width={18} height={18} />
            <Text style={styles.topBarTextSelected}>Peer to Peer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
          <View>
            <CommonInput
              control={control}
              errors={errors?.wallet}
              labelStyle={styles.label}
              placeholder={'Search Peer'}
              label={'Search Peer'}
              rules={{
                required: {
                  value: true,
                  message: 'Please select a beneficiary',
                },
              }}
              name={'peer_name'}
              content={users}
              isDropdown={true}
              hasMultiData
              hasPeers
              setValue={setValue}
            />
          </View>

          <View
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={false}>
            {/* <TouchableOpacity
                style={{
                  backgroundColor: Colors.WHITE,
                  position: 'absolute',
                  top: -48,
                  right: 24,
                  padding: 6,
                  borderRadius: 12,
                  zIndex: 999,
                  opacity: 0,
                }}
                onPress={() => reset()}>
                <CloseIcon width={12} height={12} color={Colors.PRIMARY} />
              </TouchableOpacity> */}

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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Tags
                title={'100'}
                currency="CAD"
                onPress={() =>
                  setValue('amount', '100', {shouldValidate: true})
                }
              />
              <Tags
                title={'200'}
                currency="CAD"
                onPress={() =>
                  setValue('amount', '200', {shouldValidate: true})
                }
              />
              <Tags
                title={'500'}
                currency="CAD"
                onPress={() =>
                  setValue('amount', '500', {shouldValidate: true})
                }
              />
              <Tags
                title={'1000'}
                currency="CAD"
                onPress={() =>
                  setValue('amount', '500', {shouldValidate: true})
                }
              />
              <Tags
                title={'1500'}
                currency="CAD"
                onPress={() =>
                  setValue('amount', '1500', {shouldValidate: true})
                }
              />
            </ScrollView>
            <View
              style={[
                styles.reviewContainer,
                {
                  display:
                    getValues('amount') === 0 ||
                    (getValues('peer_currency') === '' ? 'none' : 'flex'),
                },
              ]}>
              <View>
                <Text style={[styles.label, {marginBottom: 8}]}>
                  Payment Summary
                </Text>
                {!loading ? (
                  <>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Peer will get</Text>
                      <Text style={[styles.text, {fontWeight: 'bold'}]}>
                        {`${
                          Math.round(getValues('amount') * rateValue * 100) /
                          100
                        } ${getValues('peer_currency')}`}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: -8,
                        marginBottom: 16,
                        fontFamily: Fonts.SORA_SEMI_BOLD,
                        color: Colors.RED,
                        textAlign: 'right',
                      }}>{`1 ${loginData?.user?.currency?.toUpperCase()} = ${rateValue?.toFixed(
                      2,
                    )} ${getValues('peer_currency')}`}</Text>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Total Fee</Text>
                      <Text style={styles.text}>
                        {`0.25 ${getValues('peer_currency')}`}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Total Amount Received</Text>
                      <Text
                        style={[
                          styles.text,
                          {fontWeight: 'bold', color: Colors.GREEN},
                        ]}>
                        {`${getValues('total_amount')} ${getValues(
                          'peer_currency',
                        )}`}
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text>Loading</Text>
                )}
              </View>
            </View>
            <View style={{marginTop: 48, marginBottom: 64}}>
              <Button
                text={`Pay ${getValues('total_amount')} ${getValues(
                  'peer_currency',
                )}`}
                onPress={handleSubmit(onSubmit)}
                disabled={!formState.isValid}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PeerTransfer;

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
