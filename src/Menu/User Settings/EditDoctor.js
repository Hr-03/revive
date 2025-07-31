import React, { useState, useMemo, useEffect } from 'react';
import "../../Styles/Menu/User Settings/AddDoctor.css";
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
import Collapse from "@mui/material/Collapse";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import menuIcon from "../../Assets/Vector.png";
import gearIcon from "../../Assets/gear.png";
import userGearIcon from "../../Assets/userGear.png";
import cliGearIcon from "../../Assets/cset.png";
import lp from "../../Assets/lp.png";
import report from "../../Assets/reports.png";
import calendarap from "../../Assets/calendar.png";

import axios from "axios";
import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";
import invoice from "../../Assets/invoice.png";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
import moment from 'moment';
import Sidebar from '../../Components/Sidebar';
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
function EditDoctor() {

    const [EditDoctor, setEditDoctor] = useState({
        UserID:"",
    FirstName: "",
    LastName: "",
    Gender: "",
    BirthDate: "",
    Nationality: "Indian",
    ClinicID: "",
    MobileNo: "",
    Email: "",
    Address1: "",
    Address2: "",
    CityId: "",
    StatesId: "",
    CountryId: "",
    Pincode: "",
    PersonalPhoto: "",
    PanCard: "",
    PanCardPhoto: "",
    IndemnityProofNumber: "",
    IndemnityProofPhoto: "",
    AadharCardNumber: "",
    AadharCardPhoto: "",
    RegistrationNumber: "",
    RegistrationPhoto: "",
    JoiningDate: "",
    
    DoctorType: "",
   
   
    InTime: "",
    OutTime: "",
    UserName: "",
    Passwords: "",
    Actions: "1",
    CreatedBy: "1",
    IPAddress: "1",
    })

    const navigate = useNavigate();
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
  
  let newuID=sessionStorage.getItem("newUserId");
  const [speciality, setSpeciality] = useState([]);
  
  const specialityUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetSpecialtyList`;
      useEffect(()=>{
        fetch(specialityUrl)
        .then((res)=>res.json())
        .then((spRes)=>{
          console.log(spRes.Data);
          setSpeciality(spRes.Data);
        })
      },[])
  
  //   const [profInfo, setProfInfo] = useState([])
  
  //   const profInfoUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetDocProfInfo/${newuID?newuID:0}`;
  
  const [specialityData, setspecialityData] = useState([])
  
  //   useEffect(()=>{
  // fetch(profInfoUrl)
  // .then((res)=>res.json())
  // .then((pinfo)=>{
  //   console.log(pinfo?.Data);
  //   setProfInfo(pinfo?.Data);

    
  // })
  //   },[profInfo])


    const columns = useMemo(
      () => [
        {
          accessorKey: "srNo",
          header: "Sr No.",
          muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
        },
        {
          accessorKey: "DoctorDegree",
          header: "Degree",
        },
        {
          accessorKey: "BoardOrUniversity",
          header: "University/College/Board",
        },
        //   {
        //     accessorKey: "specialty",
        //     header: "Specialty In?",
        //   },
        {
          accessorKey: "DegreeProofPhoto",
          header: "Degree Proof",
          Cell:({cell})=>{
            let edate=cell.getValue()
            return <img src={edate} width={150} height={150}/>
          }
        },
  
        {
          accessorKey: "Specialty",
          header: "Speciality in",
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
  
    const [data, setData] = useState(
      [
        {
          srNo: 1,
          degree: "Doctor of Medicine (MD)",
          university: "K. J. Somaiya Medical College & Research Centre",
          specialty: "implant",
          degreeProof: (
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              width={50}
            />
          ),
          // view:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
          // download:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>
        },
        {
          srNo: 2,
          degree: "BDS",
          university: "K. J. Somaiya Medical College & Research Centre",
          specialty: "Crowning",
          degreeProof: (
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              width={50}
            />
          ),
          // view:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
          // download:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>
        },
        //   {
        //     srNo: 2,
        //     Photo: (
        //       <img
        //         src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        //         width={150}
        //         height={120}
        //       />
        //     ),
        //     Name: "Dr. Bhavik Tutwala",
        //     mobileNumber: "95261663263",
        //     emailID: "bhaviktutwala@gmail.com",
        //     regDate: "16/02/2023",
        //     // view:<img src="https://flyclipart.com/thumb2/x-button-327024.png" width={50}/>,
        //     // download:"unChecked"
        //   },
      ],
      []
    );
  
  
    const [Progress1, setProgress1] = useState(null);
    const [Progress2, setProgress2] = useState(null);
    const [Progress3, setProgress3] = useState(null);
    const [Progress4, setProgress4] = useState(null);
    const [Progress5, setProgress5] = useState(null);
  
    const [Progressproof, setProgressproof] = useState(null);
  
  
  
    const [previewUrl62, setPreviewUrl62] = useState("");
    //   const [image662, setImage662] = useState(null);
  
    const [degProof, setDegProof] = useState(null);
  
    const [doc1, setDoc1] = useState(null);
    const [doc2, setDoc2] = useState(null);
    const [doc3, setDoc3] = useState(null);
    const [doc4, setDoc4] = useState(null);
    const [doc5, setDoc5] = useState(null);
  
    const handleFile662 = (e) => {
      // setImage662(e);
      setPreviewUrl62(URL.createObjectURL(e));
      console.log(e);
      // setstate662(file);      to add in formdata
      setDegProof(e);
      // setDegProof((pre)=>{
      //   return{
      //     ...pre,
      //     degProof:e
      //   }
      // })
    };
    const [currentTab, setCurrentTab] = useState(0);
  
    const [previewUrl1, setPreviewUrl1] = useState("");
    const [previewUrl2, setPreviewUrl2] = useState("");
    const [previewUrl3, setPreviewUrl3] = useState("");
    const [previewUrl4, setPreviewUrl4] = useState("");
    const [previewUrl5, setPreviewUrl5] = useState("");
  
    const handleFile1 = (e) => {
      // setImage662(e);
      setPreviewUrl1(URL.createObjectURL(e));
      console.log(e);
      // setstate662(file);      to add in formdata
  
      setDoc1(e);
    };
  
    const handleFile2 = (e) => {
      // setImage662(e);
      setPreviewUrl2(URL.createObjectURL(e));
      console.log(e);
      // setstate662(file);      to add in formdata
      setDoc2(e);
    };
  
    const handleFile3 = (e) => {
      // setImage662(e);
      setPreviewUrl3(URL.createObjectURL(e));
      console.log(e);
      // setstate662(file);      to add in formdata
      setDoc3(e);
    };
  
    const handleFile4 = (e) => {
      // setImage662(e);
      setPreviewUrl4(URL.createObjectURL(e));
      console.log(e);
      // setstate662(file);      to add in formdata
  
      setDoc4(e);
    };
  
    const handleFile5 = (e) => {
      // setImage662(e);
      setPreviewUrl5(URL.createObjectURL(e));
      console.log(e);
      // setstate662(file);      to add in formdata
  
      setDoc5(e);
    };
  
    // -------------------------------------------------------formdata upload-----------------------------------------------------
  
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
      let url =
        "https://reviveapplication.com/ReviveAPI/Revive.svc/GetCountryList";
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
      const newdata = { ...EditDoctor };
      newdata[e.target.name] = e.target.value;
      setEditDoctor(newdata);
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
    let mobilePattern = /[^0-9+]/;
    let namePattern = /[^a-zA-Z ]/;
  
  
    const handleTab1=(e)=>{
      if(EditDoctor.DoctorType===""||EditDoctor.ClinicID===""||EditDoctor.FirstName===""||EditDoctor.LastName===""||EditDoctor.MobileNo===""||EditDoctor.Gender===""||EditDoctor.JoiningDate===""){
        // alert("test");
        Swal.fire({
          icon: "warning",
          titleText:"Please fill all the fields marked with red * !",
        })
      }
      else if(EditDoctor.Address1.match(addressPattern) || EditDoctor.Address2.match(addressPattern)){
        Swal.fire({
          icon:"warning",
          titleText:"Address should not contain special characters like !@# etc!",
          text:"Only . and , allowed"
        })
      } else if(EditDoctor.MobileNo.length>15){
        Swal.fire({
          icon:"warning",
          titleText:"Phone no. cannot be more than 15 digits!",
          // text:"xsdscs"
        })
      }
      else if(EditDoctor.MobileNo.length<7){
        Swal.fire({
          icon:"warning",
          titleText:"Phone no. cannot be less than 7 digits!",
          // text:"xsdscs"
        })
      }
      else if(EditDoctor.MobileNo.match(mobilePattern)){
        Swal.fire({
          icon:"warning",
          titleText:"Mobile no. should contain only digits!"
        })
      }
      else if(EditDoctor.FirstName.match(namePattern) || EditDoctor.LastName.match(namePattern)){
        Swal.fire({
          icon:"warning",
          titleText:"Name should conatain alphabets only!"
        })
      }
      else{
  
        setCurrentTab((prev) => prev + 1);
      }
  
    }
  
  
    const handleSubmit=(e)=>{
      e.preventDefault();
  
  
      const submitUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewUser`;
  
      fetch(submitUrl,{
        method:"POST",
        headers:{
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(EditDoctor)
      })
      .then((res)=>res.json())
      .then((drRes)=>{
        console.log(drRes);
        if(drRes.status===true){
          Swal.fire({
            icon:"success",
            title:"Updated successfully!",
            timer:2000
          })
          navigate("/dr-reg");
          sessionStorage.removeItem("newUserId");
    // setProfInfo([]);
  
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
  
    const [drType, setDrType] = useState([]);
  
    const drTypeUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetDoctorType`;
    useEffect(() => {
      fetch(drTypeUrl)
        .then((res) => res.json())
        .then((dtype) => {
          console.log(dtype.Data);
          setDrType(dtype.Data);
        });
    }, []);
  
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
  
    const [degree, setDegree] = useState([]);
  
    const degUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetDoctorDegree`;
  
    useEffect(() => {
      fetch(degUrl)
        .then((res) => res.json())
        .then((degRes) => {
          console.log(degRes.Data);
          setDegree(degRes.Data);
        });
    }, []);
  
    const submitDoc1 = async (e) => {
      e.preventDefault();
  
      const fd = new FormData();
  
      fd.append("stream", doc1);
  
      await axios
        .post(
          "https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              setProgress1(
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              );
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
          setEditDoctor((pre) => {
            return { ...pre, PersonalPhoto: imgPath };
          });
  
          console.log(EditDoctor);
  
          if(res.data.status==="1"){
            setProgress1(null);
  
            
            Swal.fire({
              icon:"success",
              title:"Uploaded successfully!",
              timer:2000,
              showConfirmButton:false
            })
          }
        });
    };
  
    const submitDoc2 = async (e) => {
      e.preventDefault();
  
      const fd = new FormData();
  
      fd.append("stream", doc2);
  
      await axios
        .post(
          "https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              setProgress2(
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              );
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
          setEditDoctor((pre) => {
            return { ...pre, AadharCardPhoto: imgPath };
          });
  
          console.log(EditDoctor);
  
          if(res.data.status==="1"){
            setProgress2(null);
  
            Swal.fire({
              icon:"success",
              title:"Uploaded successfully!",
              timer:2000,
              showConfirmButton:false
            })
          }
        });
    };
  
    const submitDoc3 = async (e) => {
      e.preventDefault();
  
      const fd = new FormData();
  
      fd.append("stream", doc3);
  
      await axios
        .post(
          "https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              setProgress3(
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              );
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
          setEditDoctor((pre) => {
            return { ...pre, PanCardPhoto: imgPath };
          });
  
          console.log(EditDoctor);
  
  
          if(res.data.status==="1"){
            setProgress3(null);
           
            Swal.fire({
              icon:"success",
              title:"Uploaded successfully!",
              timer:2000,
              showConfirmButton:false
            })
          }
        });
    };
  
    const submitDoc4 = async (e) => {
      e.preventDefault();
  
      const fd = new FormData();
  
      fd.append("stream", doc4);
  
      await axios
        .post(
          "https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              setProgress4(
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              );
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
          setEditDoctor((pre) => {
            return { ...pre, RegistrationPhoto: imgPath };
          });
  
          console.log(EditDoctor);
  
  
          if(res.data.status==="1"){
            setProgress4(null);
  
            Swal.fire({
              icon:"success",
              title:"Uploaded successfully!",
              timer:2000,
              showConfirmButton:false
            })
          }
        });
    };
  
    const submitDoc5 = async (e) => {
      e.preventDefault();
  
      const fd = new FormData();
  
      fd.append("stream", doc5);
  
      await axios
        .post(
          "https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              setProgress5(
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              );
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
          setEditDoctor((pre) => {
            return { ...pre, IndemnityProofPhoto: imgPath };
          });
  
          console.log(EditDoctor);
  
          if(res.data.status==="1"){
            setProgress5(null);
            Swal.fire({
              icon:"success",
              title:"Uploaded successfully!",
              timer:2000,
              showConfirmButton:false
            })
          }
        });
    };
  
  
  
  
  
    const [addDocTab2, setAddDocTab2] = useState({
      UserID:"",
      DoctorDegree:"",
      DegreeProofPhoto:"",
      BoardOrUniversity:"",
      Specialty:[]
    })
  
    const handlecheck = (e) => {
      const { value, checked } = e.target;
  
      // Case 1 : The user checks the box
      if (checked) {
        setAddDocTab2((pre) => {
          return {
            ...pre,
            Specialty: [...pre.Specialty, value],
          };
        });
      }
  
      // Case 2 : The user unchecks the box
      else {
        setAddDocTab2((pre) => {
          return {
            ...pre,
            Specialty: pre.Specialty.filter((e) => e !== value),
          };
        });
      }
  
      console.log(addDocTab2);

      // console.log(specialityData);
    };
  
    const handleTab2Change=(e)=>{
      const changedData = { ...addDocTab2 };
      changedData[e.target.name] = e.target.value;
      setAddDocTab2(changedData);
      console.log(changedData);
  
    }
  
  //   const [pathofProof, setPathofProof] = useState("");
  //   useEffect(()=>{
  // console.log("path of proof");
  // console.log(pathofProof);
  //   },[])
  
    const submitTab2= async (e)=>{
     
  
  
  
  // console.log("below is path");
  //       console.log(addDocTab2);
  
        
  
  
  
  
  
        const Tab2Url=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddDocProfInfo`;
  
  
        let n={
          ...addDocTab2,
          Specialty:addDocTab2.Specialty.toString()
        }
  
        fetch(Tab2Url,{
          method:"POST",
            headers:{
              Accept: "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(n)
        })
        .then((res)=>res.json())
        .then((tab2Res)=>{
          console.log(tab2Res);
          if(tab2Res.status===true){
            Swal.fire({
              icon:"success",
              title:"Professional Information added successfully! click Next.",
              // titleText:"click Next!"
            })
          }
          let userid=tab2Res.UserID;
  
          sessionStorage.setItem("newUserId",userid);
          setEditDoctor((pre)=>{
            return{
              ...pre,
              UserID:userid
              
            }
          })
        })
      // }
      // else{
      //   alert("please select degree proof file!")
      // }
  
  
  
  
      
  
  
  
    }
  
  let doctorId=sessionStorage.getItem("doctorId");
  const getDetails=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetDoctorEditInfo/${doctorId}`;

  
    useEffect(()=>{
//   if(window.location.pathname!="/add-dr"){
//     alert("alert");
//   }

fetch(getDetails)
.then((res)=>res.json())
.then((result)=>{
    console.log(result.Data[0]);

    setEditDoctor((pre)=>{
        return{
            ...pre,
            DoctorType:result.Data[0]?.DoctorType,
        ClinicID:result.Data[0]?.ClinicID,
        FirstName:result.Data[0]?.FirstName,
        LastName:result.Data[0]?.LastName,
        MobileNo:result.Data[0]?.MobileNo,
        Email:result.Data[0]?.Email,
        BirthDate:result.Data[0]?.BirthDate,
        Gender:result.Data[0]?.Gender,
        JoiningDate:result.Data[0]?.JoiningDate,
        Address1:result.Data[0]?.Address1,
        Address2:result.Data[0]?.Address2,
        CountryId:result.Data[0]?.CountryId,
        StatesId:result.Data[0]?.StatesId,
        CityId:result.Data[0]?.CityId,
        Pincode:result.Data[0]?.Pincode,
        InTime:result.Data[0]?.InTime,
        OutTime:result.Data[0]?.OutTime,
        UserName:result.Data[0]?.username,
        UserID:result.Data[0]?.UserID,
        Passwords:result.Data[0]?.Passwords,
        PersonalPhoto:result.Data[0]?.PersonalPhoto,
        AadharCardPhoto:result.Data[0]?.AadharCardPhoto,
        PanCardPhoto:result.Data[0]?.PanCardPhoto,
        RegistrationPhoto:result.Data[0]?.RegistrationPhoto,
        IndemnityProofPhoto:result.Data[0]?.IndemnityProofPhoto,
        AadharCardNumber:result.Data[0]?.AadharCardNumber,
        PanCard:result.Data[0]?.PanCard,
        RegistrationNumber:result.Data[0]?.RegistrationNumber,
        IndemnityProofNumber:result.Data[0]?.IndemnityProofNumber
        
        }
    })


    setAddDocTab2((pre)=>{
      return{
        ...pre,
        DoctorDegree:result.Data[0]?.DoctorDegree,
        DegreeProofPhoto:result.Data[0]?.DegreeProofPhoto,
        BoardOrUniversity:result.Data[0]?.BoardOrUniversity,
        UserID:result.Data[0]?.UserID,
        Specialty:result.Data[0]?.Specialty
      }
    })


    setspecialityData(result.Data[0]?.Specialty)
})
    },[])
  return (
   <>
 <Sidebar>
 <Card className="m-1 mt-3 add-dr-crd p-3">
            <Row>
              <Col>
                <p className="add-dr-t">Edit Doctor</p>
            <p className="note-t"><span className="req-f">Note: </span> Fields marked with * are mandatory to fill!</p>

                <hr />

                {/* <Row className="p-5">
                <Col>
                <p className="text-center hpathy-nodata mb-1">No Data available</p>
                <p className="text-center hpathy-add-t">Click on add new to add treatments</p>

                    <Row className="text-center mt-5">
                        <Col>
                        
                <Button variant="" className="hpathy-btn">Add New</Button>
                        </Col>
                    </Row>
                </Col>
            </Row> */}

                <Tabs
                  variant="pills"
                  //   defaultActiveKey={currentTab}
                  activeKey={currentTab}
                  id="justify-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey={0} title="Personal Information">
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Doctor Type <span className="req-f">*</span></Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="DoctorType"
                              value={EditDoctor?.DoctorType}
                              onChange={handleChange}
                            >
                              <option></option>
                              {drType.map((dt) => {
                                return (
                                  <>
                                    <option
                                      value={dt?.DoctorTypeID}
                                      key={dt?.DoctorTypeID}
                                    >
                                      {dt?.DoctorType}
                                    </option>
                                  </>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Branch <span className="req-f">*</span></Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="ClinicID"
                              value={EditDoctor?.ClinicID}
                              onChange={handleChange}
                            >
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
                      </Row>

                      <Row>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>First Name <span className="req-f">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder=""
                              name="FirstName"
                              value={EditDoctor?.FirstName}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Last Name <span className="req-f">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder=""
                              value={EditDoctor?.LastName}

                              name="LastName"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Mobile Number <span className="req-f">*</span></Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder=""
                              name="MobileNo"
                              value={EditDoctor?.MobileNo}

                              // pattern="/09(0[1-2]|1[\d]|3[\d]|2[0-1])[\d]{3}[\d]{4}/g"
                              className="cno"
                              onChange={handleChange}
                            />

                            <Form.Text className="cnotxt">dfw</Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control
                              type="email"
                              value={EditDoctor?.Email}

                              placeholder=""
                              name="Email"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        {/* <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder=""
                              name="Age"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col> */}
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder=""
                              value={moment((EditDoctor?.BirthDate))?.format("YYYY-MM-DD")}

                              name="BirthDate"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Gender <span className="req-f">*</span></Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="Gender"
                              value={EditDoctor?.Gender}

                              onChange={handleChange}
                            >
                              <option></option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Date <span className="req-f">*</span></Form.Label>
                            <Form.Control
                              type="date"
                              placeholder=""
                              value={moment((EditDoctor?.JoiningDate))?.format("YYYY-MM-DD")}

                              name="JoiningDate"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              placeholder=""
                              value={EditDoctor?.Address1}

                              name="Address1"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              placeholder=""
                              value={EditDoctor?.Address2}

                              name="Address2"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Country</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="CountryId"
                              value={EditDoctor?.CountryId}

                              onChange={handleChange}
                            >
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
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>State</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="StatesId"
                              value={EditDoctor?.StatesId}

                              onChange={handleChange}
                            >
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
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>City</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="CityId"
                              value={EditDoctor?.CityId}

                              onChange={handleChange}
                            >
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
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Area Pin Code</Form.Label>
                            <Form.Control
                              type="number"
                              maxLength={6}
                              placeholder=""
                              value={EditDoctor?.Pincode}

                              name="Pincode"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>In Time</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder=""
                              value={EditDoctor?.InTime}

                              name="InTime"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Out Time</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder=""
                              name="OutTime"
                              value={EditDoctor?.OutTime}

                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Username <span className="req-f">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder=""
                              name="UserName"
                              value={EditDoctor?.UserName}

                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Password <span className="req-f">*</span></Form.Label>
                            <Form.Control
                              type="password"
                              placeholder=""
                              name="Passwords"
                              value={EditDoctor?.Passwords}

                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="text-center mt-4">
                        <Col>
                          <Button
                            variant=""
                            className="dr-nxt-btn"
                            onClick={() =>handleTab1()}
                          >
                            Next
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Tab>
                  <Tab eventKey={1} title="Professional Information">
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Degree <span className="req-f">*</span></Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="DoctorDegree"
                              value={addDocTab2?.DoctorDegree}
                              onChange={handleTab2Change}
                            >
                              <option></option>
                              {degree.map((d) => {
                                return (
                                  <>
                                    <option value={d.DegreeID} key={d.DegreeID}>
                                      {d.Name}
                                    </option>
                                  </>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>


                          <Row>
                            <Col lg={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Upload Degree Proof <span className="req-f">*</span></Form.Label>
                                <Form.Control
                                  type="file"
                                  placeholder=""
                                  //   ref={fileInput62}
                                  name="DegreeProofPhoto"
                                  onChange={(e) =>
                                    handleFile662(e.target.files[0])
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={3}>
                              {previewUrl62 ? (
                                previewUrl62 && (
                                  <img
                                    src={previewUrl62}
                                    alt="image"
                                    className="img-s mt-4"
                                    width={150}
                                    height={150}
                                  />
                                )
                              ) : (
                                <img
                                  src={addDocTab2?.DegreeProofPhoto?addDocTab2?.DegreeProofPhoto:"https://wallpaperaccess.com/full/1285952.jpg"}
                                  alt="image"
                                  className="img-s mt-4"
                                  width={150}
                                  height={150}
                                />
                              )}
                            </Col>

                            {
                              degProof?
                              <Col lg={3}>
                              <Button className="pc-upImg mt-4" onClick={async (e)=>{
                                 e.preventDefault();

                                 const fd=new FormData();
                             
                            
                             
                                   fd.append("stream",degProof);
                             
                                   await axios
                                   .post(
                                     "https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos",
                                     fd,
                                     {
                                       onUploadProgress: (ProgressEvent) => {
                                        setProgressproof(
                                          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                                        );
                                         console.log(
                                           "Upload Progress:" +
                                             Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                                             "%"
                                         );
                                       },
                                     }
                                   ).then((res)=>{
                                     console.log("axios upload res");
                                     console.log(res.data.data);
                                     let degP=res.data.data[0]?.imageurl;
                             
                                    //  setPathofProof(degP);
                                     setAddDocTab2((pre)=>{
                                       return{
                                         ...pre,
                                         DegreeProofPhoto:degP
                                       }
                                     })
                                     
                             
                                     if(res.data.status==="1"){
          setProgressproof(null);

                                      Swal.fire({
                                        icon: 'success',
                                        title: 'Uploaded successfully!',
                                        timer:2000,
                                        showConfirmButton:false
                                      })
                                     }
                                   })
                              }}>Upload image</Button><span>{Progressproof &&
                                // <ProgressBar variant="success" className="m-2 mx-0" now={Progress} label={`${Progress}%`} min={0} max={100} style={{width:`${Progress}%`}}/>
                                <Spinner animation="border" id=""/>
                                }</span>
                              </Col>:""
                            }
                           
                          </Row>
                        </Col>

                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>University/College/Board <span className="req-f">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder=""
                              value={addDocTab2?.BoardOrUniversity}
                              name="BoardOrUniversity"
                              onChange={handleTab2Change}
                            />
                          </Form.Group>
                        </Col>

                        {/* <Col lg={4}> */}
                        
                        {/* </Col> */}
                      </Row>

                      <Row>
                        <Col lg={6}>
                          <Form.Label>Specialty In?</Form.Label>
                          <Row>
                            
                                    <Col>
                              <Form.Check
                                aria-label="option 1"
                                name="Specialty"
                                checked={`${addDocTab2.Specialty.includes("3")?"checked":""}`}
                                value="3"
                                label="Hair"
                                onChange={handlecheck}
                              />
                            </Col>
                                    <Col>
                              <Form.Check
                                aria-label="option 1"
                                name="Specialty"
                                checked={`${addDocTab2.Specialty.includes("2")?"checked":""}`}
                                value="2"
                                label="Skin"
                                onChange={handlecheck}
                              />
                            </Col> 
                                    <Col>
                              <Form.Check
                                aria-label="option 1"
                                name="Specialty"
                                checked={`${addDocTab2.Specialty.includes("4")?"checked":""}`}
                                value="4"
                                label="Weightloss"
                                onChange={handlecheck}
                              />
                            </Col>
                                  
                          

                            {/* <Col>
                              <Form.Check
                                aria-label="option 1"
                                name="Specialty"
                                value="Hair"
                                label="Hair"
                                onChange={handlecheck}
                              />
                            </Col> */}
                          </Row>

                          {/* <Row>
                            <Col>
                              <Form.Check
                                aria-label="option 1"
                                name="Specialty"
                                value="weight loss"
                                label="weight loss"
                                onChange={handlecheck}
                              />
                            </Col>

                            <Col>
                              <Form.Check
                                aria-label="option 1"
                                name="Specialty"
                                
                                value="fat loss"
                                label="fat loss"

                                onChange={handlecheck}
                              />
                            </Col>
                          </Row> */}
                        </Col>
                      </Row>

                      <Row className="text-center mt-4">
                        <Col>
                          <Button variant="" className="add-dr-btn" onClick={submitTab2}>
                            ADD
                          </Button>
                        </Col>
                      </Row>
                    </Form>

                    {/* <Row className="mt-4">
                      <Col>
                        <MaterialReactTable
                          columns={columns}
                          data={profInfo}
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
                                  // onClick={() => table.setEditingRow(row)}
                                  disabled
                                >
                                  <FaRegEdit />
                                </IconButton>
                              </Tooltip>
                              <Tooltip arrow placement="right" title="Delete">
                                <IconButton
                                  color="error"
                                  // onClick={() => handleDeleteRow(row)}
                                  disabled

                                >
                                  <HiOutlineTrash />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                          //   renderTopToolbarCustomActions={() => (
                          //     <>
                          //     <Button
                          //       // color="secondary"
                          //       className="dr-btn"
                          //       onClick={() => {
                          //         // setCreateModalOpen(true);
                          //         // handleShowAddRole();
                          //         navigate("/add-dr")

                          //       }}
                          //       variant="contained"
                          //     >
                          //      Add New Doctor
                          //     </Button>

                          //     <Button
                          //     // color="secondary"
                          //     className="dr-up-btn mx-2"
                          //     onClick={() => {
                          //     // setCreateModalOpen(true);
                          //     // handleShowAddRole();
                          //     // navigate("/add-access")

                          //     }}
                          //     variant="contained"
                          //     >
                          //     Upload Excel
                          //     </Button>
                          //     </>

                          //   )}

                          positionActionsColumn="last"
                        />
                      </Col>
                    </Row> */}

                    <Row className="mt-4">
                      <Col>
                        <Button
                          variant=""
                          className="add-dr-back"
                          onClick={() => {
                            setCurrentTab((prev) => prev - 1);
                          }}
                        >
                          Back
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant=""
                          className="dr-nxt-btn"
                          onClick={() => {
                            if(addDocTab2.BoardOrUniversity==="" || addDocTab2.DoctorDegree==="" || addDocTab2.DoctorDegree===""){
                              Swal.fire({
                                icon:"warning",
                                title:"Please fill all the fields marked with red * and also after uploading degree proof click on Add button!"
                              })
                            }else{

                              setCurrentTab((prev) => prev + 1);
                            }
                          }}
                        >
                          Next
                        </Button>
                      </Col>
                    </Row>
                  </Tab>

                  <Tab eventKey={2} title="Documents">
                    <Form>
                      <Row className="m-1 mt-4">
                        <Col xs={12} lg={6}>
                          <Row>
                            <Col lg={5}>
                              <Form.Label className="">
                                Personal Photo
                              </Form.Label>
                              <Form.Group
                                controlId="formFile"
                                className="mt-3 pt-2"
                              >
                                <Form.Control
                                  type="file"
                                  name="PersonalPhoto"
                                  onChange={(e) =>
                                    handleFile1(e.target.files[0])
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Row className="mt-4 pt-2">
                                <Col>
                                  <Button
                                    variant=""
                                    className="up-doc mt-4 mx-0 mx-lg-5"
                                    onClick={submitDoc1}
                                    // disabled={!doc1}
                                  >
                                    Upload Image
                                  </Button> <span>{Progress1 &&
                      // <ProgressBar variant="success" className="m-2 mx-0" now={Progress} label={`${Progress}%`} min={0} max={100} style={{width:`${Progress}%`}}/>
                      <Spinner animation="border" id="spin1"/>
                      }</span>
                                  
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={3}>
                              {previewUrl1 ? (
                                previewUrl1 && (
                                  <img
                                    src={previewUrl1}
                                    alt="image"
                                    className="img-s mt-4"
                                    width={150}
                                    height={150}
                                  />
                                )
                              ) : (
                                <Row className="mt-2">
                                  <Col>
                                    <img
                                      src={EditDoctor.PersonalPhoto?EditDoctor.PersonalPhoto:"https://wallpaperaccess.com/full/1285952.jpg"}
                                      alt="image"
                                      className="img-s mt-5"
                                      // style={{float:"left"}}

                                      width={150}
                                      height={150}
                                    />
                                  </Col>
                                </Row>
                              )}
                            </Col>
                          </Row>

                          <Row className="mt-5 mb-0">
                            <Col lg={2}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Pan Card</Form.Label>
                              </Form.Group>
                            </Col>
                            <Col lg={9}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control
                                  type="text"
                                  name="PanCard"
                                  value={EditDoctor?.PanCard}
                                  className=""
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={5}>
                              <Form.Group controlId="formFile" className="mt-1">
                                <Form.Label className="">
                                  Pan card image
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="PanCardPhoto"
                                  onChange={(e) =>
                                    handleFile3(e.target.files[0])
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Row className="mt-1 pt-2">
                                <Col>
                                  <Button
                                    variant=""
                                    className="up-doc mt-4 mx-0 mx-lg-5"
                                    onClick={submitDoc3}
                                  >
                                    Upload Image
                                  </Button><span>{Progress3 &&
                      // <ProgressBar variant="success" className="m-2 mx-0" now={Progress} label={`${Progress}%`} min={0} max={100} style={{width:`${Progress}%`}}/>
                      <Spinner animation="border" id="spin3"/>
                      }</span>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={3}>
                              {previewUrl3 ? (
                                previewUrl3 && (
                                  <img
                                    src={previewUrl3}
                                    alt="image"
                                    className="img-s mt-4"
                                    width={150}
                                    height={150}
                                  />
                                )
                              ) : (
                                <Row className="mt-2">
                                  <Col>
                                    <img
                                      src={EditDoctor?.PanCardPhoto?EditDoctor?.PanCardPhoto:"https://wallpaperaccess.com/full/1285952.jpg"}
                                      alt="image"
                                      className="img-s mt-4"
                                      // style={{float:"left"}}

                                      width={150}
                                      height={150}
                                    />
                                  </Col>
                                </Row>
                              )}
                            </Col>
                          </Row>

                          <Row className="mt-5 mb-0">
                            <Col lg={2}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>
                                  Indemnity Proof
                                </Form.Label>
                              </Form.Group>
                            </Col>
                            <Col lg={9}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control
                                  type="text"
                                  name="IndemnityProofNumber"
                                  value={EditDoctor?.IndemnityProofNumber}
                                  className="iproof"
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={5}>
                              <Form.Group controlId="formFile" className="mt-1">
                                <Form.Label className="">
                                  Indemnity proof image
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="IndemnityProofPhoto"
                                  onChange={(e) =>
                                    handleFile5(e.target.files[0])
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Row className="mt-1 pt-2">
                                <Col>
                                  <Button
                                    variant=""
                                    className="up-doc mt-4 mx-0 mx-lg-5"
                                    onClick={submitDoc5}
                                  >
                                    Upload Image
                                  </Button><span>{Progress5 &&
                      // <ProgressBar variant="success" className="m-2 mx-0" now={Progress} label={`${Progress}%`} min={0} max={100} style={{width:`${Progress}%`}}/>
                      <Spinner animation="border" id="spin5"/>
                      }</span>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={3}>
                              {previewUrl5 ? (
                                previewUrl5 && (
                                  <img
                                    src={previewUrl5}
                                    alt="image"
                                    className="img-s mt-2"
                                    width={150}
                                    height={150}
                                  />
                                )
                              ) : (
                                <Row className="mt-2">
                                  <Col>
                                    <img
                                      src={EditDoctor?.IndemnityProofPhoto?EditDoctor?.IndemnityProofPhoto:"https://wallpaperaccess.com/full/1285952.jpg"}
                                      alt="image"
                                      className="img-s mt-4"
                                      // style={{float:"left"}}

                                      width={150}
                                      height={150}
                                    />
                                  </Col>
                                </Row>
                              )}
                            </Col>
                          </Row>
                        </Col>

                        <Col xs={12} lg={6}>
                          <Row>
                            <Col lg={2}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>
                                  Aadhaar Card
                                </Form.Label>
                              </Form.Group>
                            </Col>
                            <Col lg={10}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control
                                  type="number"
                                  name="AadharCardNumber"
                                  value={EditDoctor?.AadharCardNumber}
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={5}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="doc-lbl">
                                  Aadhaar card image
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="AadharCardPhoto"
                                  onChange={(e) =>
                                    handleFile2(e.target.files[0])
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Row className="mt-2">
                                <Col>
                                  <Button
                                    variant=""
                                    className="up-doc mt-4 mx-0 mx-lg-5"
                                    onClick={submitDoc2}
                                  >
                                    Upload Image
                                  </Button><span>{Progress2 &&
                      // <ProgressBar variant="success" className="m-2 mx-0" now={Progress} label={`${Progress}%`} min={0} max={100} style={{width:`${Progress}%`}}/>
                      <Spinner animation="border" id="spin2"/>
                      }</span>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={3}>
                              {previewUrl2 ? (
                                previewUrl2 && (
                                  <img
                                    src={previewUrl2}
                                    alt="image"
                                    className="img-s mt-4"
                                    style={{ float: "right" }}
                                    width={150}
                                    height={150}
                                  />
                                )
                              ) : (
                                <img
                                  src={EditDoctor?.AadharCardPhoto?EditDoctor?.AadharCardPhoto:"https://wallpaperaccess.com/full/1285952.jpg"}
                                  alt="image"
                                  className="img-s mt-4"
                                  style={{ float: "right" }}
                                  width={150}
                                  height={150}
                                />
                              )}
                            </Col>
                          </Row>

                          <Row className="mt-4">
                            <Col lg={2}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Registration</Form.Label>
                              </Form.Group>
                            </Col>
                            <Col lg={10}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control
                                  type="text"
                                  name="RegistrationNumber"
                                  value={EditDoctor?.RegistrationNumber}
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={5}>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="doc-lbl">
                                  Certificate image
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  name="RegistrationPhoto"
                                  onChange={(e) =>
                                    handleFile4(e.target.files[0])
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={4}>
                              <Row className="mt-2">
                                <Col>
                                  <Button
                                    variant=""
                                    className="up-doc mt-4 mx-0 mx-lg-5"
                                    onClick={submitDoc4}
                                  >
                                    Upload Image
                                  </Button><span>{Progress4 &&
                      // <ProgressBar variant="success" className="m-2 mx-0" now={Progress} label={`${Progress}%`} min={0} max={100} style={{width:`${Progress}%`}}/>
                      <Spinner animation="border" id="spin4"/>
                      }</span>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={3}>
                              {previewUrl4 ? (
                                previewUrl4 && (
                                  <img
                                    src={previewUrl4}
                                    alt="image"
                                    className="img-s mt-4"
                                    style={{ float: "right" }}
                                    width={150}
                                    height={150}
                                  />
                                )
                              ) : (
                                <img
                                  src={EditDoctor?.RegistrationPhoto?EditDoctor?.RegistrationPhoto:"https://wallpaperaccess.com/full/1285952.jpg"}
                                  alt="image"
                                  className="img-s mt-4"
                                  style={{ float: "right" }}
                                  width={150}
                                  height={150}
                                />
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="mt-5">
                        <Col>
                          <Button
                            variant=""
                            className="add-dr-back"
                            onClick={() => {
                              setCurrentTab((prev) => prev - 1);
                            }}
                          >
                            Back
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant=""
                            className="add-dr-btn"
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
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

export default EditDoctor