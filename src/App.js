import React, { Component } from 'react';
import './App.css';
import ShowContainer from "./Containers/ShowContainer"
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login/Login'
import ProfileContainter from './Containers/ProfileContainer'
import ShowContainter from './Containers/ShowContainer'


class App extends Component {
  state = {
    user: {},
    currentUser:{}
  }

  login = (user) => {
    // console.log(user.username)
    fetch(`http://localhost:3000/api/v1/login`,{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
    body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    }) 

    .then(res => res.json())
    .then(data =>{
  
      if (data.user){
        // debugger
      localStorage.setItem("token", data.token);
      // debugger
        this.props.history.push('/profile')
        this.setState({
          user: user
        })
      }
      }
    )}
  
  render() {
    // console.log('app render')
    return (
      <div className="App">
     <Route path='/login' render={()=> <Login login={this.login}/>}/>
      <Route path='/profile' render={(user) => (<ProfileContainter user={this.state.user}/>)}/>
      <Route path='/shows' render={(user) => (<ShowContainter user={this.state.user}/>)}/>

      </div>
    );
  }
}

export default withRouter(App);
