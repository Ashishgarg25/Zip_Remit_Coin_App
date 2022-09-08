import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {request} from '../../process/request';

export const registerBeneficiary = createAsyncThunk(
  'beneficiary/createBeneficiary',
  async (data, {rejectWithValue}) => {
    console.log('DATA =========>', data);
    const {fullName, phone, country, state, city, zip, address} = data.data;

    const name = fullName.split(' ');
    const newPayload = {
      firstname: name[0],
      lastname: name[1],
      phone,
      country,
      state,
      city,
      postCode: zip,
      address,
    };
    try {
      const response = await request(
        'beneficiary/createBeneficiary',
        data.auth,
        'POST',
        newPayload,
      );
      return response.json();
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const getBeneficiary = createAsyncThunk(
  'beneficiary/',
  async (data, {rejectWithValue}) => {
    try {
      const response = await request('beneficiary/', data.auth, 'GET');
      return response.json();
    } catch (err) {
      console.log(err.message);
    }
  },
);

const initialState = {
  data: [],
  loading: '',
};

export const getBeneficiaryById = createAsyncThunk(
  'beneficiary/beneficiary_id',
  async (data, {rejectWithValue}) => {
    try {
      console.log('DATA', data);

      const response = await request(
        `beneficiary/${data.beneficiary_id}`,
        data.auth,
        'GET',
      );
      return response.json();
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const userSlice = createSlice({
  name: 'beneficiary',
  initialState,
  extraReducers: {
    // REGISTER BENEFICIARY CODES
    [registerBeneficiary.pending]: state => {
      state.loading = 'pending';
    },
    [registerBeneficiary.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
    [registerBeneficiary.rejected]: state => {
      state.loading = 'failed';
      state.data = {};
    },
    [getBeneficiary.pending]: state => {
      state.loading = 'pending';
    },
    [getBeneficiary.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
    [getBeneficiary.rejected]: state => {
      state.loading = 'failed';
      state.data = {};
    },
  },
});

export default userSlice.reducer;
