import React, { Fragment} from 'react';
import './App.css';
import NavBar from "./Components/Layout/NavBar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Search from "./Components/Users/Search";
import axios from "axios";
import Alert from "../src/Components/Layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./Components/Pages/About";


class App extends React.Component{

  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null,
    
    
  }

  // async componentDidMount(){
  //   this.setState({loading: true});
  //   //the below 3 lines are code to insure we dont run out of requests. Because what happens is that you only get a limited amount of calls with axios.get() . if you want to make unlimited requestes, you need to go to git oauth application settings (search it on google) register, get the id and secret and create a .env.local and create teh below code.
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  //   {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //this.setState({users: res.data, loading: false});
  
  //   
  // }

//Search Github users
searchUsers = async text => {
  this.setState({loading: true});
  const res = await axios.get(
    `https://api.github.com/search/users?q=${text}&client_id=${
    process.env.REACT_APP_GITHUB_CLIENT_ID
  }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(text);
    this.setState({users: res.data.items, loading: false});
}

//clear users after search
clearUsers = () => {
  this.setState({
    users: [],
    user: {}, 
    loading: false
  })
}

//get single Github User
getUser = async username => {
  console.log(username)
  this.setState({ loading: true });

  const res = await axios.get(
    `https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  );

  this.setState({ user: res.data, loading: false });
};

//creates an alert
setAlert = (msg, type) => {
  console.log(msg, type);
  this.setState({alert: {msg: msg, type: type}});
  setTimeout(() => this.setState({
    alert: null
  }), 3000)
}

//Get users Repos
getUserRepos = async username => {
  console.log(username)
  this.setState({ loading: true });

  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  );

  this.setState({ repos: res.data, loading: false });
};

  render(){
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route path="/" exact render={props => (
                <Fragment>
                  <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={this.state.users.length > 0 ? true: false}
                  setAlert={this.setAlert}
                  />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              
              <Route exact path="/about" component={About}/>
              <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={this.state.repos} loading={this.state.loading} user={this.state.user} />
              )} />
            </Switch>
          
          </div> 
        </div>
      </Router>
    );
  }
}

export default App;
