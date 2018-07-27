import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  toogleDialog, 
  setFormType, 
  setFormValue, 
  setInputStatus, 
  deleteUser 
} from '../action';

class UserTable extends Component {
  constructor (props) {
    super(props);

    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  addUser () {
    this.props.dispatch(setFormValue({
      id: '', name: '', phone: '', email: ''
    }));
    this.props.dispatch(setInputStatus({
      emailValid: false,
      emailError: '',
      phoneValid: false,
      phoneError: '',
      nameValid: false,
      nameError: ''
    }));
    this.props.dispatch(setFormType('add'));
    this.props.dispatch(toogleDialog(true));
  }

  editUser (user) {
    this.props.dispatch(setFormValue(user));
    this.props.dispatch(setInputStatus({
      emailValid: true,
      emailError: '',
      phoneValid: true,
      phoneError: '',
      nameValid: true,
      nameError: ''
    }));
    this.props.dispatch(setFormType('edit'));
    this.props.dispatch(toogleDialog(true));
  }

  deleteUser (userId) {
    this.props.dispatch(deleteUser(userId));
  }

  render () {
    return (
      <div>
        <h1>User Data Table ({this.props.isDataFetching ? 'Fetching...' : 'Fetched'})</h1>
        <p>
          <button 
            type="button" className="btn btn-primary"
            onClick={this.addUser}>
            Add User
          </button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.length > 0
              ? this.props.users.map(user => 
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      <button 
                        className="btn btn-info btn-sm"
                        onClick={() => this.editUser(user)}>
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => this.deleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              : <tr><td colSpan="5">No User Data</td></tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

let mapStateToProps = state => ({ 
  users: state.users,
  isDataFetching: state.isDataFetching
});

export default connect(mapStateToProps)(UserTable);