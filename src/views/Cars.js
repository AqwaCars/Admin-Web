import { cancelRent, getAllRequests, selectAdmin, updateCar } from "../Redux/adminSlice";
import { selectLoadingStatus } from "../Redux/adminSlice";
import { selectAllRequests } from "../Redux/adminSlice";
import { selectLoading } from "../Redux/adminSlice";
import { getLimitedCars } from "../Redux/adminSlice";
import "../assets/css/addNewEntities.css"
import "../assets/css/TableList.css"
import { selectAllCars } from "../Redux/adminSlice";
import Modal from 'react-modal';
import { selectAllUsers } from "../Redux/adminSlice";
import ReqRow from "components/Tables/ReqRow";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  ButtonToolbar
} from "reactstrap";
import { getAllCars } from "../Redux/adminSlice";
import Select from "react-select";
import { addBookedDate } from "../Redux/adminSlice";
import { CarBookedPeriods } from "../Redux/adminSlice";
import { DNA } from "react-loader-spinner";
import { DigitalClock } from "@mui/x-date-pickers";

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    borderWidth: ".15rem",
    // borderStyle: "groove",
    borderColor: "#30416B",
    bottom: 'auto',
    marginRight: '-50%',
    // display:"flex",
    // justifyItems:"center",
    width: "70rem",
    height: "55rem",
    transform: 'translate(-50%, -50%)',
  },
};
const years = [];
const currentYear = new Date().getFullYear();

for (let year = 2000; year <= currentYear; year++) {
  years.push(year);
}

