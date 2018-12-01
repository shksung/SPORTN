import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    
    state ={
        username: "",
        password:"", 
        redirect: false
    }

    userInput = (e) =>{
        this.setState({
            username: e.target.value
        })
    }

    passwordInput = (e) =>{
        this.setState({
           password: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/login', {username: this.state.username, password: this.state.password}).then(
            (res) => {
                if (res.data.message === "Success" ) {
                    this.setState ({
                        redirect: true 
                    })
                }
            }
        )
       
    }
    render() {
        if(this.state.redirect === true) {
            return <Redirect to= "/home"></Redirect>
        }
        return (
            <div className= "center">
                <h1>SPORTN</h1>
                <div className="cont">
                    <form >
                        <div className="rowd">
                            <h2 class= "text-align:center">Login with Social Media or Manually</h2>
                            <div className="vl">
                                <span className="vl-innertext">or</span>
                            </div>

                            <div className="column">
                                <a href="#" className="fb button">
                                    <i className="fa fa-facebook fa-fw"></i> Login with Facebook
        </a>
                                <a href="#" className="twitter button">
                                    <i className="fa fa-twitter fa-fw"></i> Login with Twitter
        </a>
                                <a href="#" className="google button">
                                    <i className="fa fa-google fa-fw"></i> Login with Google+
        </a>
                            </div>

                            <div className="column">
                                <div className="hide-md-lg">
                                    <p>Or sign in manually:</p>
                                </div>

                                <input onChange= {this.userInput} type="text" name="username" placeholder="Username" required />
                                <input onChange= {this.passwordInput} type="password" name="password" placeholder="Password" required />
                              <button onClick= {this.handleSubmit}  type= "button">
                                  Login
                              </button>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="bottom">
                    <div className="rowd">
                        <div className="column">
                            <a href="#" styles="color:white" className="button">Sign up</a>
                        </div>
                        <div className="column">
                            <a href="#" styles="color:white" className="button">Forgot password?</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login