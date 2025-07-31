import React,{useState,useEffect,useMemo} from 'react';
import "../Styles/ConsultationHistory.css";
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
import "./../Components/Sidebar.css";
import logo from "./../Assets/logo.png";
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
import { Card, Col, Row, Modal, Form, Table, Tabs, Tab,Spinner,InputGroup } from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import { FaCheckCircle, FaEye, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import dashIcon from "./../Assets/Dashboard.png";
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import menuIcon from "./../Assets/Vector.png";
import gearIcon from "./../Assets/gear.png";
import userGearIcon from "./../Assets/userGear.png";
import cliGearIcon from "./../Assets/cset.png";
import lp from "./../Assets/lp.png";
import report from "./../Assets/reports.png";
import calendarap from "../Assets/calendar.png";

import { MdLogout } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import invoice from "./../Assets/invoice.png";
import addTmnt from "./../Assets/addtmt.png";
import addColl from "./../Assets/addcoln.png";
import { AiOutlineEye } from "react-icons/ai";
import Sidebar from '../Components/Sidebar';

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

function ConsultationHistory() {
    const navigate=useNavigate();
let pntID=sessionStorage.getItem("pntID");

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


    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
  

//   const [pntdtl, setPntDtl] = useState([]);

//   const getpntDtlUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientTreatmentDetails/4`;
// useEffect(()=>{
//   fetch(getpntDtlUrl)
//   .then((res)=>res.json())
//   .then((geteRes)=>{
//     console.log(geteRes.Data);
//     setPntDtl(geteRes.Data)
//   })
// },[])
const [consultations, setConsultations] = useState([])

const url=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetConsultationHistory/${pntID}`;

useEffect(()=>{
fetch(url)
.then((res)=>res.json())
.then((result)=>{
  console.log(result);
  setConsultations(result.Data)
})
},[])

const columns = useMemo(
    () => [
      // {
      //   accessorKey: "UserID",
      //   header: "User ID",
      //   muiTableHeadCellFilterTextFieldProps: { placeholder: "User ID" },
        
      // },
      {
        accessorKey: "Treatment",
        header: "Treatment Name",
        // Cell:({cell})=>{
        //   let imurl=cell.getValue();

        //   return <div>{<img src={imurl?imurl:"https://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"} width={150} height={150}/>}</div>
        // }
      },
      {
        accessorKey: "TreatmentDetails",
        header: "Treatment Details",
      },
      {
        accessorKey: "Measurement",
        header: "Measurement Taken?",
      },
      {
        accessorKey: "Date",
        header: "Date",
      },
      {
        accessorKey: "Remarks",
        header: "Remarks",
      },
      {
        accessorKey: "Status",
        header: "Status",
      },
     
    //   {
    //     accessorKey: "PendingAmount",
    //     header: "Pending Amount",
    //     // Cell:({cell})=>{
    //     //   let date=cell.getValue();
    //     //   return <div>{date.split(" ")[0]}</div>
    //     // }
    //   },
     
  
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

  const [show, setShow] = useState(false);

  const handleCloseDel = () => setShow(false);
  const handleShow = () => setShow(true);

  const [delData, setdelData] = useState({
    ConsultationID:"",
    UserID:sessionStorage.getItem('UserId')

  })



  return (
    <>
   <Sidebar>
   <Card className="m-1 mt-3 emp-crd p-3">
        <Row>
            <Col>
            <Row>
              <Col>
            <p className="ap-t">Consultation History</p>
              
              </Col>
             
            </Row>
            <hr />

           

        


 <MaterialReactTable
                  columns={columns}
                  data={consultations}
                  initialState={{ showColumnFilters: true }} 
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  enableEditing
                
                  renderRowActions={({cell, row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                     <Tooltip arrow placement="left" title="view">
                        <IconButton 
                        className="view-btn"
                        onClick={() =>
                          {
                            let consultId = cell.row.original.ConsultationID;
                            sessionStorage.setItem("consltID", consultId);
                            console.log(cell.row.original.ConsultationID);
                            navigate(`/view-consult-hst/${consultId}`)
                          }
                          }>
                          <AiOutlineEye/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Edit">
                      <IconButton
                        color="primary" // You can adjust the color as needed
                        className="edit-btn"
                        onClick={(e) => {
                          let consultId = cell.row.original.ConsultationID;
                          sessionStorage.setItem("consltID", consultId);
                          console.log(cell.row.original.ConsultationID);
                          navigate(`/consult-edt/${consultId}`)
                        }}
                      >
                        {/* You can replace the icon with your desired edit icon */}
                        <HiPencilAlt />
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
                                  ConsultationID: cell.row.original.ConsultationID
                                }
                              });

                              console.log(cell.row.original.ConsultationID);

                              handleShow();
                            }}
                          >
                            <HiOutlineTrash/>
                          </IconButton>
                        </Tooltip>
                      {/* <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          disabled
                    
                        >
                          <HiOutlineTrash/>
                        </IconButton>
                      </Tooltip> */}
                    </Box>
                  )}
                //   renderTopToolbarCustomActions={() => (
                //     <Button
         
                //       className="add-btn"
                //       onClick={() => {setCreateModalOpen(true);
                //         navigate("/add-branch")
                      
                //       }}
                //       variant="contained"
                //     >
                //       Add New Branch
                //     </Button>
                //   )}
                  positionActionsColumn="last"
                />

<Modal show={show} onHide={handleCloseDel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this Consultation?</Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleCloseDel}>
            No
          </Button>
          <Button variant="" onClick={(e)=>{
e.preventDefault();

const delUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/DeleteConsultation`;



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

            </Col>
        </Row>
       </Card>
   </Sidebar>
    </>
  )
}

export default ConsultationHistory