import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home} from "./components";
// import Jiaoyu1 from "./components/Jiaoyu1";
import Login from "./components/Login";
import Applications from "./components/Applications";
import Tools from "./components/Tools";
// import Nao from "./components/Nao";
import AdminIndex from './components/admin/adminIndex';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/admin/*" component={AdminIndex} />
          {/* <Route path="/about" exact component={() => <About />} /> */}
         
          
          <Route path="/applications" exact component={() => <Applications />} />

          <Route path="/tools" exact component={() => <Tools />} />
  
          {/* <Route path="/jiaoyu1" exact component={() => <Jiaoyu1 />} /> */}

          <Route path="/login" exact component={() => <Login />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
