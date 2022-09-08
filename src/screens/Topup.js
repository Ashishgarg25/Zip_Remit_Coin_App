/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm, Controller} from 'react-hook-form';
import Fonts from '../utils/Fonts';
import PhoneInput from 'react-native-phone-number-input';
import ArrowRight from '../components/icons/ArrowRight';
import PaymentCard from '../components/PaymentCard';
import ContactIcon from '../components/icons/ContactIcon';
import Contacts from 'react-native-contacts';
import CloseIcon from '../components/icons/CloseIcon';
import {useDispatch, useSelector} from 'react-redux';
import {getProviders} from '../store/slice/topupSlice';
import {getWalletTransaction} from '../store/slice/transactionSlice';

const Topup = () => {
  const navigation = useNavigation();
  const {loginData} = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const [contactList, setContactList] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTopupTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      mobile: '',
      country_code: 'IN',
    },
  });

  // useEffect(() => {
  //   if (errors.mobile) {
  //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   } else {
  //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   }
  // }, [errors.mobile]);

  const showContacts = () => {
    console.log(Contacts);
    try {
      Contacts.getAll().then(contact => {
        contact.length > 0 ? setContactList(contact) : console.log('error');
        setListVisible(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getTopupTransactions = async () => {
    const transaction = await dispatch(
      getWalletTransaction({auth: loginData?.token, type: 'Topup'}),
    );

    const {data, status} = transaction.payload;

    console.log('DATTAAAAAA===++++++', data);

    if (status === 'success') {
      setTransactions(data);
    }
  };

  const onSubmit = async data => {
    console.log(data);
    try {
      const response = await dispatch(
        getProviders({data, auth: loginData?.token}),
      );
      console.log('FRONT PROVIDERS =====>', response.payload.data);
      navigation.navigate('TopupDetails', {
        data: response.payload.data,
        mobile: data.mobile,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const initials = (firstname, lastname) => {
    const inital = firstname.charAt(0) + lastname.charAt(0);
    return inital.toUpperCase();
  };

  const previousTopups = ({item}) => {
    return (
      <View key={item.transaction_id}>
        <PaymentCard
          image={item.card_brand}
          name={'Recharge for Mobile'}
          time={`${item.topup_account_number}`}
          amount={item.amount.toFixed(2)}
          currency={item.currency.toUpperCase()}
          status={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          bgColor={Colors.LIGHT_BLUE}
          // onPress={() => fund(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Airtime Top Up'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Mobile number is required',
              },
              minLength: {
                value: 12,
                message: 'Invalid mobile number',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>Beneficiary's Mobile Number</Text>
                {/* <TextInput
                  style={[styles.input, {borderRadius: 8}]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="503 3335567650"
                  keyboardType="numeric"
                /> */}
                <PhoneInput
                  value={value}
                  defaultCode="IN"
                  layout="first"
                  onChangeFormattedText={onChange}
                  onChangeCountry={code => setValue('country_code', code.cca2)}
                  placeholder={'0000000000'}
                  autoFocus
                  containerStyle={{
                    borderWidth: 1,
                    borderColor: Colors.GREY,
                    borderRadius: 8,
                    width: '100%',
                    marginTop: 8,
                  }}
                  textContainerStyle={{
                    borderLeftWidth: 1,
                    borderColor: Colors.GREY,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    backgroundColor: Colors.WHITE,
                    height: 55,
                    width: '100%',
                  }}
                  textInputStyle={{
                    fontFamily: Fonts.SORA_MEDIUM,
                    fontWeight: '500',
                  }}
                />
                <TouchableOpacity
                  style={{position: 'absolute', right: 16, top: 64}}
                  onPress={() => showContacts()}>
                  <ContactIcon color={Colors.BLUE} />
                </TouchableOpacity>
              </View>
            )}
            name="mobile"
          />
          {errors.mobile && (
            <Text
              style={{
                color: errors ? Colors.RED : Colors.PRIMARY,
                fontFamily: Fonts.SORA_MEDIUM,
                fontSize: 12,
                paddingTop: 8,
              }}>
              {errors?.mobile?.message}
            </Text>
          )}
          <View style={{marginTop: 24}}>
            <Text style={styles.label}>Previous Top Ups</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={transactions}
              keyExtractor={item => item.transaction_id}
              renderItem={item => previousTopups(item)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={[styles.iconContainer]}
        // disabled={!errors.mobile || !errors.country_code}
        onPress={handleSubmit(onSubmit)}>
        <ArrowRight color={Colors.WHITE} />
      </TouchableOpacity>

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
            marginTop: 250,
            elevation: 6,
            shadowColor: Colors.BLACK,
            shadowOpacity: 0.2,
            shadowRadius: 24,
            shadowOffset: {width: 0, height: -8},
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>My Contacts</Text>
            <TouchableOpacity onPress={() => setListVisible(!listVisible)}>
              <CloseIcon color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {contactList.map((contacts, idx) => (
              <PaymentCard
                key={idx}
                image={
                  contacts.thumbnailPath
                    ? contacts.thumbnailPath
                    : initials(contacts.givenName, contacts.familyName)
                }
                name={`${contacts.givenName} ${contacts.familyName}`}
                time={contacts.phoneNumbers[0].number}
                bgColor={Colors.LIGHT_BLUE}
                onPress={() => {
                  setValue('mobile', contacts.phoneNumbers[0].number);
                  setListVisible(!listVisible);
                }}
              />
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Topup;

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
  iconContainer: {
    backgroundColor: Colors.GREEN,
    padding: 16,
    borderRadius: 32,
    position: 'absolute',
    bottom: 64,
    right: 24,
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
