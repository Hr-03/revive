import React,{useState,useMemo,useEffect} from "react";
import "../../Styles/Menu/Appointment/BookAppointment.css";
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


function BookAppointment(){

  
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

const [bookingList, setBookingList] = useState([]);

let enquiry=document.getElementById("enq");
let patient=document.getElementById("pnt");



let Role=sessionStorage.getItem("RoleId");

let User=Role==="1"?0:sessionStorage.getItem("UserId")

const enqbUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetAppointmentList/0/${User}/0`;

const enq=()=>{
  if(enquiry?.checked){
  

    fetch(enqbUrl)
    .then((res)=>res.json())
    .then((enqs)=>{
      console.log(enqs.Data);
      setBookingList(enqs.Data);
    })
      
    }
}



const pntbUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetAppointmentList/1/${User}/0`;


const pnt=()=>{
  if(patient?.checked){

    fetch(pntbUrl)
    .then((res)=>res.json())
    .then((pnts)=>{
      console.log(pnts.Data);
      setBookingList(pnts.Data);
    })
  }
}


// useEffect(()=>{
// enq();
// })

// useEffect(()=>{
// pnt();
// })


    const columns = useMemo(
        () => [
          // {
          //   accessorKey: "srNo",
          //   header: "Sr No.",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
          //   Cell:({cell})=>{
          //     cell=0;
          //     return <div>{ce}</div>
          //   }
            
          // },
        //   {
        //     accessorKey: "enquiry",
        //     header: "Enquiry No.",
        //   },
          {
            accessorKey: "EnquiryID",
            header: "Enquiry ID",
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
            accessorKey: "Date",
            header: "Date",
            Cell:({cell})=>{
              let aDate=cell.getValue();
              return <div>{aDate.split(" ")[0]}</div>
            }
          },
        //   {
        //     accessorKey: "action",
        //     header: "Action",
        //     Cell:({cell})=>{
        //         // let a=cell.getValue();
        //         return(
        //         // a==="unChecked"?<img src="https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-cross-icon-flat-style-png-image_1811243.jpg" alt="" srcset="" width={50}/>:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>
        //     <>
        //     <Button variant="" className="book-btn">Book</Button>
        //     </>
        //         )  
        //             }
        //   },
          
       
        ],
        []
      );
    
      const [data,setData] = useState([
       
          {
            srNo: 1,
            // enquiry: "001",
            enquiryNo:"10 Feb 2022",
            name:"Call",
            mobileNumber:"xyz",
            date:"Follow Up",
            // followupBy:"Dr. Pankti",
           
           
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
    
      //  let Role=sessionStorage.getItem("RoleId");
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
        <Sidebar>
        <Card className="m-1 mt-3 fup-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">Book Appointment</p>
            
            <hr />

           

            <Row>
                <Col>
                
            <MaterialReactTable
                  columns={columns}
                  data={bookingList}
                  
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                    
                  }}
                  enableEditing
                //   onEditingRowSave={handleSaveRowEdits}
                //   onEditingRowCancel={handleCancelRowEdits}
                  renderRowActions={({ row, table,cell }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      {/* <Tooltip arrow placement="left" title="Edit"> */}
                        {/* <IconButton 
                        
                        // onClick={() => table.setEditingRow(row)}
                        onClick={() => navigate("/fup-details")}
                        
                        >
                          Book
                        </IconButton> */}


                        <Button variant="" className="book-btn px-5" onClick={()=>{
                          let enqId = cell.row.original.EnquiryID;
                          let mbl = cell.row.original.Mobile;
                          let name = cell.row.original.Name;
                          let dob = cell.row.original.DateOfBirth.split(" ")[0];
                          let gender = cell.row.original.Gender;
                          sessionStorage.setItem("bookEnqId",enqId);
                          sessionStorage.setItem("bookmbl",mbl);
                          sessionStorage.setItem("bookname",name);
                          sessionStorage.setItem("bookDOB",dob);
                          sessionStorage.setItem("bookGender",gender)
                          navigate(`/book-apmt/${enqId}`);
                        }}>Book</Button>
                      {/* </Tooltip> */}
                      {/* <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="info"
                          // onClick={() => handleDeleteRow(row)}
                        >
                          <HiUserAdd/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="left" title="View">
                        <IconButton 
                        className="view-btn"
                        onClick={() => navigate("/view-enquiry")}
                        >
                          <AiOutlineEye/>
                        </IconButton>
                      </Tooltip> */}

                      
                    </Box>
                  )}
                  renderTopToolbarCustomActions={() => (
                    <>

                    <Row>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="apmt" id="enq" label="Enquiry" onChange={()=>enq()}/>
                        </Col>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="apmt" id="pnt" label="Patient" onChange={()=>pnt()}/>
                        </Col>
                    </Row>
                    {/* <Button
                      // color="secondary"
                      className="ap-btn me-auto mx-4"
                      onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        // navigate("/add-entry")
                      
                      }}
                      variant="contained"
                    >
                     Add New 
                    </Button> */}




{/* <Button
                      // color="secondary"
                      className="dr-up-btn mx-2"
                      onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        // navigate("/add-access")
                      
                      }}
                      variant="contained"
                    >
                     Upload Excel <SiMicrosoftexcel color="#33c481" className="mx-2" fontSize={20}/>
                    </Button> */}
                    </>
                  )}
                  positionActionsColumn="last"
                
                />
                </Col>
            </Row>


         


            </Col>
        </Row>
       </Card>
          </Sidebar>
        </>
    );
}

export default BookAppointment;