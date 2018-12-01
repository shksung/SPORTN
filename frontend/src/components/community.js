import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css'
import ControlPanel from './control-panel';
import CityPin from './city-pin';

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

class Community extends Component {

    state = {
        mapStyle: 'mapbox://styles/mapbox/streets-v9',
        viewport: {
            width: 1000,
            height: 1000,
            latitude: 49.27,
            longitude: -123.08983641734297,
            zoom: 11,
        },
        markers: []
    };
    mapRef = React.createRef()


    _updateViewport = (viewport) => {
        this.setState({ viewport: { ...viewport } });
    }

    _renderCityMarker = (city, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={city.longitude}
                latitude={city.latitude} >
                <CityPin size={20} onClick={() => this.setState({ popupInfo: city })} />
            </Marker>
        );
    }

    _renderPopup() {
        const { popupInfo } = this.state;

        return popupInfo && (
            <Popup tipSize={5}
                anchor="top"
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                onClose={() => this.setState({ popupInfo: null })} >

            </Popup>
        );
    }



    render() {
        const { viewport } = this.state;
        return (
            <div>
                {this.props.loadingMarkers === true ? 'Loading...' : (
                    <div>
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
                        </div>
                        <div>
                            <div id='map' className="App">
                                <ReactMapGL
                                    // ref={this.mapRef}
                                    mapStyle={this.state.mapStyle}
                                    {...viewport}
                                    onViewportChange={this._updateViewport}
                                    mapboxApiAccessToken={"pk.eyJ1Ijoia3N1bmcxMiIsImEiOiJjam90bTZwZXUwbGNhM3ZzNXE1YnZhb3U5In0.uUYmMFuOMHmLb9L53DgqQQ"}>

                                    {this.props.markers.map(this._renderCityMarker)}
                                    {this._renderPopup()}


                                    <div className="nav" style={navStyle}>
                                        <NavigationControl onViewportChange={this._updateViewport} />
                                    </div>

                                    <ControlPanel containerComponent={this.props.containerComponent} />
                                </ReactMapGL>



                            </div>

                        </div>
                    </div>
                )}
            </div>



        )
    }
}

export default Community