const fuels = ["Gasoline", "Diesel", "Electric"]
const yearOptions = years?.map(year => ({ label: year.toString(), value: year.toString() }));
const fuelOptions = fuels?.map(fuel => ({ label: fuel.toString(), value: fuel.toString() }));
function Cars() {
  
  const dispatch = useDispatch()
  const [returnTime, setReturnTime] = useState(null)
  const [rentalTime, setRentalTime] = useState(null)
  const [updateCarLoad, setUpdateCarLoad] = useState(false)


  // const options = companies.?map(company => ({
  //   label: company.userName, // Display the userName as the label
  //   value: company.id, // Use the id as the value
  // }));
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const usersData = useSelector(selectAllUsers)
  const users = usersData.filter((user) => {
    return user.type === "user"
  })
  const [carRenter, setCarRenter] = useState({})
  const [load, setLoad] = useState()
  const [userCancel, setUserCancel] = useState({})
  const options = users?.map(user => ({
    label: user.userName, // Display the userName as the label
    value: user, // Use the id as the value
  }));
  // const [date, setDate] = useState({ startDate: null, endDate: null });

  const handleSelect = (ranges) => {
    setDate(ranges.selection)
  };

  const [cloudwait, setCloudWait] = useState(false)
  const handleCarDetailsUpdate = async () => {
    // Assuming setUpdateCarLoad is a state setter that controls loading state
    // setUpdateCarLoad(true);


    try {
      await dispatch(updateCar({
        carId: car.id, // Make sure  is defined and has an id property
        data: car // Ensure  contains the updated data
      }));
    } catch (error) {
      // Consider more robust error handling based on your app's needs
      console.error("Failed to update car details:", error);
    }

    // Assuming setUpdateCarLoad(false) indicates the end of the update process
    // setUpdateCarLoad(false);
  };
  const handleButtonClick = async () => {
    try {
      const datesArray = [];
      console.log(carRenter);
      if (date?.startDate && date?.endDate && Object.values(carRenter).length > 0 && rentalTime && returnTime) {
        setLoad(true)

        // Generate an array of dates for the selected range
        for (let d = new Date(date.startDate); d <= new Date(date.endDate); d.setDate(d.getDate() + 1)) {
          datesArray.push(new Date(d));
        }
        setCloudWait(true)
        // Dispatch an action to save the dates to the database
        await dispatch(addBookedDate({ carId: car.id, rentalTime, returnTime, dates: datesArray, userId: carRenter.id }));
        setCloudWait(false)
        setLoad(false)
        setCarRenter({})
        setRentalTime(null)
        setReturnTime(null)
      }
      else {
        console.log("WRONG");
      }
    } catch (error) {
      console.error("Failed to add booked dates:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };



  const handleCarChange = (id, value) => {
    console.log(`Field: ${id}, Value: ${value}`);
    setCar(prevDetails => {
      const newDetails = {
        ...prevDetails,
        [id]: value
      };
      console.log('New state:', newDetails);
      return newDetails;
    });
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const cars = useSelector(selectAllCars)
  const carDates = useSelector(CarBookedPeriods)
  const searchOptions = cars?.map(car => ({
    label: car.brand,
    value: car.id
  }));
  const [refresh, setRefresh] = useState(false)
  const [car, setCar] = useState({})

  console.log("car is in tableList", car);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handlePapers = (papers) => {
    for (let paper of papers) {
      window.open(paper.media);
    }
  };
  function openLocationInGoogleMaps(location) {
    if (location && location.latitude && location.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      window.open(url, "_blank");
    } else {
      console.error("Invalid location data.");
    }
  }
  useEffect(() => {
    if (!cars?.length) {
      dispatch(getLimitedCars())
    }
  }, [load, cars])
  useEffect(() => {
    console.log(carDates);
    dispatch(getAllCars())
    console.log(cars);
  }, [load])
  const selectedYearOption = yearOptions.find(option => option.value === car.Year);
  const selectedTypeOption = [
    { value: 'Automatic', label: 'Automatic' },
    { value: 'Manual', label: 'Manual' },
  ].find(option => option.value === car.Type);
  const selectedTypeOfFuel = fuelOptions.find(option => option.value === car.typeOfFuel);
  const selectedDoorNumberOption = [
    { label: '3', value: 3 },
    { label: '5', value: 5 },
  ].find(option => option.value === car.DoorNumber);
  const selectedCategoryOption = [
    { value: 'Economic Class', label: 'Economic Class' },
    { value: 'Luxery Car', label: 'Luxery Car' },
    { value: 'Sports', label: 'Sports' },
  ].find(option => option.value === car.Category);
  const selectedCapacityOption = [
    { label: "1 suitcase", value: 1 },
    { label: "2 suitcases", value: 2 },
    { label: "3 suitcases", value: 3 },
    { label: "4 suitcases", value: 4 },
    { label: "5 suitcases", value: 5 }
  ].find(option => option.value === car.Capacity);
  const selectedPeopleCountOption = [
    { label: "2 Seats", value: 2 },
    { label: "4 Seats", value: 4 },
    { label: "5 Seats", value: 5 },
    { label: "15 Seats", value: 15 },
  ].find(option => option.value === car.peopleCount);


  const disabledDates = carDates?.data?.reduce((acc, date) => {
    // Check if 'BookedPeriod' exists in the date object
    if (date.hasOwnProperty("BookedPeriods")) {
      // If it does, add its value to the accumulator array
      acc.push(date["BookedPeriods"]);
    }
    // Return the updated accumulator for the next iteration
    return acc;
  }, []); // Initialize the accumulator as an empty array

  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
  const handleBlur = () => {
    setMenuIsOpen(false);
  };
  const Admin = useSelector(selectAdmin)
  // Now disabledDates contains the dates that are booked and should be disabled
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle ><Button style={{
                  // fontSize: "1.2rem"
                }}>List Of All Affiliated Cars</Button></CardTitle>
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
                  // onInputChange={handleInputChange}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // menuIsOpen={menuIsOpen}
                />
              </CardHeader>
              <CardBody style={{ overflowX: 'auto', width: '100%' }}>
                <Table striped responsive style={{
                  width: "100%",
                  tableLayout: "auto",
                  borderCollapse: "collapse",
                }} className="tablesorter responsive-table" >
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Model</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Type Of Fuel</th>
                      {/* <th>Status</th> */}
                      <th>Agency</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>peopleCount</th>
                      <th>DoorNumber</th>
                      <th>Capacity</th>
                      <th>Year Of Manufacturing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Admin.clearance==="Level1"?cars.filter((car)=>car.Owner===Admin.Name):cars?.map((request, i) => {
                      return (
                        <ReqRow setDate={setDate} key={i} setRefresh={setRefresh} request={request} handlePapers={handlePapers} openModal={openModal} openLocationInGoogleMaps={openLocationInGoogleMaps} setCar={setCar} />
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div >
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        onAfterClose={()=>{
          setCarRenter({})
          setRentalTime(null)
          setReturnTime(null)
        }}>
        <header>
          <h1>Change Availability for {car.brand + " " + car.model}</h1>
        </header>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            borderBottom: ".1rem solid #30416B",
            padding: "1rem",
            width: "100%",
            height: "30%",
            justifyContent: "space-around",
            // gap: "10rem"
          }}>
            <img style={{
              height: "25rem",
              objectFit: "contain",
              marginTop: "1rem",
              // alignSelf:"flex-start",
              borderRadius: "8%",
              width: "20rem"
            }} src={car.media} />
            <div className="calender_Ctr">
              <Select
                className="select-box"
                placeholder="Select The Customer..."
                options={options}
                onChange={(selectedOption) => setCarRenter(selectedOption.value)}
                menuPortalTarget={document.body}

                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {console.log(disabledDates)}
                <DateRangePicker
                  ranges={[date]}
                  disabledDates={disabledDates}
                  onChange={(handleSelect)}
                  minDate={new Date()}
                />

                <Button onClick={async () =>
                  Swal.fire({
                    title: "Are you sure?",
                    text: "This will make the car unavailable in the selected Date!",
                    icon: "warning",
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes!"
                  }).then((result) => {
                    if (result.isConfirmed && Object.values(carRenter).length > 0 && rentalTime && returnTime && date.startDate && date.endDate) {
                      // Check if the start date and end date are at least one day apart
                      const startDate = new Date(date.startDate);
                      const endDate = new Date(date.endDate);
                      const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                  
                      if (diffDays >= 1) {
                        handleButtonClick();
                        Swal.fire('Changes Saved!', '', 'success');
                      } else {
                        Swal.fire('The rental period must be at least two days.', '', 'warning');
                      }
                    } else if (result.isDenied) {
                      Swal.fire('Change Discarded.', '', 'info');
                    } else if (result.isConfirmed &&!Object.values(carRenter).length > 0) {
                      Swal.fire('Please select a user.', '', 'warning');
                    } else if (result.isConfirmed && (!rentalTime ||!returnTime)) {
                      Swal.fire('Please specify a Time.', '', 'warning');
                    }
                                    
                  })
                }>{
                    // `${format(date.startDate, "MMM,dd,yyyy")} to ${format(date.endDate, "MMM,dd,yyyy")}`
                    !cloudwait ? "Change The Car's Availability Timeline" : <DNA
                      visible={true}
                      height="2rem"
                      width="2rem"
                      ariaLabel="dna-loading"
                    // wrapperStyle={{ paddingBottom: '1.5rem' }} // Adjust this value as needed
                    // wrapperClass="dna-wrapper"
                    />
                  }</Button>
              </div>

            </div>
            <div className="digital-clock-full-height">
              <DigitalClock
                classes={{
                  item: 'custom-digital-clock-item', // Custom class for overriding styles
                }} onChange={(v) => {
                  const value = v.$d;
                  const dateObject = new Date(value);
                  const hours = dateObject.getHours();
                  const minutes = dateObject.getMinutes();
                  const seconds = dateObject.getSeconds();
                  const timeOnly = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                  console.log(timeOnly);
                  setRentalTime(timeOnly);

                  // Correctly add 2 hours to the time
                  const newDate = new Date(value);
                  newDate.setHours(newDate.getHours() + 3);
                  const newTimeOnly = newDate.toISOString().slice(11, 19);
                  console.log(newTimeOnly);
                  setReturnTime(newTimeOnly);
                }} className="digital-clock-full-height" />

            </div>

          </div>
          <div className="Cancellation_ctr">
            <header>
              <h1>
                Rental Cancellation
              </h1>
            </header>
            <div>
              <div style={{
                paddingLeft: "1.1rem",
                fontSize: "1.1rem"
              }}>
                Choose the User Cancelling Their Booking
              </div>
              <Select
                className="select-box_user_rent_select"
                placeholder="Select The Customer..."
                options={options}
                onChange={(selectedOption) => setUserCancel(selectedOption.value)}
                menuPortalTarget={document.body}

                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
              <div style={{
                display: "flex",
                justifyContent: "center", // Aligns children horizontally in the center
                alignItems: "center", // Aligns children vertically in the center
                backgroundColor: "white",
                // Optional: Makes sure the container takes full height
                width: "100%" // Optional: Makes sure the container takes full width
              }}>
                <Button onClick={async () =>
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed && Object.values(userCancel).length > 0) {
                      setLoad(true)
                      dispatch(cancelRent({ userId: userCancel.id, carId: car.id }))
                      setLoad(false)
                      Swal.fire('Booking Cancelled!', '', 'success')
                    } else if (result.isDenied) {
                      Swal.fire('Booking kept.', '', 'info')
                    } else if (result.isConfirmed && !Object.values(userCancel).length > 0) {
                      Swal.fire('User Not Selected.', '', 'warning')

                    }
                  })
                }>
                  Confirm User Cancellation
                </Button>

              </div>

            </div>
          </div>
          <div className='scrollable-input-container'>
            <div style={{
              fontSize: "1.2rem",
              paddingBottom: "0.5rem"
            }}>Input The Car's Details here :</div>
            <div className='first-select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>Which Company Owns This Car :</div>
              <Select
                className="select-box"
                options={options}
                placeholder="Cannot Change This Value"
                isDisabled={true}
                onChange={(selectedOption) => handleCarChange("Owner", selectedOption.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />

            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              justifyItems: "center",
              flexDirection: "column",
              marginBottom: "1rem",
              width: "100%",
            }}>
              <div style={{
                fontSize: ".9rem",

              }}>What Is The Daily Price For This Car :</div>
              <div style={{
              }} className="input-container">
                <input
                  className="input-box"
                  value={car.price}
                  type='number'
                  placeholder='Type here...'
                  onChange={(e) => handleCarChange("price", e.target.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>
            <div className='first-select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>What Is The Type Of Fuel That This Car Uses :</div>
              <Select
                className="select-box"
                options={fuelOptions}
                value={selectedTypeOfFuel}
                onChange={(selectedOption) => handleCarChange("typeOfFuel", selectedOption.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />

            </div>
            <div className="two-select-container">
              <div className='select-container'>
                <div style={{
                  fontSize: ".9rem"
                }}>Insert The Brand Of The Car :</div>
                <div className="input-container">
                  <input
                    className="input-box"
                    type="text"
                    placeholder='Type here...'
                    value={car.brand}
                    onChange={(e) => handleCarChange("brand", e.target.value)}
                    menuportaltarget={document.body}
                    styles={{
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                  />
                </div>
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select The Type Of The Car :</div>
                <Select
                  className="select-box"
                  options={[
                    { value: 'Automatic', label: 'Automatic' },
                    { value: 'Manual', label: 'Manual' },
                  ]}
                  value={selectedTypeOption}
                  onChange={(selectedOption) => handleCarChange("Type", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>
            <div className="two-select-container">
              <div className='select-container'>
                <div style={{
                  fontSize: ".9rem"
                }}>What Year Was The Car Created At :</div>
                <Select
                  className="select-box"
                  value={selectedYearOption}
                  options={yearOptions.reverse()}
                  onChange={(selectedOption) => handleCarChange("Year", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select The Category Of The Car :</div>
                <Select
                  className="select-box"
                  value={selectedCategoryOption}
                  options={[
                    { value: 'Economic Class', label: 'Economic Class' },
                    { value: 'Luxery Car', label: 'Luxery Car' },
                    { value: 'Sports', label: 'Sports' },
                  ]}
                  onChange={(selectedOption) => handleCarChange("Category", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>

            <div className="two-select-container">
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select How Many Doors In Your Car :</div>
                <Select
                  className="select-box"
                  options={[
                    { label: '3', value: 3 },
                    { label: '5', value: 5 },
                  ]}
                  value={selectedDoorNumberOption}
                  onChange={(selectedOption) => handleCarChange("DoorNumber", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select the Capacity of the Car's Luggage :</div>
                <Select
                  className="select-box"
                  value={selectedCapacityOption}
                  options={[
                    { label: "1 suitcase", value: 1 },
                    { label: "2 suitcases", value: 2 },
                    { label: "3 suitcases", value: 3 },
                    { label: "4 suitcases", value: 4 },
                    { label: "5 suitcases", value: 5 }
                  ]}
                  onChange={(selectedOption) => handleCarChange("Capacity", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>
            <div className="two-select-container">
              <div className='select-container'>
                <div style={{
                  fontSize: ".9rem"
                }}>Insert The Model Of The Car :</div>
                <div className="input-container">
                  <input
                    className="input-box"
                    value={car.model}
                    placeholder='Type here...'
                    onChange={(e) => handleCarChange("model", e.target.value)}
                    menuportaltarget={document.body}
                    styles={{
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                  />
                </div>
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select How Many People Can Fit Into This Car :</div>
                <Select
                  className="select-box"
                  value={selectedPeopleCountOption}
                  options={[
                    { label: "2 Seats", value: 2 },
                    { label: "4 Seats", value: 4 },
                    { label: "5 Seats", value: 5 },
                    { label: "15 Seats", value: 15 },
                  ]

                  }
                  onChange={(selectedOption) => handleCarChange("peopleCount", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>
            <Button onClick={async () =>
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  setUpdateCarLoad(true)
                  handleCarDetailsUpdate()
                  setUpdateCarLoad(false)
                  Swal.fire('Car Data updated!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Car Data is Not updated.', '', 'info')
                }
              })
            } style={{
              marginTop: "1rem"
            }}>{updateCarLoad ? <DNA
              visible={true}
              height="2rem"
              width="2rem"
              ariaLabel="dna-loading"
            // wrapperStyle={{ paddingBottom: '1.5rem' }} // Adjust this value as needed
            // wrapperClass="dna-wrapper"
            /> : "Update Car Details"}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Cars;
