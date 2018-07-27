import * as server from '../server';

export const TOOGLE_FETCHING_STATUS = 'TOOGLE_FETCHING_STATUS';
export function toogleFetchingStatus (status) {
  return {
    type: TOOGLE_FETCHING_STATUS,
    data: status
  };
}

export const TOOGLE_AJAX_REQUEST_STATUS = 'TOOGLE_AJAX_REQUEST_STATUS';
export function toogleAjaxRequestStatus (status) {
  return {
    type: TOOGLE_AJAX_REQUEST_STATUS,
    data: status
  };
}

export const TOOGLE_DIALOG = 'TOOGLE_DIALOG';
export function toogleDialog (status) {
  return {
    type: TOOGLE_DIALOG,
    data: status
  };
}

export const SET_FORM_TYPE = 'SET_FORM_TYPE';
export function setFormType (type) {
  return {
    type: SET_FORM_TYPE,
    data: type
  };
}

export const SET_FORM_VALUE = 'SET_FORM_VALUE';
export function setFormValue (user) {
  return {
    type: SET_FORM_VALUE,
    data: user
  };
}

export const SET_INPUT_STATUS = 'SET_INPUT_STATUS';
export function setInputStatus (inputStatus) {
  return {
    type: SET_INPUT_STATUS,
    data: inputStatus
  };
}

export const ON_FORM_INPUT = 'ON_FORM_INPUT';
export function onFormInput (input) {
  return {
    type: ON_FORM_INPUT,
    data: input
  };
}

export const RECEIVE_USERS_DATA = 'RECEIVE_USERS_DATA';
export function receiveUsersData (users) {
  return {
    type: RECEIVE_USERS_DATA,
    data: users
  };
}

export function fetchUserData (payload) {
  return async function (dispatch, getState) {
    dispatch(toogleFetchingStatus(true));

    let { sorting } = getState();
    let users = await server.getUsers({ sorting });

    dispatch(receiveUsersData(users));
    dispatch(toogleFetchingStatus(false));
  };
}

export function addUser (user) {
  return async function (dispatch) {
    dispatch(toogleAjaxRequestStatus(true));

    await server.addUser(user);

    dispatch(toogleAjaxRequestStatus(false));
    dispatch(toogleDialog(false));
    dispatch(fetchUserData());
  }
}

export function editUser (user) {
  return async function (dispatch) {
    dispatch(toogleAjaxRequestStatus(true));

    await server.editUser(user);

    dispatch(toogleAjaxRequestStatus(false));
    dispatch(toogleDialog(false));
    dispatch(fetchUserData());
  }
}

export function deleteUser (userId) {
  return async function (dispatch) {
    await server.deleteUser(userId);

    dispatch(fetchUserData());
  }
}

export function checkName (username) {
  return async function (dispatch) {
    if (username !== '') {
      let { status } = await server.checkName(username);
      let payload;

      if (status === 200) {
        payload = { nameValid: true, nameError: '' };
      } else if (status === 400) {
        payload = { nameValid: false, nameError: 'Duplicate Name' };
      }

      dispatch(setInputStatus(payload));
    } else {
      dispatch(setInputStatus({ nameValid: false, nameError: 'Name is required' }));
    }
  }
}