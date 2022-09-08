/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, ScrollView, Modal} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import {useForm} from 'react-hook-form';
import Button from '../components/Button';
import CommonInput from './CommonInput';
import CommonHeader from './CommonHeader';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {registerBeneficiary} from '../store/slice/beneficiarySlice';

const AddModal = ({isAddModalVisible, handleModal, navigation}) => {
  const {loginData} = useSelector(state => state.userDetails);
  const dispatch = useDispatch();

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
      phone: '',
      country: '',
      address: '',
      state: '',
      city: '',
      zip: '',
    },
  });

  const onSubmit = async data => {
    const response = await dispatch(
      registerBeneficiary({data: data, auth: loginData?.token}),
    );

    console.log('PAYLOAD =======>', response.payload);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAddModalVisible}
      onRequestClose={() => {
        handleModal(false);
      }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        centerContent>
        <CommonHeader title={'Add Beneficiary'} navigation={navigation} />
        {/* <View style={styles.modalHeader}>
          <Text
            style={[
              styles.navText,
              {
                paddingLeft: 0,
                fontFamily: Fonts.SORA_BOLD,
                fontWeight: 'bold',
                fontSize: 16,
                color: Colors.WHITE,
              },
            ]}>
            Create New Beneficiary
          </Text>
          <Text
            style={[
              styles.navText,
              {
                paddingLeft: 0,
                fontFamily: Fonts.SORA_BOLD,
                fontWeight: 'bold',
                color: Colors.WHITE,
              },
            ]}
            onPress={() => handleModal(false)}>
            <CloseIcon color={Colors.WHITE} />
          </Text>
        </View> */}
        <View style={styles.modalBody}>
          <Text style={styles.label}>Beneficiary Details</Text>
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
            errors={errors?.country}
            placeholder={'Pick Your Country'}
            label={'Select Country'}
            rules={{
              required: {
                value: true,
                message: 'Please select your country',
              },
            }}
            name={'country'}
            isDropdown={true}
          />
          <Text style={styles.label}>Beneficiary Address</Text>
          <CommonInput
            control={control}
            errors={errors?.city}
            label={'Address'}
            placeholder={'Enter Your Address'}
            name={'address'}
            rules={{
              required: {
                value: true,
                message: 'Please enter your address',
              },
            }}
          />
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
          <View style={{marginVertical: 32}}>
            <Button
              text={'Add Beneficiary'}
              disabled={!formState.isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: Colors.PRIMARY,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY_LIGHT,
  },
  modalBody: {
    marginHorizontal: 16,
  },
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingVertical: 16,
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
});
