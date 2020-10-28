import React, { useState, useEffect, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Spinner } from 'reactstrap';

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = '/api/userprofile';
  const userTypeApiUrl = '/api/usertype';
  const userPropApiUrl = '/api/userproperty';

  const userProfile = sessionStorage.getItem('userProfile');
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [isPropertyManager, setIsPropertyManager] = useState(userProfile != null && JSON.parse(userProfile).userTypeId === 1);

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
        setIsPropertyManager(userProfile.userTypeId === 1)
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
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

  const getUserTypes = async () => {
    const res = await fetch(userTypeApiUrl, {
      method: "GET"
    });
    const val = await res.json();
    return val;
  }

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const createUserProperty = async (userProfileId, listOfPropIds) => {
    const token = await getToken();
    const res = await fetch(`${userPropApiUrl}/${userProfileId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listOfPropIds)
    })
    if (res.ok) {
      return
    } else {
      return console.log("Error")
    }
  }

  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, getUserTypes, getToken, register, createUserProperty, isPropertyManager }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  )
}