import Header from "../components/Header";
import React, { useState } from "react";


function Home() {
    const [search, setSearch] = useState("");



    return (

        <div>
            <Header />
            <form>
                    <div className="input-field">
                        <input id="search" type="search" required />
                        <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                        <i className="material-icons">close</i>
                    </div>
                </form>
           

        </div>
    )
}

export default Home;