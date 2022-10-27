원티드 사전과제입니다.

# 프로젝트 실행 방법
```
$ npm install

$ npm start
```

위 순서대로 실행하면 localhost:3000 포트에 실행됩니다.

# 배포 링크 
https://todolistub.netlify.app/

# 시연영상

<img width="80%" src="https://user-images.githubusercontent.com/107467812/195345765-49846297-6d72-40bc-97f4-4cdaa2d84b6a.mov"/>

## 구현사항

</br>

# 로그인 / 회원가입

</br>

- ### 이메일 입력창 유효성 검사
```javascript
//Join.js
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
  ```
  
  emailRegex는 유효성 검사 코드이고, emailCurrent는 입력한 값을 받습니다. setEmail에 담아줍니다.
  이메일 형식이 틀렸을 경우 틀렸다는 메시지를 출력하기 위해서 setEmailMessage에 메시지를 담아줍니다.
  setIsEmail은 유효한 상태인지 아닌지를 나타내기 위한 state입니다.
  </br>
  
  -### 비밀번호 입력창 유효성 검사
  ```javascript
  //Join.js
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
  ```
   passwordRegex는 유효성 검사 코드이고, passwordCurrent는 입력한 값을 받습니다. setPassword에 담아줍니다.
  비밀번호 형식이 틀렸을 경우 틀렸다는 메시지를 출력하기 위해서 setPasswordMessage에 메시지를 담아줍니다.
  setIsPassword은 유효한 상태인지 아닌지를 나타내기 위한 state입니다.
  </br>
  
  ```javascript
  //Join.js
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      fetch(API.JOIN, {
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
  ```
  
  handleSubmit은 가입버튼을 눌렀을 때 post요청을 통해 회원가입 정보를 서버로 보내는 역할을 합니다.
  e.preventDefault();를 통해서 창이 새로고침 되는것을 막아줍니다.
  Api통신을 할 때  
   if (!isValidInput || !isValidEmail || !isValidPassword) 조건을 통해서
   하나의 조건이라도 통과하지 못한다면 형식에 맞추라는 경고창이 뜨게했습니다.
   모든 조건에 통과한 경우는 else {window.location.href = "/";}를 통해
   로그인 창으로 보내줍니다.   
  </br>
  
  
  
