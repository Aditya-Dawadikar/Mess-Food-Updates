import React, { useState, useEffect } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import CancelIcon from '@material-ui/icons/Cancel';
import { NavLink } from "react-router-dom";
import SignUpImg from "../SignUpImg";
import Modal from "react-modal";
import axios from "axios";
import ForgetPassword from "../ForgetPassword";
import Otp from "../Otp";
import ResetPassword from "../ResetPassword";
import Zoom from "react-reveal";
import { toast } from "react-toastify";

const SignUp = () => {

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width                 : '60%',
      height                : '70%',
      transform             : 'translate(-50%, -50%)',
      border                : "0.5px solid black"
      //give shadow...
    }
  };

  const initialState = localStorage.getItem('token');
  const custToken = initialState;
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modalIsOpen_2nd,setIsOpen_2nd] = useState(false);
  const [modalIsOpen_3rd,setIsOpen_3rd] = useState(false);

  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  useEffect(()=>{
    // Modal.setAppElement('body');
    if(custToken)
    window.location = "/customer/dashboard"
  },[custToken])


  const inputEvent = (e) => {
    const { name, value } = e.target;

    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    axios
      .post("api/login/customer", {
        email: user.email,
        password: user.password,
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token',response.data.token.token)
        localStorage.setItem('refreshToken',response.data.token.refreshToken);
        localStorage.setItem('userId',response.data.userId)
        // console.log(custToken);
        if (response.status === 200) window.location = "/customer/dashboard" ;
      })
      .catch(error=>{
        toast.error('Wrong username or password');
        console.log(error);
      });
  };

  const modal_action=(action)=>{
    setIsOpen(action);
    setIsOpen_2nd(true);
  }
  const modal_action_otp=(action)=>{
    setIsOpen_3rd(action);
    // setIsOpen_2nd(true);
  }

  return (
    <>
      <div className="containerr">
        <SignUpImg />
        <div className="main_div">
          <h3 className="switch">
            <button>
              <NavLink exact to="/login/customer">Login</NavLink>
            </button>
            |
            <button>
              <NavLink exact to="/signup/customer">SignUp</NavLink>
            </button>
          </h3>
          <form onSubmit={onSubmit} autoComplete="on">
            <div className="inputForm">
              <h1>
                Login <FastfoodIcon />
              </h1>
              <div className="inputTag">
                <input
                  type="email"
                  placeholder="Enter Your EmailID"
                  name="email"
                  onChange={inputEvent}
                  value={user.email}
                />
                <EmailOutlinedIcon
                  style={{
                    background: "transparent",
                    color: "black",
                    top: "1.7rem",
                    left: "1rem",
                    position: "absolute",
                  }}
                />
                <input
                  type="password"
                  placeholder="Enter Your password"
                  name="password"
                  onChange={inputEvent}
                  value={user.password}
                />
                <LockOutlinedIcon
                  style={{
                    background: "transparent",
                    color: "black",
                    top: "7.1rem",
                    left: "1rem",
                    position: "absolute",
                  }}
                />
                <button type="submit" className="mb-4">LOGIN</button>
                <h6 className="forget mr-2 text-primary" onClick={()=>setIsOpen(true)}>forget password</h6>
              </div>
            </div>
          </form>
         <div className="switch-user">
         <NavLink to='/login/customer' activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item"><button >Customer</button></NavLink>
          <NavLink to='/login/mess' activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item"><button >Mess</button></NavLink>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
        >
          <Zoom>
            <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>setIsOpen(false)} />
            <ForgetPassword modal_action={modal_action}/>
          </Zoom>
        </Modal>
        <Modal
          isOpen={modalIsOpen_2nd}
          onRequestClose={modalIsOpen_2nd}
          style={customStyles}
          ariaHideApp={false}>
        <Zoom>
            <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>{
              setIsOpen_2nd(false);
              setIsOpen(true);
            }} />
            <Otp modal_action_otp={modal_action_otp}/>
          </Zoom>
        </Modal>
        <Modal
          isOpen={modalIsOpen_3rd}
          onRequestClose={modalIsOpen_3rd}
          style={customStyles}
          ariaHideApp={false}>
        <Zoom>
            <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>{
              setIsOpen_3rd(false);
              setIsOpen_2nd(true);
              }} />
            <ResetPassword/>
          </Zoom>
        </Modal>
      </div>
    </>
  );
};

export default SignUp;

