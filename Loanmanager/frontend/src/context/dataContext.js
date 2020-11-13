import createContext from './createContext';
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
        return updateObject( state, { error: null, loading: true } );
    case actionTypes.AUTH_SUCCESS:
        return updateObject(state,{ token: action.payload.token,id:action.payload.id, email: action.payload.email, username:action.payload.username,user_type:action.payload.user_type, error: null, loading: false });
    case actionTypes.AUTH_FAIL:
        return updateObject( state, { error: action.payload.error, loading: false });
    case actionTypes.AUTH_LOGOUT:
        return updateObject( state, { token:null,id:null, email: null, username:null,user_type:null, error: null, loading: false,loans:[],users:[], tab:0 });
    case actionTypes.CHANGE_TAB:
        return updateObject(state, {tab:action.payload.tab})
    case actionTypes.USER_LOAN:
        return updateObject(state, {loans:[...action.payload.loans],loading:false})
    case actionTypes.USERS:
        return updateObject(state, {users:[...action.payload.users],loading:false})
    case actionTypes.LOANS:
        return updateObject(state, {loans:[...action.payload.loans],loading:false})
    default:
        return state;
  }
};

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, email, username, id, user_type) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            email: email,
            username: username,
            id:id,
            user_type:user_type
        }
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload:{
            error: error
        }
    };
};

const changeTab = (dispatch) => (tab) =>{
    dispatch({
        type: actionTypes.CHANGE_TAB,
        payload:{ tab: tab }
    })
}

const register = (dispatch) => (registerData) => {
    dispatch(authStart())
    let url = '/auth/register/'
    axios.post(url, registerData)
            .then(res => {
                localStorage.setItem('loanmanager', JSON.stringify(res.data));
                dispatch(authSuccess(res.data.token, res.data.user.email, res.data.user.username, res.data.user.id, res.data.user.user_type));
            })
            .catch(err => {
                dispatch(authFail("the username is already taken!!"))
            });
};

const login = (dispatch) => (loginData) => {
    dispatch(authStart())
    let url = '/auth/login/'
    axios.post(url, loginData)
            .then(res => {
                localStorage.setItem('loanmanager', JSON.stringify(res.data));
                dispatch(authSuccess(res.data.token, res.data.user.email, res.data.user.username, res.data.user.id, res.data.user.user_type));
            })
            .catch(err => {
                dispatch(authFail("Invalid credentials !!"))
            });
};

const logout = (dispatch) => (token) => {
    dispatch(authStart())
    axios.post(`/auth/logout/`,{},{headers:{Authorization:`Token ${token}`}})
            .then(res => {
                localStorage.removeItem('loanmanager');
                dispatch({ type: actionTypes.AUTH_LOGOUT });
            })
            .catch(err => {
                localStorage.removeItem('loanmanager');
                dispatch({ type: actionTypes.AUTH_LOGOUT });
            });
};

const userLoan = (dispatch) => (token) => {
    dispatch(authStart())
    axios.get(`/userloan/`,{headers:{Authorization:`Token ${token}`}})
            .then(res => {
                console.log(res.data)
                dispatch({ type: actionTypes.USER_LOAN, payload:{loans:[...res.data]} });
            })
            .catch(err => {
                dispatch(authFail("Request Unsuccesfull !!"))
            });
};

const getUsers = (dispatch) => (token) => {
    dispatch(authStart())
    axios.get(`/users/`,{headers:{Authorization:`Token ${token}`}})
            .then(res => {
                dispatch({ type: actionTypes.USERS, payload:{users:[...res.data]} });
            })
            .catch(err => {
                dispatch(authFail("Request Unsuccesfull !!"))
            });
};

const editUsers = (dispatch) => (id, data, token, users) => {
    axios.put(`/users/${id}/`,{...data},{headers:{Authorization:`Token ${token}`}})
            .then(res => {
                users.find((o, i) => {
                    if (o.id === id) {
                        users[i] = res.data
                        return true;
                    }
                });
                dispatch({ type: actionTypes.USERS, payload:{users:[...users]} });
            })
            .catch(err => {
                dispatch(authFail("Request Unsuccesfull !!"))
            });
};

const getLoans = (dispatch) => (token) => {
    dispatch(authStart())
    axios.get(`/loans/`,{headers:{Authorization:`Token ${token}`}})
            .then(res => {                
                dispatch({ type: actionTypes.LOANS, payload:{loans:[...res.data]} });
            })
            .catch(err => {
                dispatch(authFail("Request Unsuccesfull !!"))
            });
};

const addLoans = (dispatch) => (token,data,loans) => {
    dispatch(authStart())
    axios.post(`/loans/create/`,{...data},{headers:{Authorization:`Token ${token}`}})
            .then(res => {                
                dispatch({ type: actionTypes.LOANS, payload:{loans:[...loans,{...res.data}]} });
            })
            .catch(err => {
                dispatch(authFail("Request Unsuccesfull !!"))
            });
};

const updateLoans = (dispatch) => (token,data,loans,id) => {
    dispatch(authStart())
    axios.put(`/loans/update/${id}/`,{...data},{headers:{Authorization:`Token ${token}`}})
            .then(res => {             
                loans.find((o, i) => {
                    if (o.id === id) {
                        loans[i] = res.data
                        return true;
                    }
                });
                dispatch({ type: actionTypes.LOANS, payload:{loans:[...loans]} });
            })
            .catch(err => {
                dispatch(authFail("Request Unsuccesfull !!"))
            });
};

const updateStatus = (dispatch) => (token,data,loans,id) => {
    axios.put(`/loans/status/${id}/`,{...data},{headers:{Authorization:`Token ${token}`}})
            .then(res => {             
                loans.find((o, i) => {
                    if (o.id === id) {
                        loans[i] = res.data
                        return true;
                    }
                });
                dispatch({ type: actionTypes.LOANS, payload:{loans:[...loans]} });
            })
            .catch(err => {
                dispatch(authFail("Request Unsuccesfull !!"))
            });
};

const authCheckState = (dispatch) => () => {
    const data = JSON.parse(localStorage.getItem('loanmanager'))
    if (!data || !data.token) {
        //dispatch(logout());
    } else {
        dispatch(authSuccess(data.token, data.user.email, data.user.username, data.user.id, data.user.user_type));             
    }

};

export const {Provider, Context} = createContext(
  dataReducer,
  {authStart,authSuccess,authFail, register, login,logout, authCheckState, changeTab, userLoan, getUsers, getLoans,editUsers, addLoans,updateLoans,updateStatus},
  {
    token: null,
    email: null,
    username:null,
    id:null,
    loans:[],
    users:[],
    error: null,
    loading: false,
    user_type:null,
    tab:0
  },
);
