import { taskConstants } from "../../constants";

export function taskReducer(state = {}, action) {
  switch (action.type) {
    case taskConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case taskConstants.GETALL_SUCCESS:
      return {
        items: action.tasks,
      };
    case taskConstants.GETALL_FAILURE:
      return { error: action.error };

    case taskConstants.DELETE_REQUEST:
      return {
        ...state,
      };
    case taskConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter((task) => task.id !== action.taskId),
      };
    case taskConstants.DELETE_FAILURE:
      return { error: action.error };

    case taskConstants.CHANGESTATUS_REQUEST:
      return {
        ...state,
      };
    case taskConstants.CHANGESTATUS_SUCCESS:
      let taskIndex = state.items.findIndex(
        (task) => task.id === action.taskId
      );
      state.items[taskIndex]["is_completed"] = action.newStatus;
      return {
        ...state,
      };
    case taskConstants.CHANGESTATUS_FAILURE:
      return { error: action.error };

    case taskConstants.DELETETAG_REQUEST:
      return {
        ...state,
      };
    case taskConstants.DELETETAG_SUCCESS:
      let foundedTaskIndex = state.items.findIndex(
        (task) => task.id === action.taskId
      );
      console.log(action)
      state.items[foundedTaskIndex].tags = state.items[foundedTaskIndex].tags.filter(
        (tag) => tag.id !== action.tagId
      );

      return {
        ...state,
      };
    case taskConstants.DELETETAG_FAILURE:
      return { error: action.error };

    default:
      return state;
  }
}
