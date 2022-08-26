import axios from "axios";

// Action Types
const SET_EVENTS = "SET_EVENTS";
const CREATE_EVENT = "CREATE_EVENT";
const DELETE_EVENT = "DELETE_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT";
const TOKEN = "token";

// Action creators
export const _setEvents = (events) => {
  return {
    type: SET_EVENTS,
    events,
  };
};

const _createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

const _deleteEvent = (event) => {
  return {
    type: DELETE_EVENT,
    event,
  };
};

const _updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    event,
  };
};

//Thunks
export const fetchEvents = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/events");
    dispatch(_setEvents(data));
  };
};

export const createEvent = (event, history) => {
  return async (dispatch) => {
    // const token = window.localStorage.getItem(TOKEN);
    // if (token) {
      const { data } = await axios.post("/api/events", event,
      // {
      //   headers: {
      //     authorization: token,
      //   },
      // }
      );
      dispatch(_createEvent(data));
      history.push('/events')
    }
  // };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {

    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.delete(`/api/events/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_deleteEvent(data));
    }
  };
};

export const updateEvent = (event) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.put(`/api/events/${event.id}`, event, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_updateEvent(data));
    }
  };
};

// reducer

const initialState = [];
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    case CREATE_EVENT:
      return [...state, action.event];
    case DELETE_EVENT:
      return state.filter((event) => event.id !== action.event.id);
    case UPDATE_EVENT:
      return state.map((event) =>
        event.id === action.event.id ? [...state, action.event] : event
      );
    default:
      return state;
  }
};

export default eventsReducer;
