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
import {useDispatch} from 'react-redux';
import {decrement, increment} from '../../store/slice/standardKycSlice';
import RadioButton from '../RadioButton';
import CommonDatePicker from '../CommonDatePicker';
import CommonCheck from '../CommonCheck';
import CommonInput from '../CommonInput';

const KycStep2 = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    formState,
  } = useForm({
    defaultValues: {
      country: '',
      doc_type: '',
      id_number: '',
      id_expiry: isChecked === true ? 'Never Expires' : '',
    },
  });
  const onSubmit = data => {
    console.log(data);
    dispatch(increment(data));
  };

  const setChecked = value => {
    setIsChecked(value);
    if (value === true) {
      setValue('id_expiry', 'Never Expires');
    }
  };

  const documents = [
    'Passport',
    "Driver's License",
    'Government Issue ID Card',
    'Residence Permit',
  ];

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Identity Documents</Text>

          <View style={{marginVertical: 8}}>
            <CommonInput
              control={control}
              errors={errors?.country}
              placeholder={'Pick Your Country'}
              label={'Select Country that issued your documents'}
              labelStyle={styles.label}
              rules={{
                required: {
                  value: true,
                  message: 'Please select your country',
                },
              }}
              name={'country'}
              isDropdown={true}
            />
            <View>
              <Text style={styles.label}>Choose Document Type</Text>
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
                      {documents.map((doc, idx) => (
                        <RadioButton
                          key={idx}
                          name={doc}
                          id={idx}
                          value={value}
                          onChange={onChange}
                        />
                      ))}
                    </>
                  )}
                  name="doc_type"
                />
                {errors.doc_type && <Text>{errors.doc_type.message}</Text>}
              </View>
            </View>
          </View>
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
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>ID Number</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="ID Number"
                />
              </View>
            )}
            name="id_number"
          />
          {errors.id_number && <Text>{errors.id_number.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={styles.label}>ID Expiry</Text>
                <View
                  style={{
                    width: '100%',
                  }}>
                  {isDatePickerVisible ? (
                    <CommonDatePicker
                      onDateChange={date => {
                        onChange(date);
                        setIsDatePickerVisible(false);
                      }}
                      mode={true}
                    />
                  ) : (
                    <TextInput
                      style={[
                        styles.input,
                        {
                          width: '100%',
                          backgroundColor: isChecked
                            ? Colors.GREY
                            : Colors.WHITE,
                        },
                      ]}
                      editable={!isChecked}
                      onPressIn={() => {
                        !isChecked
                          ? setIsDatePickerVisible(true)
                          : console.log('working');
                      }}
                      value={value}
                      placeholder="ID Expiry"
                    />
                  )}
                  <CommonCheck
                    setChecked={setChecked}
                    checked={isChecked}
                    text1={'Never Expires'}
                  />
                </View>
              </View>
            )}
            name="id_expiry"
          />
          {errors.id_expiry && <Text>{errors.id_expiry.message}</Text>}

          <View
            style={{
              marginTop: 16,
            }}>
            <Text style={styles.label}>
              Take a photo of your driver's license. The photo should be:
            </Text>
            <Text style={styles.label}>
              • Bright & Clear{' '}
              <Text style={{fontWeight: '400'}}>(Good Quality)</Text>{' '}
            </Text>
            <Text style={styles.label}>
              • Uncut{' '}
              <Text style={{fontWeight: '400'}}>
                (All corners of the document should be visible)
              </Text>
            </Text>
            <Text style={[styles.label, {fontWeight: '400'}]}>
              If your photo is not of high enough quality (sufficiently sharp
              and not blurry), we will request a better copy
            </Text>
          </View>
          <View
            style={{
              marginTop: 32,
              marginBottom: 168,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Button
              text={'Back'}
              width={'45%'}
              onPress={() => dispatch(decrement())}
              outline
            />
            <Button
              text={'Next'}
              width={'45%'}
              // disabled={!formState.isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default KycStep2;

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
