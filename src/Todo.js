import "./css/todo.css";
import { BiPencil } from "react-icons/bi";

import { MdRemoveCircleOutline } from "react-icons/md";
function Todo({ children }) {
  return (
    <>
      <div className="template">
        <div className="todo-header">일정관리</div>
        <div className="todo-insert">
          <input
            className="todo-input"
            placeholder="할 일을 입력하세요."
          ></input>
          <button className="todo-btn">+</button>
        </div>
        <div className="todo-list">
          <div>
            <input type="checkbox"></input>
            text
          </div>

          <div>
            <button className="btn">
              <BiPencil id="pen" />
            </button>
            <button className="btn">
              <MdRemoveCircleOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
