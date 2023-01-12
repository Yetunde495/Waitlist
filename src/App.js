import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./App.css";
import { DisplayModal } from "./components/Modal/modal";
import UserDiv from "./components/User/user";

function App() {
  const [subscribedUsers, setSubscribedUsers] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(true);

  const userData = {
    email: email,
    firstName: firstName,
    lastName: lastName,
  };

  //function to post user input to backend
  const handleSubmit = async () => {
    try {
       await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
    } catch (error) {
      console.error(error);
    }
  };

  //dunction
  async function getUsers() {
    try {
      fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        setSubscribedUsers(data);
        // console.log(subscribedUsers);
      });
    } catch(err) {
      console.error(err)
    }
  }

  //fetching the saved data from the backend
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        setSubscribedUsers(data);
        // console.log(subscribedUsers);
      });
  }, []);

  return (
    <div className="App">
      <div className="wbtn-div">
        <button onClick={() => {
          setModal(true)
          
          }}>Join our Waitlist</button>
      </div>
      {modal && (
        <DisplayModal
          onclose={() => {
            getUsers()
            setModal(false);
            setSubscribed(false);
          }}
        >
          <div>
            <p className="text">
              Subscribe to our newsletter and receive updates
            </p>

            {subscribed === true ? (
              <p>Congratulations! You have  subscribed to our list</p>
            ) : (
              <form  className="form">
                <Row>
                  <Col xs={6}>
                    <input
                      placeholder="Type your first name"
                      type="text"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xs={6}>
                    <input
                      placeholder="Type your last Name"
                      type="text"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <input
                  placeholder="Type your email"
                  type="email"
                  className="subscribe-input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <button type="submit" className="subscribe-btn" onClick={(e) => {
                  e.preventDefault()
                handleSubmit()
                 getUsers()
                 setSubscribed(true)
                }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </DisplayModal>
      )}

      <section className="container">
        {subscribedUsers === null
          ? ""
          : subscribedUsers.map((val, index) => (
              <UserDiv
                key={index}
                initial={val.firstName.substring(0, 1)}
                name={val.firstName + " " + val.lastName}
                email={val.email}
              />
            ))}
      </section>
    </div>
  );
}

export default App;
