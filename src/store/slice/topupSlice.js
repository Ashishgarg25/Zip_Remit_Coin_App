import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {request} from '../../process/request';

export const getProviders = createAsyncThunk(
  'topup/providers',
  async (data, {rejectWithValue}) => {
    try {
      console.log('DATA ===========>', data);
      const response = await request(
        `topup/providers?mobile=${data.data.mobile}&country_iso=${data.data.country_code}`,
        data.auth,
        'GET',
      );

      return response.json();
    } catch (err) {
      console.log('ERROR ==========>', err.message);
    }
  },
);

export const getDataPlans = createAsyncThunk(
  'topup/plans',
  async (data, {rejectWithValue}) => {
    try {
      console.log('DATA ===========>', data);
      const response = await request(
        `topup/plans?mobile=${data.mobile}&country_iso=${data.country_iso}&provider_code=${data.provider_code}`,
        data.auth,
        'GET',
      );

      return response.json();
    } catch (err) {
      console.log('ERROR ==========>', err.message);
    }
  },
);

export const recharge = createAsyncThunk(
  'topup/recharge',
  async (data, {rejectWithValue}) => {
    try {
      console.log('DATA ===========>', data);
      const newData = {
        sku_code: data?.sku_code,
        send_value: data?.send_value,
        amount: data?.amount,
        mobile: data?.mobile,
        logo_url: data?.logo_url,
        validate_only: data?.validate_only,
      };
      const response = await request(
        'topup/recharge',
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

const initialState = {
  data: {},
  loading: '',
};

export const topupSlice = createSlice({
  name: 'topup',
  initialState,
  extraReducers: {
    // REGISTER USER CODES
    [getProviders.pending]: state => {
      state.loading = 'pending';
    },
    [getProviders.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
    [getProviders.rejected]: state => {
      state.loading = 'failed';
      state.data = {};
    },
    // REGISTER USER CODES
    [getDataPlans.pending]: state => {
      state.loading = 'pending';
    },
    [getDataPlans.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
    [getDataPlans.rejected]: state => {
      state.loading = 'failed';
      state.data = {};
    },
  },
});

export default topupSlice.reducer;
