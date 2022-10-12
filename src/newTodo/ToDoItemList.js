import React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./ToDoItem";

const ToDoItemList = ({
  title,
  todoList,
  setTodoList,
  checkedList,
  deleteTodo,
  updateTodo,
}) => (
  <div className="todo-list">
    {/* props로 부터 title 값을 전달 받음 */}
    <p className="todo-list-title">{title}</p>

    <ul className="todoapp__list-ul">
      {todoList && // todoList가 있을때만 출력
        todoList.map((todoItem) => {
          // 삭제한 항목인 경우, 출력하지 않음 (deleted가 true)
          // if (todoItem.deleted) return null;

          // // iscompleted 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력
          if (checkedList !== todoItem.isCompleted) return null;

          return (
            <ToDoItem
              key={todoItem.id}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
    </ul>
  </div>
);

ToDoItemList.propTypes = {
  title: PropTypes.string.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
  checkedList: PropTypes.bool.isRequired,
};

export default ToDoItemList;
