import React,{useState,useMemo,useEffect} from "react";
import "../../Styles/Menu/Leads/ViewPatient.css";
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
import { Card, Col, Row ,Modal,Form, Table} from "react-bootstrap";
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


function ViewPatient(){
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


let patientId=sessionStorage.getItem("viewpnt");
    const [profile, setProfile] = useState([]);

    const pUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientDetails/${patientId}`;

      useEffect(()=>{
        fetch(pUrl)
        .then((res)=>res.json())
        .then((pRes)=>{
          console.log(pRes.Data);
          setProfile(pRes.Data);
        })
      },[])
    

    const columns = useMemo(
        () => [
          {
            accessorKey: "srNo",
            header: "Sr No.",
            muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
            
          },
        //   {
        //     accessorKey: "enquiry",
        //     header: "Enquiry No.",
        //   },
          {
            accessorKey: "meal",
            header: "Meal",
          },
          {
            accessorKey: "dietDetails",
            header: "Diet Details",
          },
         

       
        ],
        []
      );
    
      const [data,setData] = useState([
       
          {
            srNo: 1,
            // enquiry: "001",
            meal:"--",
            dietDetails:"--",
            // enquiryDate:"09 Feb 2023",
            
           
          },
          {
            srNo: 2,
            // enquiry: "002",
            meal:"--",
            dietDetails:"--",
            // enquiryDate:"09 Feb 2023",
            
            
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
       <Sidebar>
       <Card className="m-1 mt-3 fup-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">View Patient</p>
            <hr />

            <Row>
                <Col>
                <p>Personal Information</p>
                <Card>
                <Row className="m-3">
                    <Col lg={2}>
       <Avatar alt={profile[0]?.Name} src={profile[0]?.PatientPhoto} className="m-auto ava-img mt-4"/>
                    <p className="text-center m-4">{profile[0]?.Name}</p>
                    </Col>
                    <Col lg={5}>
                    <p className="mb-5 dt-lbl">Gender :<span style={{fontWeight:"normal"}}>{profile[0]?.Gender}</span></p>
                    <p className="mb-5 dt-lbl">Mobile Number :<span style={{fontWeight:"normal"}}>{profile[0]?.MobileNo}</span></p>
                    <p className="mb-5 dt-lbl">Email ID :<span style={{fontWeight:"normal"}}>{profile[0]?.Email}</span></p>
                    <p className="mb-5 dt-lbl">Address :<span style={{fontWeight:"normal"}}>{profile[0]?.Address}</span></p>
                    </Col>

                    <Col lg={5}>
                    {/* <p className="mb-5 dt-lbl">Age :</p> */}
                    <p className="mb-5 dt-lbl">Date of birth :<span style={{fontWeight:"normal"}}>{profile[0]?.BirthDate.split(" ")[0]}</span></p>
                    <p className="mb-5 dt-lbl">Occupation :<span style={{fontWeight:"normal"}}>{profile[0]?.Occupation}</span></p>
                    </Col>
                </Row>
                </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                <p className="mt-3">Medical History</p>
                <Card className="p-4">
                    <Row>
                        <Col xs={12} lg={6}>
                        <p className="dt-lbl">Family Doctor’s Name :<span style={{fontWeight:"normal"}}>{profile[0]?.FamilyDoctorName}</span></p>
                        </Col>
                        <Col xs={12} lg={6}>
                        <p className="dt-lbl">Phone/Telephone Number :<span style={{fontWeight:"normal"}}>{profile[0]?.DrTelephoneNo}</span></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <p className="dt-lbl">Address :<span style={{fontWeight:"normal"}}>{profile[0]?.DrAddress}</span></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <p className="dt-lbl"> Suffering  from :<span style={{fontWeight:"normal"}}>{profile[0]?.SufferingFrom[0]}</span></p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <p className="dt-lbl">List of Medicine you are taking currently, if any :<span style={{fontWeight:"normal"}}>{profile[0]?.OngoingMedicine}</span></p>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={2}>
                        <p style={{whiteSpace:""}} className="dt-lbl">If Women Patient :</p>
                        </Col>
                        <Col lg={3}>
                        <p className="mx-0 mx-lg-3 dt-lblsub">Menses:<span style={{fontWeight:"normal"}}>{profile[0]?.Menses}</span></p>
                        </Col>
                        <Col lg={3}>
                        <p className="dt-lblsub">Are you Pregnant:<span style={{fontWeight:"normal"}}>{profile[0]?.IsPregnant==="True"?"Yes":"No"}</span></p>
                        </Col>
                        <Col lg={4}>
                        <p className="dt-lblsub">Delivery:<span style={{fontWeight:"normal"}}>{profile[0]?.Delivery}</span></p>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={12} lg={4}>
                        <p className="dt-lbl">Hair fall/ Dandruff/ Itching :<span style={{fontWeight:"normal"}}>{profile[0]?.HairIssue[0]}</span></p>
                        </Col>
                        <Col xs={12} lg={4}>
                        <p className="dt-lblsub">Since:<span style={{fontWeight:"normal"}}>{profile[0]?.Since.split(" ")[0]}</span></p>
                        </Col>
                        <Col xs={12} lg={4}>
                        <p className="dt-lblsub">Treatment Done Anywhere? <span style={{fontWeight:"normal"}}>{profile[0]?.PreviousTreatment}</span></p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <p className="dt-lbl">Treatment Explanation :<span style={{fontWeight:"normal"}}>{profile[0]?.TreatmentExplanation}</span></p>
                        </Col>
                    </Row>


          <Row>
            <Col>
            <p className="" style={{fontSize:"18px",fontWeight:"500"}}>Physical Generals</p>

<Row>
  <Col>
  
            <p className="dt-lbl">Craving: <span style={{fontWeight:"normal"}}>{profile[0]?.Craving}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Aversions: <span style={{fontWeight:"normal"}}>{profile[0]?.Aversions}</span></p>
  </Col>
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">Thirst: <span style={{fontWeight:"normal"}}>{profile[0]?.Thirst}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Perspiration: <span style={{fontWeight:"normal"}}>{profile[0]?.Perspiration}</span></p>
  </Col>
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">Sleep: <span style={{fontWeight:"normal"}}>{profile[0]?.Sleep}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Dreams: <span style={{fontWeight:"normal"}}>{profile[0]?.Dreams}</span></p>
  </Col>
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">Thermals: <span style={{fontWeight:"normal"}}>{profile[0]?.Thermals}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Bathing: <span style={{fontWeight:"normal"}}>{profile[0]?.Bathing}</span></p>
  </Col>
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">Covering: <span style={{fontWeight:"normal"}}>{profile[0]?.Covering}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Seasons: <span style={{fontWeight:"normal"}}>{profile[0]?.Seasons}</span></p>
  </Col>
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">Urine and Stool: <span style={{fontWeight:"normal"}}>{profile[0]?.UrineNStool}</span></p>
  </Col>
 
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">F/H: <span style={{fontWeight:"normal"}}>{profile[0]?.FH}</span></p>
  </Col>
 
</Row>
{/* <p className="mt-2 dt-lbl">PERSONAL HISTORY:</p> */}
<Row>
  <Col>
  
            <p className="dt-lbl">PERSONAL HISTORY: <span style={{fontWeight:"normal"}}>{profile[0]?.PersonalHistory}</span></p>
  </Col>
 
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">Mentals: <span style={{fontWeight:"normal"}}>{profile[0]?.Mentals}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Lifespace & Reactivity: <span style={{fontWeight:"normal"}}>{profile[0]?.LifespaceReactivity}</span></p>
  </Col>
 
</Row>
<Row>
  <Col>
  
            <p className="dt-lbl">Menses: <span style={{fontWeight:"normal"}}>{profile[0]?.MensesTotality}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Totality: <span style={{fontWeight:"normal"}}>{profile[0]?.Totality}</span></p>
  </Col>
 
</Row>
{/* <Row>
  <Col>
  
            <p className="dt-lbl">Menses:<span style={{fontWeight:"normal"}}>{profile[0]?.TreatmentExplanation}</span></p>
  </Col>
  <Col>
  
            <p className="dt-lbl">Totality:<span style={{fontWeight:"normal"}}>{profile[0]?.TreatmentExplanation}</span></p>
  </Col>
 
</Row> */}
<Row>
  <Col>
  
            <p className="dt-lbl">Medicine: <span style={{fontWeight:"normal"}}>{profile[0]?.Medicine}</span></p>
  </Col>

 
</Row>

            </Col>
          </Row>

                    <Row>
                        <Col lg={1}>
                        <p className="dt-lbl">Diet :</p>
                        </Col>
                        <Col>
                        {/* <MaterialReactTable
                  columns={columns}
                  data={data}
                  
                //   initialState={{ showColumnFilters: true }} //show filters by default
                  
                //   muiTableHeadCellFilterTextFieldProps={{
                //     sx: { m: "0.5rem 0", width: "100%" },
                //     variant: "outlined",
                    
                //   }}
               
                
                /> */}


                <Table>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Diet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      profile[0]?.objDiet?.map((d,i)=>{
                        return(
                          <>
                          
                    <tr>
                      <td>{d?.Meal}</td>
                      <td>{d?.DietDetails}</td>
                    </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                </Table>
                        </Col>
                    </Row>
                </Card>
                </Col>
            </Row>


            <Row>
                <Col>
                <p className="mt-3">Other Details</p>
                <Card className="p-4">
                    <Row>
                        <Col xs={12} lg={3}>
                        <p className="dt-lbl">Marital Status : <span style={{fontWeight:"normal"}}>{profile[0]?.MaritalStatus}</span></p>
                        <p className="dt-lbl">Profession : <span style={{fontWeight:"normal"}}>{profile[0]?.Profession}</span></p>
                        <p className="dt-lbl">Reason for weight loss :<span style={{fontWeight:"normal"}}>{profile[0]?.ReasonOfWeightloss}</span></p>
                        </Col>

                        <Col xs={12} lg={3}>
                        <p className="dt-lbl">Water Intake (Day) :<span style={{fontWeight:"normal"}}>{profile[0]?.WaterIntake} ltrs</span></p>
                        <p className="dt-lbl">Designation :<span style={{fontWeight:"normal"}}>{profile[0]?.Designation}</span></p>
                        </Col>
                        
                        <Col xs={12} lg={3}>
                        <p className="dt-lbl">Sleep Duration :<span style={{fontWeight:"normal"}}>{profile[0]?.SleepDuration} hrs.</span></p>
                        <p className="dt-lbl">Timing :<span style={{fontWeight:"normal"}}>{profile[0]?.OfficeHours}</span></p>
                        </Col>
                        <Col xs={12} lg={3}>
                        <p className="dt-lbl">Stress :<span style={{fontWeight:"normal"}}>{profile[0]?.Stress}</span></p>
                        </Col>
                    </Row>
                </Card>
                </Col>
            </Row>
           



            </Col>
        </Row>
       </Card>
       </Sidebar>
        </>
    );
}

export default ViewPatient;