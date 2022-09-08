/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import SendIcon from './icons/SendIcon';
import Fonts from '../utils/Fonts';
import TopupIcon from './icons/TopupIcon';
import FundIcon from './icons/FundIcon';
import CloseIcon from './icons/CloseIcon';
import {useDispatch} from 'react-redux';
import {logout} from '../store/slice/userSlice';
import LogoutIcon from './icons/LogoutIcon';
import SettingsIcon from './icons/SettingsIcon';
import ContactIcon from './icons/ContactIcon';
import StatusIcon from './icons/StatusIcon';
import PeerIcon from './icons/PeerIcon';
import TransactionIcon from './icons/TransactionIcon';
import CurrencyIcon from './icons/CurrencyIcon';

const Sidebar = props => {
  const dispatch = useDispatch();

  const navItems = [
    {
      image: (
        <View style={[styles.iconContainer, {backgroundColor: Colors.BLUE}]}>
          <SendIcon />
        </View>
      ),
      text: 'Send Money',
    },
    {
      image: (
        <View style={[styles.iconContainer, {backgroundColor: Colors.GREEN}]}>
          <FundIcon />
        </View>
      ),
      text: 'Fund Wallet',
    },
    {
      image: (
        <View style={[styles.iconContainer, {backgroundColor: Colors.ORANGE}]}>
          <TopupIcon />
        </View>
      ),
      text: 'Airtime Topup',
    },
    {
      image: (
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: Colors.INFO, paddingLeft: 11, paddingTop: 10},
          ]}>
          <StatusIcon />
        </View>
      ),
      text: 'KYC Status',
    },
    {
      image: (
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: Colors.PURPLE, paddingLeft: 10, paddingTop: 10},
          ]}>
          <TransactionIcon color={Colors.WHITE} />
        </View>
      ),
      text: 'Transactions',
    },
    {
      image: (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: Colors.SECONDARY_BROWN,
              paddingLeft: 10,
              paddingTop: 8.5,
            },
          ]}>
          <PeerIcon color={Colors.WHITE} />
        </View>
      ),
      text: 'Beneficiary',
    },
    {
      image: (
        <View
          style={[styles.iconContainer, {backgroundColor: Colors.DARK_GREEN}]}>
          <ContactIcon color={Colors.WHITE} />
        </View>
      ),
      text: 'My Profile',
    },
    {
      image: (
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: Colors.DARK_BLUE, paddingTop: 9, paddingLeft: 9},
          ]}>
          <SettingsIcon />
        </View>
      ),
      text: 'Settings',
    },
    {
      image: (
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: Colors.PURPLE, paddingTop: 9, paddingLeft: 9},
          ]}>
          <CurrencyIcon color={Colors.WHITE} />
        </View>
      ),
      text: 'Refer & Earn',
    },
    {
      image: (
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: Colors.RED, paddingLeft: 13, paddingTop: 11},
          ]}>
          <LogoutIcon />
        </View>
      ),
      text: 'Logout',
    },
  ];

  const routePage = idx => {
    props?.updateVisibility(false);
    if (idx === 0) {
      props.navigation.navigate('SendMoney');
    } else if (idx === 1) {
      props.navigation.navigate('FundWallet');
    } else if (idx === 2) {
      props.navigation.navigate('Topup');
    } else if (idx === 3) {
      props.navigation.navigate('kycStatus');
    } else if (idx === 4) {
      props.navigation.navigate('Transactions');
    } else if (idx === 5) {
      props.navigation.navigate('BeneficiaryInformation');
    } else if (idx === 6) {
      props.navigation.navigate('Profile');
    } else if (idx === 7) {
      props.navigation.navigate('Settings');
    } else if (idx === 9) {
      dispatch(logout('USER_LOGOUT'));
      props.navigation.navigate('Auth', {isModalVisible: true});
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props?.isVisibleFromDashboard}
      onRequestClose={() => {
        props?.updateVisibility(false);
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.navHeader}>
            <Text
              style={[
                styles.navText,
                {
                  paddingLeft: 0,
                  fontFamily: Fonts.SORA_BOLD,
                  fontWeight: 'bold',
                },
              ]}>
              Menu
            </Text>
            <TouchableOpacity onPress={() => props?.updateVisibility(false)}>
              <Text
                style={[
                  styles.navText,
                  {
                    paddingLeft: 0,
                    fontFamily: Fonts.SORA_BOLD,
                    fontWeight: 'bold',
                    paddingHorizontal: 8,
                  },
                ]}>
                <CloseIcon />
              </Text>
            </TouchableOpacity>
          </View>
          {navItems.map((navItem, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.navItem}
              onPress={() => routePage(idx)}>
              <Text>{navItem.image}</Text>
              <Text
                style={[
                  styles.navText,
                  {
                    color:
                      idx === navItems.length - 1 ? Colors.RED : Colors.WHITE,
                  },
                ]}>
                {navItem.text}
              </Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: Dimensions.get('window').height,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY_LIGHT,
    paddingTop: 24,
  },
  navItem: {
    padding: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY_LIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navText: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 16,
    color: Colors.WHITE,
    letterSpacing: 0.3,
    lineHeight: 20,
    paddingLeft: 16,
  },
  iconContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 8,
    borderRadius: 8,
    width: 40,
    height: 40,
  },
});
