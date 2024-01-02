import React,{useState,useMemo,useEffect} from "react";
import "../../Styles/Menu/Leads/Patients.css";
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
import invoice from "../../Assets/invoice.png";

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

import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
import cnslt from "../../Assets/consultation.png";
import Swal from "sweetalert2";
import { CSVLink, CSVDownload } from "react-csv";
import { LiaDownloadSolid } from "react-icons/lia";
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


function Patients(){
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


    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
  
    const [deletePatient, setdeletePatient] = useState({
      PatientID:""
    })

    let UserId=sessionStorage.getItem("UserId");

    const [patients, setPatients] = useState([]);

    const pUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientList/${UserId}`;
    
    useEffect(()=>{
       fetch(pUrl)
       .then((res)=>res.json())
       .then((pnt)=>{
        console.log(pnt?.Data);
        setPatients(pnt?.Data);

       })
    },[])


    const columns = useMemo(
        () => [
          
          {
            accessorKey: "PatientID",
            header: "Patient ID",
          },
         
          {
            accessorKey: "FormNo",
            header: "Form No.",
          },
          {
            accessorKey: "Name",
            header: "Name",
          },
          {
            accessorKey: "Mobile",
            header: "Mobile Number",
          },
          {
            accessorKey: "RegistrationDate",
            header: "Reg Date",
            Cell:({cell})=>{
              let date=cell.getValue();
              return <div>{date.split(" ")[0]}</div>
            },
            filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
            // filterVariant:"range",
            // filterFn:"betweenInclusive" works for date range
           
          },
          {
            accessorKey: "ClinicName",
            header: "Clinic",
           
          },
         

       
        ],
        []
      );
    
      const [data,setData] = useState([
       
          {
            srNo: 1,
            // enquiry: "001",
            patientNo:"PT00001",
            formNo:"0001",
            name:"Sneha Gaikwad",
            mobileNumber:"95261663263",
            regDate:"16/02/2023",
            clinic:"Borivali",
           
           
          },
          {
            srNo: 2,
            // enquiry: "002",
            patientNo:"PT00002",
            formNo:"0002",
            name:"Sayali Palshetkar",
            mobileNumber:"95261663263",
            regDate:"16/02/2023",
            clinic:"Malad",
            
            
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
    return(
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
       <Card className="m-1 mt-3 fup-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">Patients/Customers</p>
            <hr />

            {/* <Row className="p-5">
                <Col>
                <p className="text-center hpathy-nodata mb-1">No Data available</p>
                <p className="text-center hpathy-add-t">Click on add new to add treatments</p>

                    <Row className="text-center mt-5">
                        <Col>
                        
                <Button variant="" className="hpathy-btn">Add New</Button>
                        </Col>
                    </Row>
                </Col>
            </Row> */}

<div className='d-flex justify-content-between m-2'>
  <CSVLink data={patients} style={{textDecoration:"none",color:"white",backgroundColor:"green",borderRadius:"5px"}} className='p-2'><LiaDownloadSolid fontSize={25}/>Excel</CSVLink>
  {/* <p className='text-end'><b>Total :</b>{Total}</p> */}
</div>

            <MaterialReactTable
                  columns={columns}
                  data={patients}
                  
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                    
                  }}
                  // enableRowNumbers="original"

                  enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  renderRowActions={({cell, row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>


<Tooltip arrow placement="left" title="Consultations">
                        <IconButton 
                        className="consultn-btn"
                       
                        onClick={() => {
                          let patientId = cell.row.original.PatientID;
                        let formNo= cell.row.original.FormNo;
                        let mobileNo= cell.row.original.Mobile;
                        let name=cell.row.original.Name;
                        let regDate=cell.row.original.RegistrationDate;
                        let clinic=cell.row.original.ClinicName;

                        sessionStorage.setItem("pntID",patientId);
                        sessionStorage.setItem("formNo",formNo);
                        sessionStorage.setItem("mobile",mobileNo);
                        sessionStorage.setItem("pntName",name);
                        sessionStorage.setItem("regDate",regDate);
                        sessionStorage.setItem("clinicName",clinic);
                          console.log(cell.row.original.PatientID);
                          navigate(`/consultations/${patientId}`)
                        }}
                        >
                          <img src={cnslt} alt="" srcset="" />
                        </IconButton>
                      </Tooltip>



                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton 
                        className="edit-btn"
                        onClick={() => {
                          let pntID = cell.row.original.PatientID;
                          sessionStorage.setItem("Editpnt", pntID);
                          console.log(cell.row.original.PatientID);
                          navigate(`/edit-pnt/${pntID}`)
                        }}
                        
                        >
                          <FaRegEdit/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="View">
                        <IconButton
                          color=""
                          className="view-btn"
                          onClick={() => {
                            let patientId = cell.row.original.PatientID;
                            sessionStorage.setItem("viewpnt", patientId);
                            console.log(cell.row.original.PatientID);
                            navigate(`/view-p/${patientId}`)
                          }}
                        >
                          <AiOutlineEye/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="left" title="Delete">
                        <IconButton 
                        className=""
                        color="error"
                        onClick={() => {
                          setdeletePatient((pre)=>{
                            return{
                              ...pre,

                              PatientID:cell.row.original.PatientID
                            }
                          }
                            );
                          handleShowModal();
                        }}

                        >
                          <HiOutlineTrash/>
                        </IconButton>
                      </Tooltip>

                      
                    </Box>
                  )}
                  renderTopToolbarCustomActions={() => (
                    <>
                    <Button
                      // color="secondary"
                      className="add-pc-btn"
                      onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        navigate("/p-cvrt")
                      
                      }}
                      variant="contained"
                    >
                     Add New Patient/Customer
                    </Button>




{/* <Button
                      // color="secondary"
                      className="up-btn mx-2"
                      onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        // navigate("/add-access")
                      
                      }}
                      variant="contained"
                    >
                     Upload Excel <SiMicrosoftexcel color="#33c481" className="mx-2 mx-lg-2 exl" fontSize={20}/>
                    </Button> */}
                    </>
                  )}
                  positionActionsColumn="last"
                
                />

<Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this patient?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={(e)=>{
            e.preventDefault();

            const url=`https://reviveapplication.com/ReviveAPI/Revive.svc/DeletePatient`;

            fetch(url,{
              method:"POST",
              headers:{
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(deletePatient)
            })
            .then((res)=>res.json())
            .then((result)=>{
              console.log(result);

              if(result.Status===true){
                Swal.fire({
                  icon:"success",
                  title:`${result.Message}`
                })
                // handleCloseModal();

                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
              else{
                Swal.fire({
                  icon:"error",
                  title:`${result.Message}`
                })
              }
            })
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

            </Col>
        </Row>
       </Card>
      </Main>
    </Box>
        </>
    );
}

export default Patients;