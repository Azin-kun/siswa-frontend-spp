import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Payment from "./pages/Payment"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/Payment" component={Payment} />
      </Switch>
    )
  }
}

