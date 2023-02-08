import React, { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { logout } from "../../action/userActions";
import { toast } from "react-toastify";

function Header() {
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    function handleLogout() {
        dispatch(logout());
        toast.success("Logged out successfully")
    }
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <Link className="navbar-brand" to={"/"}>Run Order</Link>
                </div>

                {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                <div className="col-12 col-md-6 mt-2 mt-md-0">

                    <Search />

                </div>



                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: "none" }} >
                        <span id="cart" className="ms-3">Cart</span>
                        <span className="ms-1" id="cart_count">{cartItems}</span>
                    </Link>

                    {user ? (
                        <div className="ms-4 dropdown  nav-item dropdown">
                            <Link to="#!" className="btn dropdown-toggle text-white nav-link dropdown-toggle me-3" type="button" id="dropDownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
                                <figure className="avatar avatar-nav" >
                                    <img src={user.avatar && user.avatar.url} alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user && user.role !== "admin" && user.role !== "agents" && user.role !== "team" ? (
                                    <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                ) : (
                                    <Link className="dropdown-item" to="/dashbord">Dashbord</Link>
                                )}
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ) : !loading && <Link to={"/login"} className="btn ms-4" id="login_btn">Login</Link>}


                </div>


            </nav>
        </Fragment>
    )


}

export default Header