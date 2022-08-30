import React from "react";
import { connect } from "react-redux";
import { fetchResults, createResult } from "../store/allResultsStore";
import { Link } from "react-router-dom";
// import CreateEvent from "./CreateEvent";

export class Results extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchResults();
  }
  render() {
    const results = this.props.allResults
    const sortedTime = results.sort((a, b) => {
      return a.time - b.time;
  });

    console.log("Results", sortedTime)
    return (
      <div>
      <div className="container">
        <div>Results</div>
        {sortedTime.map((result) => {
          return (
            <div className="result" key={result.id}>
              <Link to={`/results/${result.id}`} key={result.id}>
                <div>
                  <h1 className="eventId">EventId:{result.eventId}</h1>
                </div>
                <div>
                  <h1 className="userId">UserId{result.userId}</h1>
                </div>
                <div key={result.id}>
                  <h1 className="distance"> Distance: {result.distance}</h1>
                </div>
                <div>
                  <h1 className="time">Time:{result.time}</h1>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <CreateEvent /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allResults: state.allResults,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchResults: () => dispatch(fetchResults()),
    createResult: () => dispatch(createResult())
  };
};

export default connect(mapStateToProps, mapDispatch)(Results);
