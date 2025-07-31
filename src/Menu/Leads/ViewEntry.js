import React,{useState,useEffect} from "react";
import  "../../Styles/Menu/Leads/ViewEntry.css";
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
import {FaCheckCircle, FaEye, FaRegEdit} from "react-icons/fa";
import { AiOutlineEye} from "react-icons/ai";
import {HiOutlineTrash} from "react-icons/hi";
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

import { MdLogout } from "react-icons/md";
import invoice from "../../Assets/invoice.png";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
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

function ViewEntry(){

  let enqId=sessionStorage.getItem("viewEnq");
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


  const [view, setView] = useState([]);

  const viewUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetEnquiryDetails/${enqId}`;



  useEffect(()=>{

    fetch(viewUrl)
    .then((res)=>res.json())
    .then((viewRes)=>{
      console.log(viewRes.Data);
      setView(viewRes?.Data);
    })
  },[])

    return(
        <>
     <Sidebar>
     <Card className="m-1 mt-3 ap-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">View Enquiry</p>
            <hr />

           <Row>

            <Col md={6}>
            <p><b>First Name  :</b>{view[0]?.FirstName}</p>
            <p><b>Last Name      :</b>{view[0]?.LastName}</p>
            <p><b>Occupation    :</b>{view[0]?.Occupation}</p>
            <p><b>Enquiry Date  :</b>{view[0]?.EnquiryDate.split(" ")[0]}</p>
            <p><b>Age  :</b>{view[0]?.Age}</p>
            <p><b>Date of birth  :</b>{view[0]?.DateOfBirth.split(" ")[0]}</p>
            <p><b>Gender  :</b>{view[0]?.Gender}</p>
            <p><b>Address  :</b>{view[0]?.Address}</p>
            <p><b>Country  :</b>{view[0]?.Country}</p>
            <p><b>State  :</b>{view[0]?.State}</p>
            </Col>
            <Col md={6}>
            <p><b>City  :</b>{view[0]?.City}</p>
            <p><b>Telephone No.  :</b>{view[0]?.TelephoneNo}</p>
            <p><b>Mobile No. :</b>{view[0]?.MobileNo}</p>
            <p><b>E-mail ID  :</b>{view[0]?.Email}</p>
            <p><b>Clinic Name   :</b>{view[0]?.ClinicName}</p>
            <p><b>Assign To      :</b>{view[0]?.AssignedToUser}</p>
            <p><b>Enquiry For       :</b>{view[0]?.EnquiryFor}</p>
            <p><b>Enquiry Source   :</b>{view[0]?.LeadSource}</p>
            <p><b>Conversation Details   :</b>{view[0]?.ConversationDetails}</p>
            </Col>
           </Row>
            



            </Col>
        </Row>
       </Card>
     </Sidebar>
        </>
    );
}

export default ViewEntry;