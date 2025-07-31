import React,{useEffect,useState,useMemo} from 'react';
import "../Styles/Dashboard.css";
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
import { HelpOutlineOutlined, NotificationsNoneOutlined, SettingsPhone } from "@mui/icons-material";
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

import {CgArrowLongRight} from "react-icons/cg";
import tl from "../Assets/totalLeads.png";
import cl from "../Assets/convertedLeads.png";
import ul from "../Assets/unconvertedLeads.png";
import hl from "../Assets/hotLeads.png";
import drs from "../Assets/doctors.svg";
import emps from "../Assets/employees.svg";
import branches from "../Assets/branch.svg";
import { MdLogout } from 'react-icons/md';
import addTmnt from "../Assets/addtmt.png";
import addColl from "../Assets/addcoln.png";

import tapmt from "../Assets/tdyapmt.svg";
import fups from "../Assets/flups.svg";
import pendingf from "../Assets/pendingfups.svg";

import invoice from "../Assets/invoice.png";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled as sty } from '@mui/material/styles';
import Sidebar from '../Components/Sidebar';

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
  

  const StyledText = sty('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));


  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2} style={{fontSize:"32px",fontWeight:"500"}}>
        {children}
      </StyledText>
    );
  }



function Dashboard2() {

   
  const [datedata, setdatedata] = useState({
    startDate:"",
    endDate:""
  })


  const handleDates=(e)=>{
    const newdata={...datedata};
    newdata[e.target.name]=e.target.value;
    setdatedata(newdata);
    console.log(newdata);
  }

    const [greet, setgreet] = useState("")

    useEffect(()=>{
      var today = new Date()
      var curHr = today.getHours()
      if (curHr < 12) {
        setgreet('Good morning')
       } else if (curHr < 18) {
        setgreet('Good afternoon')
       } else {
        setgreet('Good evening')
       }
    },[])
    
  
    
  
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
  
  
  
      const columns = useMemo(
          () => [
          //   {
          //     accessorKey: "srNo",
          //     header: "Sr No.",
          //     muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
              
          //   },
            {
              accessorKey: "Name",
              header: "Name",
            },
            {
              accessorKey: "EnquiryFor",
              header: "Enquiry For",
            },
            {
              accessorKey: "EnquiryType",
              header: "Enquiry Type",
            },
            {
              accessorKey: "EnquiryDate",
              header: "Enquiry Date",
              Cell:({cell})=>{
                  let ed=cell.getValue()
                  return(
                      <>
                      <div>{ed.split(" ")[0]}</div>
                      </>
                  )
              }
            },
            {
              accessorKey: "MobileNo",
              header: "Mobile No.",
            },
            {
              accessorKey: "SourceType",
              header: "Source",
            },
            {
              accessorKey: "FollowUpDate",
              header: "FollowUp Date",
              Cell:({cell})=>{
                  let fd=cell.getValue()
                  return(
                      <>
                      <div>{fd.split(" ")[0]}</div>
                      </>
                  )
              }
            },
          //   {
          //     accessorKey: "download",
          //     header: "Download",
          //     Cell:({cell})=>{
          //         let a=cell.getValue();
          //         return(
          //         a==="unChecked"?<img src="https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-cross-icon-flat-style-png-image_1811243.jpg" alt="" srcset="" width={50}/>:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>
          //       )          }
          //   },
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
      
        // const [data,setData] = useState([
         
        //     {
        //       srNo: 1,
        //       role: "Admin",
        //       menu:"Clinic Settings",
        //       add:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
        //       edit:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
        //       delete:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
        //       view:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
        //       download:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>
             
        //     },
        //     {
        //       srNo: 2,
        //       role: "Doctor",
        //       menu:"User Settings",
        //       add:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
        //       edit:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
        //       delete:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
        //       view:<img src="https://flyclipart.com/thumb2/x-button-327024.png" width={50}/>,
        //       download:"unChecked"
              
        //     },
           
        //   ],
        //   []
        // );
  
  
  
        const [todaysFollowup, setTodaysFollowup] = useState([]);
  
  
        let Role=sessionStorage.getItem("RoleId");
  
        let User=Role==="1"?0:sessionStorage.getItem("UserId")
  
  
        const tfUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetTodaysFollowupList/${User}`
  
  
        useEffect(()=>{
          fetch(tfUrl)
          .then((res)=>res.json())
          .then((tf)=>{
              console.log(tf.Data);
              setTodaysFollowup(tf.Data);
          })
        },[])
  
  
  
  
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
  
    const [stats, setstats] = useState([]);
  
  
    const [tapmnt, settapmnt] = useState([])
  
    const [tfups, settfups] = useState([])

  const [pendingfups, setpendingfups] = useState([])

    
  const [data, setdata] = useState([]);
  
  
  const [pnt, setpnt] = useState([]);
  
  
  const [clnc, setclnc] = useState([]);
  
  
  const [pendingpups, setpendingpups] = useState([]);


    const statUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetDashboard/${User}/0/0`;
  
    useEffect(()=>{
      fetch(statUrl)
      .then((res)=>res.json())
      .then((result)=>{
        console.log(result);
        setstats(result)
  
  setdata(result.DLeadsSourceDatas)
  
  setpnt(result.DTreatmentCategoryDatas)

  setpendingfups(result.ActivityPendingFollowup)

  setpendingpups(result.ActivityJoinedFollowups)

  setclnc(result.DClinicDatas)
        settapmnt(result?.ActivityAppointments);
        settfups(result?.ActivityFollowups);
  
  
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
  
       
    
      ],
      []
    );
      
    const columns5 = useMemo(
      () => [
        {
          accessorKey: "ClinicName",
          header: "Clinic Name",
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
    
    const size = {
      width: 400,
      height: 250,
    };
    const size1 = {
      width: 300,
      height: 250,
    };
  
    const palette = ['#FF772A', '#6268FC', '#FF00E5','#FC4040','#FFB800'];
    const palette1 = ['#4048FC', '#00AE3B', '#FF759D'];
    const palette2 = ['#FF9B05', '#FA1BFF', '#6827F3','#00AE3B'];
    
  
  
  
    let clncCount=clnc.reduce((accumulator, item) => accumulator + parseInt(item.value), 0);
  
    let pntCount=pnt.reduce((accumulator, item) => accumulator + parseInt(item.value), 0);
  
  return (
    <>
     <Sidebar>
     <Row className="mt-3">
        <Col>
        <div className='d-flex justify-content-between'>
          <p className="userGreet">{greet}</p>

          <div>
          <Row className="mt-4">
          <Col>
          <div className='d-flex flex-wrap'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>From date</Form.Label>
        <Form.Control type="date" name="startDate" value={datedata?.startDate} placeholder="" onChange={handleDates} />
      
      </Form.Group>
      <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
        <Form.Label>To date</Form.Label>
        <Form.Control type="date" name="endDate" value={datedata?.endDate} placeholder="" onChange={handleDates}/>
      
      </Form.Group>
<div className='pt-3'>

      <Button variant='' className='mx-3 rptBtn mt-4' onClick={(e)=>{
        e.preventDefault();

        const datefiltered=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetDashboard/${User}/${datedata?.startDate}/${datedata?.endDate}`
        fetch(datefiltered)
        .then((res)=>res.json())
        .then((geteRes)=>{
          console.log(geteRes);
          setstats(geteRes)


          
setdata(geteRes.DLeadsSourceDatas)

setpnt(geteRes.DTreatmentCategoryDatas)

setclnc(geteRes.DClinicDatas)


        })

      }}>Search</Button>
</div>
          </div>
          </Col>
        </Row>
          </div>
        </div>


        <Row>
          <Col>
          <Card>
            <p className="p-3 lCount">Lead Count</p>
            <Row className="m-3 mt-0">
              <Col md={3} style={{borderRight:"1px solid black"}}>
              <Row>
                <Col md={6}>
                <p className='mx-3 mb-0 lTitle1'>Total Leads</p>
                <Button variant="" onClick={()=>{
                  navigate("/enquiries")
                }}>view all <span className="mx-2"><CgArrowLongRight/></span></Button>
                </Col>

                <Col md={6} className="mt-3">
                <p className="mx-4 countL1">{stats?.TotalLeads}</p>
                {/* <img src={tl} alt="" srcset="" /> */}
                </Col>
              </Row>
              </Col>
              <Col md={3} style={{borderRight:"1px solid black"}}>
              <Row>
                <Col md={6}>
                <p className='mx-3 mb-0 lTitle2'>Total patients</p>
                <Button variant="" onClick={()=>{
                  navigate("/patients")
                }}>view all <span className="mx-2"><CgArrowLongRight/></span></Button>
                </Col>

                <Col md={6} className="mt-3">
                <p className="mx-4 px-2 countL2">{stats?.ConvertedLeads}</p>
                {/* <img src={cl} alt="" srcset="" /> */}
                </Col>
              </Row>
              </Col>
               <Col md={3} style={{borderRight:"1px solid black"}}>
              <Row>
                <Col md={6}>
                <p className='mx-3 mb-0 lTitle3'>Unconverted Leads</p>
                <Button variant="" onClick={()=>{
                  navigate("/fup-entries")
                }}>view all <span className="mx-2"><CgArrowLongRight/></span></Button>
                </Col>

                <Col md={6} className="mt-3">
                <p className="mx-5 px-4 countL3">{stats?.UnconvertedLeads}</p>
                {/* <img src={ul} alt="" srcset="" /> */}
                </Col>
              </Row>
              </Col> 
              <Col md={3}>
              <Row>
                <Col md={6}>
                <p className='mx-3 mb-0 lTitle4'>Hot Leads</p>
                {/* <Button variant="" onClick={()=>{
                  // navigate("/")
                }}>view all <span className="mx-2"><CgArrowLongRight/></span></Button> */}
                </Col>

                <Col md={6} className="mt-3">
                <p className="mx-4 px-3 countL4">{stats?.HotLeads}</p>
                {/* <img src={hl} alt="" srcset="" /> */}
                </Col>
              </Row>
              </Col>
            </Row>
          </Card>
          </Col>
        </Row>


        <Row className="mt-4">
          <Col>
<p style={{fontSize:"22px",fontWeight:"500"}}>Reports</p>
          <Row>
            <Col>
            <Card className="p-3 me-0 me-md-5">
              <Row>
                <Col>

                  {/* <Row>
                    <Col md={4}>
                    
                <Card style={{borderColor:"#FF7A00"}}>
                  <img src={drs} alt="" srcset="" width={50} height={50} className="m-auto mt-2 mb-2"/>
                </Card>
                    </Col>
                    <Col md={8}>
                    <p className='mx-3' style={{fontSize:"32px",color:"#FF7A00",fontWeight:"500"}}>{stats?.TotalDoctors}</p>
                    </Col>
                  </Row> */}
                <p style={{fontWeight:"500",color:"#FF7A00",fontSize:"16px"}} className='m-0 pt-1 pb-1'>Activity Report</p>
                <Button variant="" className='p-0' onClick={()=>{
                  navigate("/activity-rpt")
                }}>view  <span className="mx-2"><CgArrowLongRight/></span></Button>
                
                </Col>
                
              </Row>
            </Card>
            </Col>
            <Col>
            <Card className="p-3 me-0 me-md-5">
              <Row>
                <Col>

                  {/* <Row>
                    <Col md={4}>
                    
                <Card style={{borderColor:"#FFB800"}}>
                  <img src={emps} alt="" srcset="" width={50} height={50} className="m-auto mt-2 mb-2"/>
                </Card>
                    </Col>
                    <Col md={8}>
                    <p className='mx-3' style={{fontSize:"32px",color:"#FFB800",fontWeight:"500"}}>{stats?.TotalEmployees}</p>
                    </Col>
                  </Row> */}
                <p style={{fontWeight:"500",color:"#FFB800",fontSize:"16px"}} className='m-0 pt-1 pb-1'>Collection Report</p>
                <Button variant="" className='p-0' onClick={()=>{
                  navigate("/clln-rpt")
                }}>view  <span className="mx-2"><CgArrowLongRight/></span></Button>
                
                </Col>
                
              </Row>
            </Card>
            </Col>
            <Col>
            <Card className="p-3 me-0 me-md-5">
              <Row>
                <Col>

                  {/* <Row>
                    <Col md={4}>
                    
                <Card style={{borderColor:"#00AE3B"}}>
                  <img src={branches} alt="" srcset="" width={50} height={50} className="m-auto mt-2 mb-2"/>
                </Card>
                    </Col>
                    <Col md={8}>
                    <p className='mx-3' style={{fontSize:"32px",color:"#00AE3B",fontWeight:"500"}}>{stats?.TotalBranch}</p>
                    </Col>
                  </Row> */}
                <p style={{fontWeight:"500",color:"#00AE3B",fontSize:"16px"}} className='m-0 pt-1 pb-1'>Invoice Report</p>
                <Button variant="" className='p-0' onClick={()=>{
                  navigate("/inv-rpt")
                }}>view  <span className="mx-2"><CgArrowLongRight/></span></Button>
                
                </Col>
                
              </Row>
            </Card>
            </Col>
            <Col>
            <Card className="p-3 me-0 me-md-5">
              <Row>
                <Col>

                  {/* <Row>
                    <Col md={4}>
                    
                <Card style={{borderColor:"#00AE3B"}}>
                  <img src={branches} alt="" srcset="" width={50} height={50} className="m-auto mt-2 mb-2"/>
                </Card>
                    </Col>
                    <Col md={8}>
                    <p className='mx-3' style={{fontSize:"32px",color:"#00AE3B",fontWeight:"500"}}>{stats?.TotalBranch}</p>
                    </Col>
                  </Row> */}
                <p style={{fontWeight:"500",color:"#946DB7",fontSize:"16px"}} className='m-0 pt-1 pb-1'>Consultation Report</p>
                <Button variant="" className='p-0' onClick={()=>{
                  navigate("/consult-rpt")
                }}>view  <span className="mx-2"><CgArrowLongRight/></span></Button>
                
                </Col>
                
              </Row>
            </Card>
            </Col>
            <Col>
            <Card className="p-3 me-0 me-md-5">
              <Row>
                <Col>

                  {/* <Row>
                    <Col md={4}>
                    
                <Card style={{borderColor:"#00AE3B"}}>
                  <img src={branches} alt="" srcset="" width={50} height={50} className="m-auto mt-2 mb-2"/>
                </Card>
                    </Col>
                    <Col md={8}>
                    <p className='mx-3' style={{fontSize:"32px",color:"#00AE3B",fontWeight:"500"}}>{stats?.TotalBranch}</p>
                    </Col>
                  </Row> */}
                <p style={{fontWeight:"500",color:"red",fontSize:"16px"}} className='m-0 pt-1 pb-1'>Pending Follow-ups</p>
                <Button variant="" className='p-0' onClick={()=>{
                  navigate("/pending-fups")
                }}>view  <span className="mx-2"><CgArrowLongRight/></span></Button>
                
                </Col>
                
              </Row>
            </Card>
            </Col>
          </Row>
          </Col>
      
        </Row>




        <Row className='mt-4'>
          <Col className=''>
            <Card className='p-3'>
              <div className="d-flex">
              
                        <Card style={{borderColor:"#825AA5"}} className='p-2'>
              <img src={tapmt} alt="" srcset="" className='m-auto' width={50} height={50}/>
                        </Card>
                        <div className=' mt-2 mx-2'>
              <p style={{fontSize:"18px",fontWeight:"600"}} className='m-0'>Today’s Appointment</p>
              <p style={{fontSize:"24px",fontWeight:"500",color:"#825AA5"}} className='m-0'>{stats?.TodaysAppointment}</p>
                        </div>
              </div>

              <div className='mt-2'>
                <MaterialReactTable
                    columns={columns1}
                    data={tapmnt}
                    initialState={{ showColumnFilters: true }} //show filters by default
                
                    muiTableHeadCellFilterTextFieldProps={{
                      sx: { m: "0.5rem 0", width: "100%" },
                      variant: "outlined",
                    }}
                    // enableEditing
                    // onEditingRowSave={handleSaveRowEdits}
                    // onEditingRowCancel={handleCancelRowEdits}
                    // renderRowActions={({ cell,row, table }) => (
                    //   <Box sx={{ display: "flex", gap: "1rem" }}>
                    //     <Tooltip arrow placement="left" title="View">
                    //       <IconButton
                    //       className="view-btn"
                    //       onClick={() => {
                    //           let invNo=cell.row.original.InvoiceNo;
                    //           let enqId=cell.row.original.ID;
                    //           sessionStorage.setItem("consultInvNo",invNo);
                    //           sessionStorage.setItem("consultEnqId",enqId)
                    //           navigate("/consult-view-inv")
                    //       }}
                
                    //       >
                    //         <AiOutlineEye/>
                    //       </IconButton>
                    //     </Tooltip>
                    //     <Tooltip arrow placement="right" title="Delete">
                    //       <IconButton
                    //         color="error"
                    //         className="delete-btn"
                    //         onClick={(e) => {
                    //                setdelData((pre)=>{
                    //                   return{
                    //                       ...pre,
                    //                       InvoiceTid:cell.row.original.InvoiceTid
                    //                   }
                    //               })
                    //               console.log(cell.row.original.InvoiceTid);
                    //               handleShow();
                    //         }}
                
                    //       >
                    //         <HiOutlineTrash/>
                    //       </IconButton>
                    //     </Tooltip>
                    //   </Box>
                    // )}
                
                    positionActionsColumn="last"
                
                  />
              </div>
            </Card>
          </Col>
          <Col className=''>
          <Card className='p-3'>
            <div className="d-flex">

            <Card style={{borderColor:"#FF5084"}} className='p-2'>
              <img src={fups} alt="" className='m-auto' srcset="" width={50} height={50}/>
            </Card>
            <div className=' mt-2 mx-2'>
              <p style={{fontSize:"18px",fontWeight:"600"}} className='m-0'>Today’s Follow Up’s</p>
              <p style={{fontSize:"24px",fontWeight:"500",color:"#FF5084"}} className='m-0'>{stats?.TodaysFollowup}</p>
                        </div>
            </div>

            <div className='mt-2'>
            <MaterialReactTable
                  columns={columns3}
                  data={tfups}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  // enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  // renderRowActions={({ cell,row, table }) => (
                  //   <Box sx={{ display: "flex", gap: "1rem" }}>
                  //     <Tooltip arrow placement="left" title="View">
                  //       <IconButton 
                  //       className="view-btn"
                  //       onClick={() => {
                  //           let invNo=cell.row.original.InvoiceNo;
                  //           let enqId=cell.row.original.ID;

                  //           sessionStorage.setItem("consultInvNo",invNo);
                  //           sessionStorage.setItem("consultEnqId",enqId)


                  //           navigate("/consult-view-inv")
                  //       }}
                        
                  //       >
                  //         <AiOutlineEye/>
                  //       </IconButton>
                  //     </Tooltip>
                  //     <Tooltip arrow placement="right" title="Delete">
                  //       <IconButton
                  //         color="error"
                  //         className="delete-btn"
                  //         onClick={(e) => {
                  //                setdelData((pre)=>{
                  //                   return{
                  //                       ...pre,
                  //                      InvoiceTid:cell.row.original.InvoiceTid
                  //                   }
                  //               })

                  //               console.log(cell.row.original.InvoiceTid);

                  //               handleShow();
                  //         }}
                        

                  //       >
                  //         <HiOutlineTrash/>
                  //       </IconButton>
                  //     </Tooltip>
                  //   </Box>
                  // )}
                 



                  positionActionsColumn="last"
                
                />
                </div>
          </Card>
          </Col>
        </Row>



        <Row className='mt-4'>
          <Col md={6}>
          <Card className='p-3'>
            <div className="d-flex">

            <Card style={{borderColor:"red"}} className='p-2'>
              <img src={pendingf} alt="" className='m-auto' srcset="" width={50} height={50}/>
            </Card>
            <div className=' mt-2 mx-2'>
              <p style={{fontSize:"18px",fontWeight:"600"}} className='m-0'>Pending Follow Up’s</p>
              <p style={{fontSize:"24px",fontWeight:"500",color:"red"}} className='m-0'>{stats?.PendingFollowup}</p>
                        </div>
            </div>
          <div className='mt-2'>
            <MaterialReactTable
                    columns={columns4}
                    data={pendingfups}
                    initialState={{ showColumnFilters: true }} //show filters by default
            
                    muiTableHeadCellFilterTextFieldProps={{
                      sx: { m: "0.5rem 0", width: "100%" },
                      variant: "outlined",
                    }}
                    // enableEditing
                    // onEditingRowSave={handleSaveRowEdits}
                    // onEditingRowCancel={handleCancelRowEdits}
                    // renderRowActions={({ cell,row, table }) => (
                    //   <Box sx={{ display: "flex", gap: "1rem" }}>
                    //     <Tooltip arrow placement="left" title="View">
                    //       <IconButton
                    //       className="view-btn"
                    //       onClick={() => {
                    //           let invNo=cell.row.original.InvoiceNo;
                    //           let enqId=cell.row.original.ID;
                    //           sessionStorage.setItem("consultInvNo",invNo);
                    //           sessionStorage.setItem("consultEnqId",enqId)
                    //           navigate("/consult-view-inv")
                    //       }}
            
                    //       >
                    //         <AiOutlineEye/>
                    //       </IconButton>
                    //     </Tooltip>
                    //     <Tooltip arrow placement="right" title="Delete">
                    //       <IconButton
                    //         color="error"
                    //         className="delete-btn"
                    //         onClick={(e) => {
                    //                setdelData((pre)=>{
                    //                   return{
                    //                       ...pre,
                    //                      InvoiceTid:cell.row.original.InvoiceTid
                    //                   }
                    //               })
                    //               console.log(cell.row.original.InvoiceTid);
                    //               handleShow();
                    //         }}
            
                    //       >
                    //         <HiOutlineTrash/>
                    //       </IconButton>
                    //     </Tooltip>
                    //   </Box>
                    // )}
            
                    positionActionsColumn="last"
            
                  />
          </div>
                     </Card>
          </Col>

          <Col md={6}>
          <Card className='p-3'>
            <div className="d-flex">

            <Card style={{borderColor:"red"}} className='p-2'>
              <img src={tapmt} alt="" className='m-auto' srcset="" width={50} height={50}/>
            </Card>
            <div className=' mt-2 mx-2'>
              <p style={{fontSize:"18px",fontWeight:"600"}} className='m-0'>Todays Patient Followups</p>
              <p style={{fontSize:"24px",fontWeight:"500",color:"red"}} className='m-0'>{stats?.TodaysJoinedFollowup}</p>
                        </div>
            </div>
          <div className='mt-2'>
            <MaterialReactTable
                    columns={columns5}
                    data={pendingpups}
                    initialState={{ showColumnFilters: true }} //show filters by default
            
                    muiTableHeadCellFilterTextFieldProps={{
                      sx: { m: "0.5rem 0", width: "100%" },
                      variant: "outlined",
                    }}
                    // enableEditing
                    // onEditingRowSave={handleSaveRowEdits}
                    // onEditingRowCancel={handleCancelRowEdits}
                    // renderRowActions={({ cell,row, table }) => (
                    //   <Box sx={{ display: "flex", gap: "1rem" }}>
                    //     <Tooltip arrow placement="left" title="View">
                    //       <IconButton
                    //       className="view-btn"
                    //       onClick={() => {
                    //           let invNo=cell.row.original.InvoiceNo;
                    //           let enqId=cell.row.original.ID;
                    //           sessionStorage.setItem("consultInvNo",invNo);
                    //           sessionStorage.setItem("consultEnqId",enqId)
                    //           navigate("/consult-view-inv")
                    //       }}
            
                    //       >
                    //         <AiOutlineEye/>
                    //       </IconButton>
                    //     </Tooltip>
                    //     <Tooltip arrow placement="right" title="Delete">
                    //       <IconButton
                    //         color="error"
                    //         className="delete-btn"
                    //         onClick={(e) => {
                    //                setdelData((pre)=>{
                    //                   return{
                    //                       ...pre,
                    //                      InvoiceTid:cell.row.original.InvoiceTid
                    //                   }
                    //               })
                    //               console.log(cell.row.original.InvoiceTid);
                    //               handleShow();
                    //         }}
            
                    //       >
                    //         <HiOutlineTrash/>
                    //       </IconButton>
                    //     </Tooltip>
                    //   </Box>
                    // )}
            
                    positionActionsColumn="last"
            
                  />
          </div>
                     </Card>
          </Col>
          
        </Row>


        


{/* 
        <Row className='mt-4'>
          <Col>
          <Card className='p-3'>
<Row>
  <Col>
  <p className='graphHead'>Lead Sources</p>
  <PieChart
  colors={palette}
      series={[
        {
          arcLabel: (item) => `${item.value}%`,
          
          // arcLabelMinAngle: 45,
          data
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
    
      {...size}
      slotProps={{ legend: { hidden:true  } }}
    />

<div className="d-flex mt-3">
      <div>
        <ul style={{listStyleType:"none"}} className='mt-2'>
          <li>{palette?.map((clr,i)=>{
            return(
              <>
        <div className='d-flex'>
          <p className='' style={{width:"20px",height:"20px",backgroundColor:clr}}></p>
      
        </div>
              </>
            )
          })}</li>
        </ul>
      </div>
        
        <div className='mx-2 '>
        {
      data?.map((p,i)=>{
        return(
          <>
      
          <p>{p?.label} ({p?.value})</p>
          </>
        )
      })
        }
        </div>
    </div>
  </Col>
  <Col>
  <p className='graphHead'>Treatmentwise Patient Data</p>


    <PieChart colors={palette1} series={[{ data:pnt, innerRadius: 80 }]} {...size}   slotProps={{ legend: { hidden:true  } }}>
    <PieCenterLabel>{pntCount}</PieCenterLabel>
    
    </PieChart>

    <div className="d-flex mt-3">
      <div>
        <ul style={{listStyleType:"none"}} className='mt-2'>
          <li>{palette1?.map((clr,i)=>{
            return(
              <>
        <div className='d-flex'>
          <p className='' style={{width:"20px",height:"20px",backgroundColor:clr}}></p>
      
        </div>
              </>
            )
          })}</li>
        </ul>
      </div>
        
        <div className='mx-2 '>
        {
      pnt?.map((p,i)=>{
        return(
          <>
      
          <p>{p?.label} ({p?.value})</p>
          </>
        )
      })
        }
        </div>
    </div>

  </Col>
  <Col>
  <p className='graphHead'>Branchwise Patient Data</p>


  <PieChart colors={palette2} series={[{ data:clnc, innerRadius: 80 }]} {...size} slotProps={{ legend: { hidden:true  } }}>
  <PieCenterLabel>{clncCount}</PieCenterLabel>
</PieChart>


<div className="d-flex mt-3">
      <div>
        <ul style={{listStyleType:"none"}} className='mt-2'>
          <li>{palette2?.map((clr,i)=>{
            return(
              <>
        <div className='d-flex'>
          <p className='' style={{width:"20px",height:"20px",backgroundColor:clr}}></p>
      
        </div>
              </>
            )
          })}</li>
        </ul>
      </div>
        
        <div className='mx-2 '>
        {
      clnc?.map((p,i)=>{
        return(
          <>
      
          <p>{p?.label} ({p?.value})</p>
          </>
        )
      })
        }
        </div>
    </div>
  </Col>
</Row>
          </Card>
          </Col>
        </Row> */}
        </Col>
      </Row>
     </Sidebar>
    </>
  )
}

export default Dashboard2