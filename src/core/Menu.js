import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">
                    Accueil
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
                    to="/users"
                    style={isActive(history, `/users`)}
                >
                    Utilisateurs
                </Link>
            </li>

            <li className="nav-item">
                <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
                    Créer un post
                </Link>
            </li>

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                            Se connecter
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            Créer un compte
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <li className="nav-item">
                    <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
                        Administration
                    </Link>
                </li>
            )}

            {isAuthenticated() && (
                <Fragment>

                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            {`Page de ${isAuthenticated().user.name}`}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Se déconnecter
                        </span>
                    </li>
                </Fragment>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
