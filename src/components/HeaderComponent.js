import React, {Component} from "react";
import {Navbar, NavbarBrand} from 'reactstrap';



class Header extends Component{

    render(){
        return(
            <React.Fragment>
            <Navbar dark color="primary">
                <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
            </Navbar>

            <div className="jumbotron">
                {/* found out that latest reactstrap doesnt come with Jumbotron element */}
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Header;