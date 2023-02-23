import Head from "next/head";
import Image from "next/image";
import styles from "../styles/login.module.css";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isMobile } from "react-device-detect";
// import { OS, currentBrowser } from '../../../utils/platform';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      OS: "",
      devicetype: "",
    };
  }

  async componentDidMount() {
    const jwt_token = localStorage.getItem("admin");
    if (jwt_token) {
      window.location.href = "/";
    } else {
      if (isMobile) {
        this.setState({ devicetype: "Mobile" });
        // console.log("mobile")
      } else {
        this.setState({ devicetype: "Desktop" });
        // console.log("desktop")
      }
      // console.log(data.IPv4)
    }
  }

  login = async (e) => {
    e.preventDefault();

    let email = this.state.email;
    let password = this.state.password;
    let urlext = "http://localhost:5000/admin/login";
    const model = {
      email: email,
      password: password,
      deviceid: "",
      devicetype: this.state.devicetype,
    };
    await fetch(urlext, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log({ response });
        if (response.status === "ok") {
          localStorage.setItem("admin", response.adminjwt);
          toast.success(response.message, {
            position: "top-center",
          });
          window.location.href = "/";
        } else {
          toast.error(response.message, {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-center",
        });
      });
  };

  render() {
    return (
      <div>
        <Head>
          <title>PayBaba | Login</title>
        </Head>

        <div>
          <div class={styles.center}>
            <h1>Login</h1>
            <form method={styles.post}>
              <div class={styles.txt_field}>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  id="exampleInputEmail1"
                  placeholder="Username"
                />
              </div>
              <div class={styles.txt_field}>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <span></span>
              </div>
              <button
                onClick={this.login}
                className={styles.input}
                style={{
                  background: "#1166DD",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                Login
              </button>
              {/* <button
                onClick={this.login}
                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                style={{
                  background: "#1166DD",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                SIGN IN
              </button> */}
            </form>
          </div>
        </div>

        <ToastContainer />
      </div>
    );
  }
}

export default Login;
