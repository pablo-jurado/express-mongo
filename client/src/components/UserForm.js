import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class UserForm extends React.Component {
  state = {
    form: {
      "firstName": "",
      "lastName": "",
      "email": ""
    },
  }
  
  componentDidMount() {
    axios.get('/users')
      .then((response) => {
        this.setState({ users: response.data })
      });
  }

  handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState((state) => {
      let newState = Object.assign({}, state);
      return newState.form[name] = value;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const firstName = this.state.form.firstName;
    const lastName = this.state.form.lastName;
    const email = this.state.form.email;

    if (firstName === "" || lastName === "" || email === "") return

    axios.post('/add', {
      firstName: this.state.form.firstName,
      lastName: this.state.form.lastName,
      email: this.state.form.email,
    }).then((response) => {
      if (response.status === 200 && response.data) {
        this.setState({
          users: response.data,
          form: {
            "firstName": "",
            "lastName": "",
            "email": ""
          }
        })
        this.props.updateUsers();
        this.props.history.push("/");
      }
    });
  }
  
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                className="form-control"
                id="first-name"
                name="firstName"
                type="text"
                onChange={this.handleFormChange}
                value={this.state.form.firstName} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input className="form-control"
                id="last-name"
                name="lastName"
                type="text"
                onChange={this.handleFormChange}
                value={this.state.form.lastName} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control"
                id="email"
                name="email"
                type="email"
                onChange={this.handleFormChange}
                value={this.state.form.email} />
            </div>
            <input className="btn btn-primary"
              type="submit"
              value="Add User" />
            <Link className="btn btn-danger ml-3" to="/users">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}
  
  export default UserForm;
  