import React,{useState,useEffect,useMemo} from 'react';
import "../../Styles/Menu/User Settings/ViewDoctorProfile.css";
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
import Sidebar from '../../Components/Sidebar';

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



const ViewDoctorProfile = () => {
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


    
    let UserID=sessionStorage.getItem("viewDoc");

    const [profile, setProfile] = useState([]);

    const proUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetDoctorProfile/0/${UserID}`;

    useEffect(()=>{
        fetch(proUrl)
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
            accessorKey: "Degree",
            header: "Degree",
          },
          {
            accessorKey: "University",
            header: "University/College/Board",
          },
          {
            accessorKey: "DegreeProof",
            header: "Degree Proof",
          },
         

       
        ],
        []
      );



      const columns1 = useMemo(
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
            accessorKey: "Name",
            header: "Name",
          },
         
         

       
        ],
        []
      );
    
      const [data,setData] = useState([
       
          {
            srNo: 1,
            // enquiry: "001",
            Degree:profile[0]?.Degree,
            University:profile[0]?.BoardOrUniversity,
            DegreeProof:<img src={profile[0]?.DegreeProofPhoto?profile[0]?.DegreeProofPhoto:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} width={150} height={150}/>
            // enquiryDate:"09 Feb 2023",
            
           
          },
         
         
        ],
        []
      );


      const [data1,setData1] = useState([
       
        {
          srNo: 1,
          // enquiry: "001",
          Name:"Skin Care",
      
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
  return (
   <>
 <Sidebar>
 <Card className="m-1 mt-3 fup-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">View Doctor Profile</p>
            <hr />

            <Row>
                <Col>
                <p>Personal Details</p>
                <Card style={{borderColor:"#825AA5"}}>
                <Row className="m-3">
                    <Col lg={2}>
       <Avatar alt="Travis Howard" src={profile[0]?.PersonalPhoto} className="m-auto ava-img mt-4"/>
                    <p className="text-center m-4">Dr {profile[0]?.Name}</p>
                    </Col>
                    <Col lg={5}>
                    <p className="mb-5 dt-lbl">Doctor Type : <span style={{fontWeight:"normal"}}>{profile[0]?.DoctorType}</span></p>
                    <p className="mb-5 dt-lbl">Mobile Number :<span style={{fontWeight:"normal"}}>{profile[0]?.MobileNo}</span></p>
                    <p className="mb-5 dt-lbl">Email ID :<span style={{fontWeight:"normal"}}>{profile[0]?.Email}</span></p>
                    <p className="mb-5 dt-lbl">Address :<span style={{fontWeight:"normal"}}>{profile[0]?.Address}</span></p>
                    <p className="mb-5 dt-lbl">Branch :<span style={{fontWeight:"normal"}}>{profile[0]?.Branch}</span></p>
                    </Col>

                    <Col lg={5}>
                    {/* <p className="mb-5 dt-lbl">Age :{profile[0]?.DoctorType}</p> */}
                    <p className="mb-5 dt-lbl">Date of birth :<span style={{fontWeight:"normal"}}>{profile[0]?.BirthDate}</span></p>
                    <p className="mb-5 dt-lbl">Gender :<span style={{fontWeight:"normal"}}>{profile[0]?.Gender}</span></p>
                    <p className="mb-5 dt-lbl">In time :<span style={{fontWeight:"normal"}}>{profile[0]?.InTime}</span></p>
                    <p className="mb-5 dt-lbl">Out time :<span style={{fontWeight:"normal"}}>{profile[0]?.OutTime}</span></p>

                    </Col>
                </Row>
                </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                <p className="mt-3">Professional Details</p>
                <Card className="p-4" style={{borderColor:"#825AA5"}}>
                    
                    
                   


                    <Row>
                        <Col>
                        <p className="dt-lbl">Degree :</p>
                        
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
                      <th>Degree</th>
                      <th>University/College/Board</th>
                      <th>Degree Proof</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{profile[0]?.Degree}</td>
                      <td>{profile[0]?.BoardOrUniversity}</td>
                      <td><img src={profile[0]?.DegreeProofPhoto?profile[0]?.DegreeProofPhoto:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} width={150} height={150}/></td>
                    </tr>
                  </tbody>
                </Table>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                        <p className="dt-lbl">Specialty :</p>
                        
                        <MaterialReactTable
                  columns={columns1}
                  data={data1}
                  
                //   initialState={{ showColumnFilters: true }} //show filters by default
                  
                //   muiTableHeadCellFilterTextFieldProps={{
                //     sx: { m: "0.5rem 0", width: "100%" },
                //     variant: "outlined",
                    
                //   }}
               
                
                />
                        </Col>
                    </Row>
                </Card>
                </Col>
            </Row>


            <Row>
                <Col>
                <p className="mt-3">Documents Details</p>
                <Card className="p-4" style={{borderColor:"#825AA5"}}>
                    <Row>
                      <Col md={6}>
                      <p>Aadhaar Card Number : {profile[0]?.AadharCardNumber}</p>
                      <Row>
                        <Col md={8}>
                      <p><img src={profile[0]?.AadharCardPhoto?profile[0]?.AadharCardPhoto:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} width={150} height={150} className='drDocimgs'/></p>
                        
                        </Col>
                      </Row>
                      </Col>
                      <Col md={6}>
                      <p>Pan Card Number :{profile[0]?.PanCard}</p>
                      <Row>
                        <Col md={8}>
                      <img src={profile[0]?.PanCardPhoto?profile[0]?.PanCardPhoto:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} width={150} height={150} className='drDocimgs'/>
                        
                        </Col>
                      </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                      <p>Registration Number :{profile[0]?.RegistrationNumber}</p>
                      <Row>
                        <Col md={8}>
                      <img src={profile[0]?.RegistrationPhoto?profile[0]?.RegistrationPhoto:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} width={150} height={150} className='drDocimgs'/>
                        
                        </Col>
                      </Row>
                      </Col>
                      <Col md={6}>
                      <p>Indemnity Number: {profile[0]?.IndemnityProofNumber}</p>
                      <Row>
                        <Col md={8}>
                      <img src={profile[0]?.IndemnityProofPhoto?profile[0]?.IndemnityProofPhoto:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} width={150} height={150} className='drDocimgs'/>
                        
                        </Col>
                      </Row>
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
  )
}

export default ViewDoctorProfile