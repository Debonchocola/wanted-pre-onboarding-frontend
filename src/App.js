import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./newTodo/Home";
import Join from "./Join";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/todo" element={<Home />} />
    </Routes>
  );
}

export default App;
