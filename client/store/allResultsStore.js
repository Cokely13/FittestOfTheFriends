import axios from "axios";

// Action Types
const SET_RESULTS = "SET_RESULTS";
const CREATE_RESULT = "CREATE_RESULT";
const DELETE_RESULT = "DELETE_RESULT";
const UPDATE_RESULT = "UPDATE_RESULT";
const TOKEN = "token";

// Action creators
export const _setResults = (results) => {
  return {
    type: SET_RESULTS,
    results,
  };
};

const _createResult = (result) => {
  return {
    type: CREATE_RESULT,
    result,
  };
};

const _deleteResult = (result) => {
  return {
    type: DELETE_RESULT,
    result,
  };
};

const _updateResult = (result) => {
  return {
    type: UPDATE_RESULT,
    result,
  };
};

//Thunks
export const fetchResults = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/results");
    dispatch(_setResults(data));
  };
};

export const createResult = (result, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.post("/api/results", result, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_createResult(data));
      history.push('/results')
    }
  };
};

export const deleteResult = (id) => {
  return async (dispatch) => {

    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.delete(`/api/results/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_deleteResult(data));
    }
  };
};

export const updateResult = (result) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.put(`/api/results/${result.id}`, result, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_updateResult(data));
    }
  };
};

// reducer

const initialState = [];
const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return action.results;
    case CREATE_RESULT:
      return [...state, action.result];
    case DELETE_RESULT:
      return state.filter((result) => result.id !== action.result.id);
    case UPDATE_RESULT:
      return state.map((result) =>
        result.id === action.result.id ? [...state, action.result] : result
      );
    default:
      return state;
  }
};

export default resultsReducer;
