import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
const ToDoItem = ({
  todoItem,
  todoList,
  setTodoList,
  deleteTodo,
  updateTodo,
}) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.todo);

  const editInputRef = useRef(null);

  useEffect(() => {
    console.log(todoItem);
  }, []);

  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      // id 값이 같은 항목의 checked 값을 Toggle 함
      checked: item.id === todoItem.id ? !item.checked : item.checked,
    }));

    setTodoList(nextTodoList);
  };

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onClickFinishEditButton = () => {
    setEdited(false);
  };

  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const onClickSubmitBtn = (onClick) => {
    if (onClick) {
      const nextTodoList = todoList.map((item) => ({
        ...item,
        text: item.id === todoItem.id ? newText : item.text, // 새로운 아이템 내용을 넣어줌
      }));
      setTodoList(nextTodoList);

      setEdited(false);

      updateTodo(newText, todoItem.id, todoItem.isCompleted);
    }
  };

  const onClickDeleteButton = () => {
    if (window.confirm("정말로 지우실건가요?")) {
      const nextTodoList = todoList.map((item) => ({
        ...item,
        deleted: item.id === todoItem.id ? true : item.deleted,
      }));

      setTodoList(nextTodoList);
    }
  };

  const onRemove = useCallback((id) => {
    onClickDeleteButton();
    deleteTodo(id);
  }, []);

  return (
    <li className="todoapp__item">
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
      <input
        type="checkbox"
        className="todoapp__item-checkbox"
        checked={todoItem.checked}
        onChange={onChangeCheckbox}
      />
      {
        // 아이템 내용
        edited ? (
          <input
            type="text"
            className="todoapp__item-edit-input"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
          />
        ) : (
          <span
            className={`todoapp__item-ctx ${
              todoItem.checked ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {todoItem.todo}
          </span>
        )
      }
      {
        // 수정 버튼
        !todoItem.checked ? (
          edited ? (
            <>
              <button
                type="button"
                className="todoapp__item-edit-btn"
                onClick={onClickSubmitBtn}
              >
                👌
              </button>
              <button
                type="button "
                className="todoapp__item-edit-btn"
                onClick={onClickFinishEditButton}
              >
                ❌
              </button>
            </>
          ) : (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickEditButton}
            >
              🖋
            </button>
          )
        ) : null
      }

      {/* 삭제 버튼 */}
      <button
        type="button"
        className="todoapp__item-delete-btn"
        onClick={() => onRemove(todoItem.id)}
      >
        🗑
      </button>
    </li>
  );
};

ToDoItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    todo: PropTypes.string.isRequired,
  }),
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;
