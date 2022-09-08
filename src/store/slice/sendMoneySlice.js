import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {request} from '../../process/request';

export const mobileWallet = createAsyncThunk(
  'sendMoney/mobileWallet',
  async (data, {rejectWithValue}) => {
    try {
      console.log('DATA ===========>111', data);
      console.log('AUTH ===========>', data.auth);
      const newData = {
        amount: data.data.amount,
        sender_currency: data.data.currency,
        receiver_currency: data.data.currency,
        receiver_first: data.data.firstname,
        receiver_last: data.data.lastname,
        phoneNumber: data.data.phone,
        beneficiary_id: data.data.beneficiary_id,
      };
      const response = await request(
        'sendMoney/mobileWallet',
        data.auth,
        'POST',
        newData,
      );
      return response.json();
    } catch (err) {
      console.log('ERROR ==========>', err.message);
    }
  },
);

export const getSendMoneySchedule = createAsyncThunk(
  'sendMoney/getSchedule',
  async (data, {rejectWithValue}) => {
    try {
      const response = await request('sendMoney/getSchedule', data.auth, 'GET');
      return response.json();
    } catch (err) {
      console.log(err);
    }
  },
);

const initialState = {
  data: {},
  loading: '',
};

export const sendMoneySlice = createSlice({
  name: 'topup',
  initialState,
});

export default sendMoneySlice.reducer;
