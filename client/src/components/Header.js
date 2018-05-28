// import "../styles/Header.css";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div key="0" className="link feedback">
            <a href="/auth/google">Login</a>
          </div>
        );
      default:
        return [
          <div key="1" className="link home">
            <a href="/">Home</a>
          </div>,
          <div key="2" className="link past">
            <a href="/">Past Check-In's</a>
          </div>,
          <div key="3" className="link feedback">
            <a href="/api/logout">Logout</a>
          </div>
        ];
    }
  }

  render() {
    return (
      <div className="page-header">
        <a href="/">
          <div className="callout ios">
            <h4>
              <strong>iOS</strong> DeCal
            </h4>
          </div>
        </a>
        <div className="header">
          <div className="title">
            <h4>
              CS198-001 <strong>Check In Portal</strong>
            </h4>
          </div>
          <div className="links">{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
