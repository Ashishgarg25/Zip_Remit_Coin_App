/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import CommonInput from '../components/CommonInput';
import Tags from '../components/Tags';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBeneficiary,
  getBeneficiaryById,
} from '../store/slice/beneficiarySlice';
import AmountCard from '../components/AmountCard';
import CloseIcon from '../components/icons/CloseIcon';
import {mobileWallet} from '../store/slice/sendMoneySlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {authRequest} from '../process/request';

const SendMoney = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state?.userDetails);
  const {result} = useSelector(state => state?.userDetails?.dashboardData);
  const [beneficiary, setBeneficiary] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [sendMoneyData, setSendMoneyData] = useState({});

  useEffect(() => {
    getBeneficiaries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBeneficiaries = async () => {
    const response = await dispatch(getBeneficiary({auth: loginData?.token}));
    console.log('RESPONSE =====>', response.payload);

    const tempBeneficiaryData = [];

    response.payload.data.map(item => {
      tempBeneficiaryData.push({
        id: item?.beneficiary_id,
        name: `${item?.firstname} ${item?.lastname}`,
        currency: item?.currency,
        address: item?.address,
        city: item?.city,
        state: item?.state,
        zip: item?.zip,
        country: item?.country,
      });
    });

    console.log('TEMP DATA ======>', tempBeneficiaryData);

    setBeneficiary(tempBeneficiaryData);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
    reset,
    watch,
    formState,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amount: 0,
      total_amount: 0,
      beneficiary_name: '',
      beneficiary_currency: '',
      beneficiary_id: '',
      reason: '',
      relation: '',
    },
  });

  useEffect(() => {
    watch('amount');
    // getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async data => {
    const beneficiary1 = await dispatch(
      getBeneficiaryById({
        beneficiary_id: getValues('beneficiary_id'),
        auth: loginData?.token,
      }),
    );

    const conversion1 = await authRequest(
      `sendMoney/conversion?currency=${loginData?.user?.currency}&convertCurrency=${beneficiary1?.payload?.data?.currency}`,
    );

    const {rate} = conversion1.data;

    setSendMoneyData({data: beneficiary1?.payload?.data, conversionRate: rate});

    const total = Math.round(getValues('amount') * 100) / 100 + 5.99;

    console.log(total);

    setValue('total_amount', total);
    setListVisible(true);
  };

  const pay = async () => {
    const {currency, firstname, lastname, phone} = sendMoneyData.data;

    const newData = {
      amount: getValues('total_amount'),
      currency,
      firstname,
      lastname,
      phone,
      beneficiary_id: getValues('beneficiary_id'),
    };

    const sendMobileWallet = await dispatch(
      mobileWallet({data: newData, auth: loginData?.token}),
    );

    const {status, msg} = sendMobileWallet.payload;
    if (status === 'success') {
      Toast.show({
        type: 'warning',
        text1: msg,
        text2: 'It takes 24hrs to process the payment.',
      });
      reset();
      navigation.navigate('Home');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Something went wrong. Please try again later!',
      });
    }
  };

  // const convertedCurrency = async () => {
  //   const response = await authRequest(
  //     `sendMoney/conversion?currency=${
  //       result?.wallet_type
  //     }&convertCurrency=${getValues('beneficiary_currency')}`,
  //     'GET',
  //   );

  //   response.json().then(resJson => {
  //     console.log('ddddd', resJson);
  //   });

  //   return response.json();
  // };

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <CommonHeader title={'Send Money'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View>
            <CommonInput
              control={control}
              errors={errors?.wallet}
              labelStyle={styles.label}
              placeholder={'Select Beneficiary'}
              label={'Select Beneficiary'}
              rules={{
                required: {
                  value: true,
                  message: 'Please select a beneficiary',
                },
              }}
              content={beneficiary}
              name={'beneficiary_name'}
              isDropdown={true}
              hasMultiData={true}
              setValue={setValue}
            />
          </View>
          <CommonInput
            control={control}
            errors={errors?.amount}
            label={'Send Amount'}
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
              onPress={() => setValue('amount', '100', {shouldValidate: true})}
            />
            <Tags
              title={'200'}
              currency="CAD"
              onPress={() => setValue('amount', '200', {shouldValidate: true})}
            />
            <Tags
              title={'500'}
              currency="CAD"
              onPress={() => setValue('amount', '500', {shouldValidate: true})}
            />
            <Tags
              title={'1000'}
              currency="CAD"
              onPress={() => setValue('amount', '500', {shouldValidate: true})}
            />
            <Tags
              title={'1500'}
              currency="CAD"
              onPress={() => setValue('amount', '500', {shouldValidate: true})}
            />
          </ScrollView>
          {/* <CommonInput
            control={control}
            errors={errors?.amount}
            label={'Beneficiary Gets'}
            placeholder={'500'}
            labelStyle={styles.label}
            name={'beneficiary_amount'}
            prefilledValue
            prefill={getValues('amount')}
          />
          <Text
            style={{
              fontFamily: Fonts.SORA_MEDIUM,
              fontSize: 12,
              fontWeight: '500',
              color: Colors.ORANGE,
              textAlign: 'right',
            }}>
            1 CAD = 1 CAD
          </Text> */}
          {/* <View
            style={{
              marginVertical: 32,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.subTitle}>Beneficiary Gets</Text>
            <Text style={styles.title}>
              {Number(getValues('amount')).toFixed(2)}
            </Text>
          </View> */}
          <CommonInput
            control={control}
            errors={errors?.reason}
            labelStyle={styles.label}
            rules={{
              required: {
                value: true,
                message: 'Please select a reason!',
              },
            }}
            placeholder={'For College Fees'}
            label={'Reason for Transfer'}
            note={'* Regulatory Compliance'}
            content={['For College', 'For Family']}
            name={'reason'}
            isDropdown={true}
          />
          <CommonInput
            control={control}
            errors={errors?.relation}
            labelStyle={styles.label}
            rules={{
              required: {
                value: true,
                message: 'Please select your relation with the beneficiary!',
              },
            }}
            placeholder={'Sister'}
            label={'Relation to Beneficiary'}
            note={'* Regulatory Compliance'}
            content={['Sister', 'Brother', 'Mother', 'Father']}
            name={'relation'}
            isDropdown={true}
          />
          <View style={{marginVertical: 48}}>
            <Button
              text={'Continue'}
              onPress={handleSubmit(onSubmit)}
              disabled={!formState.isValid}
            />
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={listVisible}
          onRequestClose={() => {
            setListVisible(!listVisible);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
              padding: 16,
              marginTop: 320,
              elevation: 6,
              shadowColor: Colors.BLACK,
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: {width: 0, height: -8},
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>Payment Summary</Text>
              <TouchableOpacity onPress={() => setListVisible(!listVisible)}>
                <CloseIcon color={Colors.PRIMARY} />
              </TouchableOpacity>
            </View>
            <View style={{height: 300}}>
              <View style={{marginBottom: 24}}>
                <AmountCard
                  title={result?.wallet_type?.toUpperCase()}
                  amount={result?.total_amount}
                  description={
                    result?.name
                      ? result?.name
                      : result?.wallet_type?.toUpperCase()
                  }
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>Beneficiary will get</Text>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {`${
                    Math.round(
                      getValues('amount') * sendMoneyData?.conversionRate * 100,
                    ) / 100
                  } ${sendMoneyData?.data?.currency?.toUpperCase()}`}
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
                }}>{`1 ${result?.wallet_type?.toUpperCase()} = ${sendMoneyData?.conversionRate?.toFixed(
                2,
              )} ${sendMoneyData?.data?.currency?.toUpperCase()}`}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Processing Fees</Text>
                <Text
                  style={
                    styles.text
                  }>{`1.00 ${result?.wallet_type?.toUpperCase()}`}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Our Fees</Text>
                <Text
                  style={
                    styles.text
                  }>{`4.99 ${result?.wallet_type?.toUpperCase()}`}</Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>Total Amount Charged</Text>
                <Text
                  style={[
                    styles.text,
                    {fontWeight: 'bold', color: Colors.GREEN},
                  ]}>
                  {`${getValues(
                    'total_amount',
                  )} ${result?.wallet_type?.toUpperCase()}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 48,
                marginBottom: 48,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: 120}}>
                <Button
                  text={'Go Back'}
                  onPress={() => setListVisible(false)}
                  outline
                />
              </View>
              <View style={{width: 225}}>
                <Button
                  text={`Pay $${getValues('total_amount')}`}
                  onPress={() => pay()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
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
  subTitle: {
    fontWeight: '500',
    fontFamily: Fonts.SORA_MEDIUM,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  text: {
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.LIGHT_BLACK,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 25.6,
    color: Colors.BLACK,
    marginVertical: 16,
  },
});
