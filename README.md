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
  
