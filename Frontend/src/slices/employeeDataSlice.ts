import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { EmployeeRecord } from "../types/EmployeeRecord";
import { Delay } from "../helpers/Helpers";

const dummyURL = "https://randomuser.me/api/?results=10";

type FetchEmployeeDataResponse = EmployeeRecord[];

export const fetchEmployeeData = createAsyncThunk<FetchEmployeeDataResponse>("employeeData/fetchEmployeeData", async (_, { rejectWithValue }) => {
  try {
    await Delay(1000);
    const response = await axios.get<{ results: EmployeeRecord[] }>(dummyURL);
    return response.data.results.map((employeeRecord) => ({
      id: employeeRecord.id,
      gender: employeeRecord.gender,
      name: {
        title: employeeRecord.name.title,
        first: employeeRecord.name.first,
        last: employeeRecord.name.last,
      },
      dob: {
        age: employeeRecord.dob.age,
        date: employeeRecord.dob.date,
      },
      location: {
        city: employeeRecord.location.city,
        country: employeeRecord.location.country,
      },
      email: employeeRecord.email,
      phone: employeeRecord.phone,
      picture: {
        medium: employeeRecord.picture.medium,
        large: employeeRecord.picture.large,
      },
    }));
  } catch (error: any) {
    return rejectWithValue("Failed to fetch employee data");
  }
});

const initialState: { data: EmployeeRecord[]; loading: boolean; error: string | null } = {
  data: [],
  loading: false,
  error: null,
};

const employeeDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {
    reset(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action: PayloadAction<EmployeeRecord[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployeeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = employeeDataSlice.actions;

export const employeeDataReducer = employeeDataSlice.reducer;
