import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';

import { DNA } from 'react-loader-spinner'
import "../assets/css/addNewEntities.css"
import Select from 'react-select'
import "../assets/css/customUpload.css"
import Modal from 'react-modal';
import { ReactComponent as Add } from '../assets/Svg/add-circle.svg';
import { SignUpCompany, selectAdmin } from '../Redux/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../Redux/adminSlice';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Companies } from '../Redux/adminSlice';
import { addCar } from '../Redux/adminSlice';
import { getLimitedCars } from '../Redux/adminSlice';
import { getLimitedCompanies } from '../Redux/adminSlice';
import { LimitedCars } from '../Redux/adminSlice';
import { LimitedCompanies } from '../Redux/adminSlice';
import { getAllCars } from '../Redux/adminSlice';
import { cloudinaryUpload } from 'helper_functions/Cloudinary';
import { useNavigate } from 'react-router-dom';



const years = [];
const currentYear = new Date().getFullYear();

for (let year = 2000; year <= currentYear; year++) {
  years.push(year);
}
const fuels = ["Gasoline", "Diesel", "Electric"]
// Assuming you're using a library like react-select or a similar component that expects options in a specific format
const yearOptions = years?.map(year => ({ label: year.toString(), value: year.toString() }));
const fuelOptions = fuels?.map(fuel => ({ label: fuel.toString(), value: fuel.toString() }));

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    borderRadius: "1rem",
    top: '50%',

    overflow: "scroll",
    padding: "2rem",
    left: '50%',
    right: 'auto',
    borderWidth: ".01rem",
    borderStyle: "groove",
    borderColor: "#30416B",
    bottom: 'auto',
    marginRight: '-50%',
    width: "70rem",
    height: "55rem",
    transform: 'translate(-50%, -50%)',
  },
};
const customStyles2 = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: '50%',
    left: '50%',
    padding: "2rem",
    right: 'auto',
    borderWidth: ".01rem",
    borderStyle: "groove",
    borderColor: "#30416B",
    borderRadius: "1rem",
    bottom: 'auto',
    marginRight: '-50%',
    width: "70rem",
    height: "55rem",
    transform: 'translate(-50%, -50%)',
  },
};
const AddNewEntities = () => {
  const Admin = useSelector(selectAdmin)
  const [selectedFile, setSelectedFile] = useState(null);
  const [rneFile, setRneFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const companies = useSelector(Companies)
  const limitedCompanies = useSelector(LimitedCompanies)
  const cars = useSelector(LimitedCars)
  const options = companies?.map(company => ({
    label: company.userName, // Display the userName as the label
    value: company.id, // Use the id as the value
  }));
  // const loadingStatus = useSelector(selectLoadingStatus.getAllCompanies)
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    type: "company"
  })
  const [carDetails, setCarDetails] = useState({
    UserId: "",
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
    deposit:""
  })
  const [shownCarImage, setShownCarImage] = useState("")
  const [shownCompanyImage, setShownCompanyImage] = useState("")
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedImageCompany, setSelectedImageCompany] = useState(null);
  // const handleImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const image = event.target.files[0];
  //     setSelectedImage(URL.createObjectURL(image));
  //   }
  // };
  // const handleImageChangeCompany = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const image = event.target.files[0];
  //     handleSelectChange("avatar", URL.createObjectURL(image));
  //   }
  // };
  function openModal2() {
    setIsOpen2(true);
  }
  function closeModal2() {
    setIsOpen2(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }


  // }; // State to store the selected or dropped image
  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };
  // const handleSelectChange = (id, value) => {
  //   setCarDetails(prevDetails => ({
  //     ...prevDetails, // Spread the previous state to maintain other properties
  //     [id]: value // Use computed property name to dynamically set the property
  //   }));
  // };
  function notify(modalType) {
    const checkAndNotify = (details, type) => {
      let emptyCount = 0;
      const emptyFields = [];

      Object.entries(details).forEach(([key, value]) => {
        if (value === '' || value === undefined) {
          emptyCount++;
          emptyFields.push(key);
        }
      });

      // Define a unique ID for the toast
      const toastId = `emptyFields-${type}`;

      // Check if the specific toast is already active
      if (toast.isActive(toastId)) {
        console.log(`A toast for ${type} is already active. Not showing another toast.`);
        return; // Exit the function if the specific toast is already active
      }

      if (emptyCount >= 4) {
        toast.error(`Please fill in all the empty fields for ${type}.`, { toastId });
      } else if (emptyCount > 0) {
        // If there are less than 4 empty fields, show a toast for each empty field
        emptyFields.forEach(field => {
          toast.error(`Please fill in the ${field} field for ${type}.`, { toastId });
        });
      }
    };

    // Determine which details to check based on the modal type
    if (modalType === 'car') {
      // Check carDetails
      checkAndNotify(carDetails, 'car');
    } else if (modalType === 'company') {
      // Check companyDetails
      checkAndNotify(companyDetails, 'company');
    }
  }

  const handleCompanyChange = (id, value) => {
    console.log(`Field: ${id}, Value: ${value}`);
    setCompanyDetails(prevDetails => {
      const newDetails = {
        ...prevDetails,
        [id]: value
      };
      console.log('New state:', newDetails);
      return newDetails;
    });
  };
  const [cloudwait, setCloudWait] = useState(false)
  const handleCarChange = (id, value) => {
    console.log(`Updating ${id} with value: ${value}`);
    setCarDetails(prevDetails => {
      // Directly update the value of the specified key
      // If the key is meant to hold an array, this approach will still work because
      // JavaScript allows arrays to be assigned to object keys.
      prevDetails[id] = value;
      console.log('New state:', prevDetails);
      return prevDetails;
    });
  };
  const [carCount,setCarCount]=useState(1)
  const increment=()=>{
    setCarCount(prevDetails => {
      // Directly update the value of the specified key
      // If the key is meant to hold an array, this approach will still work because
      // JavaScript allows arrays to be assigned to object keys.
      prevDetails += 1;
      console.log('New state:', prevDetails);
      return prevDetails;
    });
  };
  const decrement=()=>{
    setCarCount(prevDetails => {
      // Directly update the value of the specified key
      // If the key is meant to hold an array, this approach will still work because
      // JavaScript allows arrays to be assigned to object keys.
      prevDetails -= 1;
      console.log('New state:', prevDetails);
      return prevDetails;
    });
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('Key pressed:', event.key); // Debugging line
      if (event.key === 'Enter') {
        console.log('Enter key pressed'); // Debugging line
        if (Object.values(companyDetails).every(value => value)) {
          console.log('All details are filled out.'); // Debugging line
          dispatch(SignUpCompany(companyDetails));
          closeModal2()
        }
        console.log("closed the modal", modalIsOpen2)
      }
    };


    // Add event listener when modal is open
    if (modalIsOpen2) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Remove event listener when modal is closed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen2]);
  useEffect(() => {
    // console.log("reload");
    // useEffect(()=>{
    dispatch(getAllCars())
    // },[])
  }, [cloudwait])
  // console.log(`${process.env.EXPO_PUBLIC_SERVER_IP}`)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(carDetails);
      }
    };

    // Add event listener when modal is open
    if (modalIsOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Remove event listener when modal is closed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen, carDetails]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading && !companies?.length) {
      setLoading(true); // Indicate that data is being fetched
      dispatch(getAllCompanies());
    }
    if (!loading && !cars?.length) {
      setLoading(true);
      dispatch(getLimitedCars());
    }
    if (!loading && !limitedCompanies?.length) {
      setLoading(true);
      dispatch(getLimitedCompanies());
    }
  }, [loading, dispatch]);
  // console.log(companies);
  // console.log(cars);
  const handleSubmit = async () => {
    console.log(carDetails);
    if (Object.values(carDetails).every(value => value)) {
      try {
        setCloudWait(true)
        // Debugging: Log the selectedFile to verify its contents
        console.log('Selected File:', selectedFile);
        const imageUrl = await cloudinaryUpload(selectedFile, "car_images");

        console.log("Image uploaded successfully:", imageUrl);
        // Log the response or handle it as needed

        carDetails.media = imageUrl
        const updatedCarDetails = {
          ...carDetails,
           price: Number(carDetails.price) + 20, // Ensures price is treated as a number
         };
         
        const response = await dispatch(addCar({updatedCarDetails,carCount}))
        console.log(response.payload);
        //!Would fix this function because it always happens even if the response is fullfilled
        // if (response.payload === undefined) {
        //   toast.error("An Error Has Occured")
        //   setCloudWait(false)
        // }
        //  else {
          const response2 = await dispatch(getAllCars())
          console.log(response2.payload);
          setCloudWait(false)
          setCarDetails({
            UserId: "",
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
          })
          setShownCarImage(null)
          setSelectedFile(null)
          closeModal()
          setCloudWait(false)
        // }
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
      }
    } else {
      notify('car');
      console.log("Car details are missing.");
    }
  };
  const handleSubmit2 = async () => {
    console.log(companyDetails);
    if (Object.values(companyDetails).every(value => value)) {
      try {
        setCloudWait(true)

        // Debugging: Log the selectedFile to verify its contents
        console.log('Selected File:', selectedFile);
        const imageUrl = await cloudinaryUpload(selectedFile, "user_images");
        const imageUrl2 = await cloudinaryUpload(rneFile, "user_images");
        const imageUrl3 = await cloudinaryUpload(idFile, "user_images");
        console.log("Image uploaded successfully:", imageUrl);
        console.log("Image uploaded successfully:", imageUrl2);
        console.log("Image uploaded successfully:", imageUrl3);
        console.log("should be created by now");
        companyDetails.selfie = imageUrl
        companyDetails.RNE = imageUrl2
        companyDetails.idCard = imageUrl3
        const response = dispatch(SignUpCompany(companyDetails))
        if (response.payload === undefined) {
          toast.error("An Error Has Occured")
        } else {
          dispatch(getAllCompanies())
          setCloudWait(false)
          setCompanyDetails({
            userName: "",
            email: "",
            phoneNumber: "",
            type: "company"
          })
          setShownCompanyImage(null)
          setSelectedFile(null)
          setRneFile(null)
          setIdFile(null)
          closeModal2()
        }
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
      }
    } else {
      notify('company');
      console.log("Car details are missing.");
    }
  };
  // In your onChange handler
  // setImageSelected(true);
  // setTimeout(() => setImageSelected(false), 2000);
  // Reset after 2 seconds
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
            <Card className='boxContainer' style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginLeft: "1rem"
            }}>
              <CardHeader style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "3rem"
              }}>
              </CardHeader>
              <CardBody style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
                <div className='half' style={{
                  justifyContent: "flex-start",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div id='Title'>Recently Added Cars</div>
                  <Button onClick={() => {
                    openModal()
                  }} style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    width: "17rem",
                    marginTop: "1.6rem",
                  }}><Add />Add a New Car</Button>
                  <ListGroup style={{
                    marginTop: "5rem",
                    gap: "1rem"
                  }} flush>
                    {cars?.map((item, index) => (
                      <ListGroupItem key={index} style={{
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "#e0e0e0",
                        borderRadius: "10px",
                        backgroundColor: "#f8f9fa",
                        height: "5rem",
                        width: "20rem",
                        padding: "1rem",
                        marginBottom: "1rem",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        transition: '0.3s',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}>
                        {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
                        <img src={item.media} alt={`Image`} style={{ objectFit: "cover", width: '4rem', height: '3rem', marginRight: '1rem' }} />
                        {/* </div> */}
                        <div>
                          <p style={{ fontSize: '18px', color: '#30416B' }}>{item.model}{item.brand}</p>
                          {/* <p style={{ fontSize: '14px', color: '#30416B' }}>{item.Owner}</p> */}
                        </div>

                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>
                <div className='separator'></div>
                <div className='half'>
                  <div id='Title'>Newly Joined Companies</div>
                  <Button onClick={() => {
                    if (Admin?.clearance === "Level3") {
                      openModal2()
                    } else {
                      toast("NOT ALLOWED", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        icon: true,
                        bodyClassName: "custom-toast-body",
                      });

                    }
                  }} style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    width: "17rem",
                    marginTop: "1.6rem",
                  }}><Add />Add a New Company</Button>
                  <ListGroup style={{
                    marginTop: "5rem",
                    gap: "1rem"
                  }} flush>
                    {console.log(companies)}
                    {companies?.map((item, index) => (
                      <ListGroupItem key={index} style={{
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "#e0e0e0",
                        borderRadius: "10px",
                        backgroundColor: "#f8f9fa",
                        height: "5rem",
                        width: "20rem",
                        padding: "1rem",
                        marginBottom: "1rem",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: '0.3s',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}>
                        {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
                        {/* <img src={null} alt={`Image`} style={{ width: '2rem', height: '1rem', marginRight: '10px' }} /> */}
                        <div>
                          <p style={{ fontSize: '18px', color: '#30416B' }}>{item.userName}</p>
                          <p style={{ fontSize: '14px', color: '#30416B' }}>{item.email}</p>
                        </div>
                        {/* </div> */}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        onAfterClose={() => setShownCarImage("")}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <div className="whiteboard-container"> */}
        <button className="image-input-container" style={{
          backgroundColor: shownCarImage ? "rgb(0,0,0,0.1)" : "rgb(0,0,0,0.1)",
          borderRadius: "1rem",
          padding: 0,
          cursor: "pointer",
          borderWidth: shownCarImage ? ".2rem" : "0",
          borderStyle: shownCarImage ? "dashed" : "solid",
          borderColor: shownCarImage ? "#30416b" : "transparent",
        }}
          onClick={() => document.getElementById('imageInput').click()}>
          {shownCarImage ? (
            <>
              {/* {console.log(carDetails.media)} */}
              <img className='hoverImage' key={shownCarImage} src={shownCarImage} alt="Selected" style={{ maxWidth: '100%', borderRadius: "1rem", maxHeight: "90%", }} />
              {/* <div className="image-preview-text">Image selected</div> */}
            </>
          ) : (
            <div style={{
              flexDirection: "row-reverse",
              display: "flex"
            }}>
              <i className="fas fa-camera"></i> {/* Example using Font Awesome */}
              <div className="image-input-text">Press here to add Car image</div>
            </div >
          )}

          <input
            type="file"
            id="imageInput"
            style={{ display: 'none' }}
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0) {
                setSelectedFile(event.target.files[0]);; // Update the state with the selected file
                setShownCarImage(URL.createObjectURL(event.target.files[0])); // Create a blob URL for the selected file and pass it to handleCarChange

              }
            }}
          />
        </button>


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

            }}>How much Is The Deposit For This Car :</div>
            <div style={{
            }} className="input-container">
              <input
                className="input-box"
                type='number'
                placeholder='Type here...'
                onChange={(e) => handleCarChange("deposit", e.target.value)}
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
                  // options={Object.keys(data)?.map(key => ({ label: key, value: key }))}
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
                options={[
                  { value: 'Economy', label: 'Economy (Polo etc.)' },
                  { value: 'Premium', label: 'Premium (Mercedes C-Klasse, Audi A3)' },
                  { value: 'Compact', label: 'Compact (i20, Golf, Ibiza)' },
                  { value: 'SUV', label: 'SUV' },
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
                  placeholder='Type here...'
                  // options={Object.keys(data)?.map(key => ({ label: key, value: key }))}
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
          <div style={{
            flexDirection:"row",
            display:"flex",
            alignItems:"center",
            gap:"3rem"
            // justifyContent:"space-between"
          }}>
            <Button onClick={handleSubmit} className='pressEnter' style={{
              // color: "grey",
              // fontSize: "1rem",
              // paddingTop: "1rem"
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
              }
            </Button>
            <div className="stepper-touch-container">
              <div className="input-number">
                <span>{carCount<10?"0"+carCount:carCount}</span>
                <button onClick={decrement}>-</button>
                <button onClick={increment}>+</button>
              </div>
              {/* Repeat the above div for additional inputs if needed */}
            </div>
          </div>
        </div>
      </Modal >
      <Modal
        isOpen={modalIsOpen2}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal2}
        onAfterClose={() => setShownCompanyImage("")}
        style={customStyles2}
        contentLabel="Example Modal"
      >
        <div className="whiteboard-container">
          <button className="image-input-container" style={{
            backgroundColor: shownCompanyImage ? "rgb(0,0,0,0.1)" : "rgb(0,0,0,0.1)",
            borderRadius: "1rem",
            padding: 0,
            cursor: "pointer",
            borderWidth: shownCompanyImage ? ".2rem" : "0",
            borderStyle: shownCompanyImage ? "dashed" : "solid",
            borderColor: shownCompanyImage ? "#30416b" : "transparent",
          }} onClick={() => document.getElementById('imageInput').click()}>
            {shownCompanyImage ? (
              <>
                <img src={shownCompanyImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: "20rem", }} />
                {/* <div className="image-preview-text">Image selected</div> */}
              </>
            ) : (
              <div style={{
                flexDirection: "row-reverse",
                display: "flex"
              }}>
                <i className="fas fa-camera"></i> {/* Example using Font Awesome */}
                <div className="image-input-text">Press here to add Company's Logo</div>
              </div >
            )}

            <input
              type="file"
              id="imageInput"
              style={{ display: 'none' }}
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  setSelectedFile(event.target.files[0]);; // Update the state with the selected file
                  setShownCompanyImage(URL.createObjectURL(event.target.files[0])); // Create a blob URL for the selected file and pass it to handleCarChange
                }
              }}
            />
          </button>
          <div style={{
            fontSize: "1.2rem",
            paddingBottom: "0.5rem"
          }}>Input The Company's Details here :</div>
          <div className='first-select-container'>
            <div style={{
              fontSize: ".9rem"
            }}>What Is The Name Of The Company :</div>
            <div className="input-container-long">
              <input
                className="select-box"
                placeholder='Input The Company Name Here...'
                // options={Object.keys(data)?.map(key => ({ label: key, value: key }))}
                onChange={(e) => handleCompanyChange("userName", e.target.value)}
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
              }}>Select An Image/Document Of The R.N.E :</div>
              <div className="input-container">
                <input
                  className="input-box"
                  type="file"
                  placeholder='Type here...'
                  onChange={(e) => {
                    // Check if a file is selected
                    if (e.target.files && e.target.files.length > 0) {
                      setRneFile(e.target.files[0])
                    }
                  }}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />

              </div>
            </div>
            <div className='select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>Select A Picture/Document Of the ID card Of The Owner :</div>
              <div className="input-container">
                <input
                  className="input-box"
                  type="file"
                  placeholder='Type here...'
                  onChange={(e) => {
                    // Check if a file is selected
                    if (e.target.files && e.target.files.length > 0) {
                      setIdFile(e.target.files[0])
                    }
                  }}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />

              </div>
            </div>
          </div>
          <div className='first-select-container'>
            <div style={{
              fontSize: ".9rem",
            }}>What Is The E-mail Of The Owner :</div>
            <div className="input-container-long">
              <input
                className="select-box"
                type="email"
                placeholder='Input The Email Here...'
                // options={Object.keys(data)?.map(key => ({ label: key, value: key }))}
                onChange={(e) => handleCompanyChange("email", e.target.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div><div className='first-select-container'>
            <div style={{
              fontSize: ".9rem"
            }}>What Is The Phone Number Of The Owner :</div>
            <div className="input-container-long">
              <input
                className="select-box"
                placeholder='Input The Phone Number Here...'
                type="number"
                onChange={(e) => handleCompanyChange("phoneNumber", e.target.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <Button className='pressEnter' onClick={
            Admin?.clearance === "Level3" ? handleSubmit2 : null} style={{
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
};

export default AddNewEntities;
