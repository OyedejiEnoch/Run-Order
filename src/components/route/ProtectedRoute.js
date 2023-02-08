import React, { Fragment, useEffect } from "react";
import { Route, redirect, Routes, useNavigate, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../action/userActions";


function ProtectedRoute({ children, isAdmin }) {

    const { isAunthenticated = false, loading = true, user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(loadUser())
        }
    }, [isAunthenticated, loading])

    if (loading) return <h1>loading...</h1>
    if (!loading && isAunthenticated) {
        if (isAdmin === true && user.role !== "admin" && user.role !== "team" && user.role !== "agents") {
            return <Navigate to="/" />
        }
        return children;
    } else {
        return <Navigate to={"/login"} />
    }
}


export default ProtectedRoute;