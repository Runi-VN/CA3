const URL = "http://localhost:8080/securitystarter";
export function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const ApiFacade = () => {
  //Insert utility-methods from a latter step (d) here
  function makeOptions(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  function setToken(token) {
    localStorage.setItem("jwtToken", token);
  }

  function getToken() {
    return localStorage.getItem("jwtToken");
  }

  function loggedIn() {
    const loggedIn = getToken() != null;
    return loggedIn;
  }
  
  const fetchData = (roles) => {
    let usertype = "no role";
    console.log(roles);
    if (roles.includes("user") && roles.includes("admin")) usertype = "both";
    else if (roles.includes("user")) usertype = "user";
    else if (roles.includes("admin")) usertype = "admin";
    const options = makeOptions("GET",true); //True add's the token
    return fetch(URL + "/api/info/" + usertype, options).then(handleHttpErrors);
  }

  const login = (user, pass, setRoles) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        setRoles(res.roles);
      });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return {
    login,
    logout,
    fetchData
  };
};

let returnVal = ApiFacade();
export default returnVal;
