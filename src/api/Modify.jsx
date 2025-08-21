import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function Modify(props) {

  const {bno} = useParams();

  const[board, setBoard] = useState(null);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if(!dateString) return;
    const date = new Date(dateString)

    if(isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    // 자바스크립트에서 월은 0 ~ 11을 리턴하므로 1을 더해야 함
    // padStart는 두자리로 변경하는데 비어있는 곳을 두번째 파라메터(0) 으로 채움
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`
  }

  useEffect(() => {
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

  const handleSubmit = (event) => {
    event.preventDefault(); // 리액트에서는 action으로 이동하지 않고, //reac-dom-router를 통해서 페이지 이동
    if(!board.title || !board.content || !board.writerEmail) {
      alert("모든 항목을 입력하여 주십시오.")
      return;
    }
    console.log(event.target);
    const input =
        {
          bno : Number(bno),
          title: `${event.target.title.value}`,
          content: `${event.target.content.value}`,
          writerName: `${board.writerName}`,
        };
    console.log("title", event.target.title.value)

    axios.post("http://localhost:8080/boardrest/modify", input)
        .then((res) => {
          console.log("Content-Type", res.headers['content-type']);
        })
        .catch((error) => {
          console.log("error", error);
        });
    navigate(`/board/${bno}`)
  }

  const handleChange = (event) => {
    const {name, value} = event.target;

    //기존 board에 있는 데이터를 복제하고 값을 변경후에 setBoard를 통해서 변경된 전체 데이터를 넣어준다.
    setBoard((prev) => ({
      ...prev, [name]: value
    }))
  }

  const reset = (event) => {
    axios.get(`http://localhost:8080/boardrest/read/${bno}`)
        .then((res) => {
          console.log("Content-Type", res.headers["content-type"]);
          setBoard(res.data)
        })
        .catch((error) => {
          console.log("error : ", error)
        });
    console.log(board);
  }

  return(
      <>
        {board &&
            <div>
              <form onSubmit={handleSubmit}>
              <div>
                <h1 className="my-3">Guestbook Read Page</h1>

              </div>
              <div className="form-group">
                <label htmlFor="bno">bno</label>
                <input type="text" className="form-control" id="bno" name="bno" placeholder="bno" value={bno} readOnly/>
              </div>

              <div className="form-group">
                <label htmlFor="title">title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Title" value={board.title} onChange={handleChange}/>
              </div>

              <div className="form-group">
                <label htmlFor="content">content</label>
                <textarea className="form-control" id="content" name="content" placeholder="Content" onChange={handleChange} value={board.content} ></textarea>
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
              <button className={"btn btn-primary"}>글 수정 제출</button>
              <button className={"btn btn-info"} onClick={reset}>글 수정 취소</button>
              </form>
            </div>
        }
      </>
  )
}
export default Modify