import TodoTemplate from "./todotest/TodoTemplate";
import "./css/todo1.css";
import TodoTitle from "./todotest/TodoTitle";
function Todo1() {
  return (
    <>
      {/* <TodoTemplate /> */}
      <div className="grid">
        <div className="item1">
          <TodoTitle />
        </div>
        <div className="item2">2</div>
        <div className="item3">3</div>
      </div>
    </>
  );
}
export default Todo1;
