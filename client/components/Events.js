import React from "react";
import { connect } from "react-redux";
import { fetchEvents, createEvent} from "../store/allEventsStore";
import { Link } from "react-router-dom";
import CreateEvent from "./CreateEvent";

export class Events extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    console.log("PROPS", this.props.allEvents)
    return (
      <div>
      <div className="container">
        <div></div>
        {this.props.allEvents.map((event) => {
          console.log(event.id)
          return (
            <div className="event" key={event.id}>
               <div>Events</div>
              <Link to={`/events/${event.id}`} key={event.id}>
                <div key={event.id}>
                  <h1 className="name">{event.type}</h1>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <CreateEvent />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allEvents: state.allEvents,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    createEvent: () => dispatch(createEvent())
  };
};

export default connect(mapStateToProps, mapDispatch)(Events);
