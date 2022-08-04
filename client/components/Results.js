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
    console.log("PROPS", this.props.allResults)
    return (
      <div>
      <div className="container">
        <div>Results</div>
        {this.props.allResults.map((result) => {
          return (
            <div className="result" key={result.id}>
              <Link to={`/results/${result.id}`} key={result.id}>
                <div key={result.id}>
                <div>Distance</div>
                  <h1 className="Distance">{result.distance}</h1>
                </div>
                <div>
                <div>EventId</div>
                  <h1 className="EventId">{result.eventId}</h1>
                </div>
                <div>
                <div>UserId</div>
                  <h1 className="userId">{result.userId}</h1>
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
