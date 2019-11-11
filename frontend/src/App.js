import React, { Component } from "react";
import facade from "./apiFacade";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <p>{this.props.message}</p>
        <form onSubmit={this.login} onChange={this.onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" type="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() {
    facade.fetchData().then(res => this.setState({ dataFromServer: res }));
  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{JSON.stringify(this.state.dataFromServer)}</h3>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, message: "" };
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  };
  login = (user, pass) => {
    facade
      .login(user, pass)
      .then(res => this.setState({ loggedIn: true }))
      .catch(res => {
        if (res.status) {
          this.setState({ message: "Wrong login credentials" });
        } else {
          console.log("No response at all. Server might be down.");
        }
      });
  };
  render() {
    return (
      <div style={{ margin: "50pt" }}>
        {!this.state.loggedIn ? (
          <LogIn login={this.login} message={this.state.message} />
        ) : (
          <div>
            <LoggedIn />
            <button onClick={this.logout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}
export default App;
