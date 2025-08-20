import React, {useState} from "react";
import axios from "axios";

function BoardWrite() {
  // const[board, setBoard] = useState([
  //   {
  //     title: "",
  //     content: "",
  //     writerEmail: "",
  //   },
  // ]);

  return(
      <form onSubmit={(event) => {
        console.log(event.target);
        const input =
          {
            title: `${event.target.title.value}`,
            content: `${event.target.content.value}`,
            writerEmail:`${event.target.writerEmail.value}`,
          };

        axios.post("http://localhost:8080/boardrest/register", input)
            .then((res) => {
              console.log("Content-Type" , res.headers['content-type']);
            })
            .catch((error) => {
              console.log("error", error);
            });
        event.preventDefault();
      }}>
        <input placeholder={"제목을 입력하세요"} name={"title"}/>
        <br/>
        <textarea placeholder={"내용을 입력하세요."} name={"content"}/>
        <br/>
        <input placeholder={"이메일을 입력하세요"} name={"writerEmail"}/>
        <br/>
        <button type={"submit"}>제출하기</button>
      </form>
  );
}
export default BoardWrite