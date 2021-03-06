export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8005/api';
export const ACCESS_TOKEN = 'access';

export const POLL_LIST_SIZE = 30;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    
    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    DELETE_REQUEST: 'USERS_DELETE_REQUEST',
    DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
    DELETE_FAILURE: 'USERS_DELETE_FAILURE'    
};


export const taskConstants = {
    GETALL_REQUEST: 'TASKS_GETALL_REQUEST',
    GETALL_SUCCESS: 'TASKS_GETALL_SUCCESS',
    GETALL_FAILURE: 'TASKS_GETALL_FAILURE',  

    ADD_REQUEST: 'TASKS_ADD_REQUEST',
    ADD_SUCCESS: 'TASKS_ADD_SUCCESS',
    ADD_FAILURE: 'TASKS_ADD_FAILURE', 

    DELETE_REQUEST: 'TASKS_DELETE_REQUEST',
    DELETE_SUCCESS: 'TASKS_DELETE_SUCCESS',
    DELETE_FAILURE: 'TASKS_DELETE_FAILURE', 

    CHANGESTATUS_REQUEST: 'CHANGESTATUS_REQUEST',
    CHANGESTATUS_SUCCESS: 'CHANGESTATUS_SUCCESS',
    CHANGESTATUS_FAILURE: 'CHANGESTATUS_FAILURE', 

    DELETETAG_REQUEST: 'TAG_DELETE_REQUEST',
    DELETETAG_SUCCESS: 'TAG_DELETE_SUCCESS',
    DELETETAG_FAILURE: 'TAG_DELETE_FAILURE', 
};
