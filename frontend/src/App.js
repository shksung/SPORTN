import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import Login from './components/login.js'
import Home from './components/home'
import Profile from './components/profile'
import Community from './components/community'
import Events from './components/event'
import ProfAdd from './components/profadd'
import Users from './components/otherUsers'
import Save from './components/saveEvents'
import axios from 'axios'


class App extends Component {

  state = {
    redirect: false,
    user: [],
    users: [],
    events: [],
    markers: [],
    loadingHome: true,
    loadingEvents: true,
    loadingProfile: true,
    loadingMarkers: true,
    loadingUsers: true,
    loadingDelete: true,
    loadingsavedEvents: true,
    bio: "",
    interests: "",
    saved: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/users').then(
      (res) => {
        console.log(res)
        this.setState({
          users: res.data,
          loadingUsers: false
        })
      }

    )
    axios.get('http://localhost:8080/home').then(
      (res) => {
        this.setState({
          events: res.data,
          loadingEvents: false
        })
      })
    axios.get('http://localhost:8080/login').then(
      (res) => {
        this.setState({
          user: res.data,
          loadingProfile: false
        })
      }
    )
    axios.get('http://localhost:8080/markers').then(
      (res) => {
        this.setState({
          markers: res.data,
          loadingMarkers: false
        })
      }

    )
    axios.get('http://localhost:8080/save').then(
      (res) => {
        this.setState({
          saved: res.data,
          loadingsavedEvents: false
        })
      })
  }

  setUser = (user) => {
    this.setState({
      user: user
    })
  }

  deleteEvent = (i) => {
    let itemtoDelete = this.state.events.filter(event => event.id === i)

    this.setState({
      events: this.state.events.filter(event => event.id !== i)
    })

    itemtoDelete.map(item => {
      axios.delete('http://localhost:8080/home', { data: item })
    })

  }

  updateEvents = (events) => {
    this.setState({
      events: this.state.events.concat(events)
    })
  }
  getMarkers = () => {
    axios.get('http://localhost:8080/markers').then(
      (res) => {
        console.log(res)
        this.setState({
          markers: res.data
        })
      }
    )
  }

  updateUserBio = (bio) => {
    let user = { id: this.state.user.id, username: this.state.user.username, password: this.state.user.password, name: this.state.user.name, bio: bio, picture: this.state.user.picture, interests: this.state.user.interests }
    this.setState({
      user: user
    })
  }

  updateUserInterests = (interests) => {
    let user = { id: this.state.user.id, username: this.state.user.username, password: this.state.user.password, name: this.state.user.name, bio: this.state.user.bio, picture: this.state.user.picture, interests: interests }
    this.setState({
      user: user
    })
  }

  save = (event) => {
    let savedList = this.state.saved.concat(event)
    this.setState({
      saved: this.state.saved.concat(event)
    }, () => {
      savedList.map(list => axios.post('http://localhost:8080/save', list))
    })
  }
  
  render() {
    return (
      <div className="App">


        <Switch>
          <Route exact path="/" render={() => <Login redirect={this.state.redirect} />} />
          <Route exact path="/home" render={() => <Home loading={this.state.loadingHome} updateEvents={this.updateEvents} getMarkers={this.getMarkers} events={this.state.events} user={this.state.user} />} />
          <Route path="/home/:event" render={(router) => <Events save={this.save} deleteEvent={this.deleteEvent} loadingEvents={this.state.loadingEvents} users={this.state.users} loading={this.state.loadingHome} {...router} events={this.state.events} user={this.state.user} />} />
          <Route exact path="/profile" render={() => <Profile setUser={this.setUser} loading={this.state.loadingProfile} user={this.state.user} />} />
          <Route path="/profile/:add" render={(router) => <ProfAdd updateUserInterests={this.updateUserInterests} updateUserBio={this.updateUserBio} setUser={this.setUser} user={this.state.user} {...router} />} />
          <Route path="/map" render={() => <Community loadingMarkers={this.loadingMarkers} markers={this.state.markers} user={this.state.user} />} />
          <Route path="/community" render={() => <Users users={this.state.users} />} loadingUsers={this.state.loadingUsers} />
          <Route path="/saved" render={() => <Save saved= {this.state.saved} loading= {this.state.loadingsavedEvents} />} />
        </Switch>


      </div>
    );
  }
}

export default App;
