/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm, Controller} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import Check from '../components/icons/Check';

const WalletTransfer = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      wallet: 0,
      amount: 0,
    },
  });
  const onSubmit = data => {
    console.log(data);
    navigation.navigate('Beneficiary');
  };

  return (
    <View>
      <CommonHeader title={'Wallet Transfer'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text style={styles.label}>Source Wallet</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Select Wallet"
                  keyboardType="numeric"
                />
              </>
            )}
            name="wallet"
          />
          {errors.wallet && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
              </>
            )}
            name="amount"
          />
          {errors.amount && <Text>This is required.</Text>}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 16,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
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
              <Text style={styles.checkboxText}>Include Fees</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={styles.checkboxText}>Conversion Rate:</Text>
              <Text style={styles.checkboxText}>CAD 2.00</Text>
            </View>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Text style={styles.label}>Destination Wallet</Text>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Select Destination Wallet"
                  keyboardType="numeric"
                />
              </>
            )}
            name="destination_wallet"
          />
          {errors.destination_wallet && <Text>This is required.</Text>}

          <View style={styles.reviewContainer}>
            <View>
              <Text style={[styles.label, {marginBottom: 8}]}>
                Payment Summary
              </Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Total Fee</Text>
                <Text style={styles.text}>0</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Total Amount Received</Text>
                <Text style={styles.text}>0</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Processing Time</Text>
                <Text style={styles.text}>Instant</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 48, marginBottom: 300}}>
            <Button text={'Continue'} onPress={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default WalletTransfer;

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
