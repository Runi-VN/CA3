import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";

const LogIn = ({ login, message }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  function log_in(evt) {
    evt.preventDefault();
    login(user.username, user.password);
  }

  const onChange = evt => {
    setUser({ ...user, [evt.target.id]: evt.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={log_in}>
        <input placeholder="User Name" id="username" onChange={onChange} />{" "}
        <input
          placeholder="Password"
          id="password"
          type="password"
          onChange={onChange}
        />{" "}
        <button className="btn btn-primary">Login</button>
        <br></br>
        <p>{message}</p>
      </form>
    </div>
  );
};

const LoggedIn = ({ roles }) => {
  const [dataFromServer, setDataFromServer] = useState("");

  useEffect(() => {
    function update() {
      facade
        .fetchData(roles)
        .then(res => setDataFromServer(res))
        .catch(err => {
          if (err.status) {
            err.fullError.then(e => console.log(e.code, e.message));
          } else {
            console.log("Network error");
          }
        });
    }
    update();
  }, []);

  return (
    <>
      <h2>Data Received from server</h2>
      <p>{JSON.stringify(dataFromServer)}</p>
    </>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState([]);
  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass, setRoles)
      .then(res => {
        setMessage("");
        setLoggedIn(true);
      })
      .catch(err => {
        if (err.status) {
          setMessage("Failed to log in, check your information");
          err.fullError.then(e => console.log(e.code, e.message));
        } else {
          console.log("Network error");
        }
      });
  };

  return (
    <div className="container">
      {!loggedIn ? (
        <LogIn login={login} message={message} />
      ) : (
        <div>
          <LoggedIn roles={roles}/>
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default App;
