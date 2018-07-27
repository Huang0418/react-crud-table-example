import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { debounce } from 'lodash-es';

import { addUser, editUser, toogleDialog, onFormInput, setInputStatus, checkName } from '../action';

class UserForm extends Component {
  constructor (props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.validateNameDuplication = debounce(this.validateNameDuplication.bind(this), 200);
    this.onNameInput = this.onNameInput.bind(this);
    this.onPhoneInput = this.onPhoneInput.bind(this);
    this.onEmailInput = this.onEmailInput.bind(this);
  }

  onSubmit (event) {
    event.preventDefault();
    let { id, name, phone, email } = this.props.formData;
    let action = (this.props.formType === 'add') ? addUser : editUser;

    this.props.dispatch(action({ 
      id, 
      name: name.trim(), 
      phone: phone.trim(), 
      email: email.trim()
    }));
  }

  onNameInput () {
    let name = this.inputName.value;
    this.validateField('name', name);
    this.props.dispatch(onFormInput({ name }));
  }

  onPhoneInput () {
    let phone = this.inputPhone.value;
    this.validateField('phone', phone);
    this.props.dispatch(onFormInput({ phone }));
  }

  onEmailInput () {
    let email = this.inputEmail.value;
    this.validateField('email', email);
    this.props.dispatch(onFormInput({ email }));
  }

  validateNameDuplication (username) {
    return this.props.dispatch(checkName(username));
  }

  validateField (fieldName, value) {
    let val = value.trim();

    switch (fieldName) {
      case 'name': {
        return this.validateNameDuplication(val);
      }
      case 'phone': {
        if (val) {
          let phoneValid = /^[-\d]+$/.test(val);
          let phoneError = phoneValid ? '' : 'Phone Number can only consist of digits and "-"';
          return this.props.dispatch(setInputStatus({ phoneValid, phoneError }));
        } else {
          return this.props.dispatch(setInputStatus({ phoneValid: true, phoneError: '' }));
        }
      }
      case 'email': {
        if (val === '') {
          return this.props
            .dispatch(setInputStatus({ emailValid: false, emailError: 'Email is required' }));
        } else {
          let emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(val);
          let emailError = emailValid ? '' : 'Invalid Email Format';
          return this.props.dispatch(setInputStatus({ emailValid, emailError }));
        }
      }
      default:
        return;
    }
  }

  isInvalidForm () {
    let { emailValid, phoneValid, nameValid } = this.props.formInputStatus;
    return !emailValid || !phoneValid || !nameValid;
  }

  closeDialog (e) {
    e.preventDefault();
    this.props.dispatch(toogleDialog(false));
  }

  render () {
    let formType = this.props.formType;
    let title = `${formType[0].toUpperCase() + formType.slice(1)} User`;
    let { id = '', name = '', phone = '', email = '' } = this.props.formData;
    let { nameError, phoneError, emailError } = this.props.formInputStatus;
    let isInvalidForm = this.isInvalidForm();

    return (
      <div 
        id="myModal" 
        className={classNames('modal', { open: this.props.toogleDialog })}
      >
        <div className="modal-content">
          <span className="close" onClick={this.closeDialog}>&times;</span>
          <h1>
            {title} {this.props.isAjaxRequesting ? '(Posting...)' : ''}
          </h1>
          <form onSubmit={this.onSubmit}>
            <input type="text" hidden value={id}/>
            <div className="form-group">
              <label htmlFor="nameInput">User Name</label>
              <input  
                id="nameInput"
                className="form-control"
                type="text" 
                value={name}
                placeholder="Name"
                onChange={this.onNameInput}
                ref={input => this.inputName = input}
              />
            </div>
            {
              nameError 
                ? <div className="alert alert-danger" role="alert">
                    {nameError}
                  </div>
                : ''
            }  
            <div className="form-group">
              <label htmlFor="phoneInput">Phone</label>
              <input  
                id="phoneInput"
                className="form-control"
                type="text" 
                value={phone}
                placeholder="Phone" 
                onChange={this.onPhoneInput}
                ref={input => this.inputPhone = input}
              />
            </div>
            {
              phoneError 
              ? <div className="alert alert-danger" role="alert">
                  {phoneError}
                </div>
              : ''
            }
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
              <input  
                id="emailInput"
                className="form-control"
                type="text" 
                value={email}
                placeholder="Email" 
                onChange={this.onEmailInput}
                ref={input => this.inputEmail = input}
              /> 
            </div>
            {
              emailError 
              ? <div className="alert alert-danger" role="alert">
                  {emailError}
                </div>
              : ''
            }                         
            <button 
              className="btn btn-success"
              disabled={isInvalidForm}
            >
              Submit
            </button>
            <button 
              className="btn btn-link"
              onClick={this.closeDialog}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({ 
  isAjaxRequesting: state.isAjaxRequesting,
  toogleDialog: state.toogleDialog,
  formType: state.formType,
  formData: state.formData,
  formInputStatus: state.formInputStatus,
  editingUser: state.editingUser
});

export default connect(mapStateToProps)(UserForm);