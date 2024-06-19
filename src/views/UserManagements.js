
import { agencyReviews, getAgencyReviews, getAllUsers, selectAdmin, updateUser } from "../Redux/adminSlice";
import { selectAllUsers } from "../Redux/adminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating'
// import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Select from 'react-select';
import Swal from 'sweetalert2'
import { updateStateBlock } from "../Redux/adminSlice";
import "../assets/css/nucleo-icons.css"
import "../assets/css/usersList.css"
import { Sort } from "../Redux/adminSlice";
import { filterUsers } from "../Redux/adminSlice";
import { selectStaticAllUsers } from "../Redux/adminSlice";
import Modal from 'react-modal';
import { agencyCars } from "../Redux/adminSlice";
import { getAgencyCars } from "../Redux/adminSlice";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardBody, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import UserInfo from "components/Maps/UserInfo";
import { DNA } from "react-loader-spinner";
// import AgencyInfo from "components/Maps/AgencyInfo";

function UserManagements() {
  const [userDetails, setUserDetails] = useState({})
  const handleUserChange = (id, value) => {
    console.log(`Field: ${id}, Value: ${value}`);
    setUserDetails(prevDetails => {
      const newDetails = {
        ...prevDetails,
        [id]: value
      };
      console.log('New state:', newDetails);
      return newDetails;
    });
  };
  const Admin = useSelector(selectAdmin)
  const [selectedOption, setSelectedOptions] = useState({ value: 'all', label: 'Select Filter ...' });
  const AgencyCars = useSelector(agencyCars)
  const AgencyReviews = useSelector(agencyReviews)
  console.log(AgencyReviews);
  const handleSubmit = async (id) => {
    // console.log(carDetails);
    if (Object.values(userDetails).every(value => value)) {
      try {
        setCloudWait(true)
        const response = await dispatch(updateUser({ userDetails, id }))
        console.log(response.payload);
        //!Would fix this function because it always happens even if the response is fullfilled
        // if (response.payload === undefined) {
        //   toast.error("An Error Has Occured")
        //   setCloudWait(false)
        // }
        //  else {
        const response2 = await dispatch(getAllUsers())
        console.log(response2.payload);
        setCloudWait(false)
        setUserDetails({})
        // setShownCarImage(null)
        // setSelectedFile(null)
        closeSecondModal()
        // setCloudWait(false)
        // }
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
      }
    } else {
      // notify('user');
      console.log("Car details are missing.");
    }
  };
  const [selectedSortOption, setSelectedSortOptions] = useState({ value: "Select Sort...", label: "Select Sort ..." });
  const options = [
    { value: 'all', label: 'All Users' },
    { value: 'clients', label: 'Clients Only' },
    { value: 'agencies', label: 'Agencies Only' },
    { value: 'ban', label: 'Banned Only' },
    { value: 'active', label: 'Active Only' },
    { value: 'archived', label: 'Archived Only' },
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
  const [modalData, setModalData] = useState({})
  const handleDetailClick = (user) => {
    console.log(user);
    dispatch(getAgencyCars(user.id))
    dispatch(getAgencyReviews(user.id))
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
  function openSecondModal() {
    setIsOpen2(true);
  }
  function closeSecondModal() {
    setIsOpen2(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
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
  const [cloudwait, setCloudWait] = useState(false)

  const loading = useSelector((state) => state.Admin.loading);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch()
  const allUsers = useSelector(selectAllUsers)
  const staticAllUsers = useSelector(selectStaticAllUsers)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => {
    setDropdownOpen(prev => !prev);
  };

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
      if (Admin?.clearance === "Level1") {
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
                            <UserInfo openSecondModal={openSecondModal} user={user} i={i} openModal={openModal} handleDetailClick={handleDetailClick} />) : null
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
                      <div className="usersContainer">
                        {allUsers?.map((user, i) =>
                          user.type === "company" ? (
                            <UserInfo openSecondModal={openSecondModal} user={user} i={i} openModal={openModal} handleDetailClick={handleDetailClick} />
                          ) : null

                        )}
                      </div>
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
                              <UserInfo openSecondModal={openSecondModal} user={user} i={i} openModal={openModal} handleDetailClick={handleDetailClick} />
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
                              <UserInfo openSecondModal={openSecondModal} user={user} i={i} openModal={openModal} handleDetailClick={handleDetailClick} />
                            ) : null

                          )}
                        </Row></>
                    ) :
                    selectedOption.label === "Banned Only" ? (
                      <>
                        <div style={{
                          fontSize: "1rem"
                        }}>
                          All Banned :
                        </div>
                        <Row>
                          {allUsers?.map((user, i) =>
                            user.isBlocked ? (
                              <UserInfo openSecondModal={openSecondModal} user={user} i={i} openModal={openModal} handleDetailClick={handleDetailClick} />
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
                              <UserInfo user={user} openSecondModal={openSecondModal} i={i} openModal={openModal} handleDetailClick={handleDetailClick} />
                            ) : null
                          )}
                        </Row>

                      </>
                    ) : selectedOption.label === "Archived Only" ? (
                      <>
                        <div style={{
                          fontSize: "1rem",
                          color: "black"
                        }}>
                          All Archived :
                        </div>
                        <Row>
                          {allUsers?.map((user, i) =>
                            user.isArchived ? (
                              <UserInfo user={user} i={i} openSecondModal={openSecondModal} openModal={openModal} handleDetailClick={handleDetailClick} />
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

              }}><span style={{
                textDecorationLine: "none"
              }}>Company Title : </span>{modalData?.userName}</div>
              <div className="hoverImage" style={{
                height: "11rem",
                cursor: "pointer",
                marginTop: ".6rem",
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                paddingTop: "1rem",
                borderBottom: " #30416b solid 0.1rem",
                borderLeft: " #30416b solid 0.1rem",
                borderRight: " #30416b solid 0.1rem",
                marginRight: "1.5rem",
                borderRadius: "1rem",
              }}>
                {/* <div className="company_img"> */}
                <div style={{
                  // alignItems: "center",
                  // padding:"0rem"
                  // padding:".2rem"
                  // backgroundColor: "transparent"
                }} className="car_img">
                  <img style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "10%",
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
                  <div style={{
                    alignItems: "center",
                    flexDirection: "row",
                    display: "flex",
                    gap: ".5rem"
                  }}>
                    <div className="company_details">Contact: {modalData?.phoneNumber}</div>
                    <Dropdown style={{
                      paddingLeft: "2rem"
                    }} isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>
                        Files
                      </DropdownToggle>
                      <DropdownMenu>
                        {/* Corrected DropdownItems */}
                        {/* <DropdownItem header>Header</DropdownItem> */}
                        {/* <DropdownItem>Some Action</DropdownItem> */}
                        {/* <DropdownItem active>Active Item</DropdownItem> */}
                        <DropdownItem
                          onClick={() => window.open(modalData.RNE, '_blank')}
                          style={{
                            fontSize: ".8rem", color: "black"
                          }}>R.N.E</DropdownItem>
                        {/* <DropdownItem divider /> */}
                        <DropdownItem
                          onClick={() => window.open(modalData.cardIdFront, '_blank')}
                          style={{
                            fontSize: ".8rem", color: "black"
                          }}>CardId Front-Side</DropdownItem>
                        <DropdownItem
                          onClick={() => window.open(modalData.cardIdBack, '_blank')}
                          style={{
                            fontSize: ".8rem", color: "black"
                          }}>CardId Back-Side</DropdownItem>
                        <DropdownItem
                          onClick={() => window.open(modalData.drivingLicenseFront, '_blank')}
                          style={{
                            fontSize: ".8rem", color: "black"
                          }}>Driving License Front-Side</DropdownItem>
                        <DropdownItem
                          onClick={() => window.open(modalData.drivingLicenseBack, '_blank')}
                          style={{
                            fontSize: ".8rem", color: "black"
                          }}>Driving License Back-Side</DropdownItem>
                        <DropdownItem
                          onClick={() => window.open(modalData.passport, '_blank')}
                          style={{
                            fontSize: ".8rem", color: "black"
                          }}>Passport</DropdownItem>
                        {/* <DropdownItem active>Active Item</DropdownItem> */}
                        {/* <DropdownItem>Quo Action</DropdownItem> */}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
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
                {AgencyReviews?.map((review, i) =>
                  // setUserReview(review.ratingCar)
                  // (<div key={i} className="review_div">

                  //   <div style={{
                  //     display: "flex",
                  //     flexDirection: "row",
                  //     marginTop: ".5rem",
                  //     alignItems: "center"
                  //   }}>
                  //     <div className="review_img">
                  //       <img className="hoverImage_review" style={{
                  //         height: "100%",
                  //         width: "100%",
                  //         objectFit: "cover",
                  //         borderRadius: "50%"
                  //       }} src={review.Booking.User.selfie} />
                  //     </div>
                  //     <div style={{
                  //        display: "flex",
                  //        flexDirection: "column",
                  //       //  marginTop: ".5rem",
                  //       // backgroundColor:"red",
                  //       height:"4rem",
                  //        alignItems: "center",
                  //       //  gap:"2rem"
                  //     }}>
                  //     <div style={{
                  //       // paddingBottom:"2rem"
                  //       alignSelf:"flex-start"
                  //     }}><span style={{
                  //       fontSize: "1.2rem",
                  //       fontWeight:"400"
                  //     }}>{review.Booking.User.userName}</span><span> / </span><span style={{
                  //       fontSize: "1.2rem",
                  //       fontWeight:"400"
                  //     }}>{review.ratingCar}</span></div>
                  //     <div style={{
                  //       paddingTop:".4rem",
                  //       fontSize: ".9rem",
                  //       // fontWeight:"600"
                  //     }}>
                  //       Extremely Dissatisfied !
                  //     </div>
                  //     </div>
                  //   </div>
                  // </div>)
                  <div className="review_div">
                    <div style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      // backgroundColor:"red",
                      height: "3rem"
                    }}>
                      <img style={{
                        objectFit: "cover",
                        // backgroundColor:"yellow",
                        height: "100%"
                      }} src={require("../assets/img/Rating/heartRating.png")} />
                    </div>
                    <div style={{
                      color: "#242E39",
                      fontSize: "20.75px",
                      fontWeight: "bold"
                    }}>{review.Booking.User.userName} Review</div>
                    <div>Satisfied</div>
                    <div
                      className="hoverImage"
                      style={{
                        backgroundColor: "#F7F8FA",
                        paddingTop: "13.2px",
                        paddingBottom: "13.2px",
                        borderRadius: "1rem",
                        height: "53.39px",
                        // width:"232px",
                        paddingRight: "16px",
                        paddingLeft: "16px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: ".3rem",
                        marginBottom: ".3rem",
                        boxShadow: "0px 2.64px 5.28px rgba(52, 68, 81, 0.2)"
                      }}>
                      {/* <img  style={{
                      objectFit:"contain",
                      // backgroundColor:"yellow",
                      height:"auto",
                      width:"auto"
                    }} src={require("../assets/img/Rating/five.png")}/> */}
                      {console.log(review)}
                      <Rating
                        initialValue={review.ratingAgency}
                        readonly={true}
                        style={{
                          // height:"3rem",
                          // width:"auto"s
                        }}
                      // onClick={handleRating}
                      // onPointerEnter={onPointerEnter}
                      // onPointerLeave={onPointerLeave}
                      // onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                      <div style={{
                        fontSize: "1.2rem",
                        paddingLeft: "1rem",
                        fontWeight: "400",
                        // backgroundColor:"red",
                        display: "flex",
                        alignItems: "center",
                        paddingTop: ".2rem"
                        // height:"3rem"
                      }}>{review.ratingAgency}/5</div>
                    </div>
                  </div>
                )
                }
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
                      objectFit: "cover",
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
      <Modal
        isOpen={modalIsOpen2}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeSecondModal}
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
            borderRadius: "2rem 1rem",
            borderStyle: "solid",
            borderColor: "#b78846",
            bottom: 'auto',
            padding: "2rem",
            width: "50rem",
            height: "23rem",
            transform: 'translate(-50%, -50%)',
            animation: modalIsOpen ? 'fadeIn 0.5s ease-out' : 'none',
          },
        }}
      >

        <div style={{
          borderRadius: "2rem 1rem",
        }} className="whiteboard-container">
          <div style={{
            fontSize: "1.2rem",
            paddingBottom: "0.5rem"
          }}>Change The User's Details here :</div>
          <div className='first-select-container'>
            <div style={{
              fontSize: ".9rem"
            }}>Change The Name of The User :</div>
            <div className="input-container-long">
              {console.log(modalData)}
              <input
                className="select-box" placeholder={modalData?.userName + ".."}
                // options={Object.keys(data)?.map(key => ({ label: key, value: key }))}
                onChange={(e) => handleUserChange("userName", e.target.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
            <br></br>
            <div style={{
              fontSize: ".9rem"
            }}>Change The Email of The User :</div>
            <div className="input-container-long">
              <input
                className="select-box"
                placeholder={modalData?.email + ".."}
                // options={Object.keys(data)?.map(key => ({ label: key, value: key }))}
                onChange={(e) => handleUserChange("email", e.target.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <Button onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              // html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBlock <strong>${user.userName}</strong> ?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes!",
              cancelButtonText: "No, cancel!"
            }).then((result) => {
              if (result.isConfirmed && Object.keys(userDetails).length>0) {
                // handleBlock(user.id)
                handleSubmit(modalData?.id)
                Swal.fire({
                  title: "Data is now Changed",
                  text: "Thank you for your Job Admin.",
                  icon: "success"
                });
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                Swal.fire({
                  title: "Cancelled",
                  text: "User data has remained the same.",
                  icon: "error"
                });
              }else if(Object.keys(userDetails).length===0){
                Swal.fire({
                  title: "Check again",
                  text: "Type Something in the inputs to change it's value",
                  icon: "warning"
                });
              }
            })
            // }
          }} style={{
            marginTop: "2rem",
            width: "40rem",
            height: "3rem",
            // color: "grey",
            // fontSize: "1rem",
            // paddingTop: "1rem",
            // cursor: "pointer"
          }}>{
              cloudwait ?
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  // backgroundColor: "red"
                }}>
                  <DNA
                    visible={true}
                    height="4.5rem"
                    width="4.5rem"
                    ariaLabel="dna-loading"
                    wrapperStyle={{ paddingBottom: '1.5rem' }} // Adjust this value as needed
                  // wrapperClass="dna-wrapper"
                  /></div> :
                "Press Here to Submit the form"
            } </Button>
        </div>
      </Modal >
    </>
  );
}

export default UserManagements;
