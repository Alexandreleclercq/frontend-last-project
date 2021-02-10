import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../post/apiPost";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
      error: "",
      posts: []
    };
  }

  init = userId => {
    console.log('userId', userId)
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user, posts } = this.state;
    console.log('user', user)
    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoUrl = isAuthenticated().user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id
      }?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profil</h2>
        <div className="row">
          <div className="col-md-4">
            <img
              style={{ height: "auto", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>

          <div className="col-md-8">
            <div className="lead mt-2">
              <p>Nom : {user.name}</p>
              <p>Email : {user.email}</p>
              <p>{`Ajouté le ${new Date(user.created).toLocaleDateString("fr-FR")}`}</p>
            </div>

            {(isAuthenticated().user &&
              isAuthenticated().user._id === user._id) && (
                <div className="d-inline-block">
                  <Link
                    className="btn btn-raised btn-info mr-5"
                    to={`/post/create`}
                  >
                    Créer un post
                </Link>

                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/user/edit/${user._id}`}
                  >
                    Modifier le compte
                </Link>
                  <DeleteUser userId={user._id} />
                </div>
              )}

            <div>
              {(isAuthenticated().user &&
                isAuthenticated().user.role === "admin") && (
                  <div class="card mt-5">
                    <div className="card-body">
                      <h5 className="card-title">Admin</h5>
                      <p className="mb-2 text-danger">
                        Modifier et supprimer
                      </p>
                      <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${user._id}`}
                      >
                        Modifier Profil
                      </Link>
                      <DeleteUser />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />

            <ProfileTabs
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
