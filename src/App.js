import Tracker from "./components/Tracker";
import Login from "./components/Login";
import {auth} from "./config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import './App.css'
function App() {

  const [user, loading] = useAuthState(auth);
  if(loading) {
    return (
      <>
        <div className="lds-hourglass">
          <div style={{color: '#000', position: 'absolute', bottom: -50, left: 1, fontWeight: 'bold', fontSize: 18}}>Loading...</div>
        </div>
      </>
    )
  }
  return (
    <div className="App">
      {
        user ?
          (
            <Tracker/>
          ) :
          (
            <Login/>
          )
      }
    </div>
  );
}
export default App;
