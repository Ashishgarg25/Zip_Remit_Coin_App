import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {requestWithUploads} from '../../process/request';

export const submitKyc = createAsyncThunk(
  'kyc/addKyc',
  async (data, {rejectWithValue}) => {
    console.log('KYC THUNK DATA ========>', data);

    const name = data.standardKycDetails.fullName.split(' ');

    const formData = new FormData();
    formData.append('firstname', JSON.stringify(name[0]));
    formData.append('lastname', JSON.stringify(name[1]));
    formData.append('email', JSON.stringify(data.standardKycDetails.email));
    formData.append('mobile', JSON.stringify(data.standardKycDetails.phone));
    formData.append('dob', JSON.stringify(data.standardKycDetails.dob));
    formData.append('country', JSON.stringify(data.standardKycDetails.country));
    formData.append(
      'doc_type',
      JSON.stringify(data.standardKycDetails.doc_type),
    );
    formData.append(
      'id_number',
      JSON.stringify(data.standardKycDetails.id_number),
    );
    formData.append(
      'id_expiry',
      JSON.stringify(data.standardKycDetails.id_expiry),
    );
    formData.append('frontImage', {
      name: data.frontImage.fileName,
      uri: data.frontImage.uri,
      type: data.frontImage.type,
    });
    formData.append('backImage', {
      name: data.backImage.fileName,
      uri: data.backImage.uri,
      type: data.backImage.type,
    });

    try {
      const response = await requestWithUploads('kyc/addKyc', 'POST', formData);
      response.then(res => {
        console.log(res);
      });
      // console.log('THUNK RESPONSE ============>', response);
      // return response;
    } catch (err) {
      console.log(err.message);
    }
  },
);

const initialState = {
  value: 0,
  data: {},
};

export const standardKycSlice = createSlice({
  name: 'standardKyc',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1;
      state.data = {...state.data, ...action.payload};
    },
    decrement: state => {
      state.value -= 1;
      state.data = {...state.data};
    },
  },
});

export const {increment, decrement} = standardKycSlice.actions;

export default standardKycSlice.reducer;
