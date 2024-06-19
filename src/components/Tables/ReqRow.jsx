// import { getAllRequests } from "@/Redux/dachboardAdmin";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/nucleo-icons.css";
import { getBookedDates, handleBooking } from "../../Redux/adminSlice";
import { CarBookedPeriods } from "../../Redux/adminSlice";
import Swal from "sweetalert2";

const ReqRow = ({setDate, request,setDefaultCar, setCar,openModal }) => {
  const dispatch = useDispatch();
  const carBookedPeriods = useSelector(CarBookedPeriods)
  const handleRequest=async(status)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: `${status==="accept"?"question":status==="reject"?"warning":status==="cancel"?"warning":null}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Confirm ${status==="accept"?"acceptation":status==="reject"?"rejection":status==="cancel"?"cancelation":null}`,
    }).then((result) => {
      if (result.isConfirmed) {
        const val=status==="accept"?"accepted":status==="reject"?"rejected":status==="cancel"?"canceled":null
        Swal.fire({
          title: "Update",
          text: `Your booking request status is now ${val}.`,          
          icon: "success"
        });
        dispatch(handleBooking({acceptation:val,id:request.id}))
      }
    });
  }
  console.log(request);
  return (
    
  !request?.acceptation?
    <tr res="true" hover="true" onClick={async()=>{
      setDefaultCar(request)
      setCar(request)
      await dispatch(getBookedDates(request.id))
      openModal();
      setDate(
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        }
      )
      // fetchBookedDates();
      console.log(await carBookedPeriods);
    }} >
      <>
      <td>{request?.id}</td>
      <td>{request?.model}</td>
      <td>{request?.brand}</td>
      <td>{request?.price-20}</td>
      <td>{request?.typeOfFuel}</td>
      <td>{request?.deposit}</td>
      <td>{request?.UserId}</td>
      <td>{request?.Category}</td>
      <td>{request?.Type}</td>
      <td>{request?.peopleCount}</td>
      <td>{request?.DoorNumber}</td>
      <td>{request?.Capacity}</td>
      <td>{request?.Year}</td>
      <td>{request?.createdAt.split('T')[0]}</td>
      </>
      </tr>
      :
      // <>
      <tr  style={{
        borderBottom:".1rem lightgrey solid"
      }}>
      <td>{request?.id}</td>
      <td>{request?.UserId}</td>
      <td>{request?.startDate}</td>
      <td>{request?.endDate}</td>
      <td>{request?.time}</td>
      <td>{request?.amount}</td>
      <td>{request?.acceptation}</td>
      <td>{request?.name}</td>
      <td>{request?.Email}</td>
      <td>{request?.phoneNumber}</td>
      <td>{request?.address}</td>
      <td>{request?.postalCode}</td>
      <td>{request?.city}</td>
      
     
      {request.acceptation==="pending"? <td  res="true" hover="true" >
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
            handleRequest("accept")
            }}
            style={{
              padding: "0.5rem 2.5rem",
              borderRadius: "0.3125rem",
              background: "#04bfbf",
              color: "#fff",
            }}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
             handleRequest("reject")
            }}
            style={{
              padding: "0.5rem 2.5rem",
              borderRadius: "0.3125rem",
              background: "#9250bc",
              color: "#fff",
            }}
          >
            Decline
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
             handleRequest("cancel")
            }}
            style={{
              padding: "0.5rem 2.5rem",
              borderRadius: "0.3125rem",
              background: "#7ABC50",
              color: "#fff",
            }}
          >
            Cancel
          </button>
        </div>
      </td>:null }
      {/* </> */}
      {/* <td>
        <Button
          className="btn"
          // style={{
          //   padding: "0.5rem 2.5rem",
          //   borderRadius: "0.3125rem",
          //   background: "#7abaf2",
          //   color: "#fff",
          // }}
          onClick={() => {
            openLocationInGoogleMaps(JSON.parse(request.address));
          }}
        >
          Open in maps
        </Button>
      </td>
      <td>
        <Button
          className="btn"
          onClick={() => handlePapers(request.Media)}
        >
          Check papers
        </Button>
      </td> */}
      {/* <td>
        <Button
          className="btn"
          onClick={() => {
            handleSwalToast();
          }}
        >
          Consent
        </Button>
      </td> */}
      {/* <td>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setTypeModal("request");
              setRequest({
                id: request.id,
                UserId: request.UserId,
                address: request.address,
                Media: request.Media,
                companyNumber: request.companyNumber,
                deposit: request.deposit,
                transportation: request.transportation,
                agencyName: request.agencyName,
              });
              openModal();
            }}
            style={{
              padding: "0.5rem 2.5rem",
              borderRadius: "0.3125rem",
              background: "#04bfbf",
              color: "#fff",
            }}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              try {
                setTypeModal("reject");
                setRequest(request.id);
                openModal();
              } catch (error) {
                console.log(error);
              }
              // handleDeclineRequest(request.id), getAllRequests();
            }}
            style={{
              padding: "0.5rem 2.5rem",
              borderRadius: "0.3125rem",
              background: "#9250bc",
              color: "#fff",
            }}
          >
            Decline
          </button>
        </div>
      </td> */}
    </tr>
    
  );
};

export default ReqRow;
