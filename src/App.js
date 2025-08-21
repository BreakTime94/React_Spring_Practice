import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardList from "./api/BoardList";
import BoardView from "./api/BoardView";
import BoardWrite from "./api/BoardWrite";
import Modify from "./api/Modify";

function App() {
  return (
      <div className={"container"}>
        <BrowserRouter>
          <Routes>
            <Route index element={<BoardList/>} i></Route>
            <Route path={"board/write"} element={<BoardWrite/>}/>
            <Route path={"board/:bno"} element={<BoardView/>}></Route>
            <Route path={"board/modify/:bno"} element={<Modify/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
