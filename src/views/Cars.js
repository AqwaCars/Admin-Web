import { CreateBooking, selectAdmin, selectStaticAllCars, updateCar } from "../Redux/adminSlice";
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
import Plus from "../assets/Svg/plus.js"
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Row, Col, Card, CardHeader, CardTitle, Button, CardBody, Table } from 'reactstrap';
import { getAllCars } from "../Redux/adminSlice";
import Select from "react-select";
import { addBookedDate } from "../Redux/adminSlice";
import { CarBookedPeriods } from "../Redux/adminSlice";
import { DNA } from "react-loader-spinner";
import { DigitalClock } from "@mui/x-date-pickers";
import ExtraUserModal from "components/Modals/ExtraUserModal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
    borderRadius: "1rem",
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
const Cars = () => {
  const [userModal, setUserModal] = useState(false)
  const addExtraUser = async () => {
    setUserModal(true)
  }
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
  const users = usersData?.filter((user) => {
    return user.type === "user"
  })
  const [carRenter, setCarRenter] = useState({})
  const [ExtraUserForm, setExtraUserForm] = useState({})
  const [load, setLoad] = useState()
  // const [userCancel, setUserCancel] = useState({})
  const options = users?.map(user => ({
    label: user.userName, // Display the userName as the label
    value: user, // Use the id as the value
  }));
  // const [date, setDate] = useState({ startDate: null, endDate: null });

  const handleSelect = (ranges) => {
    // Ensure ranges.selection exists before attempting to modify it
    if (ranges && ranges.selection) {
      // Assuming startDate and endDate are numbers, add 1 to them
      ranges.selection.startDate += 1;
      ranges.selection.endDate += 1;

      // Log the modified startDate
      console.log(ranges.selection);

      // Update the state with the modified selection
      setDate(ranges.selection);
    } else {
      console.error('Ranges or its selection property does not exist.');
    }
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

  const [datesArray, setDatesArray] = useState([]); // Initialize datesArray with useState

  // Helper function to generate dates array
  const generateDatesArray = () => {
    console.log("Selected dates:", date.startDate, date.endDate);

    // Directly use the provided start and end dates without modifying their time components.
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);

    // Format the start and end dates to "Month-Day-Year"
    const formattedStartDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedEndDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Debugging: Log the formatted start and end dates
    console.log("Formatted Start date:", formattedStartDate);
    console.log("Formatted End date:", formattedEndDate);
    setDate(prevDetails => {
      const newDetails = {
        ...prevDetails,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      };
      console.log('New state:', newDetails);
      return newDetails;
    })
    // Convert the formatted start and end dates back to Date objects
    const start = new Date(formattedStartDate);
    const end = new Date(formattedEndDate);

    // Calculate the total number of days between the start and end dates
    const diffInMilliseconds = end.getTime() - start.getTime();
    const totalDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    const array = [];
    for (let i = 0; i < totalDays + 1; i++) {
      // Create a new Date object for each day
      let currentDate = new Date(start.getTime());
      currentDate.setDate(currentDate.getDate() + i);

      // Format the current date as a string in "Month-Day-Year" format
      const dateString = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      // Push the formatted date string into the array
      array.push(dateString);
    }

    // Assuming setDatesArray is a function to update state or similar


    // Optionally, log the generated array of dates
    console.log("Generated Dates Array:", array);
    return array
  };






  // Other helper functions remain unchanged
  const validateInputs = () => {
    return date?.startDate && date?.endDate &&
      (Object.values(carRenter).length > 0 || Object.values(ExtraUserForm).length > 0) &&
      rentalTime && returnTime;
  };

  const prepareDataForDispatch = () => {
    // Assuming 'date', 'car', 'carRenter', 'datesArray', 'rentalTime', and 'returnTime' are already defined and accessible within this scope.

    // Calculate the multiplier based on the length of the datesArray minus one.
    const multiplier = datesArray.length - 1;

    return Object.keys(carRenter).length > 0 ? {
      startDate: date.startDate,
      endDate: date.endDate,
      acceptation: "accepted",
      amount: car.price * multiplier, // Adjusted line
      CarId: car.id,
      rentalTime,
      returnTime,
      dates: datesArray,
      UserId: carRenter.id
    }
      :
      {
        startDate: date.startDate,
        endDate: date.endDate,
        acceptation: "accepted",
        amount: car.price * multiplier, // Adjusted line
        CarId: car.id,
        rentalTime,
        returnTime,
        dates: datesArray,
        UserId: null
      };
  };


  const resetStateAfterSuccess = () => {
    setCloudWait(false);
    setLoad(false);
    setCarRenter({});
    setExtraUserForm({})
    setRentalTime(null);
    setReturnTime(null);
  };
  const handleButtonClick = async () => {
    try {
      console.log(carRenter);
      // Validate input before proceeding
      if (!validateInputs()) {
        console.log("Validation failed");
        return; // Exit early if validation fails
      }

      setLoad(true); // Start loading

      // Generate an array of dates for the selected range
      // Pass setDatesArray to the function

      // Prepare data for dispatch
      const data = prepareDataForDispatch();
      console.log(datesArray);
      // Dispatch actions asynchronously
      console.log("ddd", carRenter);
      console.log("fff", car);
      const task2 = await dispatch(CreateBooking({ ...ExtraUserForm, ...data }));
      console.log(task2);
      if (task2.payload === undefined) {
        toast.error("An Error Has Occured", task2.payload)
        resetStateAfterSuccess()
        return
      }
      const task1 = await dispatch(addBookedDate({ BookingId: task2.payload.id, carId: car.id, rentalTime, returnTime, dates: generateDatesArray(), userId: Object(carRenter).length > 0 ? carRenter.id : null }));
      console.log(task1.payload);
      console.log(task2.payload);
      // Reset state after successful operations
      setExtraUserForm({})
      resetStateAfterSuccess();
      setTimeout(() => {
        closeModal()
      }, 1000)
      console.log("Operations completed successfully");
    } catch (error) {
      console.error("Failed to perform operations:", error);
      // Optionally, handle error UI feedback here
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
  const staticAllCars = useSelector(selectStaticAllCars)
  const [mappedCars, setMappedCars] = useState([])
  const carDates = useSelector(CarBookedPeriods)
  const searchOptions = staticAllCars?.map(car => ({
    label: car.brand,
    value: car.id
  }));
  const [refresh, setRefresh] = useState(false)
  const [car, setCar] = useState({})

  // console.log("car is in tableList", car);
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

  const fetchAndSetCars = async () => {
    try {
      // Await the dispatch to complete
      const response = await dispatch(getAllCars());
      console.log(await response);
      // Assuming response.data contains the cars data you want to map
      // const staticAllCars = response?.data.map(car => /* mapping logic */);
      if (response?.meta?.requestStatus) {
        await setMappedCars(response.payload);
        console.log("yes mapped cars", await mappedCars);
      } else {
        console.log("no mapped cars");
      }
      // Update your state with the mapped cars
    } catch (error) {
      // Handle any errors that occurred during the dispatch
      console.error("Error fetching cars:", error);
    }
  }
  useEffect(() => {
    console.log(carDates);
    // Define an async function to handle the dispatch and state update

    // Call the async function
    fetchAndSetCars();

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
      background: "#fff",
      width: "25rem"

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
  const handleInputChange = (inputValue, { action }, filteredOptions) => {
    if (action === 'input-change' && inputValue.length >= 0) {
      setMenuIsOpen(true);
      const filtered = staticAllCars?.filter((e) => {
        return ((e.brand).toLowerCase()).includes(inputValue.toLowerCase())
      })
      filtered[0] ? setMappedCars(filtered) : console.log(filtered);
    }
    else if (action === 'input-change' && inputValue.length === 0) {
      setMenuIsOpen(false);
      setMappedCars(staticAllCars)
    }
  };
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
                  filterOption={(option, input) => input.length >= 1 && option.label.toLowerCase().includes(input.toLowerCase())}
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
                      <th>Deposit</th>
                      <th>Agency</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>peopleCount</th>
                      <th>DoorNumber</th>
                      <th>Capacity</th>
                      <th>Made At</th>
                      <th>Added At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Admin?.clearance === "Level1" ?
                      mappedCars?.filter((car) => car.UserId === Admin.Name)?.map((filteredCar, index) => {
                        return (
                          <ReqRow setDate={setDate} key={index} setRefresh={setRefresh} request={filteredCar} handlePapers={handlePapers} openModal={openModal} openLocationInGoogleMaps={openLocationInGoogleMaps} setCar={setCar} />
                        );
                      }) :
                      mappedCars?.map((request, i) => {
                        return (
                          <ReqRow setDate={setDate} key={i} setRefresh={setRefresh} request={request} handlePapers={handlePapers} openModal={openModal} openLocationInGoogleMaps={openLocationInGoogleMaps} setCar={setCar} />
                        );
                      })
                    }

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
        onAfterClose={() => {
          setCarRenter({})
          setRentalTime(null)
          setReturnTime(null)
        }}>
        <header style={{
          borderBottom:"lightgrey .15rem solid"
        }}>
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
            // borderBottom: ".1rem solid #30416B",
            padding: "1rem",
            width: "100%",
            height: "30%",
            justifyContent: "space-around",
            // gap: "10rem"
          }}>
            <div style={{ borderRadius: "1rem", overflow: "hidden" }}>
              <img className="Car_details_img"
                style={{
                  height: "25rem",
                  width: "20rem",
                  objectFit: "contain",
                  marginTop: "1rem",
                }}
                src={car.media}
              />
            </div>
            <div className="calender_Ctr">
              <p style={{
                alignSelf: "flex-start",
                fontSize: "1rem",
                // textDecoration:"underline"
              }}>Select an existing user or add new details :</p>
              <Select
                className="select-box"
                placeholder="Select The Customer..."
                options={
                  [
                    {
                      label: "None", // Clearer indication that selecting this option will deselect any previously selected value
                      value: "", // Use the id as the value
                    }, ...options]

                }
                onChange={(selectedOption) => (
                  selectedOption.value = '' ? null :
                    setCarRenter(selectedOption.value))}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
              {/* <Button> */}
              <div className="extraUser"
                onClick={() => setUserModal(true)}
                style={{
                  width: "35rem",
                  display: 'inline-flex', // Aligns items horizontally
                  alignItems: 'center', // Vertically centers items
                  justifyContent: 'flex-start', // Spaces out items
                  cursor: 'pointer', // Indicates the div is clickable
                  border: '1px solid #ccc', // Mimics the border of react-select
                  borderRadius: '4px', // Rounded corners
                  padding: '8px 12px', // Padding inside the div
                  fontSize: '14px', // Text size
                  fontWeight: '500', // Bold text
                  backgroundColor: '#fff', // Background color
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)', // Adds depth
                  minWidth: '200px', // Minimum width to accommodate the caret and text
                  position: 'relative', // Needed for absolute positioning of the caret
                  marginBottom: "1rem"
                }}
              >
                {Object.values(ExtraUserForm).length > 0 ? <span style={{
                  fontSize: "1.1rem",
                  padding: ".4rem",
                  fontWeight:"600",
                  border: ".2rem #344675 solid",
                  width: "100%",
                  borderRadius: ".2rem",
                  color: "#344675"
                }}>✔User Data Saved</span> :
                  <>
                    < Plus style={{ height: "1.5rem" }} />
                    <span style={{
                      fontSize: ".8rem", fontWeight: "700"
                    }}>Add External User Data</span>
                  </>}
              </div>


              {/* </Button> */}
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
          <Button style={{
            width: "25rem"
          }} onClick={async () =>
            Swal.fire({
              title: "Are you sure?",
              text: "This will make the car unavailable in the selected Date!",
              icon: "warning",
              showDenyButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes!"
            }).then((result) => {
              if (result.isConfirmed && (Object.values(ExtraUserForm).length > 0 || Object.values(carRenter).length > 0) && rentalTime && returnTime && date.startDate && date.endDate) {
                // Check if the start date and end date are at least one day apart
                const startDate = new Date(date.startDate);
                const endDate = new Date(date.endDate);
                const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

                if (diffDays >= 1) {
                  handleButtonClick();
                  Swal.fire('Processing Your Request...', '', 'info');

                } else {
                  Swal.fire('The rental period must be at least two days.', '', 'warning');
                }
              } else if (result.isDenied) {
                Swal.fire('Change Discarded.', '', 'info');
              } else if (result.isConfirmed &&
                Object.values(carRenter).length === 0 &&
                Object.values(ExtraUserForm).length === 0) {
                console.log(Object.values(ExtraUserForm).length > 0);
                Swal.fire('Please select a user.', '', 'warning');
              } else if (result.isConfirmed && (!rentalTime || !returnTime)) {
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
          {/* <div className="Cancellation_ctr">
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
          </div> */}
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
                onChange={(selectedOption) => handleCarChange("UserId", selectedOption.value)}
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
              width: "25rem",
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
      <ExtraUserModal setformData={setExtraUserForm} setShow={setUserModal} show={userModal} />
    </>
  );
}

export default Cars;
