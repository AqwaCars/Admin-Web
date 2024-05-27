
import { getAllUsers, selectAdmin } from "../Redux/adminSlice";
import { selectAllUsers } from "../Redux/adminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Select from 'react-select';
import Swal from 'sweetalert2'
import { updateStateBlock } from "../Redux/adminSlice";
import "../assets/css/nucleo-icons.css"
import "../assets/css/usersList.css"
import { Sort } from "../Redux/adminSlice";
import { ReactComponent as Detail } from '../assets/Svg/details.svg';
import { filterUsers } from "../Redux/adminSlice";
import { selectStaticAllUsers } from "../Redux/adminSlice";
import Modal from 'react-modal';
import { agencyCars } from "../Redux/adminSlice";
import { getAgencyCars } from "../Redux/adminSlice";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

function UserManagements() {
  const Admin = useSelector(selectAdmin)
  const [selectedOption, setSelectedOptions] = useState({ value: 'all', label: 'Select Filter ...' });
  const AgencyCars = useSelector(agencyCars)
  const [selectedSortOption, setSelectedSortOptions] = useState({ value: "Select Sort...", label: "Select Sort ..." });
  const options = [
    { value: 'all', label: 'All Users' },
    { value: 'clients', label: 'Clients Only' },
    { value: 'agencies', label: 'Agencies Only' },
    { value: 'ban', label: 'Banned Only' },
    { value: 'active', label: 'Active Only' },
  ];
  const replaceSelectedOption = (selectedSortOption) => {
    const newOptions = [
      { value: 'A-Z', label: 'Sort By: Alphabetical Order(A-Z) ↾' },
      { value: 'createdAt', label: 'Sort By: Date of Account Creation ↾' },
      { value: 'carsRented', label: 'Sort By: Number of Cars Rented ↾' }
    ];

    newOptions.forEach((option, index) => {
      if (option.value === selectedSortOption.value) {
        newOptions[index] = {
          value: option.value === 'A-Z' ? 'A-Z-desc' : option.value === 'createdAt' ? 'createdAt-desc' : 'carsRented-desc',
          label: option.label === 'Alphabetical Order(A-Z) ↾' ? 'Alphabetical Order(A-Z) ⇂' : option.label === 'Date of Account Creation ↾' ? 'Date of Account Creation ⇂' : 'Number of Cars Rented ⇂'
        };
      }
    });
    return newOptions;
  };
  const sortOptions = replaceSelectedOption(selectedSortOption);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleInputChange = (inputValue, { action }, filteredOptions) => {
    if (action === 'input-change' && inputValue.length >= 2) {
      setMenuIsOpen(true);
      const filtered = staticAllUsers.filter((e) => {
        return ((e.userName).toLowerCase()).includes(inputValue.toLowerCase())
      })
      filtered[0] ? dispatch(filterUsers(filtered)) : console.log(filtered);
    }
    else if (action === 'input-change' && inputValue.length === 0) {
      setMenuIsOpen(false);
      dispatch(getAllUsers())
    }
  };
  const handleBlur = () => {
    setMenuIsOpen(false);
  };
  const [modalData, setModalData] = useState()
  const handleDetailClick = (user) => {
    console.log(user);
    dispatch(getAgencyCars(user.userName))
    setModalData(user)
  }
  const searchCustomStyles = {
    menu: (provied, state) => ({
      ...provied,
      background: "#fff"
    }),
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: state.isFocused ? '#007BFF' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 1px #007BFF' : 'none',
      '&:hover': {
        borderColor: '#007BFF',
      },
      width: "25rem"
    }),
    lineHeight: "2px",
    height: "2px",
    minHeight: '20px',
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? '#1E1E2F' : state.isSelected ? '#1E1E2F' : '#fff',
      color: state.isFocused ? '#fff' : state.isSelected ? '#fff' : '#1E1E2F',
      width: "25rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff', // Change this to your desired selected value color
    }),
    input: (provided) => ({
      ...provided,
      color: '#1E1E2F', // change this to the color you want
    }),
    menuList: (provided) => ({
      ...provided,
      "::-webkit-scrollbar": {
        width: "0px",
        height: "0px",
      },
    }),
  }
  const customStyles = {
    menu: (provied, state) => ({
      ...provied,
      background: "#fff",
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: state.isFocused ? '#007BFF' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 1px #007BFF' : 'none',
      '&:hover': {
        borderColor: '#007BFF',
      },
      width: "17rem"
    }),
    lineHeight: "2px",
    height: "2px",
    minHeight: '20px',
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? '#1E1E2F' : state.isSelected ? '#1E1E2F' : '#fff',
      color: state.isFocused ? '#fff' : state.isSelected ? '#fff' : '#1E1E2F',
      width: "17rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1E1E2F', // Change this to your desired selected value color
    }),
  }
  const customStyles2 = {
    overlay: {
      // background: "#fff",
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      overflow: "visible",
      top: '50%',
      padding: "0",
      left: '50%',
      right: 'auto',
      borderWidth: ".2rem",
      borderRadius: "10% 30px",
      borderCronerShape: "scoop",

      borderStyle: "solid",
      borderColor: "#b78846",
      bottom: 'auto',
      // marginRight: '-50%',
      width: "70rem",
      height: "55rem",
      transform: 'translate(-50%, -50%)',
    },
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  const handleBlock = (id) => {
    try {
      const user = allUsers.find((user) => user.id === id);
      if (user) {
        dispatch(updateStateBlock(id));
        setRefresh(!refresh);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (chosen) => {
    setMenuIsOpen(false);
    setSelectedOptions(chosen)
    console.log(selectedOption);
  }
  const handleSortChange = async (chosen) => {
    try {
      setSelectedSortOptions(chosen)
      await dispatch(Sort(chosen.value))
      console.log(selectedSortOption);
    } catch (error) {
      console.error(error);
    }
    // setRefresh(!refresh)
  }
  const filterChange = async (state) => {
    if (state === "Banned Only") {
      const filtered = staticAllUsers.filter((e) => {
        return e.isBlocked === "true"
      })
      filtered[0] && dispatch(filterUsers(filtered));

    } else if (state === "Active Only") {
      const filtered = staticAllUsers.filter((e) => {
        return e.isBlocked === "fqlse"
      })
      filtered[0] && dispatch(filterUsers(filtered));
    }
  }
  const loading = useSelector((state) => state.Admin.loading);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch()
  const allUsers = useSelector(selectAllUsers)
  const staticAllUsers = useSelector(selectStaticAllUsers)
  const searchOptions = allUsers?.map(user => ({
    label: user.userName,
    value: user.id
  }));
  useEffect(() => {
    dispatch(getAllUsers())
    console.log(allUsers);
    if (loading) {
      setRefresh(!refresh);
    }

  }, [dispatch, refresh])
  useEffect(() => {
    const detailsBtn = document.getElementById('detailsBtn');

    if (detailsBtn) {
      detailsBtn.addEventListener('mouseover', function () {
        this.setAttribute('data-tooltip', 'Details');
      });

      detailsBtn.addEventListener('mouseout', function () {
        this.removeAttribute('data-tooltip');
      });
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const handleNavigation = () => {
      if (Admin.clearance === "Level1") {
        navigate(-1); // Navigate back to the previous page
      }
    };

    handleNavigation();
  }, [Admin, navigate]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                // backgroundColor: "red",
                height: "3rem"
              }}>
                <Select
                  options={searchOptions}
                  filterOption={(option, input) => input.length >= 2 && option.label.toLowerCase().includes(input.toLowerCase())}
                  value={null}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null
                  }}
                  styles={searchCustomStyles}
                  placeholder="find a specific User..."
                  onInputChange={handleInputChange}
                  // onChange={handleChange}
                  onBlur={handleBlur}
                  menuIsOpen={menuIsOpen}
                />
                <div style={{
                  display: "flex",
                  flexDirection: "row"
                }}>
                  <div style={{
                    paddingRight: "2rem",
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    alignItems: "center"
                  }}>
                    Sort By:
                    <Select
                      isSearchable={true}
                      value={selectedSortOption}
                      onChange={handleSortChange}
                      options={sortOptions}
                      styles={customStyles}
                    />
                  </div>
                  <div style={{
                    paddingRight: "2rem",
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    alignItems: "center"
                  }}>
                    Filter By:
                    <Select
                      isSearchable={true}
                      value={selectedOption}
                      onChange={(selectedOption) => {
                        // console.log(selectedOption.label);
                        // selectedOption.label==="Banned Only"||selectedOption.label==="Active Only"?
                        // filterChange(selectedOption.label):
                        handleChange(selectedOption);
                        console.log(selectedOption);
                      }}
                      options={options}
                      styles={customStyles}
                    />
                  </div></div>
              </CardHeader>
              <CardBody className="all-icons">
                {selectedOption.label === "All Users" || selectedOption.label === "Select Filter ..." ?
                  (
                    <>
                      <div style={{
                        color: "#30416b",
                        fontSize: "1rem"
                      }}>
                        All Clients:
                      </div>
                      <Row>
                        {allUsers?.map((user, i) =>
                          user.type === "user" ? (
                            <Col
                              key={i}
                              className="font-icon-list col-xs-6 col-xs-6"
                              lg="2"
                              md="3"
                              sm="4"
                              onClick={() => {
                                console.log(user);
                                Swal.fire({
                                  title: `<strong>${user.type === "user" ? "user" : "company"} Profile Details</strong>`,
                                  html: `
                                 <b>UserName: </b>${user.userName}
                                 <br>
                                 <b>email: </b>${user.email}
                                 <br>
                                 <b>phoneNumber: </b>${user.phoneNumber}
                                 <br>
                                 <b>type: </b>${user.type}
                                `,
                                  imageUrl: `${user.selfie}`,
                                  imageWidth: 200,
                                  imageHeight: 200,
                                  imageAlt: "Custom image",
                                  backdrop: `rgba(0, 0, 0, 0.5)`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: `
                                 <i class="fa fa-ban"></i> ${user.isBlocked ? "unBan this User?" : "ban this User?"}
                                `,
                                  confirmButtonAriaLabel: "Thumbs up, great!",
                                  customClass: {
                                    text: "swal-secondary-text",
                                    text: {
                                      color: "#30416b"
                                    },
                                    container: 'my-modal',
                                    confirmButton: user.isBlocked ? 'unban-button' : 'ban-button',
                                    cancelButton: !user.isBlocked ? 'unban-button' : 'ban-button'
                                  },
                                  cancelButtonText: `
                                 <i class="fa fa-close"></i>
                                `,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Yes!",
                                      cancelButtonText: "No, cancel!"
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleBlock(user.id)
                                        Swal.fire({
                                          title: user.isBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                          text: user.isBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
                                          icon: "success"
                                        });
                                      } else if (
                                        result.dismiss === Swal.DismissReason.cancel
                                      ) {
                                        Swal.fire({
                                          title: "Cancelled",
                                          text: "The user ban has been cancelled.",
                                          icon: "error"
                                        });
                                      }
                                    });
                                  }
                                });
                              }}
                            >
                              <div className="font-icon-detail">
                                <div className="details_btn" id="detailsBtn">
                                  {/* <Detail onClick={(event) => {
                                    event.stopPropagation();
                                    handleDetailClick(user)
                                    openModal()
                                  }} /> */}
                                </div>
                                <img src={user.selfie} style={{
                                  height: "50%", width: "35%", objectFit: "cover"
                                }} />
                                <p className="userNameCol">{user.userName}
                                  <br></br>
                                  {user.email}</p>
                              </div>
                            </Col>) : null
                        )}
                      </Row>
                      <div style={{
                        padding: "1rem"
                      }}>
                        <div style={{
                          width: "100%",
                          height: ".005rem",
                          backgroundColor: "#30416b"
                        }}></div>
                      </div>
                      <div style={{
                        color: "#30416b",
                        fontSize: "1rem"
                      }}>
                        All Agencies:
                      </div>
                      <Row>
                        {allUsers?.map((user, i) =>
                          user.type === "company" ? (

                            <Col
                              key={i}
                              className="font-icon-list col-xs-6 col-xs-6"
                              lg="2"
                              md="3"
                              sm="4"
                              onClick={() => {
                                console.log(user);
                                Swal.fire({
                                  title: `<strong>${user.type === "user" ? "user" : "company"} Profile Details</strong>`,
                                  html: `
                                 <b>UserName: </b>${user.userName}
                                 <br>
                                 <b>email: </b>${user.email}
                                 <br>
                                 <b>phoneNumber: </b>${user.phoneNumber}
                                 <br>
                                 <b>type: </b>${user.type}
                                
                                `,
                                  imageUrl: `${user.selfie}`,
                                  imageWidth: 200,
                                  imageHeight: 200,
                                  imageAlt: "Custom image",
                                  backdrop: `rgba(0, 0, 0, 0.5)`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: `
                                 <i class="fa fa-ban"></i> ${user.isBlocked ? "unBan this User?" : "ban this User?"}
                                `,
                                  confirmButtonAriaLabel: "Thumbs up, great!",
                                  customClass: {
                                    text: "swal-secondary-text",
                                    container: 'my-modal',
                                    confirmButton: user.isBlocked ? 'unban-button' : 'ban-button',
                                    cancelButton: !user.isBlocked ? 'unban-button' : 'ban-button'
                                  },
                                  cancelButtonText: `
                                 <i class="fa fa-close"></i>
                                `,
                                  // cancelButtonAriaLabel: "Thumbs down"
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                      // text: user.isBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Yes!",
                                      cancelButtonText: "No, cancel!"
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleBlock(user.id)
                                        Swal.fire({
                                          title: user.isBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                          text: user.isBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
                                          icon: "success"
                                        });
                                      } else if (
                                        result.dismiss === Swal.DismissReason.cancel
                                      ) {
                                        Swal.fire({
                                          title: "Cancelled",
                                          text: "The user ban has been cancelled.",
                                          icon: "error"
                                        });
                                      }
                                    });
                                  }
                                });
                              }}

                            >
                              <div className="font-icon-detail">
                                <div className="details_btn" id="detailsBtn">
                                  <Detail onClick={(event) => {
                                    event.stopPropagation();
                                    handleDetailClick(user)
                                    openModal()
                                  }} />
                                </div>
                                <img src={user.selfie} style={{
                                  height: "50%", width: "35%", objectFit: "cover"
                                }} />
                                <p className="userNameCol">{user.userName}<br></br>
                                  {user.email}</p>
                              </div>
                            </Col>) : null

                        )}
                      </Row>
                    </>) : selectedOption.label === "Clients Only" ? (
                      <>
                        <div style={{
                          color: "#30416b",
                          fontSize: "1rem"
                        }}>
                          All Clients:
                        </div>
                        <Row>
                          {allUsers?.map((user, i) =>
                            user.type === "user" ? (
                              < Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "user" ? "user" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                  `,
                                    imageUrl: `${user.selfie}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0, 0, 0, 0.5)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.isBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.isBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.isBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.isBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.isBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.isBlocked ? "The user Can Now Login Freely" : "Thank you for your Job Admin.",
                                            icon: "success"
                                          });
                                        } else if (
                                          result.dismiss === Swal.DismissReason.cancel
                                        ) {
                                          Swal.fire({
                                            title: "Cancelled",
                                            text: "The user ban has been cancelled.",
                                            icon: "error"
                                          });
                                        }
                                      });
                                    }
                                  });
                                }}
                              >
                                <div className="font-icon-detail">
                                  <div className="details_btn" id="detailsBtn">
                                    {/* <Detail onClick={(event) => {
                                      event.stopPropagation();
                                      handleDetailClick(user)
                                      openModal()
                                    }} /> */}
                                  </div>
                                  <img src={user.selfie} style={{
                                    height: "50%", width: "35%", objectFit: "cover"
                                  }} />
                                  <p className="userNameCol">{user.userName}<br></br>
                                    {user.email}</p>
                                </div>
                              </Col>
                            ) : null
                          )}
                        </Row>

                      </>
                    ) : selectedOption.label === "Agencies Only" ? (
                      <>
                        <div style={{
                          color: "#30416b",
                          fontSize: "1rem"
                        }}>
                          All Agencies:
                        </div>
                        <Row>
                          {allUsers?.map((user, i) =>
                            user.type === "company" ? (
                              <Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "user" ? "User" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}

                                  `,
                                    imageUrl: `${user.selfie}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0, 0, 0, 0.5)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.isBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.isBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.isBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.isBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.isBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.isBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
                                            icon: "success"
                                          });
                                        } else if (
                                          result.dismiss === Swal.DismissReason.cancel
                                        ) {
                                          Swal.fire({
                                            title: "Cancelled",
                                            text: "The user ban has been cancelled.",
                                            icon: "error"
                                          });
                                        }
                                      });
                                    }
                                  });
                                }}
                              >
                                <div className="font-icon-detail">
                                  <div className="details_btn" id="detailsBtn">
                                    <Detail onClick={(event) => {
                                      event.stopPropagation();
                                      handleDetailClick(user)
                                      openModal()
                                    }} />
                                  </div>
                                  <img src={user.selfie} style={{
                                    height: "50%", width: "35%", objectFit: "cover"
                                  }} />
                                  <p className="userNameCol">{user.userName}<br></br>
                                    {user.email}</p>
                                </div>
                              </Col>
                            ) : null

                          )}
                        </Row></>
                    ) : selectedOption.label === "Banned Only" ? (
                      <>
                        <div style={{
                          fontSize: "1rem"
                        }}>
                          All Banned :
                        </div>
                        <Row>
                          {allUsers?.map((user, i) =>
                            user.isBlocked ? (
                              < Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "user" ? "User" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                  `,
                                    imageUrl: `${user.selfie}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0, 0, 0, 0.5)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.isBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.isBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.isBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.isBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.isBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.isBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
                                            icon: "success"
                                          });
                                        } else if (
                                          result.dismiss === Swal.DismissReason.cancel
                                        ) {
                                          Swal.fire({
                                            title: "Cancelled",
                                            text: "The user ban has been cancelled.",
                                            icon: "error"
                                          });
                                        }
                                      });
                                    }
                                  });
                                }}
                              >
                                <div className="font-icon-detail">
                                  <div className="details_btn" id="detailsBtn">
                                    <Detail onClick={(event) => {
                                      event.stopPropagation();
                                      handleDetailClick(user)
                                      openModal()
                                    }} />
                                  </div>
                                  <img src={user.selfie} style={{
                                    height: "50%", width: "35%", objectFit: "contain"
                                  }} />
                                  <p className="userNameCol">{user.userName}<br></br>
                                    {user.email}</p>
                                </div>
                              </Col>
                            ) : null
                          )}
                        </Row>

                      </>
                    ) : selectedOption.label === "Active Only" ? (
                      <>
                        <div style={{
                          fontSize: "1rem"
                        }}>
                          All Active :
                        </div>
                        <Row>
                          {allUsers?.map((user, i) =>
                            !user.isBlocked ? (
                              < Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "user" ? "User" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                  `,
                                    imageUrl: `${user.selfie}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0, 0, 0, 0.5)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.isBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.isBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.isBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.isBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.isBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.isBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
                                            icon: "success"
                                          });
                                        } else if (
                                          result.dismiss === Swal.DismissReason.cancel
                                        ) {
                                          Swal.fire({
                                            title: "Cancelled",
                                            text: "The user ban has been cancelled.",
                                            icon: "error"
                                          });
                                        }
                                      });
                                    }
                                  });
                                }}
                              >
                                <div className="font-icon-detail">
                                  <div className="details_btn" id="detailsBtn">
                                    {user.type === "user" ? null : <Detail onClick={(event) => {
                                      event.stopPropagation();
                                      handleDetailClick(user)
                                      openModal()
                                    }} />}
                                  </div>
                                  <img src={user.selfie} style={{
                                    height: "50%", width: "35%", objectFit: "contain"
                                  }} />
                                  <p className="userNameCol">{user.userName}<br></br>
                                    {user.email}</p>
                                </div>
                              </Col>
                            ) : null
                          )}
                        </Row>

                      </>
                    ) : null
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // className={modalIsOpen ? "fadeIn" : ""}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
          },
          content: {
            overflow: "visible",
            top: '50%',
            padding: "0",
            left: '50%',
            right: 'auto',
            borderWidth: ".2rem",
            borderRadius: "10% 30px",
            borderStyle: "solid",
            borderColor: "#b78846",
            bottom: 'auto',
            width: "70rem",
            height: "55rem",
            transform: 'translate(-50%, -50%)',
            animation: modalIsOpen ? 'fadeIn 0.5s ease-out' : 'none',
          },
        }}
      >

        <div className="three_div_container">
          <div className="two_div_container">
            <div className="one_third_div">
              <div style={{
                fontSize: "1.5rem",
                textDecorationLine: "underline",
                paddingLeft: "1rem"
              }}><span style={{
                textDecorationLine: "none"
              }}>Company designation: </span>{modalData?.userName}</div>
              <div style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "1rem"
              }}>
                {/* <div className="company_img"> */}
                <div className="car_img">
                  <img style={{
                    width: "8rem", /* Take up the full width of the container */
                    height: "8rem", /* Take up the full height of the container */
                    objectFit: "contain", /* Scale the image to cover the container while maintaining its aspect ratio */
                    borderRadius: "50%",
                    height: "90%",
                    width: "80%", /* Take up the full width of the container */
                  }} src={modalData?.selfie} />
                  {/* </div> */}
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingLeft: "1rem",
                  gap: "1rem"
                }}>
                  <div className="company_details">Contact: {modalData?.phoneNumber}</div>
                  <div className="company_details">Contact: {modalData?.email}</div>
                  <div className="company_details">Joined Us On {new Date(modalData?.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <div className="two_thirds_div">
              <div style={{
                fontSize: "1.7rem",
                marginBottom: "1rem",
                textDecorationLine: "underline"
              }}>User Reviews</div>
              <div style={{
                overflow: "auto",
                height: "100%",
                paddingBottom: "5rem"
                // height: "54rem",
              }}>
                <div className="review_div">
                  <div><span style={{
                    fontSize: "1.1rem"
                  }}>UserName</span><span> / </span><span style={{
                    fontSize: "1.1rem"
                  }}>Rating</span></div>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: ".5rem",
                    alignItems: "center"
                  }}>
                    <div className="review_img">
                      <img />
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend.
                    </div>
                  </div>
                </div>
                <div className="review_div">
                  <div><span style={{
                    fontSize: "1.1rem"
                  }}>UserName</span><span> / </span><span style={{
                    fontSize: "1.1rem"
                  }}>Rating</span></div>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: ".5rem",
                    alignItems: "center"
                  }}>
                    <div className="review_img">
                      <img />
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend.
                    </div>
                  </div>
                </div>
                <div className="review_div">
                  <div><span style={{
                    fontSize: "1.1rem"
                  }}>UserName</span><span> / </span><span style={{
                    fontSize: "1.1rem"
                  }}>Rating</span></div>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: ".5rem",
                    alignItems: "center"
                  }}>
                    <div className="review_img">
                      <img />
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend.
                    </div>
                  </div>
                </div>
                <div className="review_div">
                  <div><span style={{
                    fontSize: "1.1rem"
                  }}>UserName</span><span> / </span><span style={{
                    fontSize: "1.1rem"
                  }}>Rating</span></div>
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: ".5rem",
                    alignItems: "center"
                  }}>
                    <div className="review_img">
                      <img />
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="half_div">
            <div style={{
              fontSize: "1.7rem",
              marginBottom: "1rem",
              textDecorationLine: "underline"
            }}>Owned Cars</div>
            <div style={{
              overflow: "auto",
              height: "100%",
              paddingBottom: "5rem"
              // height: "54rem",
            }}>
              {console.log(AgencyCars)}
              {AgencyCars?.map((car, i) =>
              (<div key={i} className="car_div">
                <div style={{
                  textDecorationLine: "underline"
                }}><span style={{
                  fontSize: "1.4rem",
                  paddingLeft: "1rem",
                }}>{car.brand}</span>
                  <span style={{
                    fontSize: "1.4rem",
                  }}> </span>
                  <span style={{
                    fontSize: "1.4rem",
                  }}>{car.model}</span></div>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <div className="car_img">
                    <img style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: "10%",
                    }} src={car.media} />
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem"
                  }}>
                    <span style={{
                      fontSize: "1rem",
                    }}>{car.price} Dt</span>
                    <span style={{
                      fontSize: "1rem",
                    }}>{car.Type} Driving</span>
                    <span style={{
                      fontSize: "1rem",
                    }}>{car.Category}</span>
                    <span style={{
                      fontSize: "1rem",
                    }}>Made In {car.Year}</span>
                  </div>
                </div>
              </div>))}
            </div>
          </div>
        </div>
      </Modal >
    </>
  );
}

export default UserManagements;
