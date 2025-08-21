import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Reply from "./Reply";
import dayjs from "dayjs";

function BoardView(props) {
  const [dto, setDto] = useState(null);
  const [board, setBoard] = useState(null);
  const {bno} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(bno);
  console.log(location);

  const formatDate = (dateString) => {
    if(!dateString) return;
    const dayjs = require('dayjs')
    const date = dayjs(dateString)
    //if(isNaN(date.getTime())) return '';


    console.log(date.format('YYYY년 MM월 DD일 HH:mm:ss'));
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // // 자바스크립트에서 월은 0 ~ 11을 리턴하므로 1을 더해야 함
    // // padStart는 두자리로 변경하는데 비어있는 곳을 두번째 파라메터(0) 으로 채움
    // const day = String(date.getDate()).padStart(2, '0');

    return date.format('YYYY년 MM월 DD일 HH:mm:ss')
  }
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
        {board &&
        <div>
          <div>
            <h1 className="my-3">Guestbook Read Page</h1>

          </div>
          <div className="form-group">
            <label htmlFor="bno">bno</label>
            <input type="text" className="form-control" id="bno" name="bno" placeholder="bno" value={bno} readOnly/>
          </div>

          <div className="form-group">
            <label htmlFor="title">title</label>
            <input type="text" className="form-control" id="title" name="title" placeholder="Title" value={board.title}
                   readOnly/>
          </div>

          <div className="form-group">
            <label htmlFor="content">content</label>
            <textarea className="form-control" id="content" name="content" placeholder="Content"
                      readOnly>{board.content}</textarea>
          </div>

          <div className="form-group">
            <label htmlFor="writer">writer</label>
            <input type="text" className="form-control" id="writer" name="writer" placeholder="Writer"
                   value={board.writerName}
                   readOnly/>
          </div>

          <div className="form-group">
            <label htmlFor="regDate">regDate</label>
            <input type="text" className="form-control" id="regDate" name="regDate" placeholder="regDate"
                   value={formatDate(board.regDate)}
                   readOnly/>
          </div>

          <div className="form-group my-4">
            <label htmlFor="modDate">modDate</label>

            <input type="text" className="form-control" id="modDate" name="modDate" placeholder="modDate"
                   value={formatDate(board.modDate)}
                   readOnly/>
          </div>
        </div>
        }
        <div>
          <button className={"btn btn-secondary"} onClick={() => {
            navigate(`/`)
          }}>리스트로 이동
          </button>
          <button className={"btn btn-info"} onClick={() => {
            navigate(`/board/modify/${bno}`)
          }}>글 수정
          </button>
          <button className={"btn btn-danger"} onClick={() => {
            if(!window.confirm("삭제하시겠습니까?")) return;
              axios.post(`http://localhost:8080/boardrest/remove`, board.bno)
                  .then(
                      console.log("성공하셨수다")
                  )
                  .catch( (error) => {
                    console.log("error", error)
                  })

            navigate(`/`)
          }}>글 삭제
          </button>
        </div>
        <div>
          <ul className={"list-group mt-3"}>
            <Reply bno={bno}></Reply>
          </ul>
        </div>
      </>
)
}

export default BoardView