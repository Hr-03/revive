//This page was created by Hritik as per Client discussion and requirement.


import React,{useState,useMemo,useEffect} from "react";
import "../../Styles/Menu/Leads/AddEntry.css";
import { styled, useTheme,alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import "../../Components/Sidebar.css";
import logo from "../../Assets/logo.png";
import { HelpOutlineOutlined, NotificationsNoneOutlined } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar,Tooltip } from "@mui/material";
import { Card, Col, Row ,Modal,Form} from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import {FaCheckCircle, FaRegEdit} from "react-icons/fa";
import {HiOutlineTrash} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import { fn } from "jquery";
import $ from "jquery";
import Swal from "sweetalert2";
import dashIcon from "../../Assets/Dashboard.png";
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
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
import Sidebar from "../../Components/Sidebar";



//material UI definition

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));



//Component starts here

function AddEntry(){
    const navigate=useNavigate();
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
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


    
  const [data, setData] = useState({
    EnquiryID:"0",
    FirstName:"",
    LastName:"",
    Occupation:"",
    EnquiryDate:"",
    Gender:"",
    Age:"",
    DateOfBirth:"",
    MobileNo:"",
    Email:"",
    Address1:"",
    Address2:"",
    CityId:"",
    StatesId:"",
    CountryId:"",
    Area:"null",
    Pincode:"null",
    ClinicID:"",
    EnquiryFor:"",
    EnquirySourceID:"",
    ConversationDetails:"",
    IsPatient:"",
    Rating:"",
    // LeadStatus:"",
    AssignedToUser:"",
    Actions:"null",
    IsActive:"1",
    CreatedBy:"1",
    CreationDate:"",
    IPAddress:"null",
    TelephoneNo:"",
    FollowUpDate:""

  })

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


  // to check if field contains number

  function containsNumbers(str) {
    return /\d/.test(str);
  }



  let firstn=containsNumbers(data.fn)
  let lastn=containsNumbers(data.ln)





const [clinics, setClinics] = useState([]);
const clinUrl="https://reviveapplication.com/ReviveAPI/Revive.svc/GetClinicList/0/0";

useEffect(()=>{
fetch(clinUrl)
.then((res)=>res.json())
.then((clinic)=>{
  console.log(clinic.Data);
  setClinics(clinic.Data);
})
},[])










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
  let url = "https://reviveapplication.com/ReviveAPI/Revive.svc/GetCountryList";
  let country = await (await fetch(url)).json();
  console.log(country.Data.slice(0, 2));
  setCountries({
    ...countries,
    currentCountries: country.Data,
    // permCountries: country.Data.slice(0, 2),
  });
}
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









useEffect(()=>{
getCountries();
},[])


const handleIsPatient=(e)=>{
  const patient=document.getElementById("pnt");
  const followup=document.getElementById("flup");

  if(patient.checked){
    setData((pre)=>{
      return{
        ...pre,
        IsPatient:"1"
      }
    })
  }

  if(followup.checked){
    setData((pre)=>{
      return{
        ...pre,
        IsPatient:"0"
      }
    })
  }

 

let fupcol=document.getElementById("fupdate");

if(followup.checked){
  fupcol.style.display="block";
}
else{
  fupcol.style.display="none";
}

  console.log(data);

}



const currentDate = new Date().toISOString().split('T')[0];
const [selectedDate, setSelectedDate] = useState(currentDate);



// handle onchange state of data

