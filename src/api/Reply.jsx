import React, {useState, useEffect} from "react";
import axios from "axios";

function Reply (props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/replies/board/${props.bno}`)
        .then((res) => {
          console.log("Content-Type: ", res.headers["content-type"]);
          setData(res.data);
        })
        .catch((error) => {
          console.log("error: ", error )
        });
  }, []);

  return(
      <li className={"list-group-item ps-3"} key={data && data.map(d => d.rno)}>
        {data && data.map(d => <p className={"mb-3 border-primary"}>{d.text}</p>)}
      </li>
  );

}

export default Reply