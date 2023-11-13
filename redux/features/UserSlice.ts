import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState, Register, Login } from "../../app/shared/userTypes";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const loginUserAsync = createAsyncThunk("user/login", async (loginData: Login) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    throw (error as { response?: { data?: any } })?.response?.data || error;
  }
});

export const authenticateUserWithTokenAsync = createAsyncThunk("user/authenticateWithToken", async (token: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (error as { response?: { data?: any } })?.response?.data || error;
  }
});

export const registerUserAsync = createAsyncThunk<
  { cookies: string[] | undefined; responseData: any },
  Register
>("user/register", async (registerData: Register) => {
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, registerData, {
      withCredentials: true,
    });
    
    const { token: cookies } = response.data;
    const responseData = response.data;

    return { cookies, responseData };
  } catch (error) {
    throw (error as { response?: { data?: any } })?.response?.data || error;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: { isAuthenticated: false, user: null, rol:"" } as UserState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUserStatus: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUserAsync.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload as User; 
      state.rol = action.payload
    })
    .addCase(registerUserAsync.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.responseData as User; 
    });
  },
});

export const { logout, setUserStatus } = userSlice.actions;
export default userSlice.reducer;