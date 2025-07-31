import React,{useState,useEffect,use} from 'react'
import "../../Styles/Menu/Clinic Settings/AddBranch.css";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import "../../Components/Sidebar.css";
import logo from "../../Assets/logo.png";
import {
  HelpOutlineOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
// import Divider from '@mui/material/Divider';
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar } from "@mui/material";
import { Col, Row, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dashIcon from "../../Assets/Dashboard.png";
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import Collapse from "@mui/material/Collapse";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import menuIcon from "../../Assets/Vector.png";
import gearIcon from "../../Assets/gear.png";
import userGearIcon from "../../Assets/userGear.png";
import cliGearIcon from "../../Assets/cset.png";
import lp from "../../Assets/lp.png";
import report from "../../Assets/reports.png";
import calendarap from "../../Assets/calendar.png";

import { MdLogout } from "react-icons/md";
import invoice from "../../Assets/invoice.png";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
import Sidebar from '../../Components/Sidebar';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function EditBranch() {
    const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const op = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let clinicID=sessionStorage.getItem("editClinic")

  const [editData, setEditData] = useState({
    ClinicID:"",
    ClinicName: "",
    Address1: "",
    CountryId: "",
    StatesId: "",
    CityId: "",
    LocationID: "",
    Pincode: "",
    MobileNo: "",
    ResponsiblePerson: "",
    OpeningTime: "",
    ClosingTime: "",
    WorkingDays: "",
    Actions: "1",
    IsActive: "1",
    CreatedBy: "1",
    CreationDate: "",
    IPAddress: "",
    TelephoneNo: "",
  });

  const [checked, setChecked] = useState({
    isSelCCountry: false,
    isSelPCountry: false,
    isSelCState: false,
    isSelPState: false,
    isSelCCity: false,
    isSelPCity: false,
  });

  const [countries, setCountries] = useState({
    currentCountries: [],
  });
  const [states, setStates] = useState({
    currentStates: [],
  });
  const [cities, setCities] = useState({
    currentCities: [],
  });
  

  const getStates = async (countryId, cORp) => {
    let url = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetStateList/${countryId}`;
    let state = await (await fetch(url)).json();
    console.log(state.Data);
    if (cORp === "current") {
      setStates({
        ...states,
        currentStates: state.Data,
      });
    }
  };

  const getCities = async (stateId, cORp) => {
    let url = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetCityList/${stateId}`;
    let city = await (await fetch(url)).json();
    console.log(city.Data);
    if (cORp === "current") {
      setCities({
        ...cities,
        currentCities: city.Data,
      });
    }
  };

  const getCountries = async () => {
    let url =
      "https://reviveapplication.com/ReviveAPI/Revive.svc/GetCountryList";
    let country = await (await fetch(url)).json();
    console.log(country.Data.slice(0, 2));
    setCountries({
      ...countries,
      currentCountries: country.Data,
      // permCountries: country.Data.slice(0, 2),
    });
  };
  //   $(function(){
  //     var dtToday = new Date();

  //     var month = dtToday.getMonth() + 1;
  //     var day = dtToday.getDate();
  //     var year = dtToday.getFullYear();
  //     if(month < 10)
  //         month = '0' + month.toString();
  //     if(day < 10)
  //      day = '0' + day.toString();
  //     var maxDate = year + '-' + month + '-' + day;
  //     $('#inputdate').attr('min', maxDate);
  // });

  useEffect(() => {
    getCountries();
  }, []);

  const handle = (e) => {
    const newcred = { ...editData };
    newcred[e.target.name] = e.target.value;

    setEditData(newcred);
    console.log(editData);

    switch (e.target.name) {
      case "CountryId": {
        setChecked((preData) => {
          return {
            ...preData,
            isSelCCountry: true,
            isSelCState: false,
            isSelCCity: false,
          };
        });
        getStates(e.target.value, "current");
        setCities((preData) => {
          return {
            ...preData,
            currentCities: [],
          };
        });
        setEditData((preData) => {
          return {
            ...preData,
            // CurrentCountryId: e.target.value,
            // CurrentStateId: "",
            // CurrentCityId: "",
          };
        });
        break;
      }
      case "StatesId": {
        setChecked((preData) => {
          return { ...preData, isSelCState: true, isSelCCity: false };
        });
        getCities(e.target.value, "current");
        setEditData((preData) => {
          return {
            ...preData,
            // CurrentCityId: "",
          };
        });
        break;
      }
      case "CityId": {
        setChecked((preData) => {
          return { ...preData, isSelCCity: true };
        });
        break;
      }
    }
  };

  const [location, setLocation] = useState([]);
  const locUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetLocationList/34`;
  useEffect(() => {
    fetch(locUrl)
      .then((res) => res.json())
      .then((location) => {
        console.log(location.Data);
        setLocation(location.Data);
      });
  }, []);



  const [getEmp, setGetEmp] = useState([]);

  const getEmpUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetEmployeeDetails/0`;
useEffect(()=>{
  fetch(getEmpUrl)
  .then((res)=>res.json())
  .then((geteRes)=>{
    console.log(geteRes.Data);
    setGetEmp(geteRes.Data)
  })
},[])

  const [responsiblePerson, setResponsiblePerson] = useState([]);

  const respUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetUserList`;

  useEffect(() => {
    fetch(respUrl)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp.Data);
        setResponsiblePerson(resp.Data);
      });
  }, []);

  let addressPattern = /[^a-zA-Z0-9 .,]/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      editData?.ClinicName === "" ||
      editData?.Address1 === "" ||
      editData?.CountryId === "" ||
      editData?.StatesId === "" ||
      editData?.CityId === "" ||
      editData?.LocationID === "" ||
      editData?.TelephoneNo === "" ||
      editData?.OpeningTime === "" ||
      editData?.ClosingTime === "" ||
      editData?.WorkingDays === ""
    ) {
      Swal.fire({
        icon: "warning",
        titleText: "Please fill all the fields marked with red * !",
      });
    }
    else if(editData.Address1.match(addressPattern)){
      Swal.fire({
        icon:"warning",
        titleText:"Address cannot contain special characters like !@# etc!"
      })
    }
    else if(editData.TelephoneNo.length<7){
      Swal.fire({
        icon:"warning",
        titleText:"Phone no. cannot be less than 7 digits!",
        // text:"xsdscs"
      })
    }
    else if(editData.TelephoneNo.length>15){
      Swal.fire({
        icon:"warning",
        titleText:"Phone no. cannot be more than 15 digits!",
        // text:"xsdscs"
      })
    }
    else {
      const addBranchUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewClinic`;

      fetch(addBranchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.status === true) {
            Swal.fire({
              icon: "success",
              title: "Updated successfully!",
              showConfirmButton: false,
              timer: 2500,
            });
            navigate("/branch");
          }
        });
    }
  };

  const [parentMenu, setparentMenu] = useState([]);

  const [mainMenu, setmainMenu] = useState([]);

  const [clinicSetting, setclinicSetting] = useState([]);

  const [treatmentMenu, settreatmentMenu] = useState([]);

  const [userSetting, setuserSetting] = useState([]);

  const [lpMenu, setlpMenu] = useState([]);

  const [apmntMenu, setapmntMenu] = useState([]);

  const [reportMenu, setreportMenu] = useState([]);

  const [menuList, setMenuList] = useState([]);

   let Role=sessionStorage.getItem("RoleId");
  const menuUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetMenuAccess/${Role}`;
  useEffect(() => {
    fetch(menuUrl)
      .then((res) => res.json())
      .then((list) => {
        console.log(list.Data);
        setMenuList(list.Data);

        setparentMenu(list.Data.filter((parent, i) => parent.Parent === 0));
        // console.log(list.Data.filter((parent,i)=>parent.Parent===0));

        setmainMenu(list.Data.filter((main, i) => main.Parent === 3));
        // console.log(list.Data.filter((main,i)=>main.Parent===3));

        setlpMenu(list.Data.filter((lp, i) => lp.Parent === 6));
        // console.log(list.Data.filter((lp,i)=>lp.Parent===6));

        setreportMenu(list.Data.filter((rpt, i) => rpt.Parent === 8));
        // console.log(list.Data.filter((rpt,i)=>rpt.Parent===8));

        setclinicSetting(list.Data.filter((cs, i) => cs.Parent === 4));
        // console.log(list.Data.filter((cs,i)=>cs.Parent===4);

        setuserSetting(list.Data.filter((user, i) => user.Parent === 5));
        // console.log(list.Data.filter(((user,i)=>user.Parent===5)));

        settreatmentMenu(list.Data.filter((treat, i) => treat.Parent === 9));
        // console.log(list.Data.filter((treat,i)=>treat.Parent===9));

        setapmntMenu(list.Data.filter((apmnt, i) => apmnt.Parent === 7));
        // console.log(list.Data.filter((apmnt,i)=>apmnt.Parent===7));
      });
  }, []);


  const [open1, setOpen1] = React.useState(false);

  const handleMenuClick = () => {
    setOpen1(!open1);
  };
  const [open2, setOpen2] = React.useState(false);

  const handleCsClick = () => {
    setOpen2(!open2);
  };

  const [open3, setOpen3] = React.useState(false);

  const handleTreatClick = () => {
    setOpen3(!open3);
  };
  const [open4, setOpen4] = React.useState(false);

  const handleUserClick = () => {
    setOpen4(!open4);
  };
  const [open5, setOpen5] = React.useState(false);

  const handleLpClick = () => {
    setOpen5(!open5);
  };
  const [open6, setOpen6] = React.useState(false);

  const handleApClick = () => {
    setOpen6(!open6);
  };
  const [open7, setOpen7] = React.useState(false);

  const handleReportClick = () => {
    setOpen7(!open7);
  };


const clinicdetUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetClinicEditInfo/${clinicID}`;


