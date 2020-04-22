import { taskConstants } from "../../constants";
import { taskService } from "../../_services/taskService";
import { toast } from "react-toastify";
import { history } from "../../helpers/history";

export const taskActions = {
  getTasks,
  addTask,
  deleteTask,
  changeTaskStatus,
  deleteTag
};

function getTasks() {
  return (dispatch) => {
    dispatch(request());

    taskService.getTasks().then(
      (tasks) => dispatch(success(tasks)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: taskConstants.GETALL_REQUEST };
  }
  function success(tasks) {
    return { type: taskConstants.GETALL_SUCCESS, tasks };
  }
  function failure(error) {
    return { type: taskConstants.GETALL_FAILURE, error };
  }
}

function addTask(newTask) {
  return (dispatch) => {
    dispatch(request(newTask));
    taskService.addTask(newTask).then(
      (task) => {
        dispatch(success());
        history.push("/");
        toast("Task added successfully", {
          autoClose: 5000,
          draggable: false,
          type: toast.TYPE.SUCCESS,
        });
      },
      (error) => {
        toast("An error occured, Try again later", {
          autoClose: 5000,
          draggable: false,
          type: toast.TYPE.ERROR,
        });
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: taskConstants.ADD_REQUEST };
  }
  function success(task) {
    return { type: taskConstants.ADD_SUCCESS, task };
  }
  function failure(error) {
    return { type: taskConstants.ADD_FAILURE, error };
  }
}

function deleteTask(taskId) {
  return (dispatch) => {
    dispatch(request(taskId));
    taskService.deleteTask(taskId).then(
      (task) => {
        dispatch(success(taskId));
        history.push("/");
        toast("Task deleted successfully", {
          autoClose: 5000,
          draggable: false,
          type: toast.TYPE.SUCCESS,
        });
      },
      (error) => {
        dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: taskConstants.DELETE_REQUEST };
  }
  function success(taskId) {
    return { type: taskConstants.DELETE_SUCCESS, taskId };
  }
  function failure(error) {
    return { type: taskConstants.DELETE_FAILURE, error };
  }
}

function changeTaskStatus(taskId, newStatus) {
  return (dispatch) => {
    dispatch(request(taskId));
    taskService.changeTaskStatus(taskId,{is_completed:newStatus} ).then(
      (task) => {
        dispatch(success(taskId,newStatus));
        history.push("/");
        toast("Task status changed successfully", {
          autoClose: 5000,
          draggable: false,
          type: toast.TYPE.SUCCESS,
        });
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: taskConstants.CHANGESTATUS_REQUEST };
  }
  function success(taskId, newStatus) {
    return { type: taskConstants.CHANGESTATUS_SUCCESS, taskId, newStatus };
  }
  function failure(error) {
    return { type: taskConstants.CHANGESTATUS_FAILURE, error };
  }
}


function deleteTag(tagId, taskId) {
    return (dispatch) => {
      dispatch(request(tagId));
      taskService.deleteTag(tagId).then(
        (task) => {
          dispatch(success(tagId, taskId));
          toast("Tag deleted successfully", {
            autoClose: 5000,
            draggable: false,
            type: toast.TYPE.SUCCESS,
          });
        },
        (error) => {
          dispatch(failure(error.toString()));
          // dispatch(alertActions.error(error.toString()));
        }
      );
    };
  
    function request() {
      return { type: taskConstants.DELETETAG_REQUEST };
    }
    function success(tagId) {
      return { type: taskConstants.DELETETAG_SUCCESS, tagId, taskId };
    }
    function failure(error) {
      return { type: taskConstants.DELETETAG_FAILURE, error };
    }
  }