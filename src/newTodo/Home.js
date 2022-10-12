import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from "./InputBox";
import ToDoItemList from "./ToDoItemList";

const Home = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(1);
  const nextId = useRef(0);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate(`/`);
    }
  });

  const getTodo = () => {
    axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((result) => {
        console.log(result);
        setTodoList(result.data);
        setTodos(result.data);
      });
  };

  const insertTodo = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        todo: text,
        iscompleted: false,
      };

      fetch("https://pre-onboarding-selection-task.shop/todos", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
        mode: "cors",
      })
        .then((response) => {
          getTodo();
        })
        .then((result) => {
          console.log(todos);
          setTodos(result);
          setId(id + 1);
          // setTodos(todos.concat(todos));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [todos, id]
  );

  const deleteTodo = useCallback((id) => {
    axios({
      method: "delete",
      url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      getTodo();
    });
  });

  const updateTodo = useCallback((text, id, isCompleted) => {
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: text, isCompleted: isCompleted }),
    })
      .then((response) => {
        console.log(text);
        getTodo();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="homepage__container">
      <span className="homepage__title">TODO LIST</span>
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox
        todoList={todoList}
        setTodoList={setTodoList}
        insertTodo={insertTodo}
      />
      {/* 할 일 Item 리스트 */}
      <ToDoItemList
        title={"할 일"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false} // (체크되지 않은) 할 일 목록
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      {/* 완료한 Item 리스트 */}
      <ToDoItemList
        title={"완료한 항목"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true} // (체크되어 있는)완료한 목록
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default Home;
