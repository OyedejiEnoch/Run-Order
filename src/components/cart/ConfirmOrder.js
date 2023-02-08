import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";

import { PaystackButton } from 'react-paystack'

import { createOrder, clearErrors } from "../../action/orderActions"
import { toast } from "react-toastify";

function ConfirmOrder() {
    let navigate = useNavigate()
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    //Calculate order prices without tax & shippping
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    //if itemsPrice is greater than 200 dilivery fee/ shippingPrice will be == 200
    const shippingPrice = itemsPrice > 200 ? 200 : 100
    const taxPrice = 150
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)


    function proceedToPayment() {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        // navigate("/")
        //we are pushing home so user wont have to recalculate they will be stored on the sessonstorage, but this goes once we close the chrome
    }
    const { error } = useSelector(state => state.newOrder)
    const dispatch = useDispatch()
    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error])

    function orderPay() {

        const order = {
            orderItems: cartItems,
            shippingInfo
        }

        const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
        if (orderInfo) {
            order.itemsPrice = orderInfo.itemsPrice
            order.shippingPrice = orderInfo.shippingPrice
            order.taxPrice = orderInfo.taxPrice
            order.totalPrice = orderInfo.totalPrice
            order.paymentInfo = {
                id: orderInfo.id,
                status: orderInfo.status
            }

            dispatch(createOrder(order))

            navigate('/success')
        } else {
            toast.error('There is some issue while payment processing')
        }

    }




    const componentProps = {
        email: user.email,
        amount: totalPrice * 100,
        metadata: {
            name: user.name,
            phone: shippingInfo.phoneNo,
        },
        publicKey: "pk_test_cd89b0baeaa20167f5429baff62f935bb851e25e",
        text: "Pay Now",
        onSuccess: () => (
            alert("Thanks for ordering with us! Come back soon!!"), proceedToPayment(), orderPay()),
        onClose: () => alert("Do bear with us, we are ready to please you better"),



    }




    return (
        <Fragment>
            <MetaData title={"Confirm Order"} />
            <CheckoutSteps shipping confirmOrder />


            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b>{user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode},
                    ${shippingInfo.country}`}</p>
                    {/* visit to change details */}

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}


                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">{itemsPrice}</span></p>
                        <p>Dilivery Fee: <span className="order-summary-values">{shippingPrice}</span></p>
                        <p>Pack Price:  <span className="order-summary-values">{taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">{totalPrice}</span></p>

                        <hr />

                        <PaystackButton id="checkout_btn" className="btn btn-primary btn-block"{...componentProps} />
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder;