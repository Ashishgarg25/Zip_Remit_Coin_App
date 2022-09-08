/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {getDataPlans, recharge} from '../store/slice/topupSlice';
import CloseIcon from '../components/icons/CloseIcon';
import PaymentCard from '../components/PaymentCard';
import AmountCard from '../components/AmountCard';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const TopupDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);
  const [providers, setProviders] = useState([]);
  const [plans, setPlans] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});

  useEffect(() => {
    if (route?.params !== undefined) {
      const {data, mobile} = route?.params;
      setProviders(data);

      getPlans(data, mobile);
    }
  }, []);

  const getPlans = async (data, mobile) => {
    const country_iso = data[0].CountryIso;
    const provider_code = data[0].ProviderCode;
    const payload = {
      country_iso,
      provider_code,
      mobile,
      auth: loginData?.token,
    };
    const response = await dispatch(getDataPlans(payload));
    setPlans(response.payload.data);
  };

  const pay = async () => {
    const {data, mobile} = route?.params;
    const payload = {
      sku_code: selectedPlan?.SkuCode,
      send_value: selectedPlan?.Maximum?.SendValue,
      amount:
        Number(selectedPlan?.Maximum?.ReceiveValueExcludingTax) + Number(2.0),
      mobile,
      validate_only: true,
      logo_url: data[0]?.LogoUrl,
      auth: loginData?.token,
    };

    try {
      const response = await dispatch(recharge(payload));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.payload.msg,
      });
      setListVisible(false);
      navigation.navigate('Topup');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again later!',
      });
    }
  };

  const renderPlans = ({item}) => {
    return (
      <PaymentCard
        name={item?.DefaultDisplayText}
        time={item?.ProcessingMode}
        tags={item?.Benefits}
        amount={item?.Maximum?.ReceiveValueExcludingTax}
        currency={item?.Maximum?.ReceiveCurrencyIso}
        bgColor={Colors.LIGHT_BLUE}
        showIcon={true}
        onPress={() => {
          setSelectedPlan(item);
          setListVisible(true);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Airtime Top Up'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 32}}>
            {providers.map(provider => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: provider?.LogoUrl}}
                  style={{width: 48, height: 48}}
                />
                <Text
                  style={[
                    styles.label,
                    {marginLeft: 16},
                  ]}>{`${provider?.Name} - ${provider.PaymentTypes[0]}`}</Text>
              </View>
            ))}
          </View>
          <View style={{height: 600}}>
            <Text style={styles.title}>Data Plans</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={plans}
              keyExtractor={item => item.SkuCode}
              renderItem={renderPlans}
            />
          </View>
          {/*  */}

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
                    title={'Canada Wallet'}
                    amount={'1675.00'}
                    description={'CAD'}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Processing Fees</Text>
                  <Text style={styles.text}>2.00 CAD</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Topup Type</Text>
                  <Text style={styles.text}>{selectedPlan?.PaymentTypes}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Beneficiary Gets</Text>
                  <Text style={styles.text}>
                    {selectedPlan?.Maximum?.ReceiveValueExcludingTax.toFixed(2)}{' '}
                    {selectedPlan?.Maximum?.ReceiveCurrencyIso}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Amount to be Charged</Text>
                  <Text style={styles.text}>
                    {(
                      Number(selectedPlan?.Maximum?.ReceiveValueExcludingTax) +
                      Number(2.0)
                    ).toFixed(2)}{' '}
                    {selectedPlan?.Maximum?.SendCurrencyIso}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Processing Time</Text>
                  <Text style={styles.text}>Instant</Text>
                </View>
              </View>
              <View style={{marginTop: 48, marginBottom: 48}}>
                <Button text={'Pay'} onPress={() => pay()} />
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TopupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
