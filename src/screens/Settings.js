/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';
import LockIcon from '../components/icons/LockIcon';
import PinModal from '../components/PinModal';
import OtpImage from '../components/icons/OtpImage';
import {request} from '../process/request';
import {useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useEffect} from 'react';
import CommonModal from '../components/CommonModal';
import WarnIcon from '../components/icons/WarnIcon';

const Settings = () => {
  const navigation = useNavigation();
  const {loginData} = useSelector(state => state?.userDetails);
  const [isEnabled, setIsEnabled] = useState(false);
  const [disablePin, setDisablePin] = useState(false);

  useEffect(() => {
    getPin();
  }, []);

  const getPin = async () => {
    try {
      const response = await request('user/pin', loginData?.token, 'GET');
      response.json().then(res => {
        console.log(res);
        res.variant.pin !== null ? setIsEnabled(true) : setIsEnabled(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createPin = async value => {
    console.log('response == == ========>', loginData);
    try {
      const response = await request(
        'user/createPin',
        loginData?.token,
        'POST',
        {
          value: value,
        },
      );

      response.json().then(res => {
        const {status, msg, variant} = res;

        if (status === 'success') {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: msg,
          });
          setIsEnabled(variant);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Failed',
            text2: 'Invalid PIN',
          });
        }

        setIsEnabled(false);
        setDisablePin(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Notifications'} navigation={navigation} />
      <View style={{paddingHorizontal: 16}}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.contentWrapper}>
          <View style={styles.wrapper}>
            <LockIcon color={Colors.BLUE} />
            <View>
              <Text style={styles.label}>Enable PIN</Text>
              <Text style={styles.description}>
                Secure your app using a PIN, so you can transfer money with ease
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{false: Colors.SECONDARY_GREY, true: Colors.GREEN}}
            thumbColor={Colors.WHITE}
            ios_backgroundColor={Colors.SECONDARY_GREY}
            onValueChange={() => {
              isEnabled !== false ? setDisablePin(true) : setIsEnabled(true);
            }}
            value={isEnabled}
          />
        </View>
      </View>
      <PinModal
        isModalVisible={isEnabled}
        setIsVisible={setIsEnabled}
        icon={<OtpImage width={200} height={200} />}
        title={'Create New PIN'}
        text={'Please enter 4 digit PIN'}
        buttonText={'Submit'}
        createPin={createPin}
      />
      <CommonModal
        isModalVisible={disablePin}
        setIsVisible={setDisablePin}
        icon={<WarnIcon width={32} height={32} />}
        text={' Are you sure you want to disable the PIN!'}
        buttonText={'Disable PIN'}
        buttonVisible={true}
        onPress={() => createPin('')}
        confirm
        cancel
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 25.6,
    color: Colors.BLACK,
    marginVertical: 16,
  },
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.BLACK,
    marginBottom: 4,
    paddingLeft: 8,
  },
  description: {
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.SECONDARY_GREY,
    marginBottom: 8,
    paddingLeft: 8,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 240,
  },
  contentWrapper: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GREY,
  },
});
