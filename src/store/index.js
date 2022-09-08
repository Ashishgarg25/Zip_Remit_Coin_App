import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import standardKycReducer from './slice/standardKycSlice';
import transactionReducer from './slice/transactionSlice';
import beneficiaryReducer from './slice/beneficiarySlice';
import sendMoneyReducer from './slice/sendMoneySlice';

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    standardKyc: standardKycReducer,
    transactions: transactionReducer,
    beneficiary: beneficiaryReducer,
    sendMoney: sendMoneyReducer,
  },
});
