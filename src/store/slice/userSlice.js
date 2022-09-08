import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authRequest, request, requestWithUploads} from '../../process/request';

export const registerUser = createAsyncThunk(
  'user/createAccount',
  async (data, {rejectWithValue}) => {
    const {fullName, email, phone, password, refCode, country, currency} = data;

    const name = fullName.split(' ');
    const newPayload = {
      firstname: name[0],
      lastname: name[1],
      phone,
      email,
      password,
      referral_code: refCode,
      country,
      currency,
    };
    try {
      const response = await authRequest(
        'user/createAccount',
        'POST',
        newPayload,
      );
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const checkUser = createAsyncThunk(
  'user/signin',
  async (data, {rejectWithValue}) => {
    const newPayload = {
      email: data.email,
      password: data.password,
    };
    try {
      console.log('DATA ===========>', data);
      const response = await authRequest('user/signin', 'POST', newPayload);
      console.log('RESPONSE =========>', response);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const sendCode = createAsyncThunk(
  'user/sendOtp',
  async (data, {rejectWithValue}) => {
    const newPayload = {
      mobile: data.mobile,
    };
    try {
      console.log('DATA ===========>', data);
      return await authRequest('user/sendOtp', 'POST', newPayload);
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const verifyCode = createAsyncThunk(
  'user/verifyOtp',
  async (data, {rejectWithValue}) => {
    try {
      console.log('DATA ===========>', data);
      return await authRequest('user/verifyOtp', 'POST', data);
    } catch (err) {
      console.log(err.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'address/addAddress',
  async (data, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('address', JSON.stringify(data.addressDetails.address));
      formData.append('city', JSON.stringify(data.addressDetails.city));
      formData.append('state', JSON.stringify(data.addressDetails.state));
      formData.append('postCode', JSON.stringify(data.addressDetails.postCode));
      formData.append('profilePic', {
        name: data.profilePic.fileName,
        uri: data.profilePic.uri,
        type: data.profilePic.type,
      });

      const response = await requestWithUploads(
        'address/addAddress',
        data.auth,
        'POST',
        formData,
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  },
);

export const dashboardContent = createAsyncThunk(
  'user/dashboard',
  async (data, {rejectWithValue}) => {
    try {
      const response = await request('user/dashboard', data, 'GET');
      console.log('PAYLOAD RESP', response);
      return response.json();
    } catch (err) {
      console.log(err);
    }
  },
);

const initialState = {
  data: {},
  loginData: {},
  loading: '',
  mobileData: {},
  dashboardData: {},
};

export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    logout: (state, action) => {
      console.log('PAYLOAD =======>', action.payload);
      if (action.payload === 'USER_LOGOUT') {
        return initialState;
      }
    },
  },
  extraReducers: {
    // REGISTER USER CODES
    [registerUser.pending]: state => {
      state.loading = 'pending';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.data = action.payload;
    },
    [registerUser.rejected]: state => {
      state.loading = 'failed';
      state.data = {};
    },
    // SIGNIN USER CODES
    [checkUser.pending]: state => {
      state.loading = 'pending';
    },
    [checkUser.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.loginData = action.payload;
    },
    [checkUser.rejected]: state => {
      state.loading = 'failed';
      state.loginData = {};
    },
    // SEND OTP CODE
    [sendCode.pending]: state => {
      state.loading = 'pending';
    },
    [sendCode.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.mobileData = action.payload;
    },
    [sendCode.rejected]: state => {
      state.loading = 'failed';
      state.mobileData = {};
    },
    // VERIFY OTP CODE
    [verifyCode.pending]: state => {
      state.loading = 'pending';
    },
    [verifyCode.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.mobileData = action.payload;
    },
    [verifyCode.rejected]: state => {
      state.loading = 'failed';
      state.mobileData = {};
    },
    // DASHBOARD DATA
    [dashboardContent.pending]: state => {
      state.loading = 'pending';
    },
    [dashboardContent.fulfilled]: (state, action) => {
      state.loading = 'success';
      state.dashboardData = action.payload;
    },
    [dashboardContent.rejected]: state => {
      state.loading = 'failed';
      state.dashboardData = {};
    },
  },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
