import React, { useState, useEffect, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Spinner } from 'reactstrap';

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = '/api/userprofile';
  const userTypeApiUrl = '/api/usertype';

  const userProfile = sessionStorage.getItem('userProfile');
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getUserTypes = () => {
    return getToken().then((token) =>
      fetch(`${userTypeApiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, getUserTypes }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  )
}