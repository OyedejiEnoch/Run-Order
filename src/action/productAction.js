import axios from "axios"
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/productsConstants"


// we will firstly dispatch all products request which will set loading to true
export const getProducts = (keyword = " ", currentPage = 1) => async (dispatch) => {

    try {
        //this will perform the get request in the productreducers
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        //then get all data 
        const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`)
        //then get the success and pass the data
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}



// we will firstly dispatch all products request which will set loading to true
export const getProductDetails = (id) => async (dispatch) => {
    try {
        //this will perform the get request in the productreducers
        dispatch({ type: PRODUCTS_DETAILS_REQUEST })
        //then get all data
        const { data } = await axios.get(`/api/v1/products/${id}`)
        //then get the success and pass the data
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
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