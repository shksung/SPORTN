import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'

class Users extends Component {
    state = {
        users: [],
        loading: true
    }

    componentDidMount = () => {
        axios.get('http://localhost:8080/users').then(
            (res) => {
                this.setState({
                    users: res.data,
                    loading: false
                })
            }

        )
    }
    render() {
       let users
        if (this.state.loading === false) {
            users = this.state.users.map((user) => {
                return <div className=" col-sm-12 col-md-6 col-lg-4"><div className="margin imgfluid">
                    <div className="animated flipInY card" width="18rem" height="18rem">
                        <div className="cardBorder"><img className="card-img-top" src={user.picture} alt="Card image cap" height="400" width="80%" />
                            <div className="card-body"></div>
                            <h5 className="title card-title">{user.name}</h5>
                            <p className="card-text">{user.interests}</p>
                            <button className="button btn-primary btn-group-toggle">Add</button>

                        </div>
                    </div>

                </div></div>
            })
        }
        return (
            <div className="text-center center">
                {this.state.loading === true ? 'Loading....' : (
                    <div className="center" >
                        <div className="center">
                            <div>
                                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                    <a class="navbar-brand" href="#">SPORTN</a>
                                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>

                                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                            <li class="nav-item active">
                                                <a class="nav-link" href="#"><Link to="/home">Home </Link><span class="sr-only">(current)</span></a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#"><Link to="/profile">Profile</Link></a>
                                            </li>
                                            <li class="nav-item active">
                                                <a class="nav-link" href="#"><Link to="/map">Map </Link><span class="sr-only">(current)</span></a>
                                            </li>
                                            <li class="nav-item active">
                                                <a class="nav-link" href="#"><Link to="/community">Community </Link><span class="sr-only">(current)</span></a>
                                            </li>
                                            <li class="nav-item active">
                                        <a class="nav-link" href="#"><Link to="/saved">Saved</Link><span class="sr-only">(current)</span></a>
                                    </li>

                                        </ul>
                                        <form class="form-inline my-2 my-lg-0">
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search" />
                                            <span> <button class="button btn-outline-success my-2 my-sm-0" type="submit">Search</button></span>
                                        </form>
                                    </div>
                                </nav>
                            </div>

                        </div>
                        <h1>Community</h1>

                    <div className= "container"> 
                        <div className= "row"> 
                        {users}
                        </div>
                    </div>
                        


                    </div>
                )}


            </div>
        )
    }
}

export default Users