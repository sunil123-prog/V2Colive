import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../constants";

// ✅ Add a new room
export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASEURL}/rooms`, roomData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add room");
    }
  }
);

// ✅ Fetch all rooms
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASEURL}/rooms`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch rooms");
    }
  }
);

// ✅ Update room availability (mark as occupied/vacant)
export const updateRoomStatus = createAsyncThunk(
  "rooms/updateRoomStatus",
  async ({ roomId, isOccupied }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASEURL}/rooms/${roomId}`, { isOccupied });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update room");
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearRoomState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD ROOM
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.rooms.push(action.payload); // ✅ Add new room to state
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ROOMS
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload; // ✅ Set rooms from backend
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE ROOM STATUS
      .addCase(updateRoomStatus.fulfilled, (state, action) => {
        const updatedRoom = action.payload;
        state.rooms = state.rooms.map((room) =>
          room.id === updatedRoom.id ? updatedRoom : room
        );
      })
      .addCase(updateRoomStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearRoomState } = roomSlice.actions;
export default roomSlice.reducer;
