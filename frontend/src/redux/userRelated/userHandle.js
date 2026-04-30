import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';


const BASE_URL = "http://localhost:5000";

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    let url = "";

    // ✅ role অনুযায়ী correct route set
    if (role === "Admin") {
        url = `${BASE_URL}/AdminLogin`;
    } else if (role === "Student") {
        url = `${BASE_URL}/StudentLogin`;
    } else if (role === "Teacher") {
        url = `${BASE_URL}/TeacherLogin`;
    }

    try {
        const result = await axios.post(url, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

       if (result.data && !result.data.message) {
    dispatch(authSuccess(result.data));
} else {
    dispatch(authFailed(result.data.message || "Login Failed"));
}
    } catch (error) {
        console.log("Login Error:", error);
        dispatch(authError("Network Error"));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    let url = "";

    if (role === "Admin") {
        url = `${BASE_URL}/AdminReg`;
    } else if (role === "Student") {
        url = `${BASE_URL}/StudentReg`;
    } else if (role === "Teacher") {
        url = `${BASE_URL}/TeacherReg`;
    }

    try {
        const result = await axios.post(url, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else if (result.data.school) {
            dispatch(stuffAdded(result.data));
        }
        else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError("Network Error"));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};