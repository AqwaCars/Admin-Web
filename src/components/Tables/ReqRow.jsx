// import { getAllRequests } from "@/Redux/dachboardAdmin";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/nucleo-icons.css";
import { getBookedDates } from "../../Redux/adminSlice";
import { CarBookedPeriods } from "../../Redux/adminSlice";
const ReqRow = ({setDate, request, setCar,openModal }) => {
  const dispatch = useDispatch();
  const carBookedPeriods = useSelector(CarBookedPeriods)
  
  return (
    <tr res hover onClick={async()=>{
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
      <td>{request.id}</td>
      <td>{request.model}</td>
      <td>{request.brand}</td>
      <td>{request.price}</td>
      <td>{request.typeOfFuel}</td>
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
