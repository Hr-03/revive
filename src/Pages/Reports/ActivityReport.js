import React,{useState,useEffect,useMemo} from 'react';
import "../../Styles/Reports/ClinicwiseCollection.css";
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
import { Avatar, Tooltip } from "@mui/material";
import { Card, Col, Row, Modal, Form, Table, Tabs, Tab,Spinner, Nav } from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import Swal from "sweetalert2";
import invoice from "../../Assets/invoice.png";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
import { CSVLink, CSVDownload } from "react-csv";
import { LiaDownloadSolid } from "react-icons/lia";
import { AiOutlineEye } from 'react-icons/ai';



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

function ActivityReport() { 

    const [delData, setdelData] = useState({
        InvoiceTid:""
    })


    let Role=sessionStorage.getItem("RoleId");

    let User=Role=="1"?0:Role=="11"?0:sessionStorage.getItem("UserId")

    const [datedata, setdatedata] = useState({
        startDate:"",
        endDate:"",
        branch:"",
        doctor:"",
        payment:""
      })
    
      const [show, setShow] = useState(false);

      const handleCloseDel = () => setShow(false);
      const handleShow = () => setShow(true);


      const handleDates=(e)=>{
        const newdata={...datedata};
        newdata[e.target.name]=e.target.value;
        setdatedata(newdata);
        console.log(newdata);
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


//   const [Colln, setColln] = useState([]);

//   const getCollUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPaymentMwiseCollection/0/0/0/0/0`;
// useEffect(()=>{
//   fetch(getCollUrl)
//   .then((res)=>res.json())
//   .then((geteRes)=>{
//     console.log(geteRes.Data);
//     setColln(geteRes.Data)
//   })
// },[])


const [appointments, setAppointments] = useState([]);

const [enquiries, setEnquiries] = useState([]);


const [followups, setFollowups] = useState([]);

const [consultInvoice, setconsultInvoice] = useState([]);



const activityUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetActivity/0/0/0/0/${User}`;


useEffect(()=>{
fetch(activityUrl)
.then((res)=>res.json())
.then((result)=>{
    console.log(result);
    setAppointments(result?.ActivityAppointments);
    setEnquiries(result?.ActivityEnquiries);
    setFollowups(result?.ActivityFollowups);

    setconsultInvoice(result?.ActivityConsultInvoice);

})
},[])



    const columns1 = useMemo(
        () => [
          // {
          //   accessorKey: "UserID",
          //   header: "User ID",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "User ID" },
            
          // },
          {
            accessorKey: "ClinicName",
            header: "Clinic Name",
            // Cell:({cell})=>{
            //   let imurl=cell.getValue();

            //   return <div>{<img src={imurl?imurl:"https://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"} width={150} height={150}/>}</div>
            // }
          },
          {
            accessorKey: "Name",
            header: "Name",
          },
        
 
          {
            accessorKey: "Date",
            header: "Date",
            Cell:({cell})=>{
              let date=cell.getValue();
            //   console.log(date.split("T")[0]);
              return <div>{date?.split(" ")[0]}</div>
            },
            filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
          },
          {
            accessorKey: "Time",
            header: "Time",
            // Cell:({cell})=>{
            //   let date=cell.getValue();
            // //   console.log(date.split("T")[0]);
            //   return <div>{date?.split("T")[0]}</div>
            // },
            filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
          },
       
         
         
      
        ],
        []
      );





    const columns2 = useMemo(
        () => [
          // {
          //   accessorKey: "UserID",
          //   header: "User ID",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "User ID" },
            
          // },
          {
            accessorKey: "ClinicName",
            header: "Branch Name",
            // Cell:({cell})=>{
            //   let imurl=cell.getValue();

            //   return <div>{<img src={imurl?imurl:"https://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"} width={150} height={150}/>}</div>
            // }
          },
          {
            accessorKey: "Name",
            header: "Name",
          },
         
        
        
          {
            accessorKey: "Date",
            header: "Date",
            Cell:({cell})=>{
              let date=cell.getValue();
              return <div>{date?.split(" ")[0]}</div>
            },
            filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
          },
     
         
      
        ],
        []
      );





    const columns3 = useMemo(
        () => [
          // {
          //   accessorKey: "UserID",
          //   header: "User ID",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "User ID" },
            
          // },
          {
            accessorKey: "ClinicName",
            header: "Clinic Name",
            // Cell:({cell})=>{
            //   let imurl=cell.getValue();

            //   return <div>{<img src={imurl?imurl:"https://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"} width={150} height={150}/>}</div>
            // }
          },
          {
            accessorKey: "Name",
            header: "Name",
          },
 
         
 
          {
            accessorKey: "Date",
            header: "Date",
            Cell:({cell})=>{
              let date=cell.getValue();
              return <div>{date.split(" ")[0]}</div>
            },
            filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
          },
 
         
      
        ],
        []
      );
    const columns4 = useMemo(
        () => [
          // {
          //   accessorKey: "UserID",
          //   header: "User ID",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "User ID" },
            
          // },
          {
            accessorKey: "ClinicName",
            header: "Clinic Name",
            // Cell:({cell})=>{
            //   let imurl=cell.getValue();

            //   return <div>{<img src={imurl?imurl:"https://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"} width={150} height={150}/>}</div>
            // }
          },
          {
            accessorKey: "Name",
            header: "Name",
          },
 
         
 
          {
            accessorKey: "Date",
            header: "Date",
            Cell:({cell})=>{
              let date=cell.getValue();
              return <div>{date.split(" ")[0]}</div>
            },
            filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
          },
 
          {
            accessorKey: "InvoiceNo",
            header: "Invoice No",
          },
 
          {
            accessorKey: "ReceivedAmount",
            header: "Received Amount",
          },
         
      
        ],
        []
      );
    
     

      const [parentMenu, setparentMenu] = useState([]);

  const [mainMenu, setmainMenu] = useState([]);

  const [clinicSetting, setclinicSetting] = useState([]);

  const [treatmentMenu, settreatmentMenu] = useState([]);

  const [userSetting, setuserSetting] = useState([]);

  const [lpMenu, setlpMenu] = useState([]);

  const [apmntMenu, setapmntMenu] = useState([]);

  const [reportMenu, setreportMenu] = useState([]);

  const [menuList, setMenuList] = useState([]);

//    let Role=sessionStorage.getItem("RoleId");
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



  const [branches, setbranches] = useState([]);

  const [doctors, setdoctors] = useState([]);
  
  const branchUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetCheckClinicProfile/0/0`;

  const drUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetUserList`;

  
  useEffect(()=>{
    fetch(branchUrl)
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result);
        setbranches(result.Data)
    })
  },[])


  useEffect(()=>{
fetch(drUrl)
.then((res)=>res.json())
.then((result)=>{
console.log(result);
setdoctors(result.Data)
})
  },[])

//   let Total;

//   Total=Colln.reduce((total, payment) => total + parseFloat(payment.AmountPaid), 0);
  return (
   <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="navigBar">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className="sbarbtn"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
           
            <IconButton
              color="inherit"
              aria-label="open drawer"
            
              className="helpbtn me-2"
              
            >
              <HelpOutlineOutlined />
            </IconButton>
            <span style={{ color: "black" }} className="me-3">
              Help
            </span>

            <IconButton
              color="inherit"
              aria-label="open drawer"
             
              className="sbarbtn me-3"
              
            >
              <NotificationsNoneOutlined />
            </IconButton>
            <Button
              id="demo-customized-button"
              aria-controls={op ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={op ? "true" : undefined}
           
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon className="profIcon" />}
              className="profBtn"
            >
              <Avatar alt="Travis Howard" src="/static/images/avatar/1.jpg" />
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={op}
              onClose={handleClose}
            >
                <MenuItem onClick={()=>{
          navigate("/")
        }} disableRipple>
          <MdLogout/>
          Logout
        </MenuItem>
            </StyledMenu>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          className="sideBarcomp"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <img src={logo} alt="" srcset="" className="logoimg mt-2 mb-2" />
            <IconButton onClick={handleDrawerClose} className="closeBtn">
             
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <>
              {parentMenu?.map((parent, i) => {
                return (
                  <>
                    <ListItemButton
                      key={i}
                      onClick={() => {
                         if(parent?.MenuName === "Dashboard"){
                         Role=="1"?navigate("/dashboard"):navigate("/dashboard2")
                        }
                         else if (parent?.MenuName === "Menu") {
                          handleMenuClick();
                        } else if (parent?.MenuName === "Leads/Patients") {
                          handleLpClick();
                        } else if (parent?.MenuName === "Reports") {
                          handleReportClick();
                        } else if (parent?.MenuName === "Appointment") {
                          handleApClick();
                        }
                        else if(parent?.MenuName === "Invoice"){
                          navigate("/invoice")
                        }
                        else if(parent?.MenuName === "Add Patients Treatment"){
                          navigate("/add-treatment")
                        }
                        else if(parent?.MenuName === "Add Collection"){
                          navigate("/add-collection")
                        }
                        else if(parent?.MenuName === "Consultation Invoice"){
                          navigate("/add-consult-inv")
                        }
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={`${
                            parent?.MenuName === "Dashboard"
                              ? dashIcon
                              : parent?.MenuName === "Menu"
                              ? menuIcon
                              : parent?.MenuName === "Leads/Patients"
                              ? lp
                              : parent?.MenuName === "Reports"
                              ? report
                              : parent?.MenuName === "Appointment"
                              ? calendarap
                              : parent?.MenuName === "Invoice"
                              ? invoice
                              : parent?.MenuName === "Add Patients Treatment"
                              ? addTmnt
                              : parent?.MenuName === "Add Collection"
                              ? addColl
                              : parent?.MenuName === "Consultation Invoice"
                              ? invoice
                              :""
                          }`}
                        />
                      </ListItemIcon>
                      <ListItemText primary={parent?.MenuName} />
                      {parent?.MenuName === "Menu" ? (
                        open1 ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : parent?.MenuName === "Leads/Patients" ? (
                        open5 ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : parent?.MenuName === "Reports" ? (
                        open7 ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : parent?.MenuName === "Appointment" ? (
                        open6 ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : (
                        ""
                      )}
                    </ListItemButton>
                    {parent?.MenuName === "Menu" ||
                    parent?.MenuName === "Leads/Patients" ||
                    parent?.MenuName === "Reports" ||
                    parent?.MenuName === "Appointment" ? (
                      <Collapse
                        in={
                          parent?.MenuName === "Menu"
                            ? open1
                            : parent?.MenuName === "Leads/Patients"
                            ? open5
                            : parent?.MenuName === "Reports"
                            ? open7
                            : parent?.MenuName === "Appointment"
                            ? open6
                            : ""
                        }
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {parent?.MenuName === "Menu"
                            ? mainMenu?.map((main, i) => {
                                return (
                                  <>
                                    <ListItemButton
                                      sx={{ pl: 3 }}
                                      onClick={() => {
                                        if (
                                          main?.MenuName === "Clinic Settings"
                                        ) {
                                          handleCsClick();
                                        } else if (
                                          main?.MenuName === "User Settings"
                                        ) {
                                          handleUserClick();
                                        }
                                      }}
                                    >
                                      <ListItemIcon>
                                        <img src={`${main?.MenuName === "Clinic Settings"?cliGearIcon:main?.MenuName === "User Settings"?userGearIcon:""}`} alt="" srcset="" />
                                      </ListItemIcon>

                                      <ListItemText primary={main?.MenuName} />
                                      {main?.MenuName === "Clinic Settings" ? (
                                        open2 ? (
                                          <ExpandLess />
                                        ) : (
                                          <ExpandMore />
                                        )
                                      ) : main?.MenuName === "User Settings" ? (
                                        open4 ? (
                                          <ExpandLess />
                                        ) : (
                                          <ExpandMore />
                                        )
                                      ) : (
                                        ""
                                      )}
                                    </ListItemButton>

                                    {main?.MenuName === "Clinic Settings" ||
                                    main?.MenuName === "User Settings" ? (
                                      <Collapse
                                        in={
                                          main?.MenuName === "Clinic Settings"
                                            ? open2
                                            : main?.MenuName === "User Settings"
                                            ? open4
                                            : ""
                                        }
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        <List component="div" disablePadding>
                                          {main?.MenuName === "Clinic Settings"
                                            ? clinicSetting?.map((cs, i) => {
                                                return (
                                                  <>
                                                    <ListItemButton
                                                      sx={{ pl: 4 }}
                                                      onClick={() => {
                                                        if (
                                                          cs?.MenuName ===
                                                          "Treatment"
                                                        ) {
                                                          handleTreatClick();
                                                        }
                                                        else if(cs?.MenuName==="Branch"){
                                                          navigate("/branch")
                                                        }
                                                        else if(cs?.MenuName==="LeadSource"){
                                                          navigate("/lead-srcs")
                                                        }
                                                      }}
                                                    >
                                                      <ListItemIcon>
                                                        {/* <img src="" alt="" srcset="" /> */}
                                                      </ListItemIcon>

                                                      <ListItemText
                                                        primary={cs?.MenuName}
                                                      />

                                                      {cs?.MenuName ===
                                                      "Treatment" ? (
                                                        open3 ? (
                                                          <ExpandLess />
                                                        ) : (
                                                          <ExpandMore />
                                                        )
                                                      ) : (
                                                        ""
                                                      )}
                                                    </ListItemButton>
                                                    {cs?.MenuName ==
                                                    "Treatment" ? (
                                                      <Collapse
                                                        in={
                                                          cs?.MenuName ===
                                                          "Treatment"
                                                            ? open3
                                                            : ""
                                                        }
                                                        timeout="auto"
                                                        unmountOnExit
                                                      >
                                                        <List
                                                          component="div"
                                                          disablePadding
                                                        >
                                                          {cs?.MenuName ===
                                                          "Treatment"
                                                            ? treatmentMenu?.map(
                                                                (treat, i) => {
                                                                  return (
                                                                    <>
                                                                      <ListItemButton
                                                                        sx={{
                                                                          pl: 4,
                                                                        }}

                                                                        onClick={()=>{
                                                                          if(treat?.MenuName==="Skin and Laser"){
                                                                            navigate("/s&l")
                                                                          }
                                                                          else if(treat?.MenuName==="Weight Loss"){
                                                                            navigate("/wl")
                                                                          }
                                                                          else if(treat?.MenuName==="Hair"){
                                                                            navigate("/ht")
                                                                          }
                                                                          else if(treat?.MenuName==="Homeopathy"){
                                                                            navigate("/homeopathy")
                                                                          }
                                                                        }}
                                                                      >
                                                                        <ListItemIcon>
                                                                          {/* <img src="" alt="" srcset="" /> */}
                                                                        </ListItemIcon>

                                                                        <ListItemText
                                                                          primary={
                                                                            treat?.MenuName
                                                                          }
                                                                        />
                                                                      </ListItemButton>
                                                                    </>
                                                                  );
                                                                }
                                                              )
                                                            : ""}
                                                        </List>
                                                      </Collapse>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </>
                                                );
                                              })
                                            : main?.MenuName === "User Settings"
                                            ? userSetting?.map((user, i) => {
                                                return (
                                                  <>
                                                    <ListItemButton
                                                      sx={{ pl: 4 }}
                                                      onClick={()=>{
                                                        if(user?.MenuName==="Role"){
                                                          navigate("/role")
                                                        }
                                                        else if(user?.MenuName==="Access Permission"){
                                                          navigate("/access-perm")
                                                        }
                                                        else if(user?.MenuName==="Doctor Registration"){
                                                          navigate("/dr-reg")
                                                        }
                                                        else if(user?.MenuName==="Employee Registration"){
                                                          navigate("/emp-reg")
                                                        }
                                                      }}
                                                    >
                                                      <ListItemIcon>
                                                        {/* <img src="" alt="" srcset="" /> */}
                                                      </ListItemIcon>

                                                      <ListItemText
                                                        primary={user?.MenuName}
                                                      />
                                                    </ListItemButton>
                                                  </>
                                                );
                                              })
                                            : ""}
                                        </List>
                                      </Collapse>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })
                            : parent?.MenuName === "Leads/Patients"
                            ? lpMenu?.map((lp, i) => {
                                return (
                                  <>
                                    <ListItemButton sx={{ pl: 3 }} onClick={()=>{
                                      if(lp?.MenuName==="Lead Entry"){
                                        navigate("/enquiries")
                                      }
                                      else if(lp?.MenuName==="FollowUp Entry"){
                                        navigate("/fup-entries")
                                      }
                                      else if(lp?.MenuName==="Patients/Customers"){
                                        navigate("/patients")
                                      }
                                      else if(lp?.MenuName==="Upload Leads"){
                                        navigate("/up-leads")
                                      }
                                    }}>
                                      <ListItemIcon>
                                        {/* <img src={cliGearIcon} alt="" srcset="" /> */}
                                      </ListItemIcon>

                                      <ListItemText primary={lp?.MenuName} />
                                      {/* {open5 ? <ExpandLess /> : <ExpandMore />} */}
                                    </ListItemButton>
                                  </>
                                );
                              })
                            : parent?.MenuName === "Reports"
                            ? reportMenu?.map((rpt, i) => {
                                return (
                                  <>
                                     <ListItemButton sx={{ pl: 3 }} onClick={()=>{
                                     if(rpt?.MenuName==="Enquiry To Patient Conversions"){
                                        navigate("/e2p")
                                      }
                                      else if(rpt?.MenuName==="Patients Treatment"){
                                        navigate("/pntdtl")
                                      }
                                      else if(rpt?.MenuName==="Clinic Wise Collection"){
                                        navigate("/clinic-collection")
                                      }
                                      else if(rpt?.MenuName==="Doctor Wise Collection"){
                                        navigate("/doctor-collection")
                                      }
                                      else if(rpt?.MenuName==="Patient Wise Collection"){
                                        navigate("/patient-collection")
                                      }
                                      else if(rpt?.MenuName==="Leadsource Wise Enquiries"){
                                        navigate("/lsrc")
                                      }
                                      else if(rpt?.MenuName==="Consultation Report"){
                                        navigate("/consult-rpt")
                                      }
                                      else if(rpt?.MenuName==="Invoice Report"){
                                        navigate("/inv-rpt")
                                      }
                                      else if(rpt?.MenuName==="Collection Report"){
                                        navigate("/clln-rpt")
                                      }
                                      else if(rpt?.MenuName==="Activity Report"){
                                        navigate("/activity-rpt")
                                      }
                                      else if(rpt?.MenuName==="Appointment Cancellation Report"){
                                        navigate("/cancelled-apmnt")
                                      }
                                    }}>
                                      <ListItemIcon>
                                        {/* <img src={cliGearIcon} alt="" srcset="" /> */}
                                      </ListItemIcon>

                                      <ListItemText primary={rpt?.MenuName} />
                                      {/* {open7 ? <ExpandLess /> : <ExpandMore />} */}
                                    </ListItemButton>
                                  </>
                                );
                              })
                            : parent?.MenuName === "Appointment"
                            ? apmntMenu?.map((apmnt, i) => {
                                return (
                                  <>
                                    <ListItemButton sx={{ pl: 3 }} onClick={()=>{
                                      if(apmnt?.MenuName==="Book Appointment"){
                                        navigate("/appmnt")
                                      }
                                      else if(apmnt?.MenuName==="View Appointment"){
                                        navigate("/view-apmt")
                                      }
                                    }}>
                                      <ListItemIcon>
                                        {/* <img src={cliGearIcon} alt="" srcset="" /> */}
                                      </ListItemIcon>

                                      <ListItemText primary={apmnt?.MenuName} />
                                      {/* {open7 ? <ExpandLess /> : <ExpandMore />} */}
                                    </ListItemButton>
                                  </>
                                );
                              })
                            : ""}
                        </List>
                      </Collapse>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </>
          </List>
          {/* <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Drawer>
      <Main open={open}>
        <DrawerHeader />
       <Card className="m-1 mt-3 emp-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">Activity Report</p>
            <hr />
<Row>
    <Col>
    <Form.Group className="mb-3">
        <Form.Label>Clinic Name</Form.Label>
        <Form.Select name='branch' onChange={handleDates}>
          <option></option>
          {
                branches?.map((branch,i)=>{
                    return(
                        <>
                        <option value={branch?.ClinicID}>{branch?.ClinicName}</option>
                        </>
                    )
                })
            }
        </Form.Select>
      </Form.Group>
    </Col>
    <Col>
    <Form.Group className="mb-3">
        <Form.Label>Doctor Name</Form.Label>
        <Form.Select name='doctor' onChange={handleDates}>
          <option></option>
          {
                doctors?.map((dr,i)=>{
                    return(
                        <>
                        <option value={dr?.UserID}>{dr?.Name}</option>
                        </>
                    )
                })
            }

        </Form.Select>
      </Form.Group>
    </Col>
    <Col>
    <Form.Group className="mb-3">
        <Form.Label>From date</Form.Label>
        <Form.Control type='date' name="startDate" value={datedata?.startDate} placeholder="" onChange={handleDates}  />
      </Form.Group>
    </Col>
    <Col>
    <Form.Group className="mb-3">
        <Form.Label>To date</Form.Label>
        <Form.Control type='date' placeholder="" name="endDate" value={datedata?.endDate}  onChange={handleDates}/>
      </Form.Group>
    </Col>
    <Col className='pt-3'>
  <Button variant='' className='rptBtn mt-4' onClick={(e)=>{
        e.preventDefault();

        const datefiltered=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetActivity/${datedata?.startDate?datedata?.startDate:0}/${datedata?.endDate?datedata?.endDate:0}/${datedata?.doctor?datedata?.doctor:0}/${datedata?.branch?datedata?.branch:0}/${User}`
        fetch(datefiltered)
        .then((res)=>res.json())
        .then((geteRes)=>{
          console.log(geteRes.Data);
          setAppointments(geteRes.ActivityAppointments);
          setEnquiries(geteRes.ActivityEnquiries);
          setFollowups(geteRes.ActivityFollowups);

          setconsultInvoice(geteRes.ActivityConsultInvoice);
        })

      }}>Search</Button>
    </Col>
