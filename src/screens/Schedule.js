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
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {Controller, useForm} from 'react-hook-form';
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
import {authRequest, request} from '../process/request';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CommonDatePicker from '../components/CommonDatePicker';
import {getSendMoneySchedule} from '../store/slice/sendMoneySlice';
import PaymentCard from '../components/PaymentCard';
import moment from 'moment';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CommonModal from '../components/CommonModal';
import WarnIcon from '../components/icons/WarnIcon';

const Schedule = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);
  const {result} = useSelector(state => state?.userDetails?.dashboardData);
  const [beneficiary, setBeneficiary] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [sendMoneyData, setSendMoneyData] = useState({});
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
    watch,
    formState,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amount: '0',
      beneficiary_name: '',
      beneficiary_id: '',
      schedule: '',
      frequency: '',
    },
  });

  useEffect(() => {
    watch('amount');
    getSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSchedule = async () => {
    const response = await dispatch(
      getSendMoneySchedule({auth: loginData?.token}),
    );
    console.log('RESPONSE =====>', response.payload);
    setCurrentSchedule(response.payload.result);
  };

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
      frequency: getValues('frequency'),
      schedule_date: getValues('schedule'),
    };

    const data = await request(
      'sendMoney/schedule',
      loginData?.token,
      'POST',
      newData,
    );

    data.json().then(res => {
      console.log(res);
    });
  };

  const deleteSchedule = async () => {
    console.log('id ====', deleteId);

    const data = await request('sendMoney/delete', loginData?.token, 'DELETE', {
      id: deleteId,
    });

    data.json().then(res => {
      const {status, msg} = res;
      if (status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: msg,
        });
        setIsModalVisible(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Error deleting schedule',
        });
      }
    });
  };

  const renderRightAction = (dragX, id) => {
    const trans = dragX.interpolate({
      inputRange: [-50, 50, 75, 100],
      outputRange: [0, -8, 0, 0],
    });
    return (
      <TouchableOpacity
        style={styles.swipeContainer}
        onPress={() => {
          setDeleteId(id);
          setIsModalVisible(true);
        }}>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [{translateX: trans}],
              paddingTop: 24,
              color: Colors.RED,
            },
          ]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const showCurrentSchedule = ({item}) => {
    return (
      <Swipeable
        key={item.transaction_id}
        leftThreshold={100}
        containerStyle={{left: -16, overflow: 'visible'}}
        childrenContainerStyle={{right: -16}}
        renderRightActions={progress =>
          renderRightAction(progress, item?.schedule_id)
        }>
        <PaymentCard
          image={item.card_brand}
          name={`Frequency ${item.frequency}`}
          time={`Created At ${moment(item.schedule_date).format('LL')}`}
          amount={item.amount}
          currency={'CAD'}
          status={
            item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)
          }
          bgColor={Colors.LIGHT_BLUE}
          onPress={() => console.log(item)}
        />
      </Swipeable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <CommonHeader title={'Schedule Money'} navigation={navigation} />
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
          {currentSchedule.length > 0 && getValues('beneficiary_id') === '' ? (
            <View>
              <Text style={[styles.label, {marginBottom: 8}]}>
                My Schedules ({currentSchedule.length})
              </Text>
              <View style={{height: 600}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={currentSchedule}
                  keyExtractor={item => item.transaction_id}
                  renderItem={item => showCurrentSchedule(item)}
                />
              </View>
            </View>
          ) : (
            <>
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
                    setValue('amount', '500', {shouldValidate: true})
                  }
                />
              </ScrollView>
              <Controller
                control={control}
                errors={errors?.schedule}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    {/* DOB -> YYYY/MM/DD */}
                    <Text style={[styles.label, {paddingTop: 16}]}>
                      Select Schedule
                    </Text>
                    {isDatePickerVisible ? (
                      <CommonDatePicker
                        onDateChange={date => {
                          onChange(date);
                          setIsDatePickerVisible(false);
                        }}
                      />
                    ) : (
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: errors.schedule
                              ? Colors.LIGHT_RED
                              : Colors.WHITE,
                            borderColor: errors.schedule
                              ? Colors.RED
                              : Colors.GREY,
                            borderLeftWidth: errors.schedule ? 8 : 1,
                            borderRadius: 8,
                          },
                        ]}
                        onPressIn={() => {
                          console.log('PRESSED');
                          setIsDatePickerVisible(true);
                        }}
                        value={value}
                        placeholder="Date of Birth"
                      />
                    )}
                  </>
                )}
                name="schedule"
              />
              {errors.schedule && (
                <Text
                  style={{
                    color: errors ? Colors.RED : Colors.PRIMARY,
                    fontFamily: Fonts.SORA_MEDIUM,
                    fontSize: 12,
                  }}>
                  {'Schedule is required!'}
                </Text>
              )}
              <CommonInput
                control={control}
                errors={errors?.frequency}
                labelStyle={styles.label}
                rules={{
                  required: {
                    value: true,
                    message: 'Please select frequency!',
                  },
                }}
                placeholder={'Frequency'}
                label={'Select Frequency'}
                content={['Daily', 'Weekly', 'Monthly']}
                name={'frequency'}
                isDropdown={true}
              />
              <View style={{marginVertical: 48}}>
                <Button
                  text={'Continue'}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!formState.isValid}
                />
              </View>
            </>
          )}
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

        <CommonModal
          isModalVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          icon={<WarnIcon width={48} height={48} />}
          text={
            ' Are you sure you want to delete this schedule. \n Please confirm to proceed!'
          }
          buttonText={'Delete'}
          deleteModal={true}
          confirm={true}
          cancel={true}
          buttonVisible={true}
          onPress={() => deleteSchedule()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Schedule;

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
  swipeContainer: {
    paddingHorizontal: 24,
    backgroundColor: Colors.LIGHT_RED,
    height: 72,
    marginTop: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    right: 16,
    width: 100,
  },
});
