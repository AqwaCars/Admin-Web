import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { Row, Col, Card, CardHeader, CardTitle, CardBody, ButtonGroup, Button, Table } from 'reactstrap';


// core components
import { chartExample1, chartExample2, chartExample3, chartExample4 } from '../variables/charts';

import {
  useSelector
  //  useDispatch
} from "react-redux";
import { selectAdmin, selectAllUsers } from "../Redux/adminSlice";
import { selectApproved } from "../Redux/adminSlice";
import { selectAllCars } from "../Redux/adminSlice";
import { selectPending } from "../Redux/adminSlice";
import { selectRejected } from "../Redux/adminSlice";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const Admin = useSelector(selectAdmin)
  const rentalHistory = useSelector(selectApproved)?.historyData
  const pending = useSelector(selectPending)?.historyData
  const rejected = useSelector(selectRejected)?.historyData
  const users = useSelector(selectAllUsers)
  const allUsers = users?.filter((user) => user.type === "user")
  console.log(users);
  const allCompanies = users?.filter((user) => user.type === "company")
  const allCars = useSelector(selectAllCars)
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const [startIndexCar, setStartIndexCar] = useState(0);
  // const dispatch = useDispatch()
  const handleUpClickCar = () => {
    if (startIndexCar > 0) {
      setStartIndexCar(startIndexCar - 10);
    }
  };
  const handleDownClickCar = () => {
    if (startIndexCar + 10 < allUsers?.length) {
      setStartIndexCar(startIndexCar + 10);
    }
  }
  const [startIndex, setStartIndex] = useState(0);

  const handleUpClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 10);
    }
  };

  const handleDownClick = () => {
    if (startIndex + 10 < allUsers?.length) {
      setStartIndex(startIndex + 10);
    }
  }
  useEffect(() => {
    // dispatch(toggleAdminLoading(false))
    // dispatch(toggleAdminLoading(true))
    const handleNavigation = () => {
      if (Admin?.clearance === "Level1") {
        navigate(-1); // Navigate back to the previous page
      }
      if (Admin?.clearance === "Level1" || Admin?.clearance === "Level2") {
        navigate("/admin/Cars"); // Navigate back to the previous page
      }
    };

    handleNavigation();
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [Admin, navigate]);

  return (
    Loading ?
      <div></div>
      :
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">{"Rental History"}</h5>
                      <CardTitle tag="h2">{"Performance"}</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data1",
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setBgChartData("data1")}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accepted
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data2",
                          })}
                          onClick={() => setBgChartData("data2")}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Pending
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data3",
                          })}
                          onClick={() => setBgChartData("data3")}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Rejected
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={bigChartData === "data1" ? chartExample1?.data1(rentalHistory) : bigChartData === "data2" ? chartExample1?.data1(pending) : bigChartData === "data3" ? chartExample1?.data1(rejected) : null}
                      options={chartExample1?.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                {/* <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">{"Rental History"}</h5>
                    <CardTitle tag="h2">{"Performance"}</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accepted
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Pending
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Rejected
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader> */}
                <CardBody>
                  {/* <Col lg="4"> */}
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Rental Transactions</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                        {"Total Income"}
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                          data={chartExample3?.data(rentalHistory)}
                          options={chartExample3?.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                  {/* </Col> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Users Count</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" /> {users?.length}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2?.data(users)}
                      options={chartExample1?.options}
                    />

                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Affiliated Cars</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" />{allCars?.length}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4?.data(rentalHistory)}
                      options={chartExample4?.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Agencies List</CardTitle>
                </CardHeader>
                <CardBody >
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Phone-Number</th>
                        <th className="text-center">state</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(allCompanies)}
                      {allCompanies?.slice(startIndex, allCompanies.length > 0 ? startIndex + 10 : null)?.map((u, i) => (
                        console.log(u),
                        <tr key={i}>
                          <td>{u.id}</td>
                          <td>{u.userName}</td>
                          <td>{u.email}</td>
                          <td>{u.phoneNumber}</td>
                          <td className="text-center">{u.isBlocked ? "Blocked" : "Active"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="prev_next_container"><Button className="prev_next_btn" onClick={handleUpClickCar}>Previous</Button>
                    <Button className="prev_next_btn" onClick={handleDownClickCar}>Next</Button></div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Users List</CardTitle>
                </CardHeader>
                <CardBody >
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Phone-Number</th>
                        <th className="text-center">state</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers?.slice(startIndex, allUsers.length > 0 ? startIndex + 10 : null)?.map((u, i) => (
                        <tr key={i}>
                          <td>{u.id}</td>
                          <td>{u.userName}</td>
                          <td>{u.email}</td>
                          <td>{u.phoneNumber}</td>
                          <td className="text-center">{u.isBlocked ? "Blocked" : "Active"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="prev_next_container"><Button className="prev_next_btn" onClick={handleUpClick}>Previous</Button>
                    <Button className="prev_next_btn" onClick={handleDownClick}>Next</Button></div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
  );
}

export default Dashboard;
