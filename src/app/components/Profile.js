import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeAccount } from "../slices/auth";
import { clearMessage } from "../slices/message";

import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleRemoveAccount = () => {
    setLoading(true);
    dispatch(removeAccount())
      .then(() => {
        setLoading(false);
        <Navigate to="/login" />;
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      {currentUser && (
        <>
        <header className="jumbotron">
          <h1>
            <strong>{currentUser.username}</strong> Profile
          </h1>
        </header>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <button
          type="submit"
          className="btn btn-danger btn-block"
          disabled={loading}
          onClick={handleRemoveAccount}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Remove Account</span>
        </button>
        </>
      )}
      {!currentUser && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            You are not logged in.
          </div>
        </div>
      )}
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;