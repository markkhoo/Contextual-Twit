import Header from "../components/Header";
import React, { useState } from "react";


function Home() {
    const [search, setSearch] = useState("");



    return (

        <div>
            <Header />
            <form>
                    <div class="input-field">
                        <input id="search" type="search" required />
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                    </div>
                </form>
           

        </div>
    )
}

export default Home;