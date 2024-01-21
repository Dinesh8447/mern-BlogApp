import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuser:null,
    error:null,
    loading:false
}


const userslice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signinstart:(state)=>{
            state.loading = true
            state.error=null
        },

        signinsuccess:(state,action)=>{
            state.currentuser = action.payload
            state.loading = false
            state.error=null
        },
        signinfailure:(state,action)=>{
            state.loading = false
            state.error=action.payload
        },
    }
})


export const {signinfailure,signinstart,signinsuccess} = userslice.actions
export default userslice.reducer

