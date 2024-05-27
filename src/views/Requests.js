import { useNavigate } from "react-router-dom";
import {  selectAdmin } from "../Redux/adminSlice";
import { selectAllRequests } from "../Redux/adminSlice";
import ReqRow from "components/Tables/ReqRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, CardHeader, Button, CardBody, Table } from 'reactstrap';


function Requests() {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
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
  const allRequests = useSelector(selectAllRequests)
  const navigate = useNavigate();
  const Admin = useSelector(selectAdmin)
  useEffect(() => {
    const handleNavigation = () => {
      if (Admin.clearance === "Level1") {
        navigate(-1); // Navigate back to the previous page
      }
    };

    handleNavigation();
  }, [Admin, navigate,refresh]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Button>List of Pending Rental Requests</Button>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Agency Phone Number</th>
                      <th>Agency Location</th>
                      <th>Papers</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr> */}
                    {allRequests?.map((request, i) => {
                      return (
                        <ReqRow key={i} setRefresh={setRefresh} request={request} handlePapers={handlePapers} openLocationInGoogleMaps={openLocationInGoogleMaps} />
                      );
                    })}
                    {/* <td>1</td>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td>lkjazekljaekjaze</td>
                      <td >$36,738</td>
                      <td >Yes/No</td> */}
                    {/* </tr> */}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              {/* <CardHeader> */}
              {/* <CardTitle tag="h4">Reports from Clients</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Requests;