import React,{useState,useMemo, useEffect} from "react";
import "../../Styles/Menu/Leads/FollowupDetails.css";
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
import {FaCheckCircle, FaEye, FaRegEdit} from "react-icons/fa";
import {MdCall, MdLogout} from "react-icons/md";
import {HiOutlineTrash,HiFire,HiUserAdd} from "react-icons/hi";
import {SiMicrosoftexcel} from "react-icons/si";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
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
import calendar from "../../Assets/calendar.png";

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


function FollowupDetails(){
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

    let date=new Date();
let d=date.getDate();
let m=date.getMonth()+1;
let y=date.getFullYear();

let today=y+"-"+m+"-"+d

let EnqId=sessionStorage.getItem("EnqId");


    const [fup, setFup] = useState({
      EnquiryID:EnqId,
      FirstName:"",
      LastName:"",
      ConversationDetails:"",
      FollowUpDate:today,
      NextFollowUpDate:"",
      FollowUpStatus:"",
      FollowUpMode:"",
      Rating:"",
      Remarks:"",
      IsActive:"1",
      Actions:"null",
      CreatedBy:"1",
      CreationDate:"",
      IPAddress:"null"
    })


    

    const columns = useMemo(
        () => [
          // {
          //   accessorKey: "srNo",
          //   header: "Sr No.",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
            
          // },
        //   {
        //     accessorKey: "enquiry",
        //     header: "Enquiry No.",
        //   },
          {
            accessorKey: "FollowUpDate",
            header: "Conversation Date",
            Cell:({cell})=>{
              let cdate=cell.getValue()
              return(
                <>
                <div>{cdate.split(" ")[0]}</div>
                </>
              )
            }
          },
          {
            accessorKey: "FollowUpMode",
            header: "Follow up Mode",
          },
          {
            accessorKey: "ConversationDetails",
            header: "Conversation Details",
          },
          {
            accessorKey: "FollowUpStatus",
            header: "Follow up Status",
          },
          {
            accessorKey: "FollowUpBy",
            header: "Follow up By",
          },
          
       
        ],
        []
      );
    
      const [data,setData] = useState([
       
          {
            srNo: 1,
            // enquiry: "001",
            conversationDate:"10 Feb 2022",
            followupMode:"Call",
            conversationDetails:"xyz",
            FollowupStatus:"Follow Up",
            followupBy:"Dr. Pankti",
           
           
          },
          {
            srNo: 2,
            // enquiry: "002",
            conversationDate:"10 Feb 2022",
            followupMode:"Call",
            conversationDetails:"xyz",
            FollowupStatus:"Follow Up",
            followupBy:"Dr. Pankti",
           
            
          },
         
        ],
        []
      );

      const handleChange=(e)=>{
        const newdata={...fup};
        newdata[e.target.name]=e.target.value;
        setFup(newdata);
        console.log(newdata);
    }



    const handleSubmit=(e)=>{
      e.preventDefault();

      const addfUrl=`https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/AddNewFollowup`;

      fetch(addfUrl,{
        method:"POST",
        headers:{
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fup)
      })
      .then((res)=>res.json())
      .then((result)=>{
        console.log(result);
        if(result.Status===true){
          Swal.fire({
            icon:"success",
            title:"Followup added successfully!",
            timer:2500,
            showConfirmButton:false
          })
          // navigate("/fup")
          setTimeout(()=>{

            window.location.reload();
          },2500)
        }
        else{
          Swal.fire({
            icon:"error",
            title:"Somethinng went wrong!",
          })
        }
      })
    }





const [status, setStatus] = useState([]);

const statusUrl=`https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetFollowUpStatusList`;


useEffect(()=>{
fetch(statusUrl)
.then((res)=>res.json())
.then((stat)=>{
  console.log(stat.Data);
  setStatus(stat.Data);
})
},[])



const [mode, setMode] = useState([]);

const modeUrl=`https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetFollowUpModeList`;

useEffect(()=>{
fetch(modeUrl)
.then((res)=>res.json())
.then((modes)=>{
  console.log(modes.Data);
  setMode(modes.Data);
})
},[])


const [fupDetails, setFupDetails] = useState([]);


const fupdUrl=`https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetFollowupDetails/${EnqId}`;

useEffect(()=>{
  fetch(fupdUrl)
  .then((res)=>res.json())
  .then((fupd)=>{
    console.log(fupd.Data);
    setFupDetails(fupd.Data);
    setFup((pre)=>{

      let fn=fupd.Data[0]?.Name.split(" ")[0];
      let ln=fupd.Data[0]?.Name.split(" ")[1];
      return{
        ...pre,
        FirstName:fn,
        LastName:ln
      }
    })
    
  })
},[])



const [menuList, setMenuList] = useState([]);


    const menuUrl=`https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetMenuAccess/1`;
  useEffect(()=>{
fetch(menuUrl)
.then((res)=>res.json())
.then((list)=>{
  console.log(list.Data);
  setMenuList(list.Data);
})
  },[])

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
            {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))} */}
            {/* {
              menuList.map((menu)=>{
                return( */}
                  <>
                  <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate("/today-fup")}>
                    <ListItemIcon>
                  {menuList[0]?.MenuName==="Dashboard" && <img src={dashIcon} />}
                    </ListItemIcon>
                    <ListItemText primary={menuList[0]?.MenuName}/>
                  </ListItemButton>
                  </ListItem>
                  


                  {/* <ListItem disablePadding> */}
                  <ListItemButton onClick={handleMenuClick}>
        <ListItemIcon>
         <img src={menuIcon} alt="" srcset="" />
        </ListItemIcon>
        <ListItemText primary={menuList[2]?.MenuName} />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>









          
          <ListItemButton sx={{ pl: 3 }} onClick={handleCsClick}>
            <ListItemIcon>
            <img src={cliGearIcon} alt="" srcset="" />

            </ListItemIcon>
            
            <ListItemText primary={menuList[3]?.MenuName} />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
                
          <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/branch")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[1]?.MenuName}/>

          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={handleTreatClick}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[8]?.MenuName}/>
          {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          
        <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/s&l")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[20]?.MenuName}/>

          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/wl")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[21]?.MenuName}/>

          </ListItemButton>


          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/ht")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[22]?.MenuName}/>

          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/homeopathy")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[23]?.MenuName}/>

          </ListItemButton>
          </List>
          </Collapse>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/lead-srcs")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[9]?.MenuName}/>
         
          </ListItemButton>







          </List>
          </Collapse>








          <ListItemButton sx={{ pl: 3 }} onClick={handleUserClick}>
            <ListItemIcon>
            <img src={userGearIcon} alt="" srcset="" />

            </ListItemIcon>
            
            <ListItemText primary={menuList[4]?.MenuName} />
        {open4 ? <ExpandLess /> : <ExpandMore />}

          </ListItemButton>
          <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/role")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[10]?.MenuName}/>
         
          </ListItemButton>




          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/access-perm")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[11]?.MenuName}/>
         
          </ListItemButton>




          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/dr-reg")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[12]?.MenuName}/>
         
          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/emp-reg")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[13]?.MenuName}/>
         
          </ListItemButton>

          </List>
          </Collapse>



        </List>
      </Collapse>
                  {/* </ListItem> */}


                  {/* <ListItem disablePadding> */}
                  <ListItemButton onClick={handleLpClick}>
                    <ListItemIcon>
                  <img src={lp} alt="" srcset="" />
                    </ListItemIcon>
                    <ListItemText primary={menuList[5]?.MenuName}/>
        {open5 ? <ExpandLess /> : <ExpandMore />}

                  </ListItemButton>
                  <Collapse in={open5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/enquiries")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[14]?.MenuName}/>
         
          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/fup-entries")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[15]?.MenuName}/>
         
          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/patients")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[16]?.MenuName}/>
         
          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/up-leads")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[17]?.MenuName}/>
         
          </ListItemButton>
          </List>
          </Collapse>






          <ListItemButton onClick={()=>{
            handleApClick()
            navigate("/appmnt");
            }}>
                    <ListItemIcon>
                  <img src={calendar} alt="" srcset="" />
                    </ListItemIcon>
                    <ListItemText primary={menuList[6]?.MenuName}/>
        {open6 ? <ExpandLess /> : <ExpandMore />}

                  </ListItemButton>
                  <Collapse in={open6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/book-apmt")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[18]?.MenuName}/>
         
          </ListItemButton>



          <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate("/view-apmt")}>
          <ListItemIcon>
            <img src="" alt="" srcset="" />
          </ListItemIcon>

          <ListItemText primary={menuList[19]?.MenuName}/>
         
          </ListItemButton>



         
          </List>
          </Collapse>
                  {/* </ListItem> */}
                  <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                  <img src={report} alt="" srcset="" />
                    </ListItemIcon>
                    <ListItemText primary={menuList[7]?.MenuName}/>
                  </ListItemButton>
                  </ListItem>

                
                  </>
                {/* )
              })
            } */}
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
            <p className="ap-t">Follow Up Details</p>
            <hr />

            <Row>
                <Col>
                <Card style={{backgroundColor:"#825AA5",color:"white"}} className="p-4">
                    <Row>
                        <Col md={6}>
                        <p style={{color:"#ffb5ca",fontWeight:"600"}}>Name :<span className="px-2" style={{color:"white",fontWeight:"normal"}}>{fupDetails[0]?.Name}</span></p>
                        <p style={{color:"#ffb5ca",fontWeight:"600"}}>Address :<span className="px-2" style={{color:"white",fontWeight:"normal"}}>{fupDetails[0]?.Address}</span></p>
                        <p style={{color:"#ffb5ca",fontWeight:"600"}}>Source :<span className="px-2" style={{color:"white",fontWeight:"normal"}}>{fupDetails[0]?.LeadSource}</span></p>
                        </Col>

                        <Col md={6}>
                        <p style={{color:"#ffb5ca",fontWeight:"600"}}>Enquiry Date :<span className="px-2" style={{color:"white",fontWeight:"normal"}}>{fupDetails[0]?.EnquiryDate.split(" ")[0]}</span></p>
                        <p style={{color:"#ffb5ca",fontWeight:"600"}}>Mobile Number :<span className="px-2" style={{color:"white",fontWeight:"normal"}}>{fupDetails[0]?.MobileNo}</span></p>

                        </Col>
                    </Row>
                </Card>
                </Col>
            </Row>


            <Row>
                <Col>
                
            <MaterialReactTable
                  columns={columns}
                  data={fupDetails}
                  
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                    
                  }}
                //   enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                //   renderRowActions={({ row, table }) => (
                //     <Box sx={{ display: "flex", gap: "1rem" }}>
                //       <Tooltip arrow placement="left" title="Edit">
                //         <IconButton 
                //         className="edit-btn"
                //         // onClick={() => table.setEditingRow(row)}
                //         onClick={() => navigate("/fup-details")}
                        
                //         >
                //           <MdCall/>
                //         </IconButton>
                //       </Tooltip>
                //       <Tooltip arrow placement="right" title="Delete">
                //         <IconButton
                //           color="info"
                //           // onClick={() => handleDeleteRow(row)}
                //         >
                //           <HiUserAdd/>
                //         </IconButton>
                //       </Tooltip>
                //       <Tooltip arrow placement="left" title="View">
                //         <IconButton 
                //         className="view-btn"
                //         onClick={() => navigate("/view-enquiry")}
                //         >
                //           <AiOutlineEye/>
                //         </IconButton>
                //       </Tooltip>

                      
                //     </Box>
                //   )}
