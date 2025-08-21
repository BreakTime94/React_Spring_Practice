import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BoardWrite(props) {
  const[board, setBoard] = useState([
    {
      title: "",
      content: "",
      writerEmail: "",
    },
  ]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    //기존 board에 있는 데이터를 복제하고 값을 변경후에 setBoard를 통해서 변경된 전체 데이터를 넣어준다.
    setBoard((prev) => ({
      ...prev, [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // 리액트에서는 action으로 이동하지 않고, //reac-dom-router를 통해서 페이지 이동
    if(!board.title || !board.content || !board.writerEmail) {
      alert("모든 항목을 입력하여 주십시오.")
      return;
    }
    console.log(event.target);
    const input =
        {
          title: `${event.target.title.value}`,
          content: `${event.target.content.value}`,
          writerEmail: `${event.target.writerEmail.value}`,
        };

    axios.post("http://localhost:8080/boardrest/register", input)
        .then((res) => {
          console.log("Content-Type", res.headers['content-type']);
        })
        .catch((error) => {
          console.log("error", error);
        });
      navigate(`/`);
  }

  return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor={"title"} className="form-label">제목 :</label>
          <input placeholder={"제목을 입력하세요"} name={"title"} onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor={"content"} className="form-label">내용입력 :</label>
          <textarea placeholder={"내용을 입력하세요."} name={"content"} style={{resize: "none"}} onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor={"writerEmail"} className="form-label">이메일 :</label>
          <input placeholder={"이메일을 입력하세요"} name={"writerEmail"} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  );
}
export default BoardWrite