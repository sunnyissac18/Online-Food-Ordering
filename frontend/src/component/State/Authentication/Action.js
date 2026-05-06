import axios from "axios";
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { api, API_URL } from "../../config/api";
import { data } from "react-router-dom";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
            console.log("register success", data);

            // Fetch user to know role before redirecting
            const userResponse = await api.get(`/api/users/profile`, {
                headers: { Authorization: `Bearer ${data.jwt}` }
            });
            
            if (userResponse.data.role === "ROLE_RESTAURANT_OWNER") {
                reqData.navigate("/admin/restaurant");
            } else {
                reqData.navigate("/");
            }
        }
    }
    catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
            console.log("login success", data);

            // Fetch user to know role before redirecting
            const userResponse = await api.get(`/api/users/profile`, {
                headers: { Authorization: `Bearer ${data.jwt}` }
            });
            
            if (userResponse.data.role === "ROLE_RESTAURANT_OWNER") {
                reqData.navigate("/admin/restaurant");
            } else {
                reqData.navigate("/");
            }
        }
    }
    catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        console.log("error", error);
    }
}
export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("user profile", data);

    }
    catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const addToFavourite = ({ jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVOURITE_REQUEST });
    try {
        const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favourites`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: ADD_TO_FAVOURITE_SUCCESS, payload: data });
        console.log("added to favourite", data);

    }
    catch (error) {
        console.log("error", error);
        if (error.response && error.response.status === 500) {
            // Forcibly remove it from Redux if it was a deletion error caused by a dangling backend reference!
            dispatch({ type: ADD_TO_FAVOURITE_SUCCESS, payload: { id: restaurantId, restaurantId: restaurantId } });
        }
        dispatch({ type: ADD_TO_FAVOURITE_FAILURE, payload: error });
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
    }
    catch (error) {
        console.log("error", error);
    }
}