import React from "react";
import { connect } from "react-redux";
import {createResult} from "../store/allResultsStore";
import { Link, Redirect } from "react-router-dom";
import { buttons, formInput, formLabel, formLastDiv, forms, formSubDiv, formTitle, maindiv1, maindiv2 } from "../styleClassNames";

class CreateResult extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "",
      distance: "",
      time: "",
      eventId: "",
      userId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(result) {
    this.setState({
      [result.target.name]: result.target.value,
    });
  }

  handleSubmit(result) {
    result.preventDefault();
    this.props.createResult({ ...this.state});
    <Redirect to='/results' />
  }

  render() {
    const { type, distance, time, eventId, userId} = this.state;
    const { handleSubmit } = this;
    return (
      //  className={maindiv1}>
        <div className={maindiv2}>
          <div>
            <div className={formTitle}>Add Result</div>
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
              {/* <div className={formSubDiv}>
                <label className={formLabel} htmlFor="weight">Weight:</label>
                <input className={formInput} name="weight" type='text' onChange={this.handleChange} value={weight} />
              </div> */}
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="time">Time:</label>
                <input className={formInput} name="time" type='text' onChange={this.handleChange} value={time} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="eventId">EventId:</label>
                <input className={formInput} name="eventId" type='text'  onChange={this.handleChange} value={eventId} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="userId">UserId:</label>
                <input className={formInput} name="userId" type='text'  onChange={this.handleChange} value={userId} />
              </div>
              {/* <div className={formSubDiv}>
                <label className={formLabel} htmlFor="reps">Reps:</label>
                <input className={formInput} name="reps" type='text' onChange={this.handleChange} value={reps} />
              </div> */}
              <div className={formLastDiv}>
                <button className={buttons} type="submit">Submit</button>
                <Link className={buttons} to="/results" >Cancel</Link>
              </div>
          </form>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch, {history}) => ({
    createResult: (result) => dispatch(createResult(result, history)),
  });

export default connect(null, mapDispatchToProps)(CreateResult);
