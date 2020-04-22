import { API_BASE_URL } from "../constants";
import { userService } from "./userServices/userService";
import{authHeader} from '../helpers/authHelper'
import { toast } from "react-toastify";

export const taskService = {
    getTasks,
    addTask,
    deleteTask,
    changeTaskStatus,
    deleteTag
};

function getTasks() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
    };

    return fetch(`${API_BASE_URL}/tasks`, requestOptions)
        .then(handleResponse)
        .then(tasks => {
            return tasks;
        });
}

function addTask(task) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    };

    return fetch(`${API_BASE_URL}/tasks`, requestOptions)
        .then(handleResponse)
        .then(success => {
            return success;
        });
}

function deleteTask(taskId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(),'Content-Type': 'application/json' }
    };

    return fetch(`${API_BASE_URL}/tasks/${taskId}`, requestOptions)
        .then(handleResponse)
        .then(success => {
            return success;
        }).catch(
            error =>{
                console.log("errorrr");
            }
        );
}


function changeTaskStatus(taskId,body) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(`${API_BASE_URL}/tasks/${taskId}`, requestOptions)
        .then(handleResponse)
        .then(success => {
            return success;
        }).then(
            error =>{
                console.log("errorrr",error);
            }
        );
}


function deleteTag(tagId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(),'Content-Type': 'application/json' }
    };

    return fetch(`${API_BASE_URL}/tags/${tagId}`, requestOptions)
        .then(handleResponse)
        .then(success => {
            return success;
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                toast("Session expired, please login again", {
                    autoClose: 5000,
                    draggable: false,
                    type: toast.TYPE.INFO,
                  });
                window.location.reload();
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
      return [`(${error.field}) ${error.message}`];
    }
  }