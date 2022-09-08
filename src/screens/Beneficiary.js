/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm, Controller} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import AmountCard from '../components/AmountCard';
import CommonDropdown from '../components/CommonDropdown';

const Beneficiary = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      amount: 0,
      beneficiary_amount: 0,
    },
  });
  const onSubmit = data => {
    console.log(data);
    navigation.navigate('SendMoneyComplete');
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Send Money'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <CommonDropdown
                  onChange={onChange}
                  value={value}
                  title={'Select Beneficiary'}
                  placeholder={'John Doe'}
                />
              </View>
            )}
            name="amount"
          />
          {errors.amount && <Text>This is required.</Text>}
          <Text style={styles.label}>Add Beneficiary</Text>
          <View>
            <TouchableOpacity>
              <AmountCard title={'MySelf'} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom: 8}}>
              <AmountCard title={'Someone Else'} />
            </TouchableOpacity>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <CommonDropdown
                  onChange={onChange}
                  value={value}
                  title={'Reason for Transfer'}
                  placeholder={'For College Fees (Optional)'}
                />
              </View>
            )}
            name="beneficiary_amount"
          />
          {errors.beneficiary_amount && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <CommonDropdown
                  onChange={onChange}
                  value={value}
                  title={'Relation to Beneficiary'}
                  placeholder={'Sister (Optional)'}
                />
              </View>
            )}
            name="beneficiary_amount"
          />
          {errors.beneficiary_amount && <Text>This is required.</Text>}

          <View style={{marginVertical: 32}}>
            <Button text={'Continue'} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Beneficiary;

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
});
