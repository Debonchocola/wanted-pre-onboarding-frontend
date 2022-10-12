import React, { useState } from "react";
import "./css/join.scss";
import { useCallback } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.access_token);
        if (typeof response.access_token !== "undefined") {
          localStorage.setItem("token", response.access_token);
          window.location.href = "/todo";
          alert("로그인 되었습니다.");
        } else {
          alert("1111111111");
        }
      })
      .catch((err) => {
        alert("잘못된 접근입니다.");
      });
  };

  return (
    <div>
      <form className="join-box">
        <div className="join-title">
          <h3>로그인</h3>
        </div>
        <input
          className="input-email"
          placeholder="Email"
          onChange={onChangeEmail}
        ></input>

        <input
          className="input-password"
          placeholder="Password"
          onChange={onChangePassword}
        ></input>
        <button className="join-btn" type="button" onClick={handleSubmit}>
          투두로
        </button>
        <a style={{ fontSize: "0.75rem" }} href="/join">
          계정이 없으시면 회원가입 먼저 하세요.
        </a>
      </form>
    </div>
  );
};

export default Login;
