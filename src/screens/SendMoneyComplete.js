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
import {getBeneficiary} from '../store/slice/beneficiarySlice';
import CloseIcon from '../components/icons/CloseIcon';
import AmountCard from '../components/AmountCard';

const SendMoneyComplete = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);

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
        name: `${item?.firstname} ${item?.lastname}`,
        email: item?.email,
      });
    });

    console.log('TEMP DATA ======>', tempBeneficiaryData);

    setBeneficiary(tempBeneficiaryData);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    formState,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amount: '0',
      beneficiary_name: '',
      beneficiary_id: '',
      reason: '',
      relation: '',
    },
  });
  const onSubmit = data => {
    setSendMoneyData(data);
    // navigation.navigate('Beneficiary');
    setListVisible(true);
  };

  const pay = () => {
    console.log(sendMoneyData);
  };

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
          <CommonInput
            control={control}
            errors={errors?.amount}
            label={'Beneficiary Gets'}
            placeholder={'500'}
            labelStyle={styles.label}
            isNumeric
            rules={{
              required: {
                value: true,
                message: 'Please enter your amount',
              },
            }}
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
            1 CAD = 72.06 INR
          </Text>
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
            placeholder={'For College Fees (Optional)'}
            label={'Reason for Transfer'}
            content={['For College', 'For Family']}
            name={'reason'}
            isDropdown={true}
          />
          <CommonInput
            control={control}
            errors={errors?.relation}
            labelStyle={styles.label}
            placeholder={'Sister (Optional)'}
            label={'Relation to Beneficiary'}
            content={['Sister', 'Brother', 'Mother', 'Father']}
            name={'relation'}
            isDropdown={true}
          />
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <View
              style={{
                backgroundColor: Colors.GREY,
                width: 24,
                height: 24,
                borderRadius: 64,
                padding: 7,
              }}>
              <Check />
            </View>
            <Text style={styles.checkboxText}>Include Fees</Text>
          </TouchableOpacity> */}
          {/* <View style={{marginTop: 8}}>
            <Text style={styles.label}>Payment Method</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: Colors.PRIMARY,
                    width: 24,
                    height: 24,
                    borderRadius: 64,
                    padding: 1,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.WHITE,
                      borderRadius: 24,
                      width: 18,
                      height: 18,
                    }}
                  />
                </View>
                <Text style={styles.paymentMethodText}>ZipCredit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 32,
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: Colors.PRIMARY,
                    width: 24,
                    height: 24,
                    borderRadius: 64,
                    padding: 1,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.PRIMARY,
                      borderRadius: 24,
                      width: 18,
                      height: 18,
                    }}
                  />
                </View>
                <Text style={styles.paymentMethodText}>USD Wallet</Text>
              </TouchableOpacity>
            </View>
          </View> */}
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
            <View style={{height: 280}}>
              <View style={{marginBottom: 24}}>
                <AmountCard
                  title={'Canada Wallet'}
                  amount={'1675.00'}
                  description={'CAD'}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Processing Fees</Text>
                <Text style={styles.text}>1.00 CAD</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Our Fees</Text>
                <Text style={styles.text}>4.99 CAD</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Beneficiary will get</Text>
                <Text style={styles.text}>67.14 INR</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Amount to be Charged</Text>
                <Text style={styles.text}>3.10 CAD</Text>
              </View>
            </View>
            <View style={{marginTop: 48, marginBottom: 48}}>
              <Button text={'Pay'} onPress={() => pay()} />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SendMoneyComplete;

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
