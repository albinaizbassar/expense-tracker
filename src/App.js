import {useState} from "react";
import Tracker from "./components/Tracker";
import Login from "./components/Login";
function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      {
        user ?
          (
            <Tracker setUser={setUser} />
          ) :
          (
            <Login setUser={setUser}/>
          )
      }
    </div>
  );
}
export default App;
