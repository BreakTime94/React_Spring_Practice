import React, {useState, useEffect} from "react";
import axios from "axios";

function Reply () {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/replies/board/111`)
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
        <h1>Board Data</h1>
        {data && data.map(d => <p key={d.rno}>{d.text}</p>)}
      </div>
  );

}

export default Reply