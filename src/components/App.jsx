import React, { Component } from 'react';

import UserForm from './UserForm.jsx';
import UserTable from './UserTable.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserForm />
        <UserTable />
      </div>
    );
  }
}

export default App;
