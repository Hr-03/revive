import React,{useState,useEffect,useMemo,useRef} from "react";
import "../../Styles/Menu/Appointment/ViewAppointment.css";
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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
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
import Swal from "sweetalert2";
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


function ViewAppointment({ calendar: calendarId, eventColor }){
    const navigate=useNavigate();
    const calendar = useRef(null);

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


    let delapName=sessionStorage.getItem("apmntName");

    const [show, setShow] = useState(false);

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);


    const [cancelapmnt, setcancelapmnt] = useState({
      AppointmentID:"",
      Reason:""
    })


    const handleChange=(e)=>{
      const newdata={...cancelapmnt};
      newdata[e.target.name]=e.target.value;
      setcancelapmnt(newdata);
      console.log(newdata);
  }


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

  
  const [events, setEvents] = useState([{
    title:'xasc',
    allDay:false,
    date:'2023-04-01',
    time:"10:12"
  },
  {
    title:'xasc',
    allDay:false,
    date:'2023-04-10',
    time:"15:12"
  },
  {
    title:'xasc',
    allDay:false,
    date:'2023-04-15',
    time:"18:12"
  }
]);


// let Role=sessionStorage.getItem("RoleId");

let User=Role==="1"?0:sessionStorage.getItem("UserId")

  

const eventsUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetAppointmentView/0/${User}`;




  useEffect(()=>{
fetch(eventsUrl)
.then((res)=>res.json())
.then((eves)=>{
  console.log(eves.Data);
  setEvents(eves.Data);

  // events.find(a=>{
  //   let aDT=a.AppointmentDateTime.split(" ")[0];

  //   a.AppointmentDateTime=aDT;
  // })

  // console.log(events);
})
  },[])


  const dateClickHandler=(e)=>{
    console.log(e);
  }

  const eventsHandler=(e)=>{
    console.log(e);
  }



    return(
        <>
       <Sidebar>
       <Card className="m-1 mt-3 af-crd p-3">
        <Row>
            <Col>
            <p className="af-t">View Appointment</p>
            <hr />


            <FullCalendar
             ref={calendar}
            //  allDayMaintainDuration="false"
            //  defaultAllDay="false"
            // allDay="false"
            // selectab
        defaultView="dayGridMonth"
        header={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        themeSystem="Simplex"
        plugins={[dayGridPlugin,interactionPlugin]}
        // events={[
        //   { title: 'event 1', date: '2023-04-01',time:"10:12" },
        //   { title: 'event 2', date: '2023-04-02',time:"01:21" }
        // ]}
        events={events}
        // dateClick={e => dateClickHandler(e)}
        eventClick={
          (e) =>{

            eventsHandler(e)
sessionStorage.setItem("apmntName",e.event._def.title);

          console.log(e.event._def.extendedProps.AppointmentID);

          setcancelapmnt((pre)=>{
            return{
              ...pre,
              AppointmentID:e.event._def.extendedProps.AppointmentID
            }
          })
            handleShowModal()
          } 
        }


        // eventContent={}
        
      />

          

<Modal show={show} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Do you want to cancel this appointment for <b>{delapName}</b>?

        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="p-0 m-">Reason <span className="req-t">*</span></Form.Label>
        <Form.Control as="textarea" name="Reason" onChange={handleChange} rows={3} />
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={(e)=>{
            e.preventDefault();

            const delapUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/DeleteAppointment`;

            if(cancelapmnt.Reason===""){
              Swal.fire({
                icon:"warning",
                title:"Please mention reason of cancellation!"
              })
            }
            else{

            

            fetch(delapUrl,{
              method:"POST",
              headers:{
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(cancelapmnt)
            }).then((res)=>res.json())
            .then((result)=>{
              console.log(result);

              if(result.Status===true){
                Swal.fire({
                  icon:"success",
                  title:"Cancelled successfully!"
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


          }
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
    );
}

export default ViewAppointment;