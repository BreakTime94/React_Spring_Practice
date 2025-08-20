import React, {useState, useEffect} from "react";
import axios from "axios";

function Sample2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://my-json-server.typicode.com/typicode/demo/posts`)
        .then((res) => {
          console.log('Content-type: ', res.headers[`content-type`])
          setData(res.data);
        })
        .catch((error) => {
          console.log('error-code :' + error);
        });
  }, []);

  return (
      <div>
        <h1>Axios를 활용한 외부 API 호출</h1>
        {data && data.map((d) => {
          return <p key={d.id}>{d.id} : {d.title}</p>
        })}
      </div>
  );
}

export default Sample2