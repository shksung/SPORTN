import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class ProfAdd extends Component {

    state = {
        bio: "",
        interests: ""
    }

    onChange = (e) => {
        if (this.props.match.params.add === "Bio") {
            this.setState({
                bio: e.target.value
            })
        }
        else {
            this.setState({
                interests: e.target.value
            })
        }
    }

    submit = (e) => {
        e.preventDefault()
        if (this.props.match.params.add === "Bio") {
            axios.put('http://localhost:8080/users', { data: this.state.bio, attribute: "bio", id: this.props.user.id }
            ).then((res) => {
                this.props.updateUserBio(res.data.bio)
            })
        }
        else {
            axios.put('http://localhost:8080/users', { data: this.state.interests, attribute: "interests", id: this.props.user.id }
            ).then((res) => {
                this.props.updateUserInterests(res.data.interests)
            })
        }

    }
    render() {
        return (
            <div className= "center">
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
                </div>
                <div>
                    <h1>{this.props.match.params.add}</h1>
                </div>
                <div class="form-group">
                    <textarea onChange={this.onChange} placeholder="Type Here" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    <button onClick={this.submit}><Link to="/profile">Submit</Link></button>
                </div>
            </div>
        )
    }
}

export default ProfAdd