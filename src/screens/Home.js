/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DashboardHeader from '../components/DashboardHeader';
import QuickActionContainer from '../components/QuickActionContainer';
import DashboardCards from '../components/DashboardCards';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import PaymentCard from '../components/PaymentCard';
import {useSelector} from 'react-redux';
import CommonModal from '../components/CommonModal';
import WarnIcon from '../components/icons/WarnIcon';
import {useDispatch} from 'react-redux';
import {dashboardContent, sendCode, verifyCode} from '../store/slice/userSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import InputModal from '../components/InputModal';
import OtpImage from '../components/icons/OtpImage';
import {getWalletTransaction} from '../store/slice/transactionSlice';
import moment from 'moment';

const Home = () => {
  // HOOKS, STATES ==============================
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state?.userDetails);
  const user = loginData?.user;

  console.log(user);

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [sessionId, setSessionID] = useState('');
  const [dashboardData, setDashboardData] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getDashboardContent();
    getRecentTransactions();
  }, []);

  // FUNCTIONS ==================================
  const setShowVerification = value => {
    setShowVerificationModal(value);
  };

  const getDashboardContent = async () => {
    const data = await dispatch(dashboardContent(loginData?.token));
    console.log('PAYLOAD11111 ======', data.payload);
    setDashboardData(data.payload.data);
  };

  const getRecentTransactions = async () => {
    const data = await dispatch(
      getWalletTransaction({auth: loginData?.token, type: '*'}),
    );
    setTransactions(data.payload.data);
  };

  const sendVerificationCode = async () => {
    const response = await dispatch(sendCode(`+91${user?.phone}`));

    const {msg, status, session_id} = response.payload;

    console.log('RESPONSE PAYLOAD =============>', response.payload);

    if (status === 'success') {
      console.log('SESSION ID ======>', sessionId);
      setSessionID(session_id);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: msg,
      });
      setShowVerificationModal(false);
      setShowOtpModal(true);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: msg,
      });
    }
  };

  const verifyOtpCode = async value => {
    const data = {
      otp: value,
      session_id: sessionId,
    };

    const response = await dispatch(verifyCode(data));

    const {msg, status} = response.payload;

    console.log('RESPONSE PAYLOAD =============>', response.payload);

    if (status === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: msg,
      });
      setShowOtpModal(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Invalid OTP',
      });
    }
  };

  const allTransactions = ({item}) => {
    return (
      <View key={item.transaction_id}>
        <PaymentCard
          image={item.card_brand}
          name={`${item.payment_type}`}
          time={moment(item.created, 'x').fromNow()}
          amount={(item.amount / 100).toFixed(2)}
          currency={item.currency.toUpperCase()}
          status={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          onPress={() =>
            navigation.navigate('TransactionDetails', {id: item.transaction_id})
          }
        />
      </View>
    );
  };

  const slidesData = [
    {
      image:
        'https://www.mahindrafirstchoice.com/assets/Referral/img/Voucher%20banner.png',
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
      <StatusBar barStyle="light-content" backgroundColor={Colors.BLACK} />
      <DashboardHeader
        navigation={navigation}
        firstName={user?.firstname}
        balance={dashboardData?.total_amount}
        currency={dashboardData?.wallet_type}
      />
      <QuickActionContainer
        navigation={navigation}
        user={user}
        setShowVerification={setShowVerification}
      />
      <View style={{height: 180, marginTop: 8}}>
        {slidesData.map((item, idx) => (
          <>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: 390,
              }}>
              <Image
                source={{uri: item?.image}}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
          </>
        ))}
      </View>
      <View style={styles.cardContainer}>
        <DashboardCards
          heading={'Account Status'}
          title={'Standard KYC'}
          title2={'OTP'}
          title3={'Email'}
          label={
            user?.is_standard_kyc || user?.is_advance_kyc
              ? 'Verified'
              : 'Unverified'
          }
          label2={user?.is_phone_verified ? 'Verified' : 'Unverified'}
          label3={user?.is_email_verified ? 'Verified' : 'Unverified'}
        />
        <DashboardCards
          heading={'Refer & Earn'}
          title={'Referal Code'}
          title2={'Referals'}
          title3={'ZIPCREDIT'}
          label={dashboardData?.user_ref_code}
          label2={`${dashboardData?.ref_code} (${
            10 - dashboardData?.ref_code
          } Pending)`}
          label3={dashboardData?.ref_code >= 10 ? '5%' : '0%'}
        />
      </View>
      <View style={styles.cardContainer}>
        <DashboardCards
          heading={'Wallet Balance'}
          title={'Wallet'}
          title2={'Amount'}
          title3={'Total Wallets'}
          label={user?.currency?.toUpperCase()}
          label2={`${
            dashboardData?.total_amount ? dashboardData?.total_amount : 0.0
          }`}
          label3={'1'}
        />
        <DashboardCards
          heading={'Transactions'}
          title={'Send Money'}
          title2={'Fund Wallet'}
          title3={'Topup'}
          label={dashboardData?.send_money}
          label2={dashboardData?.fund_wallet}
          label3={dashboardData?.peer_to_peer}
        />
      </View>
      {transactions.length > 0 && (
        <View style={styles.transactionContainer}>
          <Text style={styles.title}>Recent Transactions</Text>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={transactions.slice(0, 5)}
              keyExtractor={item => item.transaction_id}
              renderItem={item => allTransactions(item)}
            />
          </View>
        </View>
      )}
      <CommonModal
        isModalVisible={showVerificationModal}
        setIsVisible={setShowVerificationModal}
        icon={<WarnIcon width={54} height={48} color={Colors.ORANGE} />}
        text={
          'Please verify your mobile number before accessing this functionality!'
        }
        buttonText={'Verify'}
        buttonVisible={true}
        confirm={true}
        onPress={() => sendVerificationCode()}
      />
      <InputModal
        isModalVisible={showOtpModal}
        setIsVisible={setShowOtpModal}
        icon={<OtpImage width={200} height={200} />}
        title={'Otp Verification'}
        text={`Please enter the OTP sent to +91 ${user?.phone}`}
        buttonText={'Submit'}
        verifyOtpCode={verifyOtpCode}
        resend={() => sendVerificationCode()}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 25.6,
    color: Colors.BLACK,
    marginBottom: 8,
  },
  transactionContainer: {
    padding: 20,
    marginVertical: 24,
  },
});
