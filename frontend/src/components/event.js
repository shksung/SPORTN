import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'

class Events extends Component {

    render() {
        var index
        var indexUser
        var monthindex
        var map

        if (this.props.loadingEvents === false) {

            for (let i = 0; i < this.props.events.length; i++) {
                if (String(this.props.events[i].id) === this.props.match.params.event) {
                    index = i
                    let d = new Date(this.props.events[index].date)
                    let month = d.getUTCMonth() + 1
                    let day = d.getUTCDay() + 2
                    let year = d.getUTCFullYear()
                    monthindex = String(month) + '/' + String(day) + '/' + String(year)
                    for (let i = 0; i < this.props.users.length; i++) {
                        if (this.props.users[i].id === this.props.events[index].organizer) {
                            indexUser = i
                            if (this.props.users[indexUser].name === this.props.user.name) {
                                map = <button onClick={()=>this.props.deleteEvent(this.props.events[index].id)} className="bg-danger" > <Link to= "/home">Delete</Link></button>
                                
                            }

                        }
                    }
                }
            }

        }


        return (

            <div className="center">
                {this.props.loadingEvents === true ? 'Loading...' : (
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
                                        <a class="nav-link" href="#"><Link onClick= {this.forceUpdate} to="/profile">Profile</Link></a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="#"><Link onClick= {this.forceUpdate} to="/map">Map </Link><span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="#"><Link to="/community">Community</Link><span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="#"><Link to="/saved">Saved</Link><span class="sr-only">(current)</span></a>
                                    </li>


                                </ul>
                                <form class="form-inline my-2 my-lg-0">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search" />
                                    <span><Link to= "/"><button class="button btn-outline-success my-2 my-sm-0" type="submit">Logout</button> </Link> </span>
                                </form>
                            </div>
                        </nav>
                        <h1>{this.props.events[index].description}</h1>
                        <h2>Date: {monthindex} </h2>
                        <h2>Time: {this.props.events[index].time} </h2>
                        <h2>Address: {this.props.events[index].address} </h2>
                        <h2>City: {this.props.events[index].city} </h2>
                        <h2>
                            Organizer: {this.props.users[indexUser].name}
                        </h2>
                        <button onClick={()=>this.props.save(this.props.events[index])} className="bg-success">Add to Wishlist</button>
                        {map}
                    </div>

                )}
            </div>
        )
    }
}

export default Events