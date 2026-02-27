import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
    name:"theme",
    initialState:{mode: "light"},
    reducers:{
        toggletheme:(state, action) => { 
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { toggletheme } = darkSlice.actions;

export default darkSlice.reducer;