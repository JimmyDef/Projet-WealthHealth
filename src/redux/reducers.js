import { createSlice } from "@reduxjs/toolkit";
import mockedData1000Employees from "./../assets/mockedData1000Employees.json";

export const employeesSlice = createSlice({
  name: "employeesData",
  initialState: { employees: mockedData1000Employees },
  reducers: {
    addEmployeeInfos: (state, action) => {
      state.employees.push(action.payload);
      return state;
    },
    clearEmployeeInfos: (state) => {
      state.employees.length = 0;
      return state;
    },
  },
});

export const { addEmployeeInfos, clearEmployeeInfos } = employeesSlice.actions;
