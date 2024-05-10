// import { getAllRequests } from "@/Redux/dachboardAdmin";
import { setReqForSwal } from "Redux/adminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import "../../assets/css/nucleo-icons.css";
import requestImg from "../../assets/img/request.jpg";
import { approveRequest } from "Redux/adminSlice";
import { declineRequest } from "Redux/adminSlice";
import { Media } from "Redux/adminSlice";
import { getSingleMedia } from "Redux/adminSlice";
import { getBookedDates } from "Redux/adminSlice";
import { CarBookedPeriods } from "Redux/adminSlice";
const ReqRow = ({ request,setRefresh, handlePapers, setCar,openModal,setMedia }) => {
  const dispatch = useDispatch();
  const refresh=(input)=>{
    setRefresh(input)
  }
  const images = useSelector(Media)
  const carBookedPeriods = useSelector(CarBookedPeriods)
  const fetchBookedDates= async()=>{
    try {
     dispatch(getBookedDates(request.id))
    } catch (er) {
      console.log("fetchBookedDates",error);
    }
  }
  const fetchMedia = async () => {
    try {
      const actionResult = await dispatch(getSingleMedia(request.id));
      // Assuming you're using Redux Toolkit and the blob URL is returned in the payload
      setMedia(actionResult.payload);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    }
  };

  return (
    <tr res hover onClick={()=>{
      setCar(request)
      fetchMedia();
      openModal();
      fetchBookedDates();
      console.log(carBookedPeriods);
    }} >
      {/* {console.log(request, "<=Request List")} */}
      <td>{request.id}</td>
      <td>{request.model}</td>
      <td>{request.brand}</td>
      <td>{request.price}</td>
      <td>{request.typeOfFuel}</td>
      {/* <td>{request.acceptation}</td> */}
      <td>{request.Owner}</td>
      <td>{request.Category}</td>
      <td>{request.Type}</td>
      <td>{request.peopleCount}</td>
      <td>{request.DoorNumber}</td>
      <td>{request.Capacity}</td>
      <td>{request.Year}</td>
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
