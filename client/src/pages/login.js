import Header from "../components/Header";
import React, { useState } from "react";


function Login() {
    //const [search, setSearch] = useState("");



    return (

        <div>
            <Header />
            <div class="container">
                <div class="row">
                    <div class="col s12 m4 l2">
                    <div class="signin">
                        <h3>Sign In</h3>
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                                        <label for="first_name">Username:</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="email" type="email" class="validate" />
                                        <label for="email">Email</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="password" type="password" class="validate" />
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                    <div class="col s12 m4 l2">
                    <div class="register">
                        <h3>Register</h3>
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                                        <label for="first_name">Username:</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="email" type="email" class="validate" />
                                        <label for="email">Email</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="password" type="password" class="validate" />
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