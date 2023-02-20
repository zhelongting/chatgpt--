import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { EffectDropdown, EffectDropdownItem } from "effect-dropdown-react";
import swu_logo from "./images/swu_logo.png";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: null,
    };
  }

  componentDidMount() {
    if (window.sessionStorage.userinfo) {
      this.setState({
        userinfo: JSON.parse(window.sessionStorage.userinfo),
      });
    }
  }

  render() {
    let { userinfo } = this.state;
    return (
      <div className="navigation">
        <nav class="navbar navbar-expand bg-dark navbar-dark">
          <div class="container">
            <Link class="navbar-brand" to="/">
            西南大学ChatGPT教育应用平台
            </Link>
            <div>
              <ul class="navbar-nav ml-auto">
                <li
                  class={`nav-item  ${
                    this.props.location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/">
                    <p className="weizhi" style={{ textAlign: "center" }}>
                      介绍
                    </p>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li
                  class={`nav-item  ${
                    this.props.location.pathname === "/contact" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/applications">
                    <p className="weizhi" style={{ textAlign: "center" }}>
                      教育应用
                    </p>
                  </Link>
                </li>

                <li
                  class={`nav-item  ${
                    this.props.location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/tools">
                    <p className="weizhi" style={{ textAlign: "center" }}>
                      工具
                    </p>
                  </Link>
                </li>

                <li
                  style={{
                    color: "#fff",
                    // border: "1px solid #fff",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {userinfo && (
                    <span
                      style={{
                        marginRight: 20,
                      }}
                    >
                      {userinfo.username}
                    </span>
                  )}
                  {userinfo ? (
                    <span
                      style={{
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => {
                        window.sessionStorage.removeItem("userinfo");
                        this.props.history.push("/login");
                      }}
                    >
                      登出
                    </span>
                  ) : (
                    <span
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        this.props.history.push("/login");
                      }}
                    >
                      去登录
                    </span>
                  )}
                </li>
               
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);