//                   renderTopToolbarCustomActions={() => (
//                     <>
//                     <Button
//                       // color="secondary"
//                       className="ap-btn"
//                       onClick={() => {
//                         // setCreateModalOpen(true);
//                         // handleShowAddRole();
//                         navigate("/add-entry")
                      
//                       }}
//                       variant="contained"
//                     >
//                      Add New Enquiry
//                     </Button>




// <Button
//                       // color="secondary"
//                       className="dr-up-btn mx-2"
//                       onClick={() => {
//                         // setCreateModalOpen(true);
//                         // handleShowAddRole();
//                         // navigate("/add-access")
                      
//                       }}
//                       variant="contained"
//                     >
//                      Upload Excel <SiMicrosoftexcel color="#33c481" className="mx-2" fontSize={20}/>
//                     </Button>
//                     </>
//                   )}
                //   positionActionsColumn="last"
                
                />
                </Col>
            </Row>


            <Row className="mt-5">
                <Col>
                <p className="text-center fup-info-t">Today’s Follow up Information</p>
                <hr />

                    <Form onSubmit={handleSubmit}>
                <Row>
                    {/* <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Follow Up ID</Form.Label>
        <Form.Control type="number" placeholder="" />
       
      </Form.Group>
                    </Col> */}

                    

                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Today’s Follow Up Date</Form.Label>
        <Form.Control type="text" placeholder="" name="FollowUpDate" value={fup.FollowUpDate} disabled/>
       
      </Form.Group>
                    </Col>



                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name  <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="FirstName" value={fup.FirstName} onChange={(e)=>handleChange(e)}/>
       
      </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="LastName" value={fup.LastName} onChange={(e)=>handleChange(e)}/>
       
      </Form.Group>
                    </Col>

                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Next Follow Up Date <span className="req-f">*</span></Form.Label>
        <Form.Control type="date" placeholder="" name="NextFollowUpDate" value={fup.NextFollowUpDate} onChange={(e)=>handleChange(e)}/>
      
      </Form.Group>
                    </Col>
                </Row>

                <Row>

                <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Status <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="FollowUpStatus" onChange={(e)=>handleChange(e)}>
      <option></option>
      {
        status && status.map((stat)=>{
          return(
            <>
            <option value={stat?.StatusID} key={stat?.StatusID}>{stat?.StatusName}</option>
            
            </>
          );
        })
      }
    
    </Form.Select>
      
      </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Follow Up Mode <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="FollowUpMode" onChange={(e)=>handleChange(e)}>
      <option></option>
      {
        mode && mode.map((fmode)=>{
          return(
            <>
            <option value={fmode?.ModeID} key={fmode?.ModeID}>{fmode?.ModeName}</option>
            
            </>
          );
        })
      }
    
    </Form.Select>
      
      </Form.Group>
                    </Col>
          
                    <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Conversation Details <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="ConversationDetails" value={fup.ConversationDetails} onChange={(e)=>handleChange(e)}/>
      
      </Form.Group>
                    </Col>


                  
                          </Row>




                <Row>
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Interest Level <span className="req-f">*</span></Form.Label>
        <Row>
            <Col>
            
        <Form.Check type="radio" label="cold" name="Rating" value="cold" onChange={(e)=>handleChange(e)}/>
            </Col>
            <Col>
            
        <Form.Check type="radio" label="Warm" name="Rating" value="warm" onChange={(e)=>handleChange(e)}/>
            </Col>
            <Col>
            
        <Form.Check type="radio" label="Hot" name="Rating" value="Hot" onChange={(e)=>handleChange(e)}/>
            </Col>
        </Row>
      
      </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Remarks <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="Remarks" value={fup.Remarks} onChange={(e)=>handleChange(e)}/>
      
      </Form.Group>
                    </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                        <Button variant="" type="submit" className="ent-sub">Submit</Button>
                        </Col>
                        <Col>
                        <Button variant="" type="reset" className="ent-res">Reset</Button>
                        
                        </Col>
                    </Row>
                    </Form>
                </Col>
            </Row>



            </Col>
        </Row>
       </Card>
      </Main>
    </Box>
        </>
    );
}

export default FollowupDetails;