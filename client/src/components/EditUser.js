import React from 'react';
import axios from 'axios';

class EditUser extends React.Component {
    state = {
      form: {
        "firstName": this.props.user.firstName,
        "lastName": this.props.user.lastName,
        "email": this.props.user.email,
        "id": this.props.user._id,
      },
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
        const id = this.state.form.id;

        if (firstName === "" || lastName === "" || email === "") return

        axios.post('/update', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          id: id
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
            <div className="single-user">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            User Information
                        </h5>
                        <form>
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
                            <div>
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                <button className="btn btn-secondary ml-3" onClick={ () => { this.props.toggleEdit() } }>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}    

export default EditUser;