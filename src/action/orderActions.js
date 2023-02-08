import axios from "axios"

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_0RDERS_REQUEST,
    MY_0RDERS_SUCCESS,
    MY_0RDERS_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants"



export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                "content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/v1/order/new", order, config)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get currently logged in ussers orders
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_0RDERS_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me')

        dispatch({
            type: MY_0RDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_0RDERS_FAIL,
            payload: error.response.data.message
        })
    }
}



//to clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

