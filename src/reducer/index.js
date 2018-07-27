import { 
  TOOGLE_FETCHING_STATUS,
  TOOGLE_AJAX_REQUEST_STATUS,
  TOOGLE_DIALOG,
  SET_FORM_TYPE,
  SET_FORM_VALUE,
  SET_INPUT_STATUS,
  ON_FORM_INPUT,
  RECEIVE_USERS_DATA 
} from '../action';

let initialState = {
  users: [],
  formData: {
    id: '',
    name: '',
    phone: '',
    email: ''
  },
  sorting: { key: 'id', type: 'asc' },
  formInputStatus: {
    emailValid: false,
    emailError: '',
    phoneValid: false,
    phoneError: '',
    nameValid: false,
    nameError: ''
  },
  editingUser: null,
  isDataFetching: false,
  isAjaxRequesting: false,
  toogleDialog: false,
  formType: 'add'
};

let reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case TOOGLE_FETCHING_STATUS: {
      return {
        ...state,
        isDataFetching: data
      };
    }
    case TOOGLE_AJAX_REQUEST_STATUS: {
      return {
        ...state,
        isAjaxRequesting: data
      };
    }
    case TOOGLE_DIALOG: {
      return {
        ...state,
        toogleDialog: data
      };
    }
    case SET_FORM_TYPE: {
      return {
        ...state,
        formType: data
      };
    }
    case SET_FORM_VALUE: {
      return {
        ...state,
        formData: {...data}
      };
    }
    case SET_INPUT_STATUS: {
      return {
        ...state,
        formInputStatus: {
          ...state.formInputStatus,
          ...data
        }
      };
    }
    case ON_FORM_INPUT: {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...data
        }
      }
    }
    case RECEIVE_USERS_DATA : {
      return {
        ...state,
        users: data
      };
    }
    default:
      return state;
  }
};

export default reducer;