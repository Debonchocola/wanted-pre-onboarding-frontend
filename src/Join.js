import React, { useCallback, useState } from "react";
import "./css/join.scss";
const Join = () => {
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const isValidEmail = email.includes("@");
  const isValidPassword = password.length >= 8;
  const isValidInput = email.length >= 1 && password.length >= 1;

  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
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
        .then(() => {
          if (!isValidInput || !isValidEmail || !isValidPassword) {
            alert("형식에 맞춰서 입력하세요.");
          } else {
            window.location.href = "/";
          }
        });
    },
    [email, password]
  );

  return (
    <div>
      <form className="join-box">
        <div className="join-title">
          <h3>회원가입</h3>
        </div>
        <input
          className="input-email"
          placeholder="Email"
          onChange={onChangeEmail}
        ></input>
        {email.length > 0 && (
          <span className={`message ${isEmail ? "success" : "error"}`}>
            {emailMessage}
          </span>
        )}
        <input
          type="password"
          className="input-password"
          placeholder="Password"
          onChange={onChangePassword}
        ></input>
        <span className={`message ${isPassword ? "success" : "error"}`}>
          {passwordMessage}
        </span>

        <button
          className="join-btn"
          type="button"
          disabled={!(isEmail && isPassword)}
          onClick={handleSubmit}
        >
          로그인으로
        </button>
      </form>
    </div>
  );
};

export default Join;
