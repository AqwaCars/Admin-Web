import React, { useState } from 'react'
import Modal from 'react-modal';
import "./modal.css"
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // borderWidth: ".15rem",
        // borderStyle: "groove",
        borderRadius: "1rem",
        //   borderColor: "#30416B",
        // marginRight: '10rem',
        border: " 0rem hidden rgb(204, 204, 204)",
        paddingRight: "1.6rem",
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent   ',
        width: "22rem",
        // height: "43.7rem",
        overflow: "hidden",
        transform: 'translate(-50%, -50%)',
    },
};
const ExtraUserModal = ({ setformData, setShow, show }) => {
    const [formData, setFormData] = useState({
        name: "",
        Email: "",
        phoneNumber: "",
        address: "",
        postalCode: "",
        city: ""
    });

    const handleChange = (key, val) => {
        setFormData(prev => {
            prev[key] = val
            return prev;

        }
        )
    }
    const handleFinish = async () => {
        console.log(formData);
        if (Object.values(formData).includes("")) {
            return
        }
        setformData(formData)
        setShow(false)
    }
    return (
        <Modal
            isOpen={show}
            style={customStyles}
            contentLabel="Extra User Modal" // Adding a content label for accessibility
            onRequestClose={() => setShow(false)} // Correctly passing a function to onRequestClose
            onAfterClose={() => {
                // Any cleanup or additional actions after the modal closes
            }}
        >
            <div className="container">
                <div className="form_area">
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "90%",
                        paddingTop: "1rem", // Ensure this is uncommented to allow align-self to work
                        justifyContent: "center", // Use space-between to push elements to the edges
                        // gap: "5rem"
                    }}>
                        <div onClick={() => {
                            setShow(false)
                        }} className='colorHover' style={{ alignSelf: "flex-end", fontSize: "1rem", cursor: "pointer" }}>X</div> {/* Explicitly center-align the "X" */}
                        <div className="title">Extra User Data</div>
                    </div>

                    <div >
                        <div className="form_group">
                            <label className="sub_title" htmlFor="name">Name</label>
                            <input onChange={(e) => {
                                handleChange("name", e.target.value)
                            }} placeholder="Enter The full name Of The User" className="form_style" type="text" />
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="email">Email</label>
                            <input onChange={(e) => {
                                handleChange("Email", e.target.value)
                            }} placeholder="Enter The email Of The User" id="email" className="form_style" type="email" />
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="phoneNumber">phone Number</label>
                            <input onChange={(e) => {
                                handleChange("phoneNumber", e.target.value)
                            }} placeholder="Enter The phone Number Of The User" className="form_style" type="number" />
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="address">address</label>
                            <input onChange={(e) => {
                                handleChange("address", e.target.value)
                            }} placeholder="Enter The full address Of The User" className="form_style" type="text" />
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="postalCode">Postal Code</label>
                            <input onChange={(e) => {
                                handleChange("postalCode", e.target.value)
                            }} placeholder="Enter The postal code Of The User" className="form_style" type="number" />
                        </div>
                        <div className="form_group">
                            <label className="sub_title" htmlFor="city">City</label>
                            <input onChange={(e) => {
                                handleChange("city", e.target.value)
                            }} placeholder="Enter The City Of The User" className="form_style" type="text" />
                        </div>
                        <div>
                            <button onClick={() => {
                                handleFinish()
                            }} className="btn_22">Save User Data</button>
                            <p>User Registred Already? <span onClick={() => {
                                setShow(false)
                            }} className="link" >Go Back!</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ExtraUserModal