const [editableState, seteditableState] = useState("");

const [editableCity, seteditableCity] = useState("");

  useEffect(()=>{
    fetch(clinicdetUrl)
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result.Data);
seteditableState(result.Data[0]?.StateName)
seteditableCity(result.Data[0]?.CityName)
        setEditData((pre)=>{
            return{
                ...pre,
                ClinicID:clinicID,
                ClinicName:result.Data[0]?.BranchName,
                Address1:result.Data[0]?.Address1,
                CountryId:result.Data[0]?.CountryID,
                StatesId:result.Data[0]?.StatesID,
                CityId:result.Data[0]?.CityID,
                LocationID:result.Data[0]?.LocationID,
                // Pincode:result.Data[0]?.
                TelephoneNo:result.Data[0]?.MobileNo,
                ResponsiblePerson:result.Data[0]?.ResponsiblePerson,
                OpeningTime:result.Data[0]?.Openingtime,
                ClosingTime:result.Data[0]?.ClosingTime,
                WorkingDays:result.Data[0]?.WorkingDays
            }
        })
    })
  },[])
  return (
    <>
    <Sidebar>
    <Card className="m-1 mt-3 addb-crd p-3 border-0">
            <Row>
              <Col>
                <p className="addb-t">Edit Branch</p>
                <hr />
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Branch Name<span className="req-f">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="ClinicName"
                          value={editData.ClinicName}
                          placeholder=""
                          onChange={(e) => handle(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={9}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Address<span className="req-f">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="Address1"
                          value={editData?.Address1}
                          placeholder=""
                          onChange={(e) => handle(e)}
                        />
                      </Form.Group>
                    </Col>
                    {/* <Col md={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address Line 2</Form.Label>

        <Form.Control type="text" placeholder="" />
       
      </Form.Group>
                </Col> */}
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Country<span className="req-f">*</span></Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="CountryId"
                          value={editData.CountryId}
                          onChange={(e) => handle(e)}
                        >
                          <option></option>

                          {countries.currentCountries &&
                            countries.currentCountries.map((country) => {
                              return (
                                <>
                                  <option
                                    value={country?.CountryId}
                                    key={country?.CountryId}
                                  >
                                    {country?.CountryName}
                                  </option>
                                </>
                              );
                            })}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>State<span className="req-f">*</span></Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="StatesId"
                          value={editData.StatesId}
                          onChange={(e) => handle(e)}
                        >
                          <option>{editableState}</option>

                          {states.currentStates &&
                            states.currentStates.map((state) => {
                              return (
                                <>
                                  <option
                                    value={state?.StateId}
                                    key={state?.StateId}
                                  >
                                    {state?.StateName}
                                  </option>
                                </>
                              );
                            })}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>City<span className="req-f">*</span></Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="CityId"
                          value={editData?.CityId}
                          onChange={(e) => handle(e)}
                        >
                          <option>{editableCity}</option>
                          {cities.currentCities &&
                            cities.currentCities.map((city) => {
                              return (
                                <>
                                  <option
                                    value={city?.CityID}
                                    key={city?.CityID}
                                  >
                                    {city?.CityName}
                                  </option>
                                </>
                              );
                            })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Location<span className="req-f">*</span></Form.Label>

                        <Form.Select
                          name="LocationID"
                          value={editData.LocationID}
                          aria-label="Default select example"
                          onChange={(e) => handle(e)}
                        >
                          <option></option>

                          {location.map((loc) => {
                            return (
                              <>
                                <option value={loc?.LocationID}>
                                  {loc?.LocationName}
                                </option>
                              </>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone No<span className="req-f">*</span></Form.Label>
                        <Form.Control
                          type="tel"
                          name="TelephoneNo"
                          value={editData.TelephoneNo}
                          placeholder=""
                          onChange={(e) => handle(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Responsible Person</Form.Label>
                        <Form.Select
                          name="ResponsiblePerson"
                          value={editData.ResponsiblePerson}
                          aria-label="Default select example"
                          onChange={(e) => handle(e)}
                        >
                          <option></option>

                          {getEmp.map((emp, i) => {
                            return (
                              <>
                                <option value={emp.UserID}>
                                  {emp.Name}
                                </option>
                              </>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Opening Time<span className="req-f">*</span></Form.Label>
                        <Form.Control
                          type="time"
                          name="OpeningTime"
                          value={editData.OpeningTime}
                          placeholder=""
                          onChange={(e) => handle(e)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Closing time<span className="req-f">*</span></Form.Label>
                        <Form.Control
                          type="time"
                          name="ClosingTime"
                          value={editData.ClosingTime}
                          placeholder=""
                          onChange={(e) => handle(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Working Days<span className="req-f">*</span></Form.Label>
                        <Form.Select
                          name="WorkingDays"
                          value={editData.WorkingDays}
                          aria-label="Default select example"
                          onChange={(e) => handle(e)}
                        >
                          <option></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col>
                      <Button variant="" type="submit" className="addb-sub-btn">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="" type="reset" className="addb-res-btn">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
    </Sidebar>
    </>
  )
}

export default EditBranch