const handle=(e)=>{
  const newcred={...data}
    newcred[e.target.name]=e.target.value;

    setData(newcred);

    setData((pre)=>{
      return{
        ...pre,
        EnquiryDate:selectedDate
      }
    })

    // const result = e.target.value.replace(/[^a-z]/gi, '')



    console.log(data);
    let fnid=document.getElementById("fn");
    let lnid=document.getElementById("ln");
    let fd=document.getElementById("fupDate");

    let pt=document.getElementById("pnt");
    let fp=document.getElementById("flup");

let followupDate=fd.value

    if(pt.checked){
      setData((pre)=>{
        return{
          ...pre,
          FollowUpDate:""
        }
      })
    }
    
    if(fp.checked){
      setData((pre)=>{
        return{
          ...pre,
          FollowUpDate:followupDate
        }
      })
    }

    if(firstn===true){
      
      fnid.style.display="block";
      

      // fnidval.style.display="block";
    }else{
      fnid.style.display="none";
    }
    lastn===true?lnid.style.display="block":lnid.style.display="none"
  

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
      setData((preData) => {
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
      setData((preData) => {
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
}






// Function to handle date input and disable future dates
const handleDateChange = (e) => {
  const selected = e.target.value;
  setSelectedDate(selected);

  setData((pre)=>{
  return{
    ...pre,
    EnquiryDate:e.target.value
  }
  })


};




const [doctors, setDoctors] = useState([]);

const drsUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetUserList`;
useEffect(()=>{
fetch(drsUrl)
.then((res)=>res.json())
.then((drs)=>{
  console.log(drs.Data); 
  setDoctors(drs.Data);
})
},[])



const [roles, setRoles] = useState([]);

  const rolesUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetRoleList`;
  useEffect(() => {
    fetch(rolesUrl)
      .then((res) => res.json())
      .then((rolesRes) => {
        console.log(rolesRes.Data);
        setRoles(rolesRes.Data);
      });
  }, []);



const [enqFor, setEnqFor] = useState([]);

const enqForUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetTreatmentList`;
useEffect(()=>{
  fetch(enqForUrl)
  .then((res)=>res.json())
  .then((enqF)=>{
    console.log(enqF.Data);
    setEnqFor(enqF.Data);
  })
},[])



const [enqSource, setEnqSource] = useState([]);

const enqSourceUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetLeadSourceList`;
useEffect(()=>{
fetch(enqSourceUrl)
.then((res)=>res.json())
.then((enqS)=>{
  console.log(enqS.Data);
  setEnqSource(enqS.Data);
})
},[])

let addressPattern = /[^a-zA-Z0-9 .,]/;
let mobilePattern = /[^0-9+]/;
let namePattern = /[^a-zA-Z ]/;

const addEnqUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewEnquiry`;

const handleSubmit=(e)=>{
  e.preventDefault();




  if(data?.FirstName==="" || data?.LastName==="" || data?.EnquiryDate==="" || data?.Gender==="" || data?.MobileNo==="" || data?.ClinicID==="" || data?.AssignedToUser==="" || data?.EnquiryFor===""){
    Swal.fire({
      icon:"warning",
      titleText:"Please fill all the fields marked with red * !"
    })
  }else if(data.FirstName.match(namePattern) || data.LastName.match(namePattern)){
    Swal.fire({
      icon:"warning",
      titleText:"Name should conatain alphabets only!"
    })
  }else if(data.Address1.match(addressPattern) || data.Address2.match(addressPattern)){
    Swal.fire({
      icon:"warning",
      titleText:"Address should not contain special characters like !@# etc!",
      text:"Only . and , allowed"
    })
  }
  else if(data.MobileNo.length>15){
    Swal.fire({
      icon:"warning",
      titleText:"Mobile no. cannot be more than 15 digits!",
      // text:"xsdscs"
    })
  }
  else if(data.MobileNo.length<7){
    Swal.fire({
      icon:"warning",
      titleText:"Mobile no. cannot be less than 7 digits!",
      // text:"xsdscs"
    })
  }
  else if(data.MobileNo.match(mobilePattern)){
    Swal.fire({
      icon:"warning",
      titleText:"Mobile no. should contain only digits!"
    })
  }
  else{

  fetch(addEnqUrl,{
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((res)=>res.json())
  .then((result)=>{
    console.log(result);


    if(data?.IsPatient==="1" && result?.status===true){
      sessionStorage.setItem("leadPatient",result.EnquiryID)
      Swal.fire({
        icon:"warning",
        title:"Please fill further details to add this lead in patient list!",
        // timer:2500
      })
      navigate(`/fup-pnt/${result.EnquiryID}`)
    }
    else if(result.EnquiryID===-1){
      Swal.fire({
        icon:"warning",
        title:`${result?.message}`,
        // timer:2500
      })
    }
    else if(result.status===true){
      Swal.fire({
        icon:"success",
        title:"Added Successfully!",
        timer:2500
      })
      navigate("/enquiries");
    }else{
      Swal.fire({
        icon:"error",
        title:"Something went Wrong!"
      })
    }
  })
}

}







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


    return(
        <>
       <Sidebar>
       <Card className="m-1 mt-3 ent-crd p-3">
        <Row>
            <Col>
            <p className="ent-t">Enquiry Form</p>
            <p className="note-t"><span className="req-f">Note: </span> Fields marked with * are mandatory to fill!</p>
            <hr />

          <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="FirstName" value={data.FirstName} className="fn" onChange={(e) => handle(e)} />
       <Form.Text className="req-f fnt" id="fn" style={{display:"none"}}>Use alphabets only!</Form.Text>
      </Form.Group>
                </Col>

                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" name="LastName" placeholder="" value={data.LastName} className="ln" onChange={(e) => handle(e)} />
       <Form.Text className="req-f fnt" id="ln" style={{display:"none"}}>Use alphabets only!</Form.Text>
        
      </Form.Group>
                </Col>

                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Occupation</Form.Label>
        <Form.Control type="text" placeholder="" name="Occupation" value={data.Occupation} onChange={(e) => handle(e)} />
        
      </Form.Group>
                </Col>

                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enquiry Date <span className="req-f">*</span></Form.Label>
        <Form.Control type="date" placeholder="" id="EnquiryDate" name="EnquiryDate"  value={selectedDate} max={currentDate} onChange={handleDateChange}/>
        
      </Form.Group>
                </Col>
            </Row>

            <Row>
               

                <Col lg={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date of birth </Form.Label>
        <Form.Control type="date" placeholder="" name="DateOfBirth" value={data.DateOfBirth} onChange={(e) => handle(e)}/>
       
      </Form.Group>
                </Col>

                <Col lg={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gender<span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="Gender" onChange={(e) => handle(e)}>
      <option></option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>

    </Form.Select>
      </Form.Group>
                </Col>
            </Row>
            

            <Row>
                <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address Line 1</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="" name="Address1" value={data.Address1} onChange={(e) => handle(e)}/>
       
      </Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="" name="Address2" value={data.Address2} onChange={(e) => handle(e)}/>
       
      </Form.Group>
                </Col>
            </Row>


            <Row>
            <Col lg={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Country</Form.Label>
        <Form.Select aria-label="Default select example" name="CountryId" value={data.CountryId} onChange={(e) => handle(e)}>
      <option></option>

      {
        countries.currentCountries && countries.currentCountries.map((country)=>{
            return(
              <>
              <option value={country?.CountryId} key={country?.CountryId}>{country?.CountryName}</option>
              
              </>
            )
        })
      }
     
    </Form.Select>
      </Form.Group>
                </Col>
                <Col lg={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>State</Form.Label>
        <Form.Select aria-label="Default select example" name="StatesId" value={data.StatesId} onChange={(e) => handle(e)}>
      <option></option>


      {
        states.currentStates && states.currentStates.map((state)=>{
          return(
            <>
            
            <option value={state?.StateId} key={state?.StateId}>{state?.StateName}</option>
            </>
          )
        })
      }
      
    </Form.Select>
      </Form.Group>
                </Col>
                <Col lg={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Select aria-label="Default select example" name="CityId" value={data.CityId} onChange={(e) => handle(e)}>
      <option></option>
      {
        cities.currentCities && cities.currentCities.map((city)=>{
          return(
            <>
            
            <option value={city?.CityID} key={city?.CityID}>{city?.CityName}</option>
            </>
          )
        })
      }
    
    </Form.Select>
      </Form.Group>
                </Col>

                <Col lg={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Telephone No.</Form.Label>
        <Form.Control type="tel" name="TelephoneNo" value={data.TelephoneNo} onChange={(e) => handle(e)}/>
      
      </Form.Group>
                </Col>
            </Row>


            <Row>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile No. <span className="req-f">*</span></Form.Label>
        <Form.Control type="tel" name="MobileNo" value={data.MobileNo} onChange={(e) => handle(e)} />
       
      </Form.Group>
                </Col>

                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-mail ID</Form.Label>
        <Form.Control type="email" name="Email" value={data.Email} onChange={(e) => handle(e)}/>
      
      </Form.Group>
                </Col>
                

                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Clinic Name <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="ClinicID" onChange={(e) => handle(e)} >
      <option></option>

      {
        clinics && clinics.map((clinics)=>{
          return(
            <>
            <option value={clinics?.ClinicID} key={clinics?.ClinicID}>{clinics?.ClinicName}</option>
            
            </>
          )
        })
      }
     
    </Form.Select>
      </Form.Group>
                </Col>


                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Assign To <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="AssignedToUser" value={data.AssignedToUser} onChange={(e) => handle(e)} >
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
            </Row>

            <Row>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enquiry For <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="EnquiryFor" value={data.EnquiryFor} onChange={(e) => handle(e)} >
      <option></option>
      {
        enqFor && enqFor.map((enqf,i)=>{
          return(
            <>
          <option value={enqf?.TreatmentID} key={enqf?.TreatmentID}>{enqf?.Treatment}</option>
            
            </>
          )
        })
      }
     
    </Form.Select>
      </Form.Group>
                </Col>


                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enquiry Source</Form.Label>
        <Form.Select aria-label="Default select example" name="EnquirySourceID" value={data.EnquirySourceID} onChange={(e) => handle(e)}>
      <option></option>
    {

      enqSource && enqSource.map((enqs)=>{
        return(
          <>
          
          <option value={enqs?.LeadSourceID} key={enqs?.LeadSourceID}>{enqs?.LeadSource}</option>
          </>
        )
      })
    }
      
    </Form.Select>
      </Form.Group>
                </Col>


                <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Conversation Details</Form.Label>
        <Form.Control type="text" name="ConversationDetails" value={data.ConversationDetails} onChange={(e) => handle(e)}/>
      
      </Form.Group>
                </Col>

            </Row>

            <Row>
                <Col md={3}>
        <Form.Label>Patient/Follow up</Form.Label>

                <Row>
                    <Col> <Form.Check type="radio" name="IsPatient" id="pnt" aria-label="option 1" label="Patient" value="Patient" onChange={(e) => handleIsPatient(e)}/></Col>
                    <Col> <Form.Check type="radio" name="IsPatient" id="flup" aria-label="option 1" label="Follow Up" value="Follow Up" onChange={(e) => handleIsPatient(e)}/></Col>
                </Row>
                </Col>

                <Col md={3}>
        <Form.Label>Interest Level</Form.Label>

                <Row>
                    <Col> <Form.Check type="radio" name="Rating" aria-label="option 1" label="cold" value="cold" onChange={(e) => handle(e)}/></Col>
                    <Col> <Form.Check type="radio" name="Rating" aria-label="option 1" label="Warm" value="Warm" onChange={(e) => handle(e)}/></Col>
                    <Col> <Form.Check type="radio" name="Rating" aria-label="option 1" label="Hot" value="Hot" onChange={(e) => handle(e)}/></Col>
                </Row>
                </Col>
              
                <Col md={3}id="fupdate" style={{display:"none"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Followup date</Form.Label>
        <Form.Control type="date" name="FollowUpDate" id="fupDate" value={data.FollowUpDate} onChange={(e) => handle(e)}/>
      
      </Form.Group>
                </Col>
            </Row>


            <Row className="mt-5">
                <Col>
                <Button variant="" type="submit" className="ent-sub">Submit</Button>
                </Col>
                <Col>
                <Button variant="" type="reset" className="ent-res">Reset</Button>
                </Col>
            </Row>
          </Form>

          



            </Col>
        </Row>
       </Card>
       </Sidebar>
        </>
    );
}


export default AddEntry;