import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import PickTest from './pages/PickTest'
import NotFound from './pages/NotFound'
import TestPageData from './pages/TestPageData'
import SuccessPage from './pages/SuccessPage'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PickTest}></Route>
        <Route exact path="/:category/:test" component={TestPageData}></Route>
        <Route exact path="/success" component={SuccessPage}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
