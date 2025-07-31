import React,{useState,useEffect} from 'react';
import "../../Styles/Menu/Leads/ConvertToPatient.css";
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
import { Card, Col, Row ,Modal,Form, Tabs, Tab, InputGroup} from "react-bootstrap";
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

import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment/moment';
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


const ConvertToPatient = () => {
  let enqId=sessionStorage.getItem("convEnqId");
let leadpnt=sessionStorage.getItem("leadPatient");
  
    const [data, setData] = useState({
    PatientID:"0",

        FormNo:"",
        FirstName:"",
        LastName:"",
        Occupation:"",
        EnquiryDate:"",
        DateOfBirth:"",
        Gender:"",
        ValidityDate: "",
        Status: 0,
        Address1:"",
        Address2:"",
        CityID:"",
        StatesID:"",
        CountryID:"",
        Pincode:"0",
        TelephoneNo:"",
        MobileNo:"",
        Email:"",
        ClinicID:"",
        EnquirySourceID:"",
        EnquiryID:!leadpnt?enqId:leadpnt,
        PatientPhoto:"",
       
        FamilyDoctorName:"",
        DrAddress:"",
        DrTelephoneNo:"",
        SufferingFrom:[],
        OngoingMedicine:"",
        Menses:"",
        IsPregnant:"",
        Delivery:"",
        HairIssue:[],
        Since:"",
        PreviousTreatment:"",
        TreatmentExplanation:"",
        objDiet:[],
        WaterIntake:"",
        SleepDuration:"",
        Stress:"",
        Profession:"",
        Designation:"",
        OfficeHours:"",
        ReasonOfWeightloss:"",
        MaritalStatus:"",
        Actions:"null",
        CreatedBy:"1",
        IPAddress:"0",
        Craving:"",
    Thirst:"",
    Sleep:"",
    Thermals:"",
    Covering:"",
    UrineNStool:"",
    Aversions:"",
    Perspiration:"",
    Dreams:"",
    Bathing:"",
    Seasons:"",
    FH:"",
    PersonalHistory:"",
    Mentals:"",
    LifespaceReactivity:"",
    MensesTotality:"",
    Medicine:"",
    HairTest:"",
    Totality:""
        
      })
    
      


      let Role=sessionStorage.getItem("RoleId");

      let User=Role==="1"?0:sessionStorage.getItem("UserId");



      const [fupentries, setFupEntries] = useState([]);

  const fentUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetFollowUpList/0/0/0/0/0/0/0/${User}`;

  useEffect(() => {
    fetch(fentUrl)
      .then((res) => res.json())
      .then((entry) => {
        console.log(entry.Data);
        setFupEntries(entry.Data);
       
      });
  }, []);




  const [getenqDet, setGetEnqDet] = useState([]);

  const getDetUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetLeadsToPatientDetails/${!leadpnt?enqId:leadpnt}`;

  useEffect(()=>{
    fetch(getDetUrl)
    .then((res)=>res.json())
    .then((detRes)=>{
      console.log(detRes.Data);
      setGetEnqDet(detRes.Data);

      let em=detRes.Data[0]?.EnquiryDate.split("/")[1];
      let ed=detRes.Data[0]?.EnquiryDate.split("/")[0];
      let ey=detRes.Data[0]?.EnquiryDate.split("/")[2];

      let arr=[em,ed,ey].join('/');
      
      let bm=detRes.Data[0]?.BirthDate.split("/")[1];
      let bd=detRes.Data[0]?.BirthDate.split("/")[0];
      let by=detRes.Data[0]?.BirthDate.split("/")[2];

      let arrb=[bm,bd,by].join('/');



      let edte=detRes.Data[0]?.EnquiryDate.split(" ")[0]
      
      console.log(edte);
      console.log(arrb);

      setData((pre)=>{
        return{
          ...pre,
          FirstName:detRes.Data[0].FirstName,
          LastName:detRes.Data[0].LastName,
          DateOfBirth:detRes.Data[0]?.BirthDate.split(" ")[0],
          Address1:detRes.Data[0]?.Address1,
          Address2:detRes.Data[0]?.Address2,
          ClinicID:detRes.Data[0]?.ClinicID,
          Email:detRes.Data[0]?.Email,
          EnquiryDate:edte,
          EnquirySourceID:detRes.Data[0]?.EnquirySourceID,
          Gender:detRes.Data[0]?.Gender,
          MobileNo:detRes.Data[0]?.MobileNo,
          Occupation:detRes.Data[0]?.Occupation,
          Pincode:detRes.Data[0]?.Pincode,
          TelephoneNo:detRes.Data[0]?.TelephoneNo
        }
      })

    })
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
    
    
      const [currentTab, setCurrentTab] = useState(0);
    
    
    
    
    
    
    
      const [inputList, setInputList] = useState([{ Meal: "", DietDetails: "" }]);
    
    
    
      // handle input change
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
    
    
        list[index][name] = value;
        setInputList(list);
        console.log(inputList);
        setData((pre)=>{
          return{
            ...pre,
            objDiet:inputList
          }
        })
    
    //     inputList.map((meal,i)=>{
    //       let a=[];
    
    //       a.push(meal.firstName);
    
    // console.log(a);
    //     }) 
    
        // console.log();
      };
    
    
    
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
    
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, { Meal: "", DietDetails: "" }]);
      };
    
    const [profile, setProfile] = useState(null);
    
      const handleProfile = (file) => {
       
        console.log(file);
        setProfile(file);
      };
    
    
    
      const submitProfile= async (e)=>{
        e.preventDefault();
    
        const fd = new FormData();
    
        fd.append("stream", profile);
    
        await axios
          .post(
            "https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
            fd,
            {
              onUploadProgress: (ProgressEvent) => {
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
            setData((pre) => {
              return { ...pre, PatientPhoto: imgPath };
            });

            if(res.data.status==="1"){
              Swal.fire({
                icon:"success",
                title:"Uploaded successfully!",
                
              })
            }
    
            console.log(data);
          });
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
    
    
    
      const handlecheck = (e) => {
        const { value, checked } = e.target;
    
        // Case 1 : The user checks the box
        if (checked) {
          setData((pre) => {
            return {
              ...pre,
              SufferingFrom: [...pre.SufferingFrom, value],
            };
          });
        }
    
        // Case 2 : The user unchecks the box
        else {
          setData((pre) => {
            return {
              ...pre,
              SufferingFrom: pre.SufferingFrom.filter((e) => e !== value),
            };
          });
        }
    
        console.log(data);
      };


      const handlecheck1 = (e) => {
        const { value, checked } = e.target;
    
        // Case 1 : The user checks the box
        if (checked) {
          setData((pre) => {
            return {
              ...pre,
              HairIssue: [...pre.HairIssue, value],
            };
          });
        }
    
        // Case 2 : The user unchecks the box
        else {
          setData((pre) => {
            return {
              ...pre,
              HairIssue: pre.HairIssue.filter((e) => e !== value),
            };
          });
        }
    
        console.log(data);
      };
    
    
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

      const [status, setStatus] = useState({
        currentStatus: [],
      });
      
      const [states, setStates] = useState({
        currentStates: [],
      });
      const [cities, setCities] = useState({
        currentCities: [],
      });
    
    
      const getStates = async (countryId, cORp) => {
        let url = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetStateList/${countryId}`;
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
        let url = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetCityList/${stateId}`;
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
        let url = "https://reviveapplication.com/ReviveAPI/Revive.svc/GetCountryList";
        let country = await (await fetch(url)).json();
        console.log(country.Data.slice(0, 2));
        setCountries({
          ...countries,
          currentCountries: country.Data,
          // permCountries: country.Data.slice(0, 2),
        });
      }
      
      const getStatus = async () => {
        let url = "https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientStatusList";
        let status = await (await fetch(url)).json();
        console.log(status.Data.slice(0, 2));
        setStatus({
          ...status,
          currentStatus: status.Data,
          // permCountries: country.Data.slice(0, 2),
        });
      }
      //   $(function(){
      //     var dtToday = new Date();
       
      //     var month = dtToday.getMonth() + 1;
      //     var day = dtToday.getDate();
      //     var year = dtToday.getFullYear();
      //     if(month < 10)
      //         month = '0' + month.toString();
      //     if(day < 10)
      //      day = '0' + day.toString();
      //     var maxDate = year + '-' + month + '-' + day;
      //     $('#inputdate').attr('min', maxDate);
      // });
      
      
      
      
      
      
      
      
      
      useEffect(()=>{
      getCountries();
      getStatus();
      },[])
    
    
      const [branch, setBranch] = useState([]);
      const branchUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetClinicList/0/0`;
    
      useEffect(() => {
        fetch(branchUrl)
          .then((res) => res.json())
          .then((branchRes) => {
            console.log(branchRes.Data);
            setBranch(branchRes.Data);
          });
      }, []);
    
    
    
      const [enqSource, setEnqSource] = useState([]);
    
    const enqSourceUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetLeadSourceList`;
    useEffect(()=>{
    fetch(enqSourceUrl)
    .then((res)=>res.json())
    .then((enqS)=>{
      console.log(enqS.Data);
      setEnqSource(enqS.Data);
    })
    },[])
    
    
      const handleChange=(e)=>{
        const newdata={...data};
        newdata[e.target.name]=e.target.value;
        setData(newdata);
        console.log(newdata);
    
    
        switch (e.target.name) {
          case "CountryID": {
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
          case "StatesID": {
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
          case "CityID": {
            setChecked((preData) => {
              return { ...preData, isSelCCity: true };
            });
            break;
          }
        }
    }
    

    let addressPattern = /[^a-zA-Z0-9 .,]/;
    let mobilePattern = /[^0-9+]/;
let namePattern = /[^a-zA-Z ]/;

const handleTab1=(e)=>{
  if(data.FormNo==="" || data.FirstName==="" || data.LastName==="" || data.EnquiryDate==="" || data.Gender==="" || data.MobileNo==="" || data.ClinicID==="" || data.EnquirySourceID===""){
    Swal.fire({
      icon:"warning",
      titleText:"PLease fill all the fields marked with red * !"
    })
  }else if(data.FirstName.match(namePattern) || data.LastName.match(namePattern)){
    Swal.fire({
      icon:"warning",
      titleText:"Name should conatain alphabets only!"
    })
  }
  else if(data.MobileNo.length>15){
    Swal.fire({
      icon:"warning",
      titleText:"Mobile no. cannot be more than 15 digits!",
      // text:"xsdscs"
    })
  }
  else if(data.MobileNo.length<7){
    Swal.fire({
      icon:"warning",
      titleText:"Mobile no. cannot be less than 7 digits!",
      // text:"xsdscs"
    })
  }
  else if(data.MobileNo.match(mobilePattern)){
    Swal.fire({
      icon:"warning",
      titleText:"Mobile no. should contain only digits!"
    })
  }
  else if(data.Address1.match(addressPattern) || data.Address2.match(addressPattern)){
    Swal.fire({
      icon:"warning",
      titleText:"Address should not contain special characters like !@# etc!",
      text:"Only . and , allowed"
    })
  }
  else{
    setCurrentTab(prev=>prev+1);
  }
}

    
    
    const handleSubmitPatient=(e)=>{
      e.preventDefault();
    
      const addPUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewLeadToPatient`;

      if(data.SufferingFrom===[]){
        setData((pre)=>{
          return{
            ...pre,
            SufferingFrom:[""]
          }
        })
      }
      else if(data.HairIssue===[]){
        setData((pre)=>{
          return{
            ...pre,
            HairIssue:[""]
          }
        })
      }
      else if(data.objDiet===[]){
        setData((pre)=>{
          return{
            ...pre,
            objDiet:[""]
          }
        })
      }
    
      fetch(addPUrl,{
        method:"POST",
              headers:{
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
      })
      .then((res)=>res.json())
      .then((pRes)=>{
        console.log(pRes);
        if(pRes.Status===true){
          Swal.fire({
            icon:"success",
            title:"Added successfully!",
            timer:2000,
            showConfirmButton:false
          })


          sessionStorage.removeItem("leadPatient")
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);

          navigate("/patients")
        }
        else{
          Swal.fire({
            icon:"error",
            title:"Something went wrong!",
            // timer:2000,
            // showConfirmButton:false
          })
        }
      })
    }
    
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
            <p className="ap-t">Patient</p>
            <hr />

            
            <Tabs variant="pills"  activeKey={currentTab}
                  id="justify-tab-example"
                  className="mb-3"
                  justify>
                <Tab eventKey={0} title="Personal Information">
                <Form>
                    <Row>
                        <Col xs={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">






                        <Row className="m-0 m-xs-3">
                            <Col lg={2} className="">
                            
        <Form.Label className="mx-0" style={{whiteSpace:"nowrap"}}>Form No.<span className="req-f">*</span></Form.Label>
                            </Col>
                            <Col lg={6} className="px-0 pe-0 pe-lg-2">
                            
        <Form.Control type="text" placeholder="" name="FormNo" value={data?.FormNo} onChange={handleChange}/>
                            </Col>
                        </Row>
        
      </Form.Group>
                        </Col>





{/* 
                        <Col xs={12} lg={6}>
                        <Row className="me-0 me-lg-4">
                            <Col xs={12} lg={6}>
        <Form.Label className="pc-no">Patient No.</Form.Label>
                            
                            </Col>
                            <Col xs={12} lg={6}>
        <Form.Control type="text" placeholder="" className=""/>
                            
                            </Col>
                        </Row>
                        </Col> */}
                    </Row>








                    <Row>
                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name<span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="FirstName" value={data?.FirstName} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>

                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name<span className="req-f">*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="LastName" value={data?.LastName} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>
                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Occupation</Form.Label>
        <Form.Control type="text" placeholder="" name="Occupation" value={data?.Occupation} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>
                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enquiry Date<span className="req-f">*</span></Form.Label>
        <Form.Control type="date" placeholder=""  name="EnquiryDate" value={moment((data?.EnquiryDate))?.format("YYYY-MM-DD")} onChange={handleChange}/>
       
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
                              <Form.Label>Validity Date <span className="req-f">*</span></Form.Label>
                              <Form.Control type="date" placeholder="" name="ValidityDate" onChange={handleChange}/>
                            
                            </Form.Group>
                        </Col>

                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date of birth</Form.Label>
        <Form.Control type="date" placeholder="" name="DateOfBirth" value={moment((data?.DateOfBirth))?.format("YYYY-MM-DD")} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>

                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gender<span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="Gender" value={data?.Gender} onChange={handleChange}> 
      <option></option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    
    </Form.Select>
       
      </Form.Group>
                        </Col>
                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" name="Status" onChange={handleChange}>
                                <option></option>
                                {
                                  status.currentStatus && status.currentStatus.map((st)=>{
                                      return(
                                        <>
                                        <option value={st?.StatusID} key={st?.StatusID}>{st?.Status}</option>
                                        
                                        </>
                                      )
                                  })
                                }
                            </Form.Select>
                          
                          </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address Line 1</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="" name="Address1" value={data?.Address1} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="" name="Address2" value={data?.Address2} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Country</Form.Label>
        <Form.Select aria-label="Default select example" name="CountryID" value={data?.CountryID} onChange={handleChange}>
      <option></option>
      {
        countries.currentCountries && countries.currentCountries.map((country)=>{
            return(
              <>
              <option value={country?.CountryId} key={country?.CountryId}>{country?.CountryName}</option>
              
              </>
            )
        })
      }
    </Form.Select>
       
      </Form.Group>
                        </Col>


                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>State</Form.Label>
        <Form.Select aria-label="Default select example" name="StatesID" value={data?.StatesID} onChange={handleChange}>
      <option></option>
      {
        states.currentStates && states.currentStates.map((state)=>{
          return(
            <>
            
            <option value={state?.StateId} key={state?.StateId}>{state?.StateName}</option>
            </>
          )
        })
      }
    </Form.Select>
       
      </Form.Group>
                        </Col>


                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Select aria-label="Default select example" name="CityID" value={data?.CityID} onChange={handleChange}>
      <option></option>
      {
        cities.currentCities && cities.currentCities.map((city)=>{
          return(
            <>
            
            <option value={city?.CityID} key={city?.CityID}>{city?.CityName}</option>
            </>
          )
        })
      }
    </Form.Select>
       
      </Form.Group>
                        </Col>

                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Telephone No.</Form.Label>
        <Form.Control type="tel" placeholder="" name="TelephoneNo" value={data?.TelephoneNo} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>
                    </Row>




                    <Row>
                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile No.<span className="req-f">*</span></Form.Label>
        <Form.Control type="tel" placeholder="" name="MobileNo" value={data?.MobileNo} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>



                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-mail ID</Form.Label>
        <Form.Control type="email" placeholder="" name="Email" value={data?.Email} onChange={handleChange}/>
       
      </Form.Group>
                        </Col>



                        <Col md={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Clinic Name<span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="ClinicID" value={data?.ClinicID} onChange={handleChange}>
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
        <Form.Label>Enquiry Source<span className="req-f">*</span></Form.Label>
        <Form.Select aria-label="Default select example" name="EnquirySourceID" value={data?.EnquirySourceID} onChange={handleChange}>
      <option></option>
      {

enqSource && enqSource.map((enqs)=>{
  return(
    <>
    
    <option value={enqs?.LeadSourceID} key={enqs?.LeadSourceID}>{enqs?.LeadSource}</option>
    </>
  )
})
}
    </Form.Select>
       
      </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Patient Profile Photo</Form.Label>
        <Form.Control type="file" placeholder="" name="PatientPhoto" onChange={(e) => handleProfile(e.target.files[0]) }/>
       
      </Form.Group>
                      
                        </Col>
                        <Col md={6} className="mt-3">
                        <Button variant="" className="pc-upImg mt-4" onClick={submitProfile}>Upload Image</Button>
                        </Col>
                    </Row>




                    <Row className="text-center mt-4">
                        <Col>
                        <Button variant="" className="pc-nxt" onClick={handleTab1}>Next</Button>
                        </Col>
                    </Row>
                </Form>
                </Tab>

                <Tab eventKey={1} title="Medical History">
                    <Form>
                        <Row>
                            <Col md={3}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Family Doctor’s Name</Form.Label>
        <Form.Control type="text" placeholder="" name="FamilyDoctorName" onChange={handleChange}/>
       
      </Form.Group>

                            </Col>


                            <Col md={3}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone/Telephone Number</Form.Label>
        <Form.Control type="tel" placeholder="" name="DrTelephoneNo" onChange={handleChange}/>
       
      </Form.Group>

                            </Col>

                            <Col md={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={1} placeholder="" name="DrAddress" onChange={handleChange}/>
       
      </Form.Group>
                            </Col>
                            
                        </Row>

                        <Row className="mt-2">
                            <Col>
                            <Form.Label>Have you suffered or suffering  from any of the following :</Form.Label>

                            <Row>
                                <Col lg={1}>
                                
        <Form.Check type="checkbox" placeholder="" name="SufferingFrom" label="HB" value="HB" onChange={handlecheck}/>
                                </Col>
                                <Col lg={1}>
        <Form.Check type="checkbox" placeholder="" name="SufferingFrom" label="THYROID" value="THYROID" onChange={handlecheck}/>
                                
                                </Col>
                                <Col lg={1}>
                                
        <Form.Check type="checkbox" placeholder="" name="SufferingFrom" label="DM" value="DM" onChange={handlecheck}/>
                                </Col>
                                <Col lg={1}>
                                
        <Form.Check type="checkbox" placeholder="" name="SufferingFrom" label="HT" value="HT" onChange={handlecheck}/>
                                </Col>
                                <Col lg={1}>
        <Form.Check type="checkbox" placeholder="" name="SufferingFrom" label="PCOD" value="PCOD" onChange={handlecheck}/>
                                
                                </Col>
                            </Row>

                            
                            </Col>
                        </Row>


                        <Row className="mt-4">
                          <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>List of Medicine you are taking currently, if any :</Form.Label>
        <Form.Control as="textarea" rows={1} placeholder="" name="OngoingMedicine" onChange={handleChange}/>
       
      </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mt-2">

                          <Col md={4}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Hair fall/ Dandruff/ Itching :</Form.Label>
        {/* <Form.Select aria-label="Default select example" name="HairIssue" onChange={handleChange}>
      <option></option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select> */}
<Row>
  <Col>
  <Form.Check type="checkbox" name="HairIssue" onChange={handlecheck1} label="Hair fall" value="Hair fall"/>
  
  </Col>
  <Col>
  <Form.Check type="checkbox" name="HairIssue" onChange={handlecheck1} label="Dandruff" value="Dandruff"/>
  
  </Col>
  <Col>
  <Form.Check type="checkbox" name="HairIssue" onChange={handlecheck1} label="Itching" value="Itching"/>
  
  </Col>
</Row>
       
      </Form.Group>
                          </Col>


                          <Col md={4}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Since</Form.Label>
        <Form.Control type="date" placeholder="" name="Since" onChange={handleChange}/>
      
       
      </Form.Group>
                          </Col>


                          <Col md={4}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Treatment Done Anywhere</Form.Label>
        <Form.Control type="text" placeholder="" name="PreviousTreatment" onChange={handleChange}/>
      
       
      </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
        <Form.Label>If Women Patient :</Form.Label>

                    <Row>
                      <Col md={4}>
        <Form.Label>Menses:</Form.Label>
                      <Row>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="Menses" label="Regular" value="Regular" onChange={handleChange}/>
                        </Col>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="Menses" label="Irregular" value="Irregular" onChange={handleChange}/>
                        </Col>
                      </Row>
                      </Col>

                      <Col md={4}>
        <Form.Label>Are you Pregnant:</Form.Label>
                      <Row>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="IsPregnant" label="Yes" value="1" onChange={handleChange}/>
                        
                        </Col>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="IsPregnant" label="No" value="0" onChange={handleChange}/>
                        
                        </Col>
                      </Row>
                      </Col>


                      <Col md={4}>
        <Form.Label>Delivery:</Form.Label>
                      <Row>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="Delivery" label="Normal" value="Normal" onChange={handleChange}/>
                        
                        </Col>
                        <Col>
                        <Form.Check type="radio" aria-label="radio 1" name="Delivery" label="LSCS" value="LSCS" onChange={handleChange}/>
                        
                        </Col>
                      </Row>
                      </Col>
                      </Row>      
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Treatment Explanation :</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="" name="TreatmentExplanation" onChange={handleChange}/>
       
      </Form.Group>
                          </Col>
                        </Row>





                        
                        <Row className="mt-3">
                          <Col>
        <Form.Label>Physical Generals</Form.Label>

        <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Craving:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Craving" onChange={handleChange}/>
      </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Aversions:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Aversions" onChange={handleChange}/>
      </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Thirst:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Thirst" onChange={handleChange}/>
      </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Perspiration:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Perspiration" onChange={handleChange}/>
      </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Sleep:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Sleep" onChange={handleChange}/>
      </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Dreams:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Dreams" onChange={handleChange}/>
      </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Thermals:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Thermals" onChange={handleChange}/>
      </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Bathing:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Bathing" onChange={handleChange}/>
      </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Covering:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Covering" onChange={handleChange}/>
      </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Seasons:</Form.Label>
        <Form.Control as="textarea" rows={2} name="Seasons" onChange={handleChange}/>
      </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Urine and Stool:</Form.Label>
        <Form.Control as="textarea" rows={2} name="UrineNStool"  onChange={handleChange}/>
      </Form.Group>
          </Col>
         
        </Row>
        <Row className="mt-2">
          <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>F/H:</Form.Label>
        <Form.Control as="textarea" rows={3} name="FH" onChange={handleChange}/>
      </Form.Group>
          </Col>
         
        </Row>
        <Row className="mt-2">
          <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>PERSONAL HISTORY</Form.Label>
        <Form.Control as="textarea" rows={3} name="PersonalHistory" onChange={handleChange}/>
      </Form.Group>
          </Col>
         
        </Row>


                       <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Mentals:</Form.Label>
        <Form.Control as="textarea" rows={4} name="Mentals" onChange={handleChange}/>
      </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Lifespace & Reactivity:</Form.Label>
        <Form.Control as="textarea" rows={4} name="LifespaceReactivity" onChange={handleChange}/>
      </Form.Group>
          </Col>
        </Row>    
                       <Row className="mt-2">
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Menses:</Form.Label>
        <Form.Control as="textarea" rows={4} name="MensesTotality" onChange={handleChange}/>
      </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Totality:</Form.Label>
        <Form.Control as="textarea" rows={4} name="Totality" onChange={handleChange}/>
      </Form.Group>
          </Col>
        </Row>    


        <Row className="mt-2">
          <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label style={{color:"black"}}>Medicine:</Form.Label>
        <Form.Control as="textarea" rows={4} name="Medicine" onChange={handleChange}/>
      </Form.Group>
          </Col>
         
        </Row>

        
                          </Col>
                        </Row>

                        {/* <Row>
                          <Col>
        
                          <Row>
                            <Col lg={4}>
                            <Row>
                              <Col lg={1}>
        <Form.Label className="mt-2">Meal:</Form.Label>
                              
                              </Col>
                              <Col lg={11}>
        <Form.Control type="text" placeholder="" />
                              
                              </Col>
                            </Row>
                            </Col>

                            <Col lg={8}>
                            <Row>
                              <Col lg={2}>
        <Form.Label style={{whiteSpace:"nowrap"}} className="mx-5 px-5 mt-2">Diet Details:</Form.Label>
                              
                              </Col>
                              <Col lg={10}>
        <Form.Control type="text" placeholder="" />
                              
                              </Col>
                            </Row>
                            </Col>
                          </Row>
                          </Col>
                        </Row> */}




                   <Row className='mt-3'>
                    
                    <Col>
                    <Form.Label>Diet :</Form.Label>

{inputList.map((x, i) => {
        return (
         <>
         <Row>
          <Col xs={12} md={6}>


          <Row>
                              {/* <Col lg={1}> */}
                              
                              {/* </Col> */}
                              <Col>
        <Form.Label className="mt-2">Meal</Form.Label>
        <Form.Control as="textarea" rows={2}  name="Meal"
              placeholder=""
              value={x.Meal}
              onChange={e => handleInputChange(e, i)} />
                              
                              </Col>
                            </Row>
          
            
          </Col>

          <Col xs={12} md={6}>

          <Row>
                              {/* <Col lg={3}> */}
                              
                              {/* </Col> */}
                              <Col>
        <Form.Label style={{whiteSpace:"nowrap"}} className="mt-2">Diet Details</Form.Label>
        <Form.Control as="textarea" rows={2} className="ml10"
              name="DietDetails"
              placeholder=""
              value={x.DietDetails}
              onChange={e => handleInputChange(e, i)} />
                              
                              </Col>
                            </Row>
          
            
          </Col>
          <Col>
          
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
          </Col>

          {/* <Col>
          
              {inputList.length - 1 === i && <button >Add</button>}
          </Col> */}
         </Row>
         <Row className="text-center m-5">
                          <Col>
                          {inputList.length - 1 === i &&<Button variant="" className="add-diet" onClick={handleAddClick}>Add more diet</Button>}
                          </Col>
                        </Row>
           
        </>
        );
      })}
                    
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                    </Col>
                    
                    </Row>     
























                        {/* <Row className="text-center m-5">
                          <Col>
                          <Button variant="" className="add-diet">Add more diet</Button>
                          </Col>
                        </Row> */}

                        <Row>
                          <Col>
                          <Button variant="" className="pc-back" onClick={()=>setCurrentTab((prev)=> prev - 1)}>Back</Button>
                          </Col>
                          <Col>
                          <Button variant="" className="pc-nxt" onClick={()=>
                            
                            {
                              // if(data.HairIssue.length<=0 || data.SufferingFrom.length<=0 || data.objDiet.length<=0){
                              //   Swal.fire({
                              //     icon:"warning",
                              //     titleText:"Please fill all the fields marked with red * !"
                              //   })
                              // }else{
                                setCurrentTab((prev)=> prev + 1)
                              // }
                            }
                            }>Next</Button>
                          </Col>
                        </Row>
                    </Form>
                </Tab>

                <Tab eventKey={2} title="Other Information">
                    <Form>
                      <Row>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Water Intake (Day) :</Form.Label>
       <InputGroup>
       
        <Form.Control type="text" placeholder="" name="WaterIntake" onChange={handleChange}/>
        <InputGroup.Text id="basic-addon2">(in ltrs.)</InputGroup.Text>
       </InputGroup>
        
      </Form.Group>
                        </Col>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Sleep Duration :</Form.Label>
       <InputGroup>
       
        <Form.Control type="text" placeholder="" name="SleepDuration" onChange={handleChange}/>
        <InputGroup.Text id="basic-addon2">(in hrs.)</InputGroup.Text>
       </InputGroup>
        
      </Form.Group>
                        </Col>
                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Stress :</Form.Label>
       {/* <InputGroup> */}
       
        <Form.Control type="text" placeholder="" name="Stress" onChange={handleChange}/>
        {/* <InputGroup.Text id="basic-addon2">(in ltrs.)</InputGroup.Text> */}
       {/* </InputGroup> */}
        
      </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Profession :</Form.Label>
       {/* <InputGroup> */}
       
        <Form.Control type="text" placeholder="" name="Profession" onChange={handleChange}/>
        {/* <InputGroup.Text id="basic-addon2">(in ltrs.)</InputGroup.Text> */}
       {/* </InputGroup> */}
        
      </Form.Group>
                        </Col>

                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Designation :</Form.Label>
       {/* <InputGroup> */}
       
        <Form.Control type="text" placeholder="" name="Designation" onChange={handleChange}/>
        {/* <InputGroup.Text id="basic-addon2">(in ltrs.)</InputGroup.Text> */}
       {/* </InputGroup> */}
        
      </Form.Group>
                        </Col>

                        <Col md={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        
        <Form.Label>Timing :</Form.Label>
       {/* <InputGroup> */}
       
        <Form.Control type="text" placeholder="" name="OfficeHours" onChange={handleChange}/>
        {/* <InputGroup.Text id="basic-addon2">(in ltrs.)</InputGroup.Text> */}
       {/* </InputGroup> */}
        
      </Form.Group>
                        </Col>
                      </Row>


                      <Row>
                        <Col lg={4}>
        <Form.Label>Reason for weight loss :</Form.Label>
                        <Row>
                          <Col>
                          <Form.Check type="radio" aria-label="option 1" label="Looks" name="ReasonOfWeightloss" value="Looks" onChange={handleChange}/>
                          </Col>
                          <Col>
                          <Form.Check type="radio" aria-label="option 1" label="Medical" name="ReasonOfWeightloss" value="Medical" onChange={handleChange}/>
                          </Col>
                          <Col>
                          <Form.Check type="radio" aria-label="option 1" label="Other" name="ReasonOfWeightloss" value="Other" onChange={handleChange}/>
                          </Col>
                        </Row>
                        </Col>

                        <Col lg={4}>
        <Form.Label>Marital Status :</Form.Label>
                        <Row>
                          <Col>
                          <Form.Check type="radio" aria-label="option 1" label="Married" name="MaritalStatus" value="Married" onChange={handleChange}/>
                          
                          </Col>
                          <Col>
                          <Form.Check type="radio" aria-label="option 1" label="Unmarried" name="MaritalStatus" value="Unmarried" onChange={handleChange}/>
                          
                          </Col>
                          <Col>
                          <Form.Check type="radio" aria-label="option 1" label="Single" name="MaritalStatus" value="Single" onChange={handleChange}/>
                          
                          </Col>
                        </Row>
                        </Col>
                      </Row>


                      <Row className="mt-5">
                        <Col>
                        <Button variant="" className="pc-back" onClick={()=>setCurrentTab((prev)=>prev - 1)}>Back</Button>
                        </Col>
                        <Col>
                        <Button variant="" className="pc-nxt" onClick={handleSubmitPatient}>Submit</Button>
                        </Col>
                      </Row>
                    </Form>
                </Tab>
            </Tabs>



            </Col>
        </Row>
       </Card>
   </Sidebar>
   </>
  )
}

export default ConvertToPatient