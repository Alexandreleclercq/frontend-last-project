import React, { Component } from "react";
import Posts from "../post/Posts";
import Users from "../user/Users";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class Admin extends Component {
    state = {
        redirectToHome: false
    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div className="jumbotron">
                    <h2>Panneau d'administration</h2>
                    <p className="lead">Bienvenue dans l'administration de Family City</p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Publications</h2>
                            <hr />
                            <Posts />
                        </div>
                        <div className="col-md-6">
                            <h2>Utilisateurs</h2>
                            <hr />
                            <Users />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
