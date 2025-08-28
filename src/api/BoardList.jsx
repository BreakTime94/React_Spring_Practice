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
  console.log("pageInfo 확인용", pageInfo);

  console.log("pageInfo의 page 확인용",pageInfo[0].page);

  //console.log("data.pageList의 값은? ", data.pageList);

  useEffect(() => {
    // page=2&size=10&type=&keyword=
    axios.get(`http://localhost:8080/boardrest/list?page=${pageInfo[0].page}&size=10&type=${pageInfo[0].type}&keyword=${pageInfo[0].keyword}`)
        .then((res) => {
          console.log("Content-Type: ", res.headers["content-type"]);
          console.log(res.data);
          setData(res.data);
        })
        .catch((error) => {
          console.log("error: ", error )
        });
  }, [pageInfo]);

  return(
      <div>
        <div className={"flex-row"}>
          <button className={"btn btn-primary"} onClick={() => {
            navigate(`board/write`)
          }}>글 작성</button>
        </div>
        <table className={"table table-hover"}>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(data?.list) && data.list.map(d => {
            return (<tr onClick={() => {
              navigate(`/board/${d.bno}`)
            }} className={"clickpoint"}>
              <td key={d.bno}>{d.bno}</td>
              <td >{d.title}</td>
              <td>{d.writerName}</td>
            </tr>);
          })}
          </tbody>
        </table>
        <div className={"flex-row "}>
          <div className={"m-auto m-0"}>
            {data && data.start === 1 ? null : <button name={"prev"}></button>}
            {data && data.pageList.map((page) => {
              console.log(page)
              return <button name={"page"} onClick={(event) => {
                setPageInfo(prev =>
                    prev.map((item, index) => {
                      return index === 0 ? {...item, page: page} : item ;
                    })
                )
              }}>{page}</button>;
            })}
            <button name={"next"}><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
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