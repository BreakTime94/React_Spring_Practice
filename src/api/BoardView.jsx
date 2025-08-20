import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function BoardView(props) {
  const [dto, setDto] = useState(null);
  const [board, setBoard] = useState(null);
  const {bno} = useParams();
  const location = useLocation();
  console.log(bno);
  console.log(location);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log(queryParams.toString());

    axios.get(`http://localhost:8080/boardrest/read/${bno}`)
        .then((res) => {
          console.log("Content-Type", res.headers["content-type"]);
          setBoard(res.data)
        })
        .catch((error) => {
          console.log("error : ", error)
        });
      console.log(board);
  }, []);


  return(
      <>
      <div>
        <h1>글번호: {bno}</h1>
        <p>제목: {board && board.title}</p>
        <p>내용: {board && board.content}</p>
      </div>
      <div>
        <h3>댓글이 들어가야함</h3>
        <p></p>
      </div>
      </>
  )
}

export default BoardView