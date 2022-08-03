import React from "react";
import { connect } from "react-redux";
import {createEvent} from "../store/allEventsStore";
import { Link, Redirect } from "react-router-dom";
import { buttons, formInput, formLabel, formLastDiv, forms, formSubDiv, formTitle, maindiv1, maindiv2 } from "../styleClassNames";
// import { motion } from "framer-motion";

class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "",
      distance: "",
      weight: "",
      time: "",
      reps: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createEvent({ ...this.state});
    <Redirect to='/events' />
  }

  render() {
    const { type, distance, weight, time, reps } = this.state;
    const { handleSubmit } = this;
    return (
      //  className={maindiv1}>
        <div className={maindiv2}>
          <div>
            <div className={formTitle}>Add Event</div>
          </div>
          <form className={forms} onSubmit={this.handleSubmit}>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="type"> Type:</label>
                <input className={formInput} name="type" type='text' onChange={this.handleChange} value={type} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="distance">Distance:</label>
                <input className={formInput} name="distance" type='text'  onChange={this.handleChange} value={distance} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="weight">Weight:</label>
                <input className={formInput} name="weight" type='text' onChange={this.handleChange} value={weight} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="time">Time:</label>
                <input className={formInput} name="time" type='text' onChange={this.handleChange} value={time} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="reps">Reps:</label>
                <input className={formInput} name="reps" type='text' onChange={this.handleChange} value={reps} />
              </div>
              <div className={formLastDiv}>
                <button className={buttons} type="submit">Submit</button>
                <Link className={buttons} to="/events" >Cancel</Link>
              </div>
          </form>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch, {history}) => ({
    createEvent: (event) => dispatch(createEvent(event, history)),
  });

export default connect(null, mapDispatchToProps)(CreateEvent);
