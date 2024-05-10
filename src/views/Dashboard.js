import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "Redux/adminSlice";
import { getAllUsers } from "Redux/adminSlice";
import { getApprovedServices } from "Redux/adminSlice";
import { selectApproved } from "Redux/adminSlice";
import { getPendingServices } from "Redux/adminSlice";
import { getRejectedServices } from "Redux/adminSlice";
import { getAllCars } from "Redux/adminSlice";
import { allCars } from "Redux/adminSlice";
import { selectAllCars } from "Redux/adminSlice";
import { selectPending } from "Redux/adminSlice";
import { selectRejected } from "Redux/adminSlice";
import { selectForeignUser } from "Redux/adminSlice";
import { getUserById } from "Redux/adminSlice";
import { selectLoggedIn } from "Redux/adminSlice";
import { getData } from "Redux/adminSlice";

function Dashboard() {
  const logged = useSelector(selectLoggedIn)
  const foreignUser = useSelector(selectForeignUser)
  const rentalHistory = useSelector(selectApproved)?.historyData
  const pending = useSelector(selectPending)?.historyData
  const rejected = useSelector(selectRejected)?.historyData
  const loading = useSelector((state) => state.Admin.loading);
  const users = useSelector(selectAllUsers)
  const allUsers = users.filter((user) => user.type === "user")
  const allCompanies = users.filter((user) => user.type === "company")
  const allCars = useSelector(selectAllCars)
  const [refresh, setRefresh] = useState(false);
  const [bigChartData, setbigChartData] = React.useState("data1");
  // const [userData, setUserData] = useState({})
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const [startIndexCar, setStartIndexCar] = useState(0);
  const dispatch = useDispatch()
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
  const getUserData = async (u) => {
    try {
      await dispatch(getUserById(u.UserId))
      // setUserData(foreignUser)
    } catch (error) {
      console.error(error);
    }
  }
  // useEffect(() => {
  //   const tk = localStorage.getItem("Token")
  //   console.log(logged)
  //   if (logged) {
  //     const loadData = () => {
  //       dispatch(getData(tk))
  //       dispatch(getAllUsers());
  //       dispatch(getAllCars());
  //       dispatch(getApprovedServices());
  //       dispatch(getPendingServices());
  //       dispatch(getRejectedServices());
  //     };
  //     loadData();
  //     loading && setRefresh(!refresh);
  //   }
  // }, [dispatch, refresh]);

  return (
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
                    data={bigChartData === "data1" ? chartExample1.data1(rentalHistory) : bigChartData === "data2" ? chartExample1.data1(pending) : bigChartData === "data3" ? chartExample1.data1(rejected) : null}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
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
                    data={chartExample2.data(users)}
                    options={chartExample1.options}
                  />

                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Income</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  {[]?.length}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data([])}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Cars count</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" />{allCars?.length}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data(allCars)}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            {/* <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Tasks(5)</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Update the Documentation</p>
                          <p className="text-muted">
                            Dwuamish Head, Seattle, WA 8:47 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">GDPR Compliance</p>
                          <p className="text-muted">
                            The GDPR is a regulation that requires businesses to
                            protect the personal data and privacy of Europe
                            citizens for transactions that occur within EU
                            member states.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Solve the issues</p>
                          <p className="text-muted">
                            Fifty percent of all respondents said they would be
                            more likely to shop at a company
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip362404923"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip362404923"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Release v2.0.0</p>
                          <p className="text-muted">
                            Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip818217463"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip818217463"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Export the processed files</p>
                          <p className="text-muted">
                            The report also shows that consumers will not easily
                            forgive a company once a breach exposing their
                            personal data occurs.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip831835125"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip831835125"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Arival at export process</p>
                          <p className="text-muted">
                            Capitol Hill, Seattle, WA 12:34 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip217595172"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip217595172"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card> */}
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
                    {allCompanies?.slice(startIndex, allCompanies.length > 10 ? startIndex + 10 : undefined)?.map((u, i) => (
                      <tr key={i}>
                        <td>{u.id}</td>
                        <td>{u.userName}</td>
                        <td>{u.email}</td>
                        <td>{u.phoneNumber}</td>
                        <td className="text-center">{u.stateBlocked ? "Blocked" : "Active"}</td>
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
                    {allUsers?.slice(startIndex, allUsers.length > 10 ? startIndex + 10 : undefined)?.map((u, i) => (
                      <tr key={i}>
                        <td>{u.id}</td>
                        <td>{u.userName}</td>
                        <td>{u.email}</td>
                        <td>{u.phoneNumber}</td>
                        <td className="text-center">{u.stateBlocked ? "Blocked" : "Active"}</td>
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
