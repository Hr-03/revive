import React,{useState,useEffect,useMemo} from 'react';
import "../Styles/InvoiceView.css";
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
import "../Components/Sidebar.css";
import logo from "../Assets/logo.png";
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
import { Card, Col, Row ,Modal,Form, Table} from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import {FaCheckCircle, FaRegEdit} from "react-icons/fa";
import {HiOutlineTrash} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import dashIcon from "../Assets/Dashboard.png";
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import menuIcon from "../Assets/Vector.png";
import gearIcon from "../Assets/gear.png";
import userGearIcon from "../Assets/userGear.png";
import cliGearIcon from "../Assets/cset.png";
import lp from "../Assets/lp.png";
import report from "../Assets/reports.png";
import calendarap from "../Assets/calendar.png";

import { MdLogout } from 'react-icons/md';
import { BsDot, BsPlus } from 'react-icons/bs';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import invoice from "../Assets/invoice.png";
import Swal from 'sweetalert2';
import addTmnt from "../Assets/addtmt.png";
import addColl from "../Assets/addcoln.png";
import logonew from "../Assets/logonew.svg"
import ReactToPrint from "react-to-print";

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

function InvoiceView() {
   
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



    let Role=sessionStorage.getItem("RoleId");

    let User=Role==="1"?0:sessionStorage.getItem("UserId")


    const [parentMenu, setparentMenu] = useState([]);

    const [mainMenu, setmainMenu] = useState([]);
  
    const [clinicSetting, setclinicSetting] = useState([]);
  
    const [treatmentMenu, settreatmentMenu] = useState([]);
  
    const [userSetting, setuserSetting] = useState([]);
  
    const [lpMenu, setlpMenu] = useState([]);
  
    const [apmntMenu, setapmntMenu] = useState([]);
  
    const [reportMenu, setreportMenu] = useState([]);
  
    const [menuList, setMenuList] = useState([]);
  
    //  let Role=sessionStorage.getItem("RoleId");
    const menuUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetMenuAccess/${Role}`;
    useEffect(() => {
      fetch(menuUrl)
        .then((res) => res.json())
        .then((list) => {
          console.log(list.Data);
          setMenuList(list.Data);
  
          setparentMenu(list.Data.filter((parent, i) => parent?.Parent === 0));
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

let pntID=sessionStorage.getItem("collectionPatient");

let invNo=sessionStorage.getItem("InvNo");


    const invURl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetInvoiceBill/${invNo}/${pntID}`;

const [invoiceDetails, setinvoiceDetails] = useState([]);

const [paymentModes, setpaymentModes] = useState([])

const [totals, settotals] = useState([])


useEffect(()=>{
fetch(invURl)
.then((res)=>res.json())
.then((result)=>{
  console.log(result.Data[0]);
  setinvoiceDetails(result.Data[0]);
  setpaymentModes(result.Data[0]?.PaymentModeTs[0])
  settotals(result.Data[0]?.TotalTs[0])

})
},[])







const componentRef = React.useRef(null);

const onBeforeGetContentResolve = React.useRef(null);

const [loading, setLoading] = React.useState(false);
const [text, setText] = React.useState("old boring text");

const handleAfterPrint = React.useCallback(() => {
  console.log("`onAfterPrint` called");
}, []);

const handleBeforePrint = React.useCallback(() => {
  console.log("`onBeforePrint` called");
}, []);

const handleOnBeforeGetContent = React.useCallback(() => {
  console.log("`onBeforeGetContent` called");
  setLoading(true);
  setText("Loading new text...");

  return new Promise((resolve) => {
    onBeforeGetContentResolve.current = resolve;

    setTimeout(() => {
      setLoading(false);
      setText("New, Updated Text!");
      resolve();
    }, 2000);
  });
}, [setLoading, setText]);

React.useEffect(() => {
  if (
    text === "New, Updated Text!" &&
    typeof onBeforeGetContentResolve.current === "function"
  ) {
    onBeforeGetContentResolve.current();
  }
}, [onBeforeGetContentResolve.current, text]);

const reactToPrintContent = React.useCallback(() => {
  return componentRef.current;
}, [componentRef.current]);

const reactToPrintTrigger = React.useCallback(() => {
  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
  // to the root node of the returned component as it will be overwritten.

  // Bad: the `onClick` here will be overwritten by `react-to-print`
  // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

  // Good
  return <Button variant='' className='prntBtn mt-2'>Print</Button>;
}, []);



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
        <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      {loading && <p className="indicator">Loading...</p>}
      {/* <ComponentToPrint ref={componentRef} text={text} /> */}

      <div ref={componentRef} text={text}>
       <Card className="m-1 mt-3 ap-crd">
       <Card.Header className='crdH p-5 pt-3 pb-3'>
        <Row>
            <Col className='d-flex'>
            <img src={logonew} alt="" srcset="" className='inv-logo'/>
            <div className='d-block mt-5 p-1'>
                <p className='p-0 m-1'><b>Branch:</b> <span>{invoiceDetails?.Branch}</span></p> 
                <p className='p-0 m-1'><b>Address:</b> <span>{invoiceDetails?.Address}</span></p>
                <p className='p-0 m-1'>{invoiceDetails?.MobileNo}</p>
                <p className='p-0 m-1'>{invoiceDetails?.Email}</p>
            </div>
            </Col>
            <Col className='p-5'>
            <div className='invViewDate'>
                <p className=''><b>Date:</b> <span>{invoiceDetails?.InvoiceDate?.split(" ")[0]}</span></p>
                <p className=''><b>Invoice No:</b> <span>{invoiceDetails?.InvoiceCode}</span></p>
            </div>
            </Col>
        </Row>
       </Card.Header>
       <Card.Body className='p-5'>
          <Row>
            <Col>
            <p className='text-center invT'><u>INVOICE</u></p>

         <Card>
            <Row>
                <Col>
                <div className='p-3'>
                    <p>Billed to,</p>
                    <p><b>{invoiceDetails?.PatientName}</b></p>
                    <p>{invoiceDetails?.Gender}, {invoiceDetails?.Age}</p>
                    <p>Patient No.: {invoiceDetails?.PatientNo} </p>
                </div>
                </Col>
                <Col>
                <div className='m-5'>
                    <p>{invoiceDetails?.PatientAddress}</p>
                    
                    <p>{invoiceDetails?.PatientMobile}</p>
                </div>
                </Col>
            </Row>
         </Card>


         <p className='mt-5 mb-0'><b>By Dr. {invoiceDetails?.DoctorName}</b></p>
         

         <Table responsive>
          <thead className='invTH'>
            <tr>
                <th className='invth'>Sr no.</th>
                <th className='invth'>Treatment</th>
                <th className='invth'>Cost</th>
                <th className='invth'>Discount</th>
                <th className='invth'>Tax</th>
                <th className='invth'>Total Cost</th>
            </tr>
          </thead>

          <tbody className='invTB'>
            {
              invoiceDetails?.TreatmentTs?.map((t,i)=>{
                return(
                  <>
                   <tr>
                <td className='invtd'>{i+1}</td>
                <td className='invtd'>{t?.Treatment}</td>
                <td className='invtd'>{t?.Cost}</td>
                <td className='invtd'>{t?.Discount}</td>
                <td className='invtd'>{t?.Tax}</td>
                <td className='invtd'>{t?.TotalCost}</td>
            </tr>
                  </>
                )
              })
            }
           
          
          </tbody>
         </Table>

<Row className='mt-4'>
    <Col md={6}>
    </Col>
    <Col md={6}>
    
         <Card className='p-3'>
            <Row>
                <Col>
                <p>Total</p>
                <p>Discount</p>
                <p>Tax</p>
                <p>Total Amount</p>
                <p>Received Amount</p>
                <p>Balance Amount</p>
                </Col>
                <Col>
                <div style={{float:"right"}}>
                <p>{totals?.Total}</p>
                <p>{totals?.Discount}</p>
                <p>{totals?.TotalTax}</p>
                <p>{totals?.TotalAmount}</p>
                <p>{totals?.ReceivedAmount}</p>
                <p>{totals?.TotalAmount-totals?.ReceivedAmount}</p>
                </div>
                </Col>
            </Row>
         </Card>
    </Col>
</Row>

{
   paymentModes?.PaymentMode!=="Cash"?
<Table responsive className='mt-5'>
          <thead className='invTH'>
            <tr>
                <th className='invth'>Sr no.</th>
                <th className='invth'>Date</th>
                <th className='invth'>Payment Mode</th>
                <th className='invth'>Bank Name</th>
                <th className='invth'>Branch Name</th>
              {paymentModes?.PaymentMode!=="UPI"? "": <th className='invth'>Transaction ID</th>}
              {paymentModes?.PaymentMode!=="UPI"? "":<th className='invth'>UTR No.</th>}
                <th className='invth'>Transaction Date</th>
                <th className='invth'>Grand Total</th>
                <th className='invth'>Received Amount (in ₹) </th>
          
            </tr>
          </thead>

          <tbody className='invTB'>

            {
              invoiceDetails?.PaymentModeTs?.map((p,i)=>{
                return(
                  <>
                   <tr>
                <td className='invtd'>{i+1}</td>
                <td className='invtd'>{p?.Date}</td>
                <td className='invtd'>{p?.PaymentMode}</td>
                <td className='invtd'>{p?.BankName}</td>
                <td className='invtd'>{p?.BranchName}</td>
                {paymentModes?.PaymentMode!=="UPI"? "":<td className='invtd'>{p?.TransactionID}</td>}
                {paymentModes?.PaymentMode!=="UPI"? "":<td className='invtd'>{p?.UTRno}</td>}
                <td className='invtd'>{p?.TransactionDate}</td>
                <td className='invtd'>{p?.GrandTotal}</td>
                <td className='invtd'>{p?.ReceivedAmount}</td>
             
            </tr>
                  </>
                )
              })
            }
           
          
          </tbody>
         </Table>
         :
         <Table responsive className='mt-5'>
          <thead className='invTH'>
            <tr>
              <th className='invth'>Sr no.</th>
              <th className='invth'>Payment Mode</th>
              <th className='invth'>Date</th>
              <th className='invth'>Grand Total</th>
              <th className='invth'>Received Amount</th>
              <th className='invth'>Pending Amount</th>
            </tr>
          </thead>

          <tbody className='invTB'>
            {
              invoiceDetails?.PaymentModeTs?.map((cash,i)=>{
                return(
                  <>
                  <tr>
                    <td className='invtd'>{i+1}</td>
                    <td className='invtd'>{cash?.PaymentMode}</td>
                    <td className='invtd'>{cash?.Date.split(" ")[0]}</td>
                    <td className='invtd'>{cash?.GrandTotal}</td>
                    <td className='invtd'>{cash?.ReceivedAmount}</td>
                    <td className='invtd'>{cash?.GrandTotal-cash?.ReceivedAmount}</td>
                  </tr>
                  </>
                )
              })
            }
          </tbody>
         </Table>
}

         <p className='text-end pb-4'><b>Received Amount (in words) </b><span>{totals?.ReceivedAmountInW}</span></p>


         <p className='text-end mt-5 pt-5'><b>Authorized Signatory</b></p>

         <hr  className='mt-3'/>
         <p className='text-center invNoteTxt'><b><u>This is computer generated invoice and hence no signature required</u></b></p>
         <p className='text-center invSuppTxt'>For any questions please contact us at <span style={{color:"#912AD4"}}>09619758202 / 07710056478</span> or email us at <span style={{color:"#912AD4"}}>bhaviktutwala@gmail.com</span> </p>
            </Col>
          </Row>
       </Card.Body>
       </Card>


       <Card className='mt-5 pt-5'>
        <Card.Header as="h4" className='crdH'><p className='text-center crdH2'><u>TERMS & CONDITIONS</u></p></Card.Header>
        <Card.Body>
          <p className='tnc'><BsDot fontSize={25}/> <span>Fees once paid are non-refundable.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Receipt subject to realisation of Cheque.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Payment can be made by Cash/Cheque/Debit Card.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>All the taxes levied/imposed by the state/central government will be to the client accounts.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Package once booked or membership once taken is non transferable under any circumstances and Dr. Pankit's Revive Multispeciality Clinic reserves right to the membership.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Advance amount paid will be valid for a period of 30 calendar days.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Conversion of any package will be entertained under any circumstances and all rights for conversion will be reserved by Dr. Pankit's Revive Multispeciality Clinic.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Validity of the packages will not be extended under any circumstances.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Results and complications are already discussed by the consulting person from the centre and you acknowledge by signing the receipt. Also results may vary from individual to individual.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>Client should not bring any valuable items and articles in the centre premises and Dr. Pankit's Revive Multispeciality Clinic is not responsible for any kind of loss, theft and/or Damage of it's Damage of its member.</span></p>
          <p className='tnc'><BsDot fontSize={25}/> <span>We advise clients to undergo all medical check up with respective speciality before opting for any package. Also Dr. Pankit's Revive Multispeciality Clinic is not responsible for any and or permanent disability or even dealth in the Dr. Pankit's partial/temporary and or permanent disability or even death in the Dr. Pankit's Revive Multispeciality Clinic Premises.</span></p>
         
        </Card.Body>

        <Card.Footer className='crdH'>
          <Row>
            <Col>
            <p className='invCont pt-2'><u>Mobile: 9619758202</u></p>
            </Col>
            <Col>
            <p className='invCont2 pt-2'>www.drpanktisrevive.com</p>
            </Col>
          </Row>
        </Card.Footer>
       </Card>
       </div>
      </Main>
    </Box>
   
    </>
  )
}

export default InvoiceView