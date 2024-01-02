import React,{useState,useMemo,useEffect} from "react";
import "../../../Styles/Menu/Clinic Settings/Treatments/Homeopathy.css";
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
import "../../../Components/Sidebar.css";
import logo from "../../../Assets/logo.png";
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
import { Card, Col, Row,Modal,Form} from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import {FaRegEdit} from "react-icons/fa";
import {HiOutlineTrash} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import dashIcon from "../../../Assets/Dashboard.png";
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import menuIcon from "../../../Assets/Vector.png";
import gearIcon from "../../../Assets/gear.png";
import userGearIcon from "../../../Assets/userGear.png";
import cliGearIcon from "../../../Assets/cset.png";
import lp from "../../../Assets/lp.png";
import report from "../../../Assets/reports.png";
import calendarap from "../../../Assets/calendar.png";


import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";
import addTmnt from "../../../Assets/addtmt.png";
import invoice from "../../../Assets/invoice.png";

import addColl from "../../../Assets/addcoln.png";
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



function Homeopathy(){
  const [show, setShow] = useState(false);

  const handleMClose = () => setShow(false);
  const handleMShow = () => setShow(true);
  const [show1, setShow1] = useState(false);

  const handleMClose1 = () => setShow1(false);
  const handleMShow1 = () => setShow1(true);



  const [editHomeopathy, setEditHomeopathy] = useState({
    TreatmentID:"",
    Treatment:"",
    CreatedBy:"1",
    IPAddress:"1.1.1.1"
  })


  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [deleteTreatment, setdeleteTreatment] = useState({
    TreatmentID:""
  })

  const handleEditChange=(e)=>{
    const newdata={...editHomeopathy};
    newdata[e.target.name]=e.target.value;
    setEditHomeopathy(newdata);
    console.log(newdata);
}

    const [createModalOpen, setCreateModalOpen] = useState(false);
const navigate=useNavigate();
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


    const [getHp, setGetHp] = useState([]);


    const getHpUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetHomeopathyTreatment`;

    useEffect(()=>{
      fetch(getHpUrl)
      .then((res)=>res.json())
      .then((hpRes)=>{
        console.log(hpRes?.Data);
        setGetHp(hpRes?.Data);

      })
},[])


    const columns = useMemo(
        () => [
          // {
          //   accessorKey: "TreatmentID",
          //   header: "Treatment ID",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "Treatment ID" },
            
          // },
          {
            accessorKey: "Treatment",
            header: "Treatment Name",
          },
        //   {
        //     accessorKey: "address",
        //     header: "Address",
        //   },
        //   {
        //     accessorKey: "location",
        //     header: "Location",
        //   },
        //   {
        //     accessorKey: "phoneNo",
        //     header: "Phone No.",
        //   },
        //   {
        //     accessorKey: "responsiblePerson",
        //     header: "Responsible Person",
        //   },
          // {
          //   accessorKey: 'gender',
          //   header: 'Gender',
          //   filterFn: 'equals',
          //   filterSelectOptions: [
          //     { text: 'Male', value: 'Male' },
          //     { text: 'Female', value: 'Female' },
          //     { text: 'Other', value: 'Other' },
          //   ],
          //   filterVariant: 'select',
          // },
          // {
          //   accessorKey: 'age',
          //   header: 'Age',
          //   filterVariant: 'range',
          // },
          // {
          //   accessorKey: 'actions',
          //   header: 'Actions',
    
          // },
        ],
        []
      );
    
      const data = useMemo(
        () => [
          {
            srNo: 1,
            treatmentName: "Kandivali West",
           
          },
          {
            srNo: 2,
            treatmentName: "malad West",
            
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


  const [hpathy, setHpathy] = useState({
    Treatment:"",
    CreatedBy:"1",
    IPAddress:""
  })

  const handleChange=(e)=>{
    const newdata={...hpathy};
    newdata[e.target.name]=e.target.value;
    setHpathy(newdata);
    console.log(newdata);

  }
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
       <Card className="m-1 mt-3 sl-crd p-3">
        <Row>
            <Col>
            <p className="sl-t">Homeopathy Treatment</p>
            <hr />

            {
              getHp.length>0?
                <>
                <MaterialReactTable
                                columns={columns}
                                data={getHp}
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
                                    <Tooltip arrow placement="left" title="Edit">
                                      <IconButton 
                                      className="edit-btn"
                                      onClick={() => {
                                        console.log(cell.row.original);

                                        setEditHomeopathy((pre)=>{
                                          return{
                                            ...pre,
                                            TreatmentID:cell.row.original.TreatmentID,
                                            Treatment:cell.row.original.Treatment
                                          }
                                        })

                                        handleMShow1();
                                      }}
                        
                                      
                                      >
                                        <FaRegEdit/>
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow placement="right" title="Delete">
                                      <IconButton
                                        color="error"
                                        onClick={() => {
                                          setdeleteTreatment((pre)=>{
                                            return{
                                              ...pre,
              
                                              TreatmentID:cell.row.original.TreatmentID
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
                                  <Button
                                    // color="secondary"
                                    className="addsl-btn"
                                    onClick={() => {handleMShow()
                                      // navigate("/add-branch")
                                    
                                    }}
                                    variant="contained"
                                  >
                                    Add New
                                  </Button>
                                )}
                                positionActionsColumn="last"
                              />


<Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this treatment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={(e)=>{
            e.preventDefault();

            const url=`https://reviveapplication.com/ReviveAPI/Revive.svc/DeleteTreatment`;

            fetch(url,{
              method:"POST",
              headers:{
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(deleteTreatment)
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
              
              
              <Modal show={show} onHide={handleMClose} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>
                        Add New Treatment
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label className="modL">Treatment Name</Form.Label>
                      <Form.Control type="text" name="Treatment" value={hpathy.Treatment} onChange={handleChange} placeholder="Enter treatment name" />
                    </Form.Group>
                            </Col>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="" onClick={handleMClose} className="modCancelBtn me-4">
                        Cancel
                        </Button>
                        <Button variant="" 
                        onClick={()=>{
                          const htUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddTreatmentHomeopathy`;
                          
                          fetch(htUrl,{
                            method:"POST",
                            headers:{
                              Accept: "application/json",
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(hpathy)
                          })
                          .then((res)=>res.json())
                          .then((htRes)=>{
                            console.log(hpathy);
              
                            if(htRes.Status===true){
                              Swal.fire({
                                icon:"success",
                                title:"Treatment added successfully!",
                                timer:2000,
                                showConfirmButton:false
                              })
              
                              setTimeout(() => {
                                window.location.reload();
                              }, 3000);
                            }
                          })
                        }} className="modSaveBtn">
                          Save 
                        </Button>
                      </Modal.Footer>
                    </Modal>

{/* -------------------------------edit---------------------- */}

                    <Modal show={show1} onHide={handleMClose1} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>
                        Add New Treatment
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label className="modL">Treatment Name</Form.Label>
                      <Form.Control type="text" name="Treatment" value={editHomeopathy.Treatment} onChange={handleEditChange} placeholder="" />
                    </Form.Group>
                            </Col>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="" onClick={handleMClose1} className="modCancelBtn me-4">
                        Cancel
                        </Button>
                        <Button variant="" 
                        onClick={()=>{
                          const htUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/EditTreatmentHomeopathy`;
                          
                          fetch(htUrl,{
                            method:"POST",
                            headers:{
                              Accept: "application/json",
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(editHomeopathy)
                          })
                          .then((res)=>res.json())
                          .then((htRes)=>{
                            console.log(hpathy);
              
                            if(htRes.Status===true){
                              Swal.fire({
                                icon:"success",
                                title:"Treatment added successfully!",
                                timer:2000,
                                showConfirmButton:false
                              })
              
                              setTimeout(() => {
                                window.location.reload();
                              }, 3000);
                            }
                          })
                        }} className="modSaveBtn">
                          Save 
                        </Button>
                      </Modal.Footer>
                    </Modal>
                </>
              : 
                <Row className="p-5">
                <Col>
                <p className="text-center hpathy-nodata mb-1">No Data available</p>
                <p className="text-center hpathy-add-t">Click on add new to add treatments</p>

                    <Row className="text-center mt-5">
                        <Col>
                        
                <Button variant="" className="hpathy-btn" onClick={handleMShow}>Add New</Button>

                <Modal show={show} onHide={handleMClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
          Add New Treatment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="modL">Treatment Name</Form.Label>
        <Form.Control type="text" name="Treatment" value={hpathy.Treatment} onChange={handleChange} placeholder="Enter treatment name" />
      </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleMClose} className="modCancelBtn me-4">
          Cancel
          </Button>
          <Button variant=""    onClick={()=>{
            const htUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddTreatmentHomeopathy`;
            
            fetch(htUrl,{
              method:"POST",
              headers:{
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(hpathy)
            })
            .then((res)=>res.json())
            .then((htRes)=>{
              console.log(hpathy);

              if(htRes.Status===true){
                Swal.fire({
                  icon:"success",
                  title:"Treatment added successfully!",
                  timer:2000,
                  showConfirmButton:false
                })

                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            })
          }} className="modSaveBtn">
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
                        </Col>
                    </Row>
                </Col>
            </Row>
              


            }











           

            {/* <MaterialReactTable
                  columns={columns}
                  data={data}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  renderRowActions={({ row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton 
                        className="edit-btn"
                        onClick={() => table.setEditingRow(row)}>
                          <FaRegEdit/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          // onClick={() => handleDeleteRow(row)}
                        >
                          <HiOutlineTrash/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  renderTopToolbarCustomActions={() => (
                    <Button
                      // color="secondary"
                      className="addsl-btn"
                      onClick={() => {setCreateModalOpen(true);
                        // navigate("/add-branch")
                      
                      }}
                      variant="contained"
                    >
                      Add New
                    </Button>
                  )}
                  positionActionsColumn="last"
                /> */}
            </Col>
        </Row>
       </Card>
      </Main>
    </Box>
        </>
    );
}

export default Homeopathy;