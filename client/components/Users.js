import React from "react";
import { connect } from "react-redux";
import { fetchUsers} from "../store/allUsersStore";
import { Link } from "react-router-dom";

export class Users extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    console.log("PROPS", this.props.allUsers)
    return (
      <div className="container">
        <div></div>
        {this.props.allUsers.map((user) => {
          console.log(user.id)
          return (
            <div className="user" key={user.id}>
               <div>USERS</div>
              <Link to={`/users/${user.id}`} key={user.id}>
                <div key={user.id}>
                  <h1 className="name">{user.username}</h1>
                  <h2>{user.username}</h2>
                </div>
              </Link>
              <button
                onClick={() => this.props.removedUser(user.id)}
                type="submit"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    removedUser: (id) => dispatch(removeUser(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Users);
