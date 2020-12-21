import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddPerson from "./components/AddPerson/addPerson"
import Addressbook from "./components/Addressbook/addressbook"
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/addperson" component={AddPerson}></Route>
        <Route path="/addressbook" component={Addressbook}></Route>
      </Router>
    </div>
  );
}

export default App;
