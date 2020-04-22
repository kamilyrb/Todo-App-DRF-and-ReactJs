import { API_BASE_URL } from "../../constants";
import { toast } from "react-toastify";

export const userService = {
  login,
  register,
  logout,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${API_BASE_URL}/token`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${API_BASE_URL}/auth/signup`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }
      let errors = getErrors(data);
      Array.prototype.forEach.call(errors, (error) => {
        toast(error, {
          autoClose: 3000,
          draggable: false,
          type: toast.TYPE.INFO,
        });
      });

      return Promise.reject(data);
    }

    return data;
  });
}

function getErrors(error) {
  if (error.errors) {
    let messages = [];

    Array.prototype.forEach.call(error.errors, (error) => {
      messages = messages.concat(getErrors(error));
    });

    return messages;
  } else {
    if (error.field)  
        return [`(${error.field}) ${error.message}`];
    else
        return [`${error.message}`];
  }
}
