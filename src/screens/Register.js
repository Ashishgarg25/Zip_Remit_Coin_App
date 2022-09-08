/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../utils/Colors';
import {useForm} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import CommonCheck from '../components/CommonCheck';
import {useDispatch} from 'react-redux';
// import {submitUserDetails} from '../store/slice/userSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {registerUser} from '../store/slice/userSlice';
import CommonInput from '../components/CommonInput';
import {authRequest} from '../process/request';
import {getCountries} from 'react-phone-number-input';

const Register = ({setIsRegister}) => {
  // const userDetails = useSelector(state => state.userDetails.data);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    const data = await authRequest('user/countries', 'GET');

    const countries1 = getCountries();
    const newCountryArr = [];
    countries1.map(item => {
      data
        .filter(country => country.cca2 === item)
        .map(countryItem => {
          newCountryArr.push({
            flags: countryItem?.flags[1],
            name: countryItem?.name?.common,
            region: countryItem?.region,
          });
        });
    });

    setCountries(newCountryArr.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    formState,
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confPassword: '',
      refCode: '',
      country: '',
      region: '',
    },
  });
  const onSubmit = async data => {
    console.log(data);

    let currency;

    data.country === 'United Kingdom'
      ? (currency = 'gbp')
      : data.country === 'Canada'
      ? (currency = 'cad')
      : data.region === 'Europe'
      ? (currency = 'eur')
      : data.region === 'Africa'
      ? (currency = 'zar')
      : (currency = 'usd');

    const updatedData = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confPassword: data.confPassword,
      refCode: data.refCode,
      country: data.country,
      currency: currency,
    };

    const userData = await dispatch(registerUser(updatedData));
    const {status} = userData.payload;
    if (!status) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: userData.payload.msg,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have successfully registered!',
      });
      console.log('USER DATA PAYLOAD =========>', userData.payload);
      reset();
      setIsRegister(false);
    }
  };

  const handleCheck = value => {
    setChecked(value);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      centerContent
      overScrollMode="never">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={{paddingBottom: 64}}>
          <CommonInput
            control={control}
            errors={errors?.fullName}
            placeholder={'John Smith Doe'}
            label={'Full Name'}
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
            name={'fullName'}
          />
          {/* <View style={{marginBottom: 16}}>
            <Text style={styles.label}>Are you 18 years or Older? (*)</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                <Text style={styles.checkboxText}>Yes</Text>
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
                    backgroundColor: Colors.GREY,
                    width: 24,
                    height: 24,
                    borderRadius: 64,
                    padding: 7,
                  }}>
                  <Check />
                </View>
                <Text style={styles.checkboxText}>No</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <CommonInput
            control={control}
            errors={errors?.email}
            placeholder={'john.doe@gmail.com'}
            label={'Email'}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Incorrect email address',
              },
            }}
            name={'email'}
          />
          <CommonInput
            control={control}
            errors={errors?.phone}
            placeholder={'Mobile Number'}
            label={'Mobile'}
            rules={{
              required: {
                value: true,
                message: 'Mobile number is required',
              },
              minLength: {
                value: 10,
                message: 'Invalid mobile number',
              },
              maxLength: {
                value: 10,
                message: 'Invalid mobile number',
              },
            }}
            name={'phone'}
          />
          <CommonInput
            control={control}
            errors={errors?.password}
            placeholder={'Enter Password'}
            label={'Password'}
            secureTextEntry={true}
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 8,
                message: 'Password should contain atleast 8 characters',
              },
            }}
            name={'password'}
          />
          <CommonInput
            control={control}
            errors={errors?.confPassword}
            placeholder={'Confirm Password'}
            label={'Confirm Password'}
            secureTextEntry={true}
            rules={{
              required: {
                value: true,
                message: 'Confirm Password is required',
              },
              validate: value =>
                value === getValues('password') || 'Passwords do not match',
            }}
            name={'confPassword'}
          />
          <CommonInput
            control={control}
            placeholder={'Referral Code'}
            label={'Referral Code'}
            keyboardType={'numeric'}
            name={'refCode'}
          />
          <CommonInput
            control={control}
            errors={errors?.country}
            placeholder={'Pick Your Country'}
            label={'Select Country'}
            rules={{
              required: {
                value: true,
                message: 'Please select your country',
              },
            }}
            content={countries}
            name={'country'}
            isDropdown={true}
            hasMultiData
            hasCountries
            setValue={setValue}
          />
          <CommonCheck
            text1={'I have read and agreed to the '}
            text2={'Terms and Conditions & '}
            text3={'Privacy Policy'}
            checked={checked}
            setChecked={handleCheck}
          />
          <View style={{marginTop: 16}}>
            <Button
              text={'Sign Up'}
              onPress={handleSubmit(onSubmit)}
              // disabled={!formState.isValid || !checked}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.signInText}>
              Already have an account?{'  '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsRegister(false);
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontFamily: Fonts.SORA_SEMI_BOLD,
                  color: Colors.ORANGE,
                  marginTop: 16,
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    color: Colors.BLACK,
    marginVertical: 16,
    fontFamily: Fonts.SORA_BOLD,
  },
  modalContainer: {
    flex: 1,
    marginTop: 280,
    backgroundColor: Colors.WHITE,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  signInText: {
    fontSize: 14,
    lineHeight: 23.8,
    fontWeight: '400',
    fontFamily: Fonts.SORA_REGULAR,
    color: Colors.SECONDARY_GREY,
    textAlign: 'center',
    paddingTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 16,
    marginBottom: 0,
    fontFamily: Fonts.SORA_REGULAR,
    color: Colors.LIGHT_BLACK,
  },
});
