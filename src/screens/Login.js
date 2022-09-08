/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/Colors';
import {useForm} from 'react-hook-form';
import Button from '../components/Button';
import Fonts from '../utils/Fonts';
import {checkUser} from '../store/slice/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import CommonModal from '../components/CommonModal';
import Check from '../components/icons/Check';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CommonInput from '../components/CommonInput';

const Login = ({setIsRegister, setIsModalVisible}) => {
  // NAVIGATION, REDUX =========================
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.userDetails);

  // HOOKS =====================================
  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    formState,
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // FUNCTIONS ==============================
  const setIsVisible = value => {
    setIsModalVisible1(value);
  };

  const onSubmit = async data => {
    const response = await dispatch(checkUser(data));
    const {status, msg} = response.payload;
    console.log('RESP', response.payload);
    if (status === 'pending') {
      setIsModalVisible1(true);
    } else if (status === 'success') {
      setIsModalVisible(false);
      reset();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login Successful',
      });
      navigation.navigate('Home');
    } else {
      setIsModalVisible1(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          msg !== undefined ? msg : 'Something went wrong. Please try again!',
      });
    }
  };

  // UI ============================
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}>
        <Text style={styles.title}>Sign In</Text>
        <View style={{paddingBottom: 64}}>
          <CommonInput
            control={control}
            errors={errors.email}
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
            errors={errors.password}
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

          <View style={{marginTop: 24}}>
            <Button
              text={'Sign In'}
              onPress={handleSubmit(onSubmit)}
              disabled={!formState.isValid || loading === 'pending'}
              loading={loading}
            />
          </View>
          <View style={{marginTop: 16}}>
            <Text
              style={{
                fontWeight: '600',
                fontFamily: Fonts.SORA_SEMI_BOLD,
                color: Colors.ORANGE,
                textAlign: 'center',
                marginTop: 24,
              }}>
              Forgot Password?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 64,
            }}>
            <Text style={styles.signUpText}>
              Don't have an account yet?{'  '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsRegister(true);
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontFamily: Fonts.SORA_SEMI_BOLD,
                  color: Colors.ORANGE,
                  marginTop: 0,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <CommonModal
        isModalVisible={isModalVisible1}
        setIsVisible={setIsVisible}
        icon={<Check width={18} height={18} />}
        text={
          ' We have sent you an email verification link. \n Please confirm to proceed!'
        }
        buttonText={'Ok'}
        buttonVisible={true}
      />
    </ScrollView>
  );
};

export default Login;

// STYLES ===========================
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
    height: 600,
  },
  signUpText: {
    fontSize: 14,
    lineHeight: 23.8,
    fontWeight: '400',
    fontFamily: Fonts.SORA_REGULAR,
    color: Colors.SECONDARY_GREY,
    textAlign: 'center',
    paddingTop: 0,
  },
});
