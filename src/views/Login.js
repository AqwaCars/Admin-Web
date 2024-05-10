import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "../assets/css/login.css";
// import Head from 'next/head';
import axios from 'axios';
import { Login } from 'Redux/adminSlice';
import { Card, CardHeader, CardBody, Row, Col, Input, Label, FormGroup, Form, Button, Badge } from "reactstrap";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import img00 from "../assets/img/back00.jpg"
import { getData } from 'Redux/adminSlice';
import { selectLoggedIn } from 'Redux/adminSlice';
import { selectLoading } from 'Redux/adminSlice';
export default function LoginPage() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const logged=useSelector(selectLoggedIn)
  const loading=useSelector(selectLoading)
  const [error, setError] = useState(null);
  const [formChecked, setFormChecked] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const dispatch = useDispatch()
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const formValidation = () => {
    if (form.email && form.password) {
      setFormChecked(true);
      // console.log(form);
    } else {
      setFormChecked(false);
      // console.log(form);
    }
  };



  // const identifierValidation = (identifier) => {
  //   // Regular expression for email
  //   const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/;

  //   // Regular expression for phone number (this example assumes a simple format)
  //   const phonePattern = /^[\d\+\-]+$/;

  //   if (emailPattern.test(identifier)) {
  //     return "email";
  //   } else if (phonePattern.test(identifier)) {
  //     return "phoneNumber";
  //   }
  // };
  const handleLogin = async () => {
    try {
     dispatch(Login({ email: form.email, password: form.password }));
      // Now you can use the action object
      // console.log(action);
      // console.log(action.meta.requestStatus==="fulfilled");
   
      // dispatch(getData())
      // setError(null);
      // logged?
      // navigation('/admin/dashboard'):null
      // dispatch(fetchUser(response.data));
    } catch (err) {
      console.log(err);
      if (err.response.status == "404") {
        setError("user does not exist");
      } else if (err.response.status == "401") {
        setError("incorrect password");
      } else {
        console.error(err.message);
      }
    }
   };
   
  useEffect(() => {
    const wrapper = document.querySelector('.wrapper_log_cust');
    wrapper.classList.add('form-success');

    return () => {
      wrapper.classList.remove('form-success');
    };
  }, []);
  return (
    // <>
    <div className="content" >
      <Row >
        <Col style={{
          // backgroundColor:"red",
          display: "flex", justifyContent: "center", alignItems: "center"
        }} md="12">
          {/* <img src={img00} alt='no img available' style={{
              position: 'absolute', width: '100%', height: '100%',
              backgroundRepeat: "no-repeat",
              objectFit: "cover"
            }} /> */}
          <Card className='ctr_03' style={{
            // display:"flex",
            // alignItems:"center",
            // justifyItems:"center",
            // backgroundColor: 'rgba(0, 0, 0, 0.3 )',
            // width: "100%",
            // height: "85vh",
            // position: 'relative'
          }}>

            <CardHeader className='header_login_cr'>
              dd
            </CardHeader>
            <CardBody className="all-icons" >
              <div className="wrapper_log_cust">
                <div className="container_log_cust">
                  <h1 style={{
                    color:"#fff"
                  }}>Welcome back Admin</h1>

                  <form style={{

                  }} className={formVisible ? '' : 'fade-out'}>
                    <input type="text" placeholder="Email" onChange={(e) => {
                      formValidation()
                      setForm({ ...form, email: e.target.value })
                    }} />
                    <input type="password" placeholder="Password" onChange={(e) => {
                      formValidation();
                      setForm({ ...form, password: e.target.value })
                    }} />
                    <button type="submit" id="login-button" disabled={!formChecked} onClick={handleLogin}>Login</button>
                  </form>
                </div>

                <ul className="bg-bubbles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div >
    // </>
  );
}
