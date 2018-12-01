import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'


class Profile extends Component {

    state = {
        user: [],
        loading: true,
        boolean: false
    }

    render() {

        return (

            <div className="text-center center">
                {this.props.loading === true ? 'Loading....' : (
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
                                                <a class="nav-link" href="#"><Link onClick= {this.forceUpdate} to="/profile">Profile</Link></a>
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
                                            <input class="form-control mr-sm-2" type="search" placeholder="Search" />
                                            <span><Link to="/"><button class="button btn-outline-success my-2 my-sm-0" type="submit">Logout</button> </Link> </span>
                                        </form>
                                    </div>
                                </nav>
                            </div>

                        </div>


                        <div class="center animated fadeIn">

                            <div class="card cardwidth hovercard">
                                <div class="cardheader ">

                                </div>
                                <div class=" center avatar">
                                    <img alt="" src={this.props.user.picture} />
                                </div>
                                <div class="info">
                                    <div class="title">
                                        <a target="_blank" href="">{this.props.user.name}</a>
                                    </div>

                                    <div class="desc">Gym Shark</div>
                                    <div class="desc">Sports Enthusiast</div>
                                </div>

                                <div class="bottom">
                                    <a class="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac">
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                    <a class="btn btn-danger btn-sm" rel="publisher"
                                        href="https://plus.google.com">
                                        <i class="fa fa-google-plus"></i>
                                    </a>
                                    <a class="btn btn-primary btn-sm" rel="publisher"
                                        href="https://www.facebook.com/ksungsung">
                                        <i class="fa fa-facebook"></i>
                                    </a>
                                    <a class="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam">
                                        <i class="fa fa-behance"></i>
                                    </a>

                                </div>
                                <div class="bottom">
                                    <a class="btn-sm btn-warning" >
                                        Bio: {this.props.user.bio} <span><Link to={"/profile/" + "Bio"}>Edit </Link> </span>
                                    </a>

                                </div>
                                <div class="bottom">
                                    <a class="btn-danger btn-sm" rel="publisher"
                                    >
                                        Interests: {this.props.user.interests} <span><Link to={"/profile/" + "Interests"}>Edit </Link> </span>
                                    </a>
                                </div>
                            </div>

                        </div>



                    </div>
                )}


            </div>

        )
    }
}

export default Profile
