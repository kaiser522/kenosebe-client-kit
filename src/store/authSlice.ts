import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { authAPI, fetchCSRFToken } from '@/lib/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

export const initAuth = createAsyncThunk(
  'auth/init',
  async () => {
    await fetchCSRFToken();
    const currentUser = await authAPI.getCurrentUser();
    return currentUser;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const user = await authAPI.login(username, password);
    return user;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authAPI.logout();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(initAuth.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
