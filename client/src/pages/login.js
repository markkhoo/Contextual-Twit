import Header from "../components/Header";
import React, { useState } from "react";


function Login() {
    //const [search, setSearch] = useState("");



    return (

        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col s12 ">
                    <div className="signin">
                        <h3>Sign In</h3>
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
                                        <label for="first_name">Username:</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate" />
                                        <label for="email">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="password" type="password" className="validate" />
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                    <div className="col s12 ">
                    <div className="register">
                        <h3>Register</h3>
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
                                        <label for="first_name">Username:</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate" />
                                        <label for="email">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="password" type="password" className="validate" />
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login;