</Row>


            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className='mt-5'>
        <Col>
          <Nav variant="pills" className="" style={{whiteSpace:"nowrap"}}>
            <Nav.Item>
              <Nav.Link eventKey="first" style={{color:"black"}}>Appointments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" style={{color:"black"}}>Enquiries</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Third" style={{color:"black"}}>Followups</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Fourth" style={{color:"black"}}>Consultation Invoices</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        </Row>
        <Row>
        <Col>
          <Tab.Content>
            <Tab.Pane eventKey="first">
    <MaterialReactTable
                  columns={columns1}
                  data={appointments}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  // enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  // renderRowActions={({ row, table }) => (
                  //   <Box sx={{ display: "flex", gap: "1rem" }}>
                  //     <Tooltip arrow placement="left" title="Edit">
                  //       <IconButton 
                  //       className="edit-btn"
                  //       onClick={() => table.setEditingRow(row)}
                  //       disabled
                  //       >
                  //         <FaRegEdit/>
                  //       </IconButton>
                  //     </Tooltip>
                  //     <Tooltip arrow placement="right" title="Delete">
                  //       <IconButton
                  //         color="error"
                  //         // onClick={() => handleDeleteRow(row)}
                  //       disabled

                  //       >
                  //         <HiOutlineTrash/>
                  //       </IconButton>
                  //     </Tooltip>
                  //   </Box>
                  // )}
                 



                  positionActionsColumn="last"
                
                />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <MaterialReactTable
                  columns={columns2}
                  data={enquiries}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  // enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  // renderRowActions={({ row, table }) => (
                  //   <Box sx={{ display: "flex", gap: "1rem" }}>
                  //     <Tooltip arrow placement="left" title="Edit">
                  //       <IconButton 
                  //       className="edit-btn"
                  //       onClick={() => table.setEditingRow(row)}
                  //       disabled
                  //       >
                  //         <FaRegEdit/>
                  //       </IconButton>
                  //     </Tooltip>
                  //     <Tooltip arrow placement="right" title="Delete">
                  //       <IconButton
                  //         color="error"
                  //         // onClick={() => handleDeleteRow(row)}
                  //       disabled

                  //       >
                  //         <HiOutlineTrash/>
                  //       </IconButton>
                  //     </Tooltip>
                  //   </Box>
                  // )}
                 



                  positionActionsColumn="last"
                
                />
            </Tab.Pane>
            <Tab.Pane eventKey="Third">
            <MaterialReactTable
                  columns={columns3}
                  data={followups}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  // enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  // renderRowActions={({ row, table }) => (
                  //   <Box sx={{ display: "flex", gap: "1rem" }}>
                  //     <Tooltip arrow placement="left" title="Edit">
                  //       <IconButton 
                  //       className="edit-btn"
                  //       onClick={() => table.setEditingRow(row)}
                  //       disabled
                  //       >
                  //         <FaRegEdit/>
                  //       </IconButton>
                  //     </Tooltip>
                  //     <Tooltip arrow placement="right" title="Delete">
                  //       <IconButton
                  //         color="error"
                  //         // onClick={() => handleDeleteRow(row)}
                  //       disabled

                  //       >
                  //         <HiOutlineTrash/>
                  //       </IconButton>
                  //     </Tooltip>
                  //   </Box>
                  // )}
                 



                  positionActionsColumn="last"
                
                />
            </Tab.Pane>
            <Tab.Pane eventKey="Fourth">
            <MaterialReactTable
                  columns={columns4}
                  data={consultInvoice}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  renderRowActions={({ cell,row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Tooltip arrow placement="left" title="View">
                        <IconButton 
                        className="view-btn"
                        onClick={() => {
                            let invNo=cell.row.original.InvoiceNo;
                            let enqId=cell.row.original.ID;

                            sessionStorage.setItem("consultInvNo",invNo);
                            sessionStorage.setItem("consultEnqId",enqId)


                            navigate("/consult-view-inv")
                        }}
                        
                        >
                          <AiOutlineEye/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          className="delete-btn"
                          onClick={(e) => {
                                 setdelData((pre)=>{
                                    return{
                                        ...pre,
                                        InvoiceTid:cell.row.original.InvoiceTid
                                    }
                                })

                                console.log(cell.row.original.InvoiceTid);

                                handleShow();
                          }}
                        

                        >
                          <HiOutlineTrash/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                 



                  positionActionsColumn="last"
                
                />




                
<Modal show={show} onHide={handleCloseDel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this Invoice?</Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleCloseDel}>
            No
          </Button>
          <Button variant="" onClick={(e)=>{
e.preventDefault();

const delUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/DeleteInvoice`;



fetch(delUrl,{
    method:"POST",
    headers:{
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(delData)
  }).then((res)=>res.json())
  .then((result)=>{
    console.log(result);

    if(result.Status===true){
        Swal.fire({
            icon:"success",
            title:"Deleted successfully!"
        })
        
        window.location.reload();
    }
    else{
        Swal.fire({
            icon:"error",
            title:"Something went wrong!"
        })
    }
  })
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        



            </Col>
        </Row>
       </Card>
      </Main>
    </Box>
   </>
  )
}

export default ActivityReport