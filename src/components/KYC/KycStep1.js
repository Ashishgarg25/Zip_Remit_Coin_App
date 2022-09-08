/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

// import {useNavigation} from '@react-navigation/native';
import Colors from '../../utils/Colors';
import {useForm, Controller} from 'react-hook-form';
import Button from '../Button';
import Fonts from '../../utils/Fonts';
import CommonDatePicker from '../CommonDatePicker';
import {useDispatch} from 'react-redux';
import {increment} from '../../store/slice/standardKycSlice';
import CommonInput from '../CommonInput';

const KycStep1 = ({user}) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    formState,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      state: '',
      city: '',
      zip: '',
    },
  });
  const onSubmit = data => {
    console.log(data);
    dispatch(increment(data));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Profile Details</Text>
          <CommonInput
            control={control}
            prefilledValue={`${user.firstname} ${user.lastname}`}
            label={'Full Name'}
            name={'fullName'}
          />
          {/* <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <Text style={styles.label}>Middle Name</Text>
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Middle Name"
                    />
                  </>
                )}
                name="middleName"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Last Name"
                    />
                  </>
                )}
                name="lastName"
              />
              {errors.lastName && <Text>This is required.</Text>} */}
          <CommonInput
            control={control}
            prefilledValue={user?.email}
            label={'Email'}
            name={'email'}
          />
          <CommonInput
            control={control}
            prefilledValue={user?.phone}
            label={'Mobile'}
            name={'phone'}
          />
          <Controller
            control={control}
            errors={errors?.dob}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                {/* DOB -> YYYY/MM/DD */}
                <Text style={{paddingTop: 16}}>Date of Birth</Text>
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
                        backgroundColor: errors.dob
                          ? Colors.LIGHT_RED
                          : Colors.WHITE,
                        borderColor: errors.dob ? Colors.RED : Colors.GREY,
                        borderLeftWidth: errors.dob ? 8 : 1,
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
            name="dob"
          />
          {errors.dob && (
            <Text
              style={{
                color: errors ? Colors.RED : Colors.PRIMARY,
                fontFamily: Fonts.SORA_MEDIUM,
                fontSize: 12,
              }}>
              {'Date of Birth is required!'}
            </Text>
          )}
          <CommonInput
            control={control}
            errors={errors?.city}
            label={'City'}
            placeholder={'Enter Your City'}
            name={'city'}
            rules={{
              required: {
                value: true,
                message: 'Please enter your city',
              },
            }}
          />
          <CommonInput
            control={control}
            errors={errors?.state}
            placeholder={'Pick Your State'}
            label={'Select Province / State'}
            // labelStyle={styles.label}
            rules={{
              required: {
                value: true,
                message: 'Please select your state',
              },
            }}
            name={'state'}
            isDropdown={true}
          />
          <CommonInput
            control={control}
            errors={errors?.zip}
            label={'Postal / Zip Code'}
            placeholder={'010010'}
            name={'zip'}
            isNumeric
            rules={{
              required: {
                value: true,
                message: 'Please enter your Zip/Postcode',
              },
            }}
          />
          <View style={{marginTop: 32, marginBottom: 168}}>
            <Button
              text={'Next'}
              disabled={!formState.isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default KycStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
  },
  heading: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 18,
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
    marginVertical: 6,
    borderRadius: 8,
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
  title: {
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontSize: 18,
    lineHeight: 28.8,
    color: Colors.PRIMARY,
    paddingTop: 24,
  },
});
