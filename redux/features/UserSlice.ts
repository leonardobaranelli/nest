import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState, Register, Login } from "../../app/shared/userTypes";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const loginUserAsync = createAsyncThunk("user/login", async (loginData: Login) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, loginData);
    localStorage.setItem('keys', JSON.stringify({...data}));
    return {...data};
  } catch (error) {
    throw (error as { response?: { data?: any } })?.response?.data || error;
  }
});

export const authenticateUserWithTokenAsync = createAsyncThunk("user/authenticateWithToken", async () => {
  try {
    const stringKeys = localStorage.getItem('keys');
    const keys = stringKeys 
      ? JSON.parse(stringKeys)
      : null;
    
    const queryParams = new URLSearchParams({
      email: `${keys?.email}`,
      token: `${keys?.token}`,
    });
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token?${queryParams.toString()}`);
    const { password, deletedAt, createdAt, updatedAt, ...userData } = data;
    return userData
  } catch (error) {
    throw (error as { response?: { data?: any } })?.response?.data || error; //Generalmente significa reLogear
  }
});

export const registerUserAsync = createAsyncThunk<{ token: string, email: string, responseData?:string, cookies?:string }, Register>("user/register", 
async (registerData: Register) => {
  try {
    const { data } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, registerData, {
      withCredentials: true,
    });
    localStorage.setItem('keys', JSON.stringify({...data}));
    return {...data};
  } catch (error) {
    throw (error as { response?: { data?: any } })?.response?.data || error;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: { isAuthenticated: false, user: null, keys: null } as UserState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("keys")
    },
    setUserStatus: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUserAsync.fulfilled, (state, action) => {
      state.keys = action.payload;
    })
    .addCase(registerUserAsync.fulfilled, (state, action) => {
      state.keys = action.payload; 
    })
    .addCase(authenticateUserWithTokenAsync.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload ? true : false;
      state.user = action.payload;
    });
  },
});

export const { logout, setUserStatus } = userSlice.actions;
export default userSlice.reducer;