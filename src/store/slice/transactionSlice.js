import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {request} from '../../process/request';

export const getWalletTransaction = createAsyncThunk(
  'transactions/',
  async (data, {rejectWithValue}) => {
    try {
      console.log(data);
      const response = await request(
        `transactions/${data.type}`,
        data.auth,
        'GET',
      );
      return response.json();
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const getTransactionById = createAsyncThunk(
  'transactions/id',
  async (data, {rejectWithValue}) => {
    try {
      console.log(data);
      const response = await request(
        `transactions?id=${data.id}`,
        data.auth,
        'GET',
      );
      return response.json();
    } catch (err) {
      console.log(err.message);
    }
  },
);

const initialState = {
  data: {},
  loading: '',
};

export const transactionSlice = createSlice({
  name: 'userDetails',
  initialState,
  extraReducers: {
    // GET TRANSACTIONS BY TYPE
    [getWalletTransaction.pending]: state => {
      state.loading = 'pending';
    },
    [getWalletTransaction.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
    [getWalletTransaction.rejected]: state => {
      state.loading = 'failed';
      state.data = {};
    },

    // GET TRANSACTION BY ID
    [getTransactionById.pending]: state => {
      state.loading = 'pending';
    },
    [getTransactionById.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
    [getTransactionById.rejected]: state => {
      state.loading = 'failed';
      state.data = {};
    },
  },
});

export default transactionSlice.reducer;
