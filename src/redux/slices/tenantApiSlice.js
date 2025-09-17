import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from '../../constants';

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
            const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(`${BASEURL}/tenants/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
            const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.put(
        `${BASEURL}/tenants/${id}`,
        { ...updatedData }, 
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating profile");
    }
  }
);


const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProfileState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;
