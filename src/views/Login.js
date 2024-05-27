import React, { useState, useEffect } from 'react';
import "../assets/css/login.css";
// import Head from 'next/head';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { Login, selectAdmin } from '../Redux/adminSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
export default function LoginPage() {
  const navigate = useNavigate();
  const [formChecked, setFormChecked] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const dispatch = useDispatch()
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
    await dispatch(Login({ email: form.email, password: form.password }));
  };
  // };
  const [isAdminLoaded, setIsAdminLoaded] = useState(false);
  const [clearance, setClearance] = useState(null);
  const adminData = useSelector(selectAdmin);


  useEffect(() => {
    // Update the clearance state whenever adminData changes
    if (adminData) {
      setClearance(adminData.clearance);
      setIsAdminLoaded(true);
    }
  }, [adminData]); // Depend on adminData to re-run this effect

  useEffect(() => {
    if (isAdminLoaded && clearance !== null) {
      if (clearance === "Level3") {
        navigate("/admin/dashboard");
      } else if (clearance === "Level2" || clearance === "Level1") {
        navigate("/admin/Cars");
      }
    }
    // }, [isAdminLoaded, clearance, navigate]);
  }, [isAdminLoaded, clearance, navigate]);
  // / Re-run effect if `token` changes


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
                    color: "#fff"
                  }}>Welcome back Admin</h1>

                  <form style={{

                  }} className={!formVisible ? '' : 'fade-out'}>
                    <input type="text" placeholder="Email" onChange={(e) => {
                      formValidation()
                      setForm({ ...form, email: e.target.value })
                    }} />
                    <input type="password" placeholder="Password" onChange={(e) => {
                      formValidation();
                      setForm({ ...form, password: e.target.value })
                    }} />
                    <button type="submit" id="login-button" disabled={!formChecked} onClick={(e) => {
                      e.preventDefault();
                      console.log("haha");
                      handleLogin()
                    }}>Login</button>
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
