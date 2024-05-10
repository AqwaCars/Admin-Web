
import { getAllUsers } from "Redux/adminSlice";
import { selectAllUsers } from "Redux/adminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Select from 'react-select';
import Swal from 'sweetalert2'
import { updateStateBlock } from "Redux/adminSlice";
import "../assets/css/nucleo-icons.css"
import { Sort } from "Redux/adminSlice";
import { filterUsers } from "Redux/adminSlice";
import { selectStaticAllUsers } from "Redux/adminSlice";
function Icons() {
  const [selectedOption, setSelectedOptions] = useState({ value: 'all', label: 'All Users' });
  const [selectedSortOption, setSelectedSortOptions] = useState({ value: "Sort Your List...", label: "Sort Your List" });
  const [searchValue, setSearchValue] = useState("")
  const options = [
    { value: 'all', label: 'All Users' },
    { value: 'clients', label: 'Clients Only' },
    { value: 'agencies', label: 'Agencies Only' },
    { value: 'ban', label: 'Banned Only' },
    { value: 'active', label: 'Active Only' },
  ];
  const replaceSelectedOption = (selectedSortOption) => {
    const newOptions = [
      { value: 'A-Z', label: 'Alphabetical Order(A-Z) ↾' },
      { value: 'createdAt', label: 'Date of Account Creation ↾' },
      { value: 'carsRented', label: 'Number of Cars Rented ↾' }
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
        return e.stateBlocked === "true"
      })
      filtered[0] && dispatch(filterUsers(filtered));

    } else if (state === "Active Only") {
      const filtered = staticAllUsers.filter((e) => {
        return e.stateBlocked === "fqlse"
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
                      }}
                      options={options}
                      styles={customStyles}
                    />
                  </div></div>
              </CardHeader>
              <CardBody className="all-icons">
                {selectedOption.label === "All Users" ?
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
                          user.type === "client" ? (
                            <Col
                              key={i}
                              className="font-icon-list col-xs-6 col-xs-6"
                              lg="2"
                              md="3"
                              sm="4"
                              onClick={() => {
                                console.log(user);
                                Swal.fire({
                                  title: `<strong>${user.type === "client" ? "Client" : "company"} Profile Details</strong>`,
                                  html: `
                                 <b>UserName: </b>${user.userName}
                                 <br>
                                 <b>email: </b>${user.email}
                                 <br>
                                 <b>phoneNumber: </b>${user.phoneNumber}
                                 <br>
                                 <b>type: </b>${user.type}
                                `,
                                  imageUrl: `${user.avatar}`,
                                  imageWidth: 200,
                                  imageHeight: 200,
                                  imageAlt: "Custom image",
                                  backdrop: `rgba(0,0,123,0.4)`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: `
                                 <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                `,
                                  confirmButtonAriaLabel: "Thumbs up, great!",
                                  customClass: {
                                    text: "swal-secondary-text",
                                    text: {
                                      color: "#30416b"
                                    },
                                    container: 'my-modal',
                                    confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                    cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                  },
                                  cancelButtonText: `
                                 <i class="fa fa-close"></i>
                                `,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Yes, ban it!",
                                      cancelButtonText: "No, cancel!"
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleBlock(user.id)
                                        Swal.fire({
                                          title: user.stateBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                          text: user.stateBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
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
                                <img src={user.avatar} style={{
                                  height: "50%", width: "35%"
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
                                  title: `<strong>${user.type === "client" ? "Client" : "company"} Profile Details</strong>`,
                                  html: `
                                 <b>UserName: </b>${user.userName}
                                 <br>
                                 <b>email: </b>${user.email}
                                 <br>
                                 <b>phoneNumber: </b>${user.phoneNumber}
                                 <br>
                                 <b>type: </b>${user.type}
                                
                                `,
                                  imageUrl: `${user.avatar}`,
                                  imageWidth: 200,
                                  imageHeight: 200,
                                  imageAlt: "Custom image",
                                  backdrop: `rgba(0,0,123,0.4)`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: `
                                 <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                `,
                                  confirmButtonAriaLabel: "Thumbs up, great!",
                                  customClass: {
                                    text: "swal-secondary-text",
                                    container: 'my-modal',
                                    confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                    cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                  },
                                  cancelButtonText: `
                                 <i class="fa fa-close"></i>
                                `,
                                  // cancelButtonAriaLabel: "Thumbs down"
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                      // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Yes, ban it!",
                                      cancelButtonText: "No, cancel!"
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleBlock(user.id)
                                        Swal.fire({
                                          title: user.stateBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                          text: user.stateBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
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
                                <img src={user.avatar} style={{
                                  height: "50%", width: "35%"
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
                            user.type === "client" ? (
                              < Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "client" ? "Client" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                  `,
                                    imageUrl: `${user.avatar}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0,0,123,0.4)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, ban it!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.stateBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.stateBlocked ? "The user Can Now Login Freely" : "Thank you for your Job Admin.",
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
                                  <img src={user.avatar} style={{
                                    height: "50%", width: "35%"
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
                                    title: `<strong>${user.type === "client" ? "Client" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}

                                  `,
                                    imageUrl: `${user.avatar}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0,0,123,0.4)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, ban it!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.stateBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.stateBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
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
                                  <img src={user.avatar} style={{
                                    height: "50%", width: "35%"
                                  }} />
                                  <p className="userNameCol">{user.userName}</p>
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
                            user.stateBlocked ? (
                              < Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "client" ? "Client" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                  `,
                                    imageUrl: `${user.avatar}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0,0,123,0.4)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, ban it!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.stateBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.stateBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
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
                                  <img src={user.avatar} style={{
                                    height: "50%", width: "35%"
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
                            !user.stateBlocked ? (
                              < Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "client" ? "Client" : "company"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                  `,
                                    imageUrl: `${user.avatar}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0,0,123,0.4)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, ban it!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.stateBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Banned!`,
                                            text: user.stateBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
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
                                  <img src={user.avatar} style={{
                                    height: "50%", width: "35%"
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
    </>
  );
}

export default Icons;
