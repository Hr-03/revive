import React,{useState,useEffect} from "react";
import "../../Styles/Menu/Appointment/AddAppointment.css";
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
import { AiOutlineEye} from "react-icons/ai";
import { BsSnow} from "react-icons/bs";
import {FaCheckCircle, FaEdit, FaEye, FaRegEdit} from "react-icons/fa";
import {MdCall, MdLogout} from "react-icons/md";
import {HiOutlineTrash,HiFire,HiUserAdd} from "react-icons/hi";
import {SiMicrosoftexcel} from "react-icons/si";
import {useNavigate} from "react-router-dom";
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

import invoice from "../../Assets/invoice.png";
import Swal from "sweetalert2";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
import moment from "moment";
import Sidebar from "../../Components/Sidebar";

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

function AddAppointment(){
  let enquiryId=sessionStorage.getItem("bookEnqId");
  let Mobile=sessionStorage.getItem("bookmbl");
  let Name=sessionStorage.getItem("bookname");
 let dob= sessionStorage.getItem("bookDOB");
  let gender = sessionStorage.getItem("bookGender");

  
  const [appointment, setAppointment] = useState({
    ClinicID:"",
    UserID:"",
    AppointmentNo:"",
    EnquiryID:enquiryId,
    AppointmentDateTime:"",
    FirstName:Name.split(" ")[0],
    LastName:Name.split(" ")[1],
    DateOfBirth:dob,
    Age:"",
    Gender:gender,
    MobileNo:Mobile,
    TelephoneNo:"",
    Email:"",
    PatientID:"0",
    Action:"",
    CreatedBy:"1",
    IPAddress:""


  })


  




  const handleChange=(e)=>{
    const newdata={...appointment};
    newdata[e.target.name]=e.target.value;
    setAppointment(newdata);
    console.log(newdata);

    let apDT=document.getElementById("DT").value;

    let apDTval=apDT.split("T");
console.log("date");
    console.log(apDTval);

    let AppointmentDT=apDTval[0]+" "+apDTval[1];

    console.log(AppointmentDT);


    setAppointment((pre)=>{
      return{
        ...pre,
        AppointmentDateTime:AppointmentDT
      }
    })
}



const handleApmtSubmit=(e)=>{
  e.preventDefault();

  const addApUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewAppointment`;


  if(appointment?.ClinicID==="" || appointment?.UserID==="" || appointment?.AppointmentNo==="" || appointment?.AppointmentDateTime==="" || appointment?.FirstName==="" || appointment?.LastName==="" || appointment?.Gender==="" || appointment?.MobileNo===""){
    Swal.fire({
      icon:"error",
      title:"please fill all the fields marked with red *"
    })
  }else{

  

  fetch(addApUrl,{
    method:"POST",
    headers:{
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  })
  .then((res)=>res.json())
  .then((Apresult)=>{
    console.log(Apresult);
    if(Apresult.Status===true){
      Swal.fire({
        icon:"success",
        title:"Appointment added successfully!"
      })
      navigate("/view-apmt")
    }
  })
}
}




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


  const [branch, setBranch] = useState([]);
  const branchUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetClinicList/0/0`;

  useEffect(() => {
    fetch(branchUrl)
      .then((res) => res.json())
      .then((branchRes) => {
        console.log(branchRes.Data);
        setBranch(branchRes.Data);
      });
  }, []);



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

    return(
        <>
          <Sidebar>
          <Card className="m-1 mt-3 af-crd p-3">
        <Row>
            <Col>
            <p className="af-t">Appointment Form</p>
            {/* <p className="note-t"><span className="req-f">Note: </span> Fields marked with * are mandatory to fill!</p> */}

            <hr />

<Form onSubmit={handleApmtSubmit}>

            <Row>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Branch Name <span className="req-t">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="ClinicID" onChange={(e)=>handleChange(e)}>
      <option></option>
      {branch.map((b) => {
                                return (
                                  <>
                                    <option value={b.ClinicID} key={b.ClinicID}>
                                      {b.ClinicName}
                                    </option>
                                  </>
                                );
                              })}
    </Form.Select>
      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Doctor Name <span className="req-t">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="UserID" onChange={(e)=>handleChange(e)}>
      <option></option>
      {
        doctors && doctors.map((doctors,i)=>{
          return(
            <>
          <option value={doctors?.UserID} key={i}>{doctors?.Name}</option>
            
            </>
          )
        })
      }
    </Form.Select>
      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Appointment  No. <span className="req-t">*</span></Form.Label>
        <Form.Control type="number" placeholder="" name="AppointmentNo" onChange={(e)=>handleChange(e)}/>
      </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Appointment Date & Time <span className="req-t">*</span></Form.Label>
        <Form.Control type="datetime-local" placeholder="" id="DT" name="AppointmentDateTime" onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>
                </Col>
                
            </Row>

            <Row>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name <span className="req-t">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="FirstName" value={appointment?.FirstName} onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>                 
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name <span className="req-t">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="LastName" value={appointment?.LastName} onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>                 
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date Of Birth</Form.Label>
        <Form.Control type="date" placeholder="" name="DateOfBirth" value={moment((appointment?.DateOfBirth))?.format("YYYY-MM-DD")} onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>                 
                </Col>
                {/* <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="" name="Age" onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>                 
                </Col> */}

<Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gender <span className="req-t">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="Gender" value={appointment?.Gender} onChange={(e)=>handleChange(e)}>
      <option></option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
     
    </Form.Select>
      </Form.Group>
                </Col>
            </Row>


            <Row>
               

                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile Number <span className="req-t">*</span></Form.Label>
        <Form.Control type="tel" placeholder="" name="MobileNo" value={appointment?.MobileNo} onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>    
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Telephone  Number</Form.Label>
        <Form.Control type="tel" placeholder="" name="TelephoneNo" onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>    
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" placeholder="" name="Email" onChange={(e)=>handleChange(e)}/>
   
      </Form.Group>    
                </Col>
            </Row>



            <Row className="mt-5">

                <Col>
                <Button variant="" className="sub-btn" type="submit">Submit</Button>
                </Col>
                <Col>
                <Button variant="" className="back-btn" type="reset">Reset</Button>
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


export default AddAppointment;