import React,{useState,useMemo,useEffect} from "react";
import "../../Styles/Menu/User Settings/AddEmployee.css";
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
import "../../Components/Sidebar.css";
import logo from "../../Assets/logo.png";
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
import { Card, Col, Row, Modal, Form, Table, Tabs, Tab,Spinner } from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
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
import { MdLogout } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

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


function AddEmployee(){
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

    const [Progress1, setProgress1] = useState(null);


    const [addEmp, setAddEmp] = useState({
      FirstName:"",
      LastName:"",
      Designation:"",
      Gender:"",
      BirthDate:"",
      Nationality:"",
      ClinicID:"",
      MobileNo:"",
      Email:"",
      Address1:"",
      Address2:"",
      CityId:"",
      StatesId:"",
      CountryId:"",
      Pincode:"",
      PersonalPhoto:"",
      JoiningDate:"",
      username:"",
      Passwords:"",
      CreatedBy:"1",
      IPAddress:"1"
    })





    const [checked, setChecked] = useState({
      isSelCCountry: false,
      isSelPCountry: false,
      isSelCState: false,
      isSelPState: false,
      isSelCCity: false,
      isSelPCity: false,
    });
  
    const [countries, setCountries] = useState({
      currentCountries: [],
    });
    const [states, setStates] = useState({
      currentStates: [],
    });
    const [cities, setCities] = useState({
      currentCities: [],
    });
  
    const getStates = async (countryId, cORp) => {
      let url = `https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetStateList/${countryId}`;
      let state = await (await fetch(url)).json();
      console.log(state.Data);
      if (cORp === "current") {
        setStates({
          ...states,
          currentStates: state.Data,
        });
      }
    };
  
    const getCities = async (stateId, cORp) => {
      let url = `https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetCityList/${stateId}`;
      let city = await (await fetch(url)).json();
      console.log(city.Data);
      if (cORp === "current") {
        setCities({
          ...cities,
          currentCities: city.Data,
        });
      }
    };
  
    const getCountries = async () => {
      let url =
        "https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetCountryList";
      let country = await (await fetch(url)).json();
      console.log(country.Data.slice(0, 2));
      setCountries({
        ...countries,
        currentCountries: country.Data,
        // permCountries: country.Data.slice(0, 2),
      });
    };
  
    useEffect(() => {
      getCountries();
    }, []);
  
    const handleChange = (e) => {
      const newdata = { ...addEmp };
      newdata[e.target.name] = e.target.value;
      setAddEmp(newdata);
      console.log(newdata);
  
      switch (e.target.name) {
        case "CountryId": {
          setChecked((preData) => {
            return {
              ...preData,
              isSelCCountry: true,
              isSelCState: false,
              isSelCCity: false,
            };
          });
          getStates(e.target.value, "current");
          setCities((preData) => {
            return {
              ...preData,
              currentCities: [],
            };
          });
          setData((preData) => {
            return {
              ...preData,
              // CurrentCountryId: e.target.value,
              // CurrentStateId: "",
              // CurrentCityId: "",
            };
          });
          break;
        }
        case "StatesId": {
          setChecked((preData) => {
            return { ...preData, isSelCState: true, isSelCCity: false };
          });
          getCities(e.target.value, "current");
          setData((preData) => {
            return {
              ...preData,
              // CurrentCityId: "",
            };
          });
          break;
        }
        case "CityId": {
          setChecked((preData) => {
            return { ...preData, isSelCCity: true };
          });
          break;
        }
      }
    };

    let addressPattern = /[^a-zA-Z0-9 .,]/;
    let mobilePattern = /[^0-9]/;
    let namePattern = /[^a-zA-Z ]/;


    const handleSubmit=(e)=>{
      e.preventDefault();


      const addEmpUrl=`https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/AddNewEmployee`;


      if(addEmp?.ClinicID==="" || addEmp?.Designation==="" || addEmp?.JoiningDate==="" || addEmp?.FirstName==="" || addEmp?.LastName==="" || addEmp.MobileNo==="" || addEmp?.Gender==="" || addEmp?.username==="" || addEmp?.Passwords===""){
        Swal.fire({
        icon:"warning",
        titleText:"Please fill all the fields marked with red * !"
        })
      }else if(addEmp.FirstName.match(namePattern) || addEmp.LastName.match(namePattern)){
        Swal.fire({
          icon:"warning",
          titleText:"Name should contain alphabets only!"
        })
      }
      else if(addEmp.MobileNo.length>10){
        Swal.fire({
          icon:"warning",
          titleText:"Mobile no. cannot be more than 10 digits!"
        })
      }
      else if(addEmp.MobileNo.length<10){
        Swal.fire({
          icon:"warning",
          titleText:"Mobile no. cannot be less than 10 digits!"
        })
      }
      else if(addEmp.MobileNo.match(mobilePattern)){
        Swal.fire({
          icon:"warning",
          titleText:"Mobile no. should contain only digits!"
        })
      }
      else if(addEmp.Address1.match(addressPattern) || addEmp.Address2.match(addressPattern)){
        Swal.fire({
          icon:"warning",
          titleText:"Address should not contain special characters like !@# etc!",
          text:"Only . and , allowed"
        })
      }
      else{



      fetch(addEmpUrl,{
        method:"POST",
        headers:{
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addEmp)
      })
      .then((res)=>res.json())
      .then((empRes)=>{
        console.log(empRes);

        if(empRes.status===true){
          Swal.fire({
            icon:"success",
            title:"Added successfully!",
            timer:2000,
            showConfirmButton:false
          })

         navigate("/emp-reg")
        }
      })

    }

    }
  
  
    const columns = useMemo(
        () => [
          {
            accessorKey: "srNo",
            header: "Sr No.",
            muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
            
          },
          {
            accessorKey: "photo",
            header: "Photo",
          },
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "mobileNumber",
            header: "Mobile Number",
          },
          {
            accessorKey: "emailID",
            header: "Email ID",
          },
          {
            accessorKey: "regDate",
            header: "Reg Date",
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
    
      const [data,setData] = useState([
       
          {
            srNo: 1,
            photo: <img src="https://t4.ftcdn.net/jpg/03/17/85/49/360_F_317854905_2idSdvi2ds3yejmk8mhvxYr1OpdVTrSM.jpg" width={150} height={100}/>,
            name:"Sneha Gaikwad",
            mobileNumber:"95261663263",
            emailID:"snehagaikwad@gmail.com",
            regDate:"16/02/2023",
            // view:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            // download:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>
           
          },
          {
            srNo: 2,
            photo: <img src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=360" width={150} height={100}/>,
            name:"Sayali Palshetkar",
            mobileNumber:"95261663263",
            emailID:"sayalipalshetkar@gmail.com",
            regDate:"16/02/2023",
            // view:<img src="https://flyclipart.com/thumb2/x-button-327024.png" width={50}/>,
            // download:"unChecked"
            
          },
         
        ],
        []
      );

      const [empPhoto, setEmpPhoto] = useState(null);



  const [previewUrl1, setPreviewUrl1] = useState("");


  const handleFile1 = (e) => {
    // setImage662(e);
    setPreviewUrl1(URL.createObjectURL(e));
    console.log(e);
    // setstate662(file);      to add in formdata
    setEmpPhoto(e);
  };
  
  


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



  const [designation, setDesignation] = useState([]);

  const desigUrl=`https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetDesignationList`;

  useEffect(()=>{
    fetch(desigUrl)
    .then((res)=>res.json())
    .then((desRes)=>{
      console.log(desRes.Data);
      setDesignation(desRes.Data);
    })
  },[])


  const [branch, setBranch] = useState([]);
  const branchUrl = `https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/GetClinicList/0/0`;

  useEffect(() => {
    fetch(branchUrl)
      .then((res) => res.json())
      .then((branchRes) => {
        console.log(branchRes.Data);
        setBranch(branchRes.Data);
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
       <Card className="m-1 mt-3 emp-crd p-3">
        <Row>
            <Col>
            <p className="emp-t">Add New Employee</p>
            <hr />
           

            <Form onSubmit={handleSubmit}>
                <Row>
                    {/* <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Employee No.</Form.Label>
        <Form.Control type="text" placeholder="" name=""/>
       
      </Form.Group>
                    </Col> */}

                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Branch <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="ClinicID" onChange={handleChange}>
      <option></option>
      {branch.map((b) => {
                                return (
                                  <>
                                    <option value={b.ClinicID} key={b.ClinicID}>
                                      {b.ClinicName}
                                    </option>
                                  </>
                                );
                              })}
    </Form.Select>
       
      </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Designation <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="Designation" onChange={handleChange}>
      <option></option>
     {
      designation.map((d,i)=>{
        return(
          <>
          <option value={d?.DesignationID}>{d?.Designation}</option>
          </>
        )
      })
     }
    </Form.Select>
       
      </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date <span className="req-f">*</span></Form.Label>
        <Form.Control type="date" placeholder="" name="JoiningDate" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" placeholder="" name="Email" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>

                </Row>

                <Row>
                <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="FirstName" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>

                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="LastName" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>

                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile Number<span className="req-f">*</span></Form.Label>
        <Form.Control type="tel" placeholder="" name="MobileNo" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>

                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date of birth</Form.Label>
        <Form.Control type="date" placeholder="" name="BirthDate" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>
                   

                </Row>

                <Row>
                    {/* <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="" />
       
      </Form.Group>
                    </Col> */}


                   


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gender <span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="Gender" onChange={handleChange}>
      <option></option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
     
    </Form.Select>
       
      </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nationality</Form.Label>
        <Form.Select aria-label="Default select example" name="Nationality" onChange={handleChange}>
      <option></option>
      <option value="Indian">Indian</option>
 
     
    </Form.Select>
       
      </Form.Group>
                    </Col>
                </Row>



                <Row>
                    <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address Line 1</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="" name="Address1" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="" name="Address2" onChange={handleChange}/>
       
      </Form.Group>
                    </Col>
                </Row>



                <Row>
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Country</Form.Label>
        <Form.Select aria-label="Default select example" name="CountryId" onChange={handleChange}>
      <option></option>
      {countries.currentCountries &&
                                countries.currentCountries.map((country) => {
                                  return (
                                    <>
                                      <option
                                        value={country?.CountryId}
                                        key={country?.CountryId}
                                      >
                                        {country?.CountryName}
                                      </option>
                                    </>
                                  );
                                })}
    </Form.Select>
       
      </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>State</Form.Label>
        <Form.Select aria-label="Default select example" name="StatesId" onChange={handleChange}>
      <option></option>
      {states.currentStates &&
                                states.currentStates.map((state) => {
                                  return (
                                    <>
                                      <option
                                        value={state?.StateId}
                                        key={state?.StateId}
                                      >
                                        {state?.StateName}
                                      </option>
                                    </>
                                  );
                                })}
    </Form.Select>
       
      </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Select aria-label="Default select example" name="CityId" onChange={handleChange}>
      <option></option>
      {cities.currentCities &&
                                cities.currentCities.map((city) => {
                                  return (
                                    <>
                                      <option
                                        value={city?.CityID}
                                        key={city?.CityID}
                                      >
                                        {city?.CityName}
                                      </option>
                                    </>
                                  );
                                })}
    </Form.Select>
       
      </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Area Pin Code</Form.Label>
        <Form.Control type="number" placeholder="" name="Pincode" onChange={handleChange}/>

       
      </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col lg={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username <span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="username" onChange={handleChange}/>

       
      </Form.Group>
                    </Col>


                    <Col lg={3}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password <span className="req-f">*</span></Form.Label>
        <Form.Control type="password" placeholder="" name="Passwords" onChange={handleChange}/>

       
      </Form.Group>
                    </Col>

                <Col lg={6}>
        <Form.Label>Employee Photo</Form.Label>
        <Row>
            <Col lg={5}>
            
        <Form.Control type="file" placeholder="" name="PersonalPhoto"  onChange={(e)=>handleFile1(e.target.files[0])}/>
            </Col>

            <Col lg={3}>
            <Button variant="" className="emp-img-up mx-3" onClick={async (e)=>{
             e.preventDefault();

             const fd = new FormData();
         
             fd.append("stream", empPhoto);
         
             await axios
               .post(
                 "https://orthosquare.infintrixindia.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
                 fd,
                 {
                   onUploadProgress: (ProgressEvent) => {
                    setProgress1(
                      Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                    )
                     console.log(
                       "Upload Progress:" +
                         Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                         "%"
                     );
                   },
                 }
               )
               .then((res) => {
                 console.log(res.data);
                 let imgPath = res.data.data[0].imageurl;
                 setAddEmp((pre) => {
                   return { ...pre, PersonalPhoto: imgPath };
                 });

                 if(res.data.status==="1"){
                  setProgress1(null);

                  Swal.fire({
                    icon:'success',
                    title:"Uploaded successfully!"
                  })
                 }
                }
                )
                 console.log(addEmp);
            }}>Upload Image</Button><span>{Progress1 &&
              // <ProgressBar variant="success" className="m-2 mx-0" now={Progress} label={`${Progress}%`} min={0} max={100} style={{width:`${Progress}%`}}/>
              <Spinner animation="border" id="spin5"/>
              }</span>
            </Col>


            <Col lg={4}>
            {previewUrl1 ? (
                                previewUrl1 && (
                                  <img
                                    src={previewUrl1}
                                    alt="image"
                                    className="img-s"
                                    // style={{float:"right"}}
                                    width={150}
                                    height={150}
                                  />
                                )
                              ) : (
                                <img
                                    src="https://wallpaperaccess.com/full/1285952.jpg"
                                    alt="image"
                                    className="img-s"
                                    // style={{float:"right"}}
                                    width={150}
                                    height={150}
                                  />
                              )}
            </Col>
        </Row>

       
                </Col>
                </Row>


                <Row className="text-center mt-4">
                    <Col>
                    <Button variant="" className="emp-sub" type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
           

           



            </Col>
        </Row>
       </Card>
      </Main>
    </Box>
        </>
    );
}


export default AddEmployee;