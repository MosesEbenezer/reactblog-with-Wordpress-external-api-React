import React from 'react';
import { Link } from '@reach/router';

class Navbar extends React.Component {
    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/">Home </Link>
                    </li>
                    
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;