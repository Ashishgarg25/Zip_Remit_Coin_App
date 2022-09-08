/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {API_URL} from 'react-native-dotenv';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import DefaultProfileIcon from '../components/icons/DefaultProfileIcon';
import CommonInput from '../components/CommonInput';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateProfile} from '../store/slice/userSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);
  const {user} = loginData;
  const [profileImage, setProfileImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: `${user?.firstname} ${user?.lastname}`,
      email: user?.email,
      phone: user?.phone,
      // dob: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      address: '',
    },
  });

  const launchImagePicker = async (type, cameraType) => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
      maxWidth: 1200,
      maxHeight: 1200,
      cameraType: cameraType,
    };

    let result;

    if (type === 'upload') {
      launchImageLibrary(options);
      result = await launchImageLibrary(options);
    } else {
      launchCamera(options);
      result = await launchCamera(options);
    }

    console.log('RESULT ============>', result);
    if (result.assets[0].fileSize > 2000000) {
      console.log('Exceed 2mb');
    } else {
      setProfileImage({
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      });
    }
  };

  const onSubmit = async data => {
    console.log(data);
    const newData = {
      addressDetails: {
        state: data.state,
        city: data.city,
        postCode: data.zipCode,
        address: data.address,
      },
      profilePic: profileImage,
      auth: loginData?.token,
    };

    const profile = await dispatch(updateProfile(newData));

    console.log(profile.payload);

    const {status, msg} = profile.payload;

    if (status === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: msg,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: msg,
      });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'My Profile Details'} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContainer}>
          <TouchableOpacity
            style={{
              marginTop: 16,
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() => launchImagePicker('upload', 'front')}>
            {profileImage !== null ? (
              <Image
                source={{uri: profileImage.uri}}
                resizeMode="cover"
                style={{width: 120, height: 120, borderRadius: 100}}
              />
            ) : user?.profile_pic_file_path !== '' ? (
              <Image
                source={{uri: `${API_URL}/${user?.profile_pic_file_path}`}}
                resizeMode="cover"
                style={{width: 120, height: 120, borderRadius: 100}}
              />
            ) : (
              <DefaultProfileIcon color={Colors.BLUE} />
            )}
          </TouchableOpacity>

          <Text style={styles.heading}>Profile Information</Text>
          <CommonInput
            control={control}
            prefilledValue={`${user?.firstname} ${user?.lastname}`}
            errors={errors?.fullName}
            placeholder={'John Smith Doe'}
            labelStyle={{marginTop: 24}}
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
            errors={errors?.email}
            prefilledValue={user?.email}
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
            prefilledValue={user?.phone}
            placeholder={'Mobile Number'}
            label={'Mobile'}
            rules={{
              required: {
                value: true,
                message: 'Mobile number is required',
              },
              // minLength: {
              //   value: 10,
              //   message: 'Invalid mobile number',
              // },
              // maxLength: {
              //   value: 10,
              //   message: 'Invalid mobile number',
              // },
            }}
            name={'phone'}
          />

          {/* <Controller
            control={control}
            errors={errors?.dob}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
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
          )} */}
          <Text style={[styles.heading, {paddingTop: 24}]}>
            Address Information
          </Text>
          <CommonInput
            control={control}
            errors={errors?.country}
            prefill={user?.country}
            placeholder={'Pick Your Country'}
            label={'Country'}
            labelStyle={{marginTop: 24}}
            rules={{
              required: {
                value: true,
                message: 'Please select your country',
              },
            }}
            name={'country'}
            isDropdown={true}
          />
          <CommonInput
            control={control}
            errors={errors?.state}
            prefill={user?.state}
            placeholder={'Pick Your State'}
            label={'Province / State'}
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
            errors={errors?.address}
            prefill={user?.address}
            placeholder={'Physical Address'}
            label={'Address'}
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
            name={'address'}
          />

          <CommonInput
            control={control}
            errors={errors?.city}
            prefill={user?.city}
            placeholder={'City'}
            label={'City'}
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
            name={'city'}
          />

          <CommonInput
            control={control}
            errors={errors?.zipCode}
            prefill={user?.zip}
            placeholder={'Postal / Zip Code'}
            label={'Postal / Zip Code'}
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
            name={'zipCode'}
          />

          <View style={{marginTop: 32, marginBottom: 168}}>
            <Button
              text={'Update Profile'}
              onPress={handleSubmit(onSubmit)}
              // disabled={!formState.isValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Profile;

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
});
