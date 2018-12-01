import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker-cssmodules.css'


class Home extends Component {
    state = {
        events: [],
        loading: true,
        markers: []
    }

    componentDidMount = () => {
        axios.get('http://localhost:8080/home').then(
            (res) => {
                this.setState({
                    events: res.data,
                    loading: false

                })
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClick = () => {
        let newEvent = {
            description: this.state.description, date: this.state.date, time: this.state.time
            , address: this.state.address, city: this.state.city, organizer: this.props.user.id
        }

        this.props.updateEvents(newEvent)

        this.setState({
            events: this.state.events.concat({
                description: this.state.description, date: this.state.date, time: this.state.time
                , address: this.state.address, city: this.state.city, organizer: this.props.user.id
            })
        },
            () => {
                axios.post('http://localhost:8080/home', {
                    description: this.state.description, date: this.state.date, time: this.state.time
                    , address: this.state.address, city: this.state.city, organizer: this.props.user.id
                }
                )
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
    render() {
        let events
        if (this.state.loading === false) {
            events = this.props.events.map(event => <a className="list-group-item list-group-item-action list-group-item-primary"><Link to={"/home/" + String(event.id)}>{event.description}</Link></a>)
        }
        return (
            <div>
                {this.state.loading === true ? 'Loading...' : (
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
                        <h1>Events in Vancouver</h1>
                        <div class=" animated fadeIn card list-group">
                            {events}

                        </div>

                        <button type="button" class="button btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Add Event
</button>


                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Add Event</h5>

                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <input onChange={this.onChange} name="description" placeholder="Event Name" />
                                        <input onChange={this.onChange} name="date" placeholder="Date" /> 
                                        <input onChange={this.onChange} name="time" placeholder="Time" />
                                        <input onChange={this.onChange} name="address" placeholder="Address" />
                                        <input onChange={this.onChange} name="city" placeholder="City" />
                                      

                                    </div>
                                    <div class="modal-footer">
                                        <button onClick={this.props.getMarkers} className="button btn-primary" type="button" data-dismiss="modal">Close</button>
                                        <button onClick={this.onClick} type="button" className="button btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                )}
            </div>
        )
    }
}

export default Home
