import React,{useState,useEffect,useMemo} from 'react';
import "../Styles/Invoice.css";
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

import { MdLogout } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import invoice from "../Assets/invoice.png";
import Swal from 'sweetalert2';
import addTmnt from "../Assets/addtmt.png";
import addColl from "../Assets/addcoln.png";
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
  

function ConsultationInvoice() {

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

    const [patients, setPatients] = useState([]);

    const pUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientList`;
    
    useEffect(()=>{
       fetch(pUrl)
       .then((res)=>res.json())
       .then((pnt)=>{
        console.log(pnt?.Data);
        setPatients(pnt?.Data);

       })
    },[])

    const [drs, setDrs] = useState([]);

const drUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetDoctorDetails/0`;
useEffect(()=>{
fetch(drUrl)
.then((res)=>res.json())
.then((getDr)=>{
  console.log(getDr.Data);
  setDrs(getDr.Data);
})
},[])

const [branchList, setBranchList] = useState([]);

const branchUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetClinicList/0/0`;

  useEffect(()=>{
    fetch(branchUrl)
    .then((res)=>res.json())
    .then((branch)=>{
      
      console.log(branch.Data);
      
      setBranchList(branch.Data);

    })

  },[])

  // const [patientid, setPatientid] = useState("");

  let patientid=sessionStorage.getItem("patientId");

  const [treatments, setTreatments] = useState([]);
  const tUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientTreatment/${patientid}`;


useEffect(()=>{
    fetch(tUrl)
    .then((res)=>res.json())
    .then((treatmnt)=>{
      
      console.log(treatmnt.Data);
      
      setTreatments(treatmnt.Data);

    })

  },[patientid])
  let tPrice=sessionStorage.getItem("Price");



  
  const [enquiryList, setEnquiryList] = useState([]);

  const enquiryUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetOEnquiryList/0/0/0/0/0/0`;
  
      useEffect(()=>{
        fetch(enquiryUrl)
        .then((res)=>res.json())
        .then((enqs)=>{
          console.log(enqs.Data);
          setEnquiryList(enqs.Data);
          console.log(enquiryList.length);
        })
      },[])

const [addInvoice, setAddInvoice] = useState({
    EnquiryID:"",
  DoctorID:"",
  ClinicID:"",
  PayDate:"",
  TreatmentID:"39",
  Cost:"",
  PaymentModeID:"",
  CreatedBy:"1",
  BankName:"",
  BranchName:"",
  TransactionID:"",
  UTRno:"",
  TransactionDate:"",
  DebitOrCreditCardNo:"",
  ReferenceID:""
})

 

  const handleChange=(e)=>{
    const newdata={...addInvoice};
    newdata[e.target.name]=e.target.value;
    setAddInvoice(newdata);
    console.log(newdata);
}
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
    
      const [data,setData] = useState([
       
          {
            srNo: 1,
            role: "Admin",
            menu:"Clinic Settings",
            add:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            edit:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            delete:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            view:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            download:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>
           
          },
          {
            srNo: 2,
            role: "Doctor",
            menu:"User Settings",
            add:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            edit:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            delete:<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" width={50}/>,
            view:<img src="https://flyclipart.com/thumb2/x-button-327024.png" width={50}/>,
            download:"unChecked"
            
          },
         
        ],
        []
      );



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

        setparentMenu(list.Data.filter((parent, i) => parent?.Parent === 0));
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

  // const [inputList, setInputList] = useState([{PatientID:"",DoctorID:"",ClinicID:"",TreatmentID:"", Cost: "" ,Discount:"",Tax:"",TotalCost:"",PayDate:""}]);


  // const [inputList, setInputList] = useState([{ TreatmentID: "", Price: "" ,Discount:"",Tax:"",Total:""}]);


  // const [selectedTreatment, setSelectedTreatment] = useState('');
  // const [treatmentCost, setTreatmentCost] = useState('');

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];

    

//     list[index][name] = value;

//     let selectedValue = inputList[0].TreatmentID;
//     console.log(selectedValue);
//     setSelectedTreatment(selectedValue);

//     let selectedTreatmentObj = treatments.find(treatment => treatment?.TreatmentID==selectedValue);
//     console.log(selectedTreatmentObj);
//     if (selectedTreatmentObj) {
//       setTreatmentCost(selectedTreatmentObj.TreatmentCost);
//     } else {
//       setTreatmentCost('');
//     }

//     setInputList(list);
//     // console.log(inputList);
   
//     setAddPntTmt((pre)=>{
//       return{
//         ...pre,
//         ObjInvoice:inputList
//       }
//     })
// console.log("ascsd");
// console.log(patientid);

// //     inputList.map((meal,i)=>{
// //       let a=[];

// //       a.push(meal.firstName);

// // console.log(a);
// //     }) 
// // let a=document.getElementById("tmnt");
// // let t=a.options[a.selectedIndex].getAttribute('tprice');
// // console.log(t);
// // sessionStorage.setItem("Price",t)
//     console.log(addPntTmt);
// // console.log(patientid);




//   };


  // const handleRemoveClick = index => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  // // handle click event of the Add button
  // const handleAddClick = () => {
  //   setInputList([...inputList, { TreatmentID: "", Price: "" ,Discount:"",Tax:"",Total:""}]);
  // };





  const [selectedTreatments, setSelectedTreatments] = useState([{ TreatmentID: '', Cost: '', Discount: '', Tax: '',TotalCost:'' }]);

  const handleTreatmentChange = (index, event) => {
    const { value } = event.target;
    const updatedTreatments = [...selectedTreatments];
    updatedTreatments[index].TreatmentID = value;
    updatedTreatments[index].Cost = treatments.find(t => t.TreatmentID == value)?.TreatmentCost || '';
    setSelectedTreatments(updatedTreatments);
    console.log(selectedTreatments);
    console.log(value);
    setAddInvoice((pre)=>{
            return{
              ...pre,
              ObjInvoice:updatedTreatments
            }
          })
console.log(addInvoice);
 
  // n.TotalAmount =addInvoice.ObjInvoice.reduce((sum, entity) => sum + parseFloat(entity.Cost), 0)
 
// console.log(totalAmount.toFixed(2));
  };


  const [Treatmenttotal, setTreatmenttotal] = useState(0);


  const handleDiscountChange = (index, event) => {
    const { value } = event.target;
    const updatedTreatments = [...selectedTreatments];
    updatedTreatments[index].Discount = value;
    setSelectedTreatments(updatedTreatments);



    const updatedTotalCost = calculateTotal(updatedTreatments[index]);
    updatedTreatments[index].TotalCost = updatedTotalCost;
    console.log(selectedTreatments);
    
    setAddInvoice((pre)=>{
      return{
        ...pre,
        ObjInvoice:updatedTreatments
      }
    })
console.log(addInvoice);

setTreatmenttotal(selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Cost), 0)-selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Discount), 0));
  };

  const handleTaxChange = (index, event) => {
    const { value } = event.target;
    const updatedTreatments = [...selectedTreatments];
    updatedTreatments[index].Tax = value;
    setSelectedTreatments(updatedTreatments);
    console.log(selectedTreatments);




    const updatedTotalCost = calculateTotal(updatedTreatments[index]);
  updatedTreatments[index].TotalCost = updatedTotalCost;

  
    setAddInvoice((pre)=>{
      return{
        ...pre,
        ObjInvoice:updatedTreatments
      }
    })
console.log(addInvoice);

setTreatmenttotal(selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Cost), 0)-selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Discount), 0)+(selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Cost), 0)*selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Tax), 0)/100));

  };

  const handleTotalChange = (index, event) => {
    const { value } = event.target;
    const updatedTreatments = [...selectedTreatments];
    updatedTreatments[index].TotalCost = value;
    setSelectedTreatments(updatedTreatments);
    console.log(selectedTreatments);

    setAddInvoice((pre)=>{
      return{
        ...pre,
        ObjInvoice:updatedTreatments
      }
    })
console.log(addInvoice);
  };








  const calculateTotal = (row) => {
    const { Cost, Discount, Tax } = row;
    const discountedPrice = Cost - Discount;
    const taxAmount = (discountedPrice * Tax) / 100;
    const total = discountedPrice + taxAmount;

    
    
    return total.toFixed(2); // Round to two decimal places
    
    // const updatedTreatments = [...selectedTreatments];
    // selectedTreatments.forEach((t)=>t.TotalCost=total)
  


  };



















  const handleAddTreatment = () => {
    setSelectedTreatments([...selectedTreatments, { TreatmentID: '', Cost: '', Discount: '', Tax: '',TotalCost:'' }]);
  };

  const handleRemoveTreatment = (index) => {
    const updatedTreatments = [...selectedTreatments];
    updatedTreatments.splice(index, 1);
    setSelectedTreatments(updatedTreatments);
  };








  let totalCost = selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Cost), 0);
  let totalDiscount = selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Discount), 0);
  let totalTax = selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Tax), 0)*selectedTreatments.reduce((sum, treatment) => sum + parseFloat(treatment.Cost), 0)/100;
  let totalPaidAmount = selectedTreatments?.reduce((sum, treatment) => sum + parseFloat(treatment.TotalCost), 0);




  const handleSubmitInvoice=(e)=>{
    e.preventDefault();

    const invoiceUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewInvoiceConsultation`;




    if(addInvoice?.EnquiryID==="" || addInvoice?.DoctorID==="" || addInvoice?.ClinicID==="" || addInvoice?.PayDate==="" || addInvoice?.PaymentModeID==="" || addInvoice?.Cost===""){
      Swal.fire({
        icon:"warning",
        title:"Please fill all the fields marked with red * !"
      })
    }
    else if(addInvoice?.PaymentModeID==="3" && (addInvoice?.BankName==="" || addInvoice?.BranchName==="" || addInvoice?.TransactionID==="" || addInvoice?.UTRno==="" || addInvoice?.TransactionDate==="")){
      Swal.fire({
        icon:"warning",
        title:"Please fill all the fields marked with red * !"
      })
    }
    else{
      
    
    
    fetch(invoiceUrl,{
      method:"POST",
      headers:{
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addInvoice)
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);
      const collbtn=document.getElementById("addColl");
      if(result.Status===true){
        Swal.fire({
          icon:"success",
          title:"Added successfully!"
        })
          sessionStorage.setItem("consultEnqId",result.EnquiryID)
          sessionStorage.setItem("consultInvNo",result.InvoiceNo)
        collbtn.style.display="block";
        
       
      }
    })
  }
  }










  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    setAddInvoice((pre)=>{
      return{
        ...pre,
        EnquiryID:item.EnquiryID
      }
    })

    // sessionStorage.setItem("patientId",item.PatientID);
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.Name}</span>
      </>
    )
  }

  return (
   <>
    <Sidebar>
    <Card className="m-1 mt-3 ap-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">Generate Invoice</p>
            <hr />
            {/* <Form> */}
                <Row>
                    <Col md={3}>
                    <Form.Label>Enquiry name <span className='req-t'>*</span></Form.Label>

<ReactSearchAutocomplete
className='autosrch'
items={enquiryList}
onSearch={handleOnSearch}
onHover={handleOnHover}
onSelect={handleOnSelect}
onFocus={handleOnFocus}
autoFocus
formatResult={formatResult}
fuseOptions={{ keys: ["Name"] }}
// necessary, otherwise the results will be blank
resultStringKeyName="Name"
/>
                    </Col>
                    <Col md={3}>
                    <Form.Group>
                        <Form.Label>Doctor Name <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='DoctorID' onChange={handleChange} style={{padding:"0.55rem"}}>
      <option></option>
      {
        drs.map((doctor,i)=>{
          return(
            <>
            
            <option value={doctor.UserID}>{doctor.Name}</option>
            </>
          )
        })
      }
      
    </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Group>
                        <Form.Label>Clinic Name <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name='ClinicID' onChange={handleChange} style={{padding:"0.55rem"}}>
      <option></option>
      {
        branchList.map((branch,i)=>{
          return(
            <>
            
            <option value={branch.ClinicID}>{branch.ClinicName}</option>
            </>
          )
        })
      }
      
    </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col md={3}>
                    <Form.Group>
                        <Form.Label>Date <span className='req-t'>*</span></Form.Label>
                       <Form.Control type='date' name='PayDate' onChange={handleChange} style={{padding:"0.55rem"}}/>
                    </Form.Group>
                    </Col>
                </Row>

                <p className='mt-4' style={{fontSize:"18px",fontWeight:"500",color:"#CC758E"}}>Treatment</p>
{/* 
                {selectedTreatments.map((selectedTreatment, index) => {
        return (
            <> */}
                <Row className='mb-5'>
                    <Col md={3}>
                    <Form.Group>
                        <Form.Label>Treatment Name</Form.Label>
                        <Form.Control aria-label="Default select example" id='tmnt' name='TreatmentID' value="Consultation"  readOnly/>
      {/* <option></option> */}
      {/* {treatments?.map((treatment, index) => (
              <option key={index} value={treatment.TreatmentID}>
                {treatment.Treatment}
              </option>
            ))} */}
      {/*  */}
    {/* </Form.Select> */}
                    </Form.Group>
                    </Col>

                    {/* <Col md={2}>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                       <Form.Control type="text" readOnly/>
                    </Form.Group>
                    </Col> */}
                    {/* <Col md={2}>
                    <Form.Group>
                        <Form.Label>Paid Amount</Form.Label>
                       <Form.Control type='number' name='PaidAmount' value={x.PaidAmount} onChange={e => handleInputChange(e, i)}/>
                    </Form.Group>
                    </Col>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Invoice Amount</Form.Label>
                       <Form.Control type='number' name='InvoiceAmount' value={x.InvoiceAmount} onChange={e => handleInputChange(e, i)}/>
                    </Form.Group>
                    </Col> */}
                    {/* <Col md={2}>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                       <Form.Control type="text" value={selectedTreatment.Discount} onChange={(event) => handleDiscountChange(index, event)}/>
                    </Form.Group>
                    </Col> */}
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Payment mode <span className='req-t'>*</span></Form.Label>
                       <Form.Select name='PaymentModeID' onChange={handleChange}>
                        <option value=""></option>
                        <option value="1">Cash</option>
                        <option value="3">UPI</option>
                        <option value="5">Debit/Credit Card</option>
                       </Form.Select>
                       {/* <Form.Control type="text" value={selectedTreatment.Tax} onChange={(event) => handleTaxChange(index, event)} disabled={selectedTreatment?.Discount===""}/> */}
                    </Form.Group>
                    </Col>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Total Amount <span className='req-t'>*</span></Form.Label>
                       <Form.Control type="text" name='Cost' onChange={handleChange}/>
                    </Form.Group>
                    </Col>
                    <Col>

      </Col>
                </Row>

{
    addInvoice?.PaymentModeID==="3"?
    <Row className='mt-5'>
    <Col md={2}>
<Form.Group>
<Form.Label>Bank Name <span className='req-t'>*</span></Form.Label>
<Form.Control type='text' name='BankName' onChange={handleChange}/>

</Form.Group>
</Col>
<Col md={2}>
<Form.Group>
<Form.Label>Branch Name <span className='req-t'>*</span></Form.Label>
<Form.Control type='text' name='BranchName' onChange={handleChange}/>

</Form.Group>
</Col>
<Col md={2}>
<Form.Group>
<Form.Label>Transaction ID <span className='req-t'>*</span></Form.Label>
<Form.Control type='text' name='TransactionID' onChange={handleChange}/>

</Form.Group>
</Col>
<Col md={2}>
<Form.Group>
<Form.Label>UTR NO <span className='req-t'>*</span></Form.Label>
<Form.Control type='text' name='UTRno' onChange={handleChange}/>

</Form.Group>
</Col>
<Col md={2}>
<Form.Group>
<Form.Label>Transaction Date <span className='req-t'>*</span></Form.Label>
<Form.Control type='date' name='TransactionDate' onChange={handleChange}/>

</Form.Group>
</Col>
    </Row>:""
}

{
    addInvoice?.PaymentModeID==="5"?<Row className='mt-3' id=''>
    <Col md={2}>
    <Form.Group>
    <Form.Label>Debit/Credit Card No.</Form.Label>
    <Form.Control type='number' name='DebitOrCreditCardNo' onChange={handleChange}/>

</Form.Group>
    </Col>
    <Col md={2}>
    <Form.Group>
    <Form.Label>Bank Name</Form.Label>
    <Form.Control type='text' name='BankName' onChange={handleChange}/>

</Form.Group>
    </Col>
    <Col md={2}>
    <Form.Group>
    <Form.Label>Branch Name</Form.Label>
    <Form.Control type='text' name='BranchName' onChange={handleChange}/>

</Form.Group>
    </Col>
    <Col md={2}>
    <Form.Group>
    <Form.Label>Reference ID</Form.Label>
    <Form.Control type='text' name='ReferenceID' onChange={handleChange}/>

</Form.Group>
    </Col>
    <Col md={2}>
    <Form.Group>
    <Form.Label>Transaction Date</Form.Label>
    <Form.Control type='date' name='TransactionDate' onChange={handleChange}/>

</Form.Group>
    </Col>
    {/* <Row className='mt-3'>
    <Col md={2}>
    <Form.Group>
    <Form.Label>Total Paid Amount</Form.Label>
    <Form.Control type='number' name='TotalPaidAmount' onChange={handleChange}/>

</Form.Group>
    </Col>
</Row> */}
</Row>:""
}          

           
           
      

<Row className='text-center mt-5'>
    <Col>
    <Button variant='' className='genIn p-2' onClick={handleSubmitInvoice}>Generate Invoice</Button>
    </Col>
    <Col>
    <Button variant='' className='addColl p-2' id='addColl' onClick={()=> navigate("/consult-view-inv")} style={{display:"none"}}>Print</Button>
    </Col>
</Row>
            </Col>
        </Row>
       </Card>
    </Sidebar>
   </>
  )
}

export default ConsultationInvoice