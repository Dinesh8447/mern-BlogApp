import {createSlice} from '@reduxjs/toolkit'

const  initialState ={
    theme:'light',
}

const themeslice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggletheme:(state)=>{
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})


export const {toggletheme} = themeslice.actions

export default themeslice.reducer