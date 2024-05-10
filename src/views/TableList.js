import { getAllRequests } from "Redux/adminSlice";
import { selectLoadingStatus } from "Redux/adminSlice";
import { selectAllRequests } from "Redux/adminSlice";
import { selectLoading } from "Redux/adminSlice";
import { getLimitedCars } from "Redux/adminSlice";
import "../assets/css/addNewEntities.css"
import "../assets/css/TableList.css"
import { selectAllCars } from "Redux/adminSlice";
import Modal from 'react-modal';
import { selectAllUsers } from "Redux/adminSlice";
import ReqRow from "components/Tables/ReqRow";
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
  ButtonToggle,
  Input,
  CardImg,
} from "reactstrap";
import { getAllCars } from "Redux/adminSlice";
import Select from "react-select";
import { Media } from "Redux/adminSlice";
import { addBookedDate } from "Redux/adminSlice";

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
    borderWidth: ".01rem",
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
const yearOptions = years.map(year => ({ label: year.toString(), value: year.toString() }));
const fuelOptions = fuels.map(fuel => ({ label: fuel.toString(), value: fuel.toString() }));
function Tables() {
  const dispatch = useDispatch()
  const [carDetails, setCarDetails] = useState({
    model: "",
    price: "",
    brand: "",
    Type: "",
    typeOfFuel: "",
    Year: "",
    peopleCount: "",
    Category: "",
    DoorNumber: "",
    Capacity: "",
    media: []
  })

  // const options = companies.map(company => ({
  //   label: company.userName, // Display the userName as the label
  //   value: company.id, // Use the id as the value
  // }));
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const handleSelect = (ranges) => {
    setDate(ranges.selection)
  };
  const [selectedDates, setSelectedDates] = useState([]);

  
   const handleButtonClick = () => {
      try {
        // Initialize an empty array to hold all the dates
        const datesArray = [];
  
        if (date.startDate && date.endDate) {
          // If a range is selected, iterate through the range and add each date to the array
          for (let d = new Date(date.startDate); d <= new Date(date.endDate); d.setDate(d.getDate() + 1)) {
            datesArray.push(new Date(d));
          }
        } else if (date.startDate) {
          // If only a single day is selected, add it to the array
          datesArray.push(new Date(date.startDate));
        }
  
        // Update the state with the array of dates
        setSelectedDates(datesArray);
      } catch (error) {
        console.log(error);
      }
   };
  
   useEffect(() => {
      // This effect runs after selectedDates has been updated
      if (selectedDates.length > 0) {
        dispatch(addBookedDate({ CarId: car.id, BookedPeriod: selectedDates }));
      }
   }, [selectedDates, dispatch]); // Depend on selectedDates and dispatch to re-run the effect when they change
  
   // Rest of your component...
  

  const handleCarChange = (id, value) => {
    console.log(`Field: ${id}, Value: ${value}`);
    setCarDetails(prevDetails => {
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
  const [refresh, setRefresh] = useState(false)
  const [car, setCar] = useState({})
  console.log("car is in tableList", car);
  const [media, setMedia] = useState(null)
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
  }, [cars])
  useEffect(() => {
    dispatch(getAllCars())
  }, [])
  useEffect(() => {

  }, [media])
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
  // const companies = useSelector(Companies)
  console.log(media)
  // const blobUrl = URL.createObjectURL(media);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle ><Button style={{
                  fontSize: "1.2rem"
                }}>List Of All Affiliated Cars</Button></CardTitle>
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
                    {cars?.map((request, i) => {
                      return (
                        <ReqRow key={i} setRefresh={setRefresh} request={request} handlePapers={handlePapers} openModal={openModal} openLocationInGoogleMaps={openLocationInGoogleMaps} setCar={setCar} setMedia={setMedia} />
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
        onRequestClose={closeModal}>
        <CardTitle style={{
          fontSize: "1.5rem"
        }}>Change Availability for {car.brand + " " + car.model} :</CardTitle>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-evenly",
            gap: "1rem"
          }}>
            {true ? <img style={{
              height: "20rem",
              width: "30rem"
            }} src={require("../assets/img/image-placeholder.jpeg")} /> : <img
              style={{
                height: "20rem",
                width: "30rem"
              }}
              src={media}
            />}
            <div className="calender_Ctr">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <DateRangePicker
                  ranges={[date]}
                  onChange={(handleSelect)}
                  minDate={new Date()}
                />
                <Button onClick={()=>handleButtonClick()}>{
                  // `${format(date.startDate, "MMM,dd,yyyy")} to ${format(date.endDate, "MMM,dd,yyyy")}`
                  "Change The Car's Availability Timeline"
                }</Button>
              </div>
            </div>
          </div>
          <div className='scrollable-input-container'>
            <div style={{
              fontSize: "1.2rem",
              paddingBottom: "0.5rem",
              marginTop: "1rem"
            }}>Change The Car's Details here :</div>
            {/* <div className='first-select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>Which Company Owns This Car :</div>
              <Select
                className="select-box"
                options={options}
                onChange={(selectedOption) => handleCarChange("Owner", selectedOption.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />

            </div> */}
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
                  placeholder='Type here...'
                  value={car.price + " " + "TND"}
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
                  options={yearOptions.reverse()}
                  value={selectedYearOption} // Pass the matching option object here
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
                  value={selectedDoorNumberOption}
                  className="select-box"
                  options={[
                    { label: '3', value: 3 },
                    { label: '5', value: 5 },
                  ]}
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
                    value={car.model}
                    className="input-box"
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
            <Button style={{
              marginTop: "1rem"
            }}>Update Car Details</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Tables;
