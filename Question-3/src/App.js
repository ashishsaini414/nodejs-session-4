import "./App.css";
import {useState } from "react";

function App() {
  const [getResponse, setgetResponse] = useState("");
  const [inputdata, setInputData] = useState("");
  const [imageLoad, setImageLoad] = useState(false)

  const inputChangeHandler = (event) => {
    setInputData(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`https://api.github.com/users/${inputdata}`)
      const responseData = await response.json();
      setgetResponse(responseData);
      setInputData("");
      console.log(responseData);
      setImageLoad(true)
    }
    catch(err){ 
      console.log(err)
    }
  };
  return (
    <div className="App">
      <header>
        <form onSubmit={submitHandler}>
          <input
            placeholder="Enter the UserName"
            onChange={inputChangeHandler}
            value={inputdata}
          ></input>
          <button>Fetch</button>
        </form>
      </header>
      <div>
        <h2>
          <u>User Information</u>
        </h2>
        <div>
          <div>
            {imageLoad && <img src={getResponse.avatar_url} height="70px" width="70px" alt="user "></img>}
          </div>
          <div>
          <span><b>Login Id: </b></span> <span>{getResponse.login}</span>
          </div>
          <div>
            <span><b>UserName: </b></span> <span>{getResponse.name}</span>
          </div>
          <div>
            <span><b>Followers: </b></span> <span>{getResponse.followers}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
