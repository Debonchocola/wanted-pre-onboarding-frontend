import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from "./InputBox";
import ToDoItemList from "./ToDoItemList";

const Home = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [todos, setTodos] = useState([]);
  // const [loading, setLoading] = useState(true);
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
          console.log(result);
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
        console.log(response);
        getTodo();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  useEffect(() => {
    getTodo();
  }, []);

  const onChecked = (id, todo, iscompleted) => {
    setTodos(
      todos.map((item) => {
        return item.id === id
          ? { ...item, iscompleted: !item.iscompleted }
          : item;
      })
    );
    updateTodo(todo, id, !iscompleted);
    console.log(id, todo, iscompleted);
  };

  return (
    <div className="homepage-container">
      <span className="homepage-title">TODO LIST</span>
      {/* ToDo Item??? ????????? ??? ?????? input ?????? */}
      <InputBox
        todoList={todoList}
        setTodoList={setTodoList}
        insertTodo={insertTodo}
      />
      {/* ??? ??? Item ????????? */}
      <ToDoItemList
        title={"??? ???"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={false} // (???????????? ??????) ??? ??? ??????
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        onChecked={onChecked}
      />
      {/* ????????? Item ????????? */}
      <ToDoItemList
        title={"????????? ??????"}
        todoList={todoList}
        setTodoList={setTodoList}
        checkedList={true} // (???????????? ??????)????????? ??????
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        onChecked={onChecked}
      />
    </div>
  );
};

export default Home;
