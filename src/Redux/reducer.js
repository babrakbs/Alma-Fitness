import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    token: '',
    user: [],
    loginData: {},
    fcmToken: '',
    filtersOfclasses: null, // <-- Add this line to store filters
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setFiltersOfclasses: (state, action) => {
      console.log('action.payload filters', action.payload);
      state.filtersOfclasses = action.payload;
      console.log('action.payload filters', state.filtersOfclasses);
    },
    clearFiltersOfclasses: (state) => {
      state.filtersOfclasses = null;
    },
  },
});

export const {setUser, setToken, setLoginData, setFcmToken, setFiltersOfclasses, clearFiltersOfclasses} = AuthSlice.actions;

export default AuthSlice.reducer;
