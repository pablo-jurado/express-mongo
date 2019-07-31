import React from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import User from './components/User';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Home() {
  return <Login />
}

function Login() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 col-sm-12">
          <form id="login">
            <div className="form-group">
              <label forHtml="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label forHtml="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
      <div className="col-md-6 col-sm-12">
          <form id="register">
            <div className="form-group">
              <label forHtml="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label forHtml="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <label forHtml="exampleInputPassword1">Verify Password</label>
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Nav(props) {
  let path = props.router.location.pathname;
  if (path === "/" || path === "/register") {
    return null
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/add/">Add User</Link>
          </li>
          <li className="float-right">
            <button className="btn btn-outline-secondary btn-sm">Logout</button>
          </li>
        </ul>
      </nav>
    );
  }
}

class App extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers = () => {
    axios.get('/users')
      .then((response) => {
        this.setState({ users: response.data });
      });
  }

  deleteUser = (id, history) => {
    axios.post('/delete', {"id": id})
      .then((response) => {
        if (response.status === 200) {
          this.updateUsers();
          history.push("/");
        } else {
          console.log('delete fail');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render = () => (
    <Router>
      <>
        <Route path="*" render={(props) => ( <Nav router={props} />)} />

        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <main className="container">
          <Route path="/users" render={()=> (<UserList users={this.state.users}/>)} />
          <Route path="/add/" render={(props)=> (<UserForm history={props.history} updateUsers={this.updateUsers} />) } />
          <Route path="/user/:id" render={(props) => {
            const id = props.match.params.id;
            const userData = this.state.users.find(user => user._id === id);
            return <User user={ userData } history={props.history} deleteUser={ this.deleteUser }  updateUsers={this.updateUsers} />
          }} />
        </main>
      </>
    </Router>
  )
}

export default App;
