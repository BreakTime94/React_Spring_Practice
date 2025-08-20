import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BoardList(props) {
  const [data, setData] = useState(null)
  const [pageInfo, setPageInfo] = useState([{
    page: 1,
    size: 10,
    type: '',
    keyword: '',
  }])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/boardrest/list`)
        .then((res) => {
          console.log("Content-Type: ", res.headers["content-type"]);
          setData(res.data);
        })
        .catch((error) => {
          console.log("error: ", error )
        });
  }, []);

  return(
      <div>
        <table className={"table"}>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody className={"cursor-pointer"}>
          {Array.isArray(data?.list) && data.list.map(d => {
            return (<tr onClick={() => {
              navigate(`/board/${d.bno}`)
            }}>
              <td key={d.bno}>{d.bno}</td>
              <td >{d.title}</td>
              <td>{d.writerName}</td>
            </tr>);
          })}
          </tbody>
        </table>
      </div>
      // <div className={"flex-row"}>
      //   <h1>Board Data</h1>
      //   <div>
      //     <button onClick={(event) => {
      //       event.preventDefault();
      //       navigate(`/board/write`);
      //     }}>글 작성</button>
      //   </div>
      //   <form>
      //     <button onClick={(event) => {
      //       event.preventDefault();
      //       console.log(event.target);
      //       console.log({...pageInfo}[0].page);
      //     }}>페이지 이동 테스트</button>
      //   </form>
      //   {Array.isArray(data?.list) && data.list.map(d => <li key={d.bno} onClick={() => {
      //     navigate(`/board/${d.bno}`)
      //   }}>{d.title}</li>)}
      //   {/*{data && data.list.map(d => <p key={d.bno}>{d.title}</p>)}*/}
      // </div>
      );
        }


export default BoardList