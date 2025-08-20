import React, {useState, useEffect} from "react";

function Sample(props) {
  //Api 호출을 통해 받아올 데이터 저장
  const [data, setData] = useState(null); //데이터는 받고서 바로 리렌더링 될 수 있도록 useState 활용

  useEffect(() => {
    // useEffect의 첫번째는 렌더링 직후 실행할 함수
    // 두번째는 의존성 배열, 인자가 없으면 렌더링 할 때마다 실행
    // 아래처럼 빈 배열로 들어가면 생성될 때 실행, [no] no가 변경될때 마다 실행

    //외부 API 호출방법
    // 1. fetch: 자바스크립트 내장함수 - 그냥 사용
    // 2. axios: 외부 라이브러리 사용 - 설치 필요

    window
        .fetch(`https://my-json-server.typicode.com/typicode/demo/posts`)
        .then((res) => {
          console.log('Content-type:', res.headers.get)
          return res.json();
        })
        .then((d) => {
          setData(d);
        })
        .catch((error) => {
          console.log("", error);
        });
  }, []);

  return(
    <div>
      <h1>API DATA</h1>
      {data && data.map((d) => {
        return <p key={d.id}>{d.id}: {d.title}</p>
      })}
    </div>
  );

}

export default Sample