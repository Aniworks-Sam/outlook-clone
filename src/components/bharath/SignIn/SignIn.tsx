import React, { useContext, useRef } from "react";
import AuthContext from "../Store/Auth-context";
import classes from "./SignIn.module.css";
export default function SignIn() {
  const AuthCtx = useContext(AuthContext);
  const userName: any = useRef<HTMLInputElement>(null);
  const password: any = useRef<HTMLInputElement>(null);
  const logInCall = (event: React.FormEvent) => {
    const enteredZipCode = userName.current.value;
    const enteredPassCode = password.current.value;
    event.preventDefault();
    AuthCtx.setisLoading(true);
    fetch("https://mail.aniworks.live/mapi/authenticate", {
      method: "POST",
      body: JSON.stringify({
        username: enteredZipCode,
        password: enteredPassCode,
        scope: "master",
        token: "true",
        //
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        AuthCtx.setisLoading(false);
        if (response.ok) return response.json();
        else {
          return response.json().then(() => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((response) => {
        AuthCtx.setisLoading(false);
        AuthCtx.setIsValid(true);
        console.log(response.token);
        AuthCtx.setToken(response.token);
        AuthCtx.setId(response.id);
        console.log(response);
      })
      .catch((error) => {
        AuthCtx.setIsValid(false);
        AuthCtx.setisLoading(false);
        AuthCtx.setToken("");
      });
  };
  if (!AuthCtx.token) {
    return (
      <div className={classes.container}>
        <h2 className={classes.container_h2}>Login</h2>
        <form onSubmit={logInCall} className={classes.container_inputs}>
          <div>
            <p className={classes.label}>
              <label>Username:</label>
            </p>
            <input
              className={classes.input}
              ref={userName}
              type="text"
              required
              // onChange={props.onChange}
            />
            <h6 className={classes.error}>Username name is required</h6>
          </div>
          <div>
            <p className={classes.label}>
              <label>Password:</label>
            </p>
            <input
              className={classes.input}
              type="password"
              ref={password}
              required
              // onChange={props.onChange1}
            />
            <h6 className={classes.error}>Password is required</h6>
          </div>

          {!AuthCtx.isLoadingValue && (
            <button className={classes.container_button} type="submit">
              Login
            </button>
          )}
          {!AuthCtx.isValidValue && (
            <h3 className={classes.container_h3}>Invalid credentials</h3>
          )}
          {AuthCtx.isLoadingValue && (
            <p className={classes.container_request}>sending request...</p>
          )}
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}
