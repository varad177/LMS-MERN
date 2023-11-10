import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosinstance from "../../helpers/axiosInstance"


const initialState = {
    key : "",
    subcription_id :"",
    isPaymentVarified : false,
    allPayments:{},
    finalMonth :{},
    monthlySalesRecords :[],
}


export const getRazorPayId = createAsyncThunk('/razorpay/getid', async ()=>{
    try {
        const response = await axiosinstance.get("/payments/razorpay-key");
        return response.data;
        
    } catch (error) {
        toast.error("faild to load data")
    }
})

export const purchaseCourseBundle = createAsyncThunk('/purchasecourse', async (id)=>{
    try {
        const response = await axiosinstance.post(`/payments/subscribe/${id}`);
        return response.data;

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const varifyUserPayment = createAsyncThunk('/payment/varify', async (data )=>{
    try {
        const response = await axiosinstance.post(`/payments/verify`, {
            id : data.id,
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_subcription_id : data.razorpay_subcription_id,
            razorpay_signature : data.razorpay_signature
        });
        return response.data;

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getPaymetRecord = createAsyncThunk('/payments/record', async ()=>{
    try {
        const response =  axiosinstance.get("/payments?count=100");
        toast.promise(response , {
            loading :"Getting the payment record",
            success : (data)=>{
                return data?.data?.message
            },
            error : "Faild to get the payment records"
        })
        return (await response).data;

    } catch (error) {
        toast.error("oparation faild ")
    }
})
export const cancleCourseBundle  = createAsyncThunk('/payments/cancle', async (id)=>{
    try {
        const response =  axiosinstance.post(`/payments/unSubcription`, {
            id:id
        });
        toast.promise(response , {
            loading :"Unsubcribing the bundle",
            success : (data)=>{
                return data?.data?.message
            },
            error : "Faild to unsubcribe"
        })
        return (await response).data;

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const razorpaySlice = createSlice({
    name :"razorpay",
    initialState,
    reducers: {},
    extraReducers : (builder)=>{

        builder.addCase(getRazorPayId.fulfilled , (state,action)=>{
            state.key = action.payload.key;
        })
        builder.addCase(purchaseCourseBundle.fulfilled, (state ,  action )=>{
            state.subcription_id = action.payload.subcription_id
        })
        builder.addCase(varifyUserPayment.fulfilled , (state ,  action)=>{
            toast.success(action.payload.message)
            state.isPaymentVarified = action?.payload?.success
        })
        builder.addCase(varifyUserPayment.rejected , (state ,  action)=>{
            toast.success(action.payload.message)
            state.isPaymentVarified = action?.payload?.success
        })
        builder.addCase(getPaymetRecord.fulfilled , (state ,  action)=>{
           state.allPayments = action.payload.allPayments,
           state.finalMonth = action.payload.finalMonth,
           state.monthlySalesRecords = action.payload.monthlySalesRecords
        })



    }
})

export default razorpaySlice.reducer;