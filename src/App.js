import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import StudentManagement from './Component/pages/StudentManagement';
import StudentDetails from './Component/Action/AddStudentDetails';
import EditStudentDetails from './Component/Action/EditStudentDetails';
import Navbar from './Layout/Navbar';


function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={StudentManagement}/>
          <Route exact path="/student/add" component={StudentDetails}/>
          <Route exact path="/student/edit/:id" component={EditStudentDetails}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
