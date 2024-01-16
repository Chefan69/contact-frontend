import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to Your Personal Contact Manager</h1>
        <p className="lead">Manage your contacts with ease</p>
        <hr className="my-4" />
        <Link to="/signin" className="btn btn-primary btn-lg mx-2">
          Sign In
        </Link>
        <Link to="/signup" className="btn btn-success btn-lg mx-2">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
