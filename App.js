import React from 'react';
import {LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Launch from './src/screens/Launch';
import OnboardingScreen from './src/screens/OnboardingScreen';
import Home from './src/screens/Home';
import SendMoney from './src/screens/SendMoney';
import Beneficiary from './src/screens/Beneficiary';
import SendMoneyComplete from './src/screens/SendMoneyComplete';
import KycStatus from './src/screens/KycStatus';
import Transactions from './src/screens/Transactions';
import Topup from './src/screens/Topup';
import {Provider} from 'react-redux';
import {store} from './src/store';
import BeneficiaryInformation from './src/screens/BeneficiaryInformation';
import Profile from './src/screens/Profile';
import FundWallet from './src/screens/FundWallet';
import WalletTransfer from './src/screens/WalletTransfer';
import Auth from './src/screens/Auth';
import StandardKyc from './src/screens/StandardKyc';
import ToastConfig from './src/components/ToastConfig';
import Checkout from './src/screens/Checkout';
import {StripeProvider} from '@stripe/stripe-react-native';
import TopupDetails from './src/screens/TopupDetails';
import PeerTransfer from './src/screens/PeerTransfer';
import Notifications from './src/screens/Notifications';
import Schedule from './src/screens/Schedule';
import TransactionDetails from './src/screens/TransactionDetails';
import Settings from './src/screens/Settings';

const App = () => {
  LogBox.ignoreAllLogs();

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={'pk_test_A6ijRoaDCzAPZQHxV5RdNbG5'}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Launch" component={Launch} />
            <Stack.Screen name="Onboard" component={OnboardingScreen} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SendMoney" component={SendMoney} />
            <Stack.Screen name="Beneficiary" component={Beneficiary} />
            <Stack.Screen
              name="SendMoneyComplete"
              component={SendMoneyComplete}
            />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="kycStatus" component={KycStatus} />
            <Stack.Screen name="Topup" component={Topup} />
            <Stack.Screen name="TopupDetails" component={TopupDetails} />
            <Stack.Screen name="Transactions" component={Transactions} />
            <Stack.Screen
              name="TransactionDetails"
              component={TransactionDetails}
            />
            <Stack.Screen
              name="BeneficiaryInformation"
              component={BeneficiaryInformation}
            />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="FundWallet" component={FundWallet} />
            <Stack.Screen name="PeerTransfer" component={PeerTransfer} />
            <Stack.Screen name="WalletTransfer" component={WalletTransfer} />
            <Stack.Screen name="StandardKyc" component={StandardKyc} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={ToastConfig} />
      </StripeProvider>
    </Provider>
  );
};

export default App;
