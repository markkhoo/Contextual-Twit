import Header from "../components/Header";
import React, { useState } from "react";
const axios = require('axios')



function Login() {
    
    const [account1, setAccount1] = useState("");
    const [account2, setAccount2] = useState("");
    const [account3, setAccount3] = useState("");

function handleSetInput1(event){
    setAccount1(event.target.value)
    console.log(account1)

}

function handleSetInput2(event){
    setAccount2(event.target.value)
    console.log(account2)


}
function handleSetInput3(event){
    setAccount3(event.target.value)
    console.log(account3)

}


const handleRegisterSubmit =(event)=>{
    event.preventDefault()
    console.log("hello")
    axios.post("/api/register",{
        username: account1,
        email: account2,
        password: account3
    })
    .then(function (response){
        console.log(response)
    })

}


function handleLogin(){

}

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
                                        <input onChange={handleSetInput1} placeholder="Placeholder"  id="first_name" type="text" className="validate" />
                                        <label for="first_name">Username:</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input onChange={handleSetInput2} id="email" type="email" className="validate" />
                                        <label for="email">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input onChange={handleSetInput3} id="password" type="password" className="validate" />
                                        <label for="password">Password</label>
                                    </div>
                                </div>
                                <button onClick={handleRegisterSubmit} className="btn waves-effect waves-light" type="submit" name="action">Submit
                                            <i className="material-icons right">send</i>
                                        </button>
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