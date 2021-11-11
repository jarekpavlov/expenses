import './App.css';
import {Component} from "react";
import Category from "./components/Category";
import Home from "./components/Home";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import Expenses from "./components/Expenses";

class App extends Component {

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/categories' exact={true} component={Category}/>
                    <Route path='/expenses' exact={true} component={Expenses}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;