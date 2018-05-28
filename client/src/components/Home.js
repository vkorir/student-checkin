// import "../styles/Home.css";
import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [<h3>Come back next week!</h3>, <p>The check in is closed</p>];
      default:
        return (
          <div>
            <div className="form-title">
              <h3>Week 1 Check-In</h3>
            </div>
            <div className="form-text">
              <p>
                Please complete this check-in form with another person in the
                class that you have not checked in with before.
              </p>
            </div>
            <div className="sid">
              <h4>Student 1 SID</h4>
            </div>
            <input placeholder="SID number" />
            <div className="sid">
              <h4>Student 2 SID</h4>
            </div>
            <input placeholder="SID number" />
            <div className="response">
              <h4>Weekly Question Response</h4>
            </div>
            <textarea placeholder="Your Response" />
            <a className="button">Submit</a>
          </div>
        );
    }
  }

  render() {
    return <div className="callout">{this.renderContent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Home);
