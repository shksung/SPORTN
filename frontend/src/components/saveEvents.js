import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Save extends Component {
    render () {
        let events
        if (this.props.loading === false) {
            events = this.props.saved.map(event => <a className="list-group-item list-group-item-action list-group-item-warning"><Link to={"/home/" + String(event.id)}>{event.description}</Link></a>)
            console.log(events)
        }
        return (
                <div>
                    {this.props.loading === true ? 'Loading...' : (
                        <div className="center">
    
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
                                            <a class="nav-link" href="#"><Link to="/profile" onClick= {this.forceUpdate}>Profile</Link></a>
                                        </li>
                                        <li class="nav-item active">
                                            <a class="nav-link" href="#"><Link onClick= {this.forceUpdate} to="/map">Map </Link><span class="sr-only">(current)</span></a>
                                        </li>
    
                                        <li class="nav-item active">
                                            <a class="nav-link" href="#"><Link to="/community">Community </Link><span class="sr-only">(current)</span></a>
                                        </li>
                                        <li class="nav-item active">
                                        <a class="nav-link" href="#"><Link to="/saved">Saved</Link><span class="sr-only">(current)</span></a>
                                    </li>

    
                                    </ul>
                                    <form class="form-inline my-2 my-lg-0">
                            
                                        <span><Link to= "/"><button class="button btn-outline-success my-2 my-sm-0" type="submit">Logout</button> </Link> </span>
                                    </form>
                                </div>
                            </nav>
                            <h1>Saved Events</h1>
                            <div class=" animated fadeIn card list-group">
                                {events}
    
                            </div>
    
                        </div>
    
                    )}
                </div>
            )
        }
    }

export default Save