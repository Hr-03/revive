import React,{useState,useEffect,useMemo} from 'react';
import "../Styles/AddCollection.css";
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
import { Card, Col, Row ,Modal,Form, Table, Spinner} from "react-bootstrap";
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
import addTmnt from "../Assets/addtmt.png";
import addColl from "../Assets/addcoln.png";
import Swal from 'sweetalert2';
import Sidebar from '../Components/Sidebar';
import moment from 'moment';

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
  
const AddCollection = () => {
    const navigate=useNavigate();


const [loading, setloading] = useState(false);


    let UserId=sessionStorage.getItem("UserId");



    const [patients, setPatients] = useState([]);

    const pUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientList/${UserId}`;
    
    useEffect(()=>{
       fetch(pUrl)
       .then((res)=>res.json())
       .then((pnt)=>{
        console.log(pnt?.Data);
        setPatients(pnt?.Data);

       })
    },[])





let pId=sessionStorage.getItem("collectionPatient");

    const [invoiceData, setInvoiceData] = useState([])

    const invoiceUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetInvoiceData/${pId}`;

    useEffect(()=>{
      fetch(invoiceUrl)
      .then((res)=>res.json())
      .then((inv)=>{
       console.log(inv?.Data);
       setInvoiceData(inv?.Data);

      })
   },[])




   const [invoiceNo, setInvoiceNo] = useState([]);

   



   const [paymentMode, setPaymentMode] = useState([]);

   const pmodeurl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPaymentMode`;

   
   useEffect(()=>{
    fetch(pmodeurl)
    .then((res)=>res.json())
    .then((mode)=>{
      // console.log("Nos");
     console.log(mode?.Data);
     setPaymentMode(mode?.Data);

    })
 },[])

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

  const [collection, setCollection] = useState({
    PatientID:"",
    InvoiceNo:"",
    TotalAmount:"",
    TotalCost:"",
    TotalTax:"",
    TotalDiscountAmount:"",
    PendingAmount:"",
    PaymentModeID:"",
    TotalPaidAmount:"",
    PayDate:"",
    BankName:"",
    BranchName:"",
    IFSCcode:"",
    ChequeNo:"",
    ChequeAmount:"",
    ChequeDate:"",
    TransactionID:"",
    UTRno:"",
    TransactionDate:"",
    ReferenceID:"",
    DebitOrCreditCardNo:"",
    CreatedBy:"1"
  })

  
  const [diff, setdiff] = useState({
    tpa:"",
    tc:""
  })
  const handleChange=(e)=>{
    const newdata={...collection};
    newdata[e.target.name]=e.target.value;
    setCollection(newdata);
    console.log(newdata);


    setdiff((pre)=>{
      return{
        ...pre,
        tpa:newdata?.TotalPaidAmount,
        tc:newdata?.TotalCost
      }
    })

    console.log(newdata?.TotalCost-newdata?.TotalPaidAmount);
    // if(newdata.TotalPaidAmount > newdata.TotalCost){
    //   // Swal.fire({
    //   //   icon:"warning",
    //   //   title:"Total paid amount cannot be more than total amount!",
    //   //   text:"please check entered value and try again!"
    //   // })
  
    //   // alert("check values")
    // }

   
let a=document.getElementById("tpa").value;



    setCollection((pre)=>{
      return{
        ...pre,
        // PendingAmount:b,
        TotalPaidAmount:a,
      }
    })

   
   
}



useEffect(()=>{
  setCollection((pre)=>{
    return{
      ...pre,
      PendingAmount:(collection?.TotalCost)-(collection?.TotalPaidAmount)
    }
  })

  console.log(collection);
},[collection?.TotalPaidAmount])


const handleInvoice=()=>{

let invN=document.getElementById("invNo").value;


  let selectedTreatmentObj = invoiceNo?.find(treatment => treatment?.InvoiceNo==invN);
  console.log(selectedTreatmentObj);
  if (selectedTreatmentObj) {
    setCollection((pre)=>{
      return{
        ...pre,
       InvoiceNo:selectedTreatmentObj?.InvoiceNo,
        TotalAmount:selectedTreatmentObj?.TotalAmount,
        TotalDiscountAmount:selectedTreatmentObj?.TotalDiscountAmount,
        TotalTax:selectedTreatmentObj?.TotalTax,
        TotalCost:selectedTreatmentObj?.TotalCost
      }
    })
  } else {
    console.log('not found');
  }


  

  console.log(collection);

}


const handleSubmitCollection=(e)=>{
  e.preventDefault();


  sessionStorage.setItem("InvNo",collection?.InvoiceNo)

  const colnUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewCollection`;



  if(collection?.PaymentModeID===""){
Swal.fire({
  icon:"warning",
  title:"Select payment mode!"
})
  }
  else if(collection?.TotalPaidAmount===""){
    Swal.fire({
      icon:"warning",
      title:"Enter total paid amount!"
    })
  }
  else if(collection?.PayDate===""){
    Swal.fire({
      icon:"warning",
      title:"Enter Payment date!"
    })
  }
  else if(parseFloat(collection.TotalPaidAmount) > parseFloat(collection.TotalCost)){
Swal.fire({
         icon:"warning",
         title:"Total paid amount cannot be more than total amount!",
         text:"please check entered value and try again!"
       })
  }
  else{

  setloading(true);

  fetch(colnUrl,{
    method:"POST",
    headers:{
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(collection)
  })
  .then((res)=>res.json())
  .then((result)=>{
    console.log(result);
    if(result.Status===true){
      Swal.fire({
        icon:"success",
        title:"Added successfully!"
      })

      let prntBtn=document.getElementById("prnt");

      prntBtn.style.display="block";
      setloading(false)
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
  sessionStorage.setItem("collectionPatient",item.PatientID);


  const inNoUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetInvoiceData/${item.PatientID}`;

   

   
  
      fetch(inNoUrl)
      .then((res)=>res.json())
      .then((inNo)=>{
        console.log("Nos");
       console.log(inNo?.Data);
       setInvoiceNo(inNo?.Data);

      })
  
  setCollection((pre)=>{
    return{
      ...pre,
      PatientID:item.PatientID
    }
  })
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







const [selectedDate, setSelectedDate] = useState(null);

function getToday() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function getPastTwoDays() {
  const today = new Date();
  today.setDate(today.getDate() - 2);
  return today.toISOString().split('T')[0];
}



const handleChangeDate = (e) => {
  setSelectedDate(e.target.value);

  setCollection((pre)=>{
    return{
      ...pre,
      PayDate:e.target.value
    }
  })


  console.log(collection);
};



useEffect(()=>{
  const today = new Date();

console.log(today.toISOString().split("T")[0]);
},[])


  return (
   <>
   <Sidebar>
   <Card className="m-1 mt-3 ap-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">Add Collection</p>
            <hr />
          
            <Form>
                <Row>
                    <Col md={3}>
                    <Form.Label>Patient name</Form.Label>

<ReactSearchAutocomplete
items={patients}
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
                </Row>
                <Row className='mt-3'>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Invoice No.</Form.Label>
                        <Form.Select aria-label="Default select example" name='InvoiceNo' id='invNo' onChange={handleInvoice}>
      <option></option>
     {
     invoiceNo?.map((nos,i)=>{
      return(
        <>
        <option value={nos?.InvoiceNo}>{nos?.InvoiceNo}</option>
        </>
      )
     })
     }
      
    </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                       <Form.Control type='number' disabled value={collection?.TotalAmount} name='TotalAmount' onChange={handleChange}/>
                    </Form.Group>
                    </Col>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type='number' disabled value={collection?.TotalDiscountAmount} name='TotalDiscountAmount' onChange={handleChange}/>

                    </Form.Group>
                    </Col>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Tax</Form.Label>
                        <Form.Control type='number' disabled value={collection?.TotalTax} name='TotalTax' onChange={handleChange}/>

                    </Form.Group>
                    </Col>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Total Amount</Form.Label>
                        <Form.Control type='number' disabled value={collection?.TotalCost} name='TotalCost' onChange={handleChange}/>

                    </Form.Group>
                    </Col>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Payment Date <span className='req-t'>*</span></Form.Label>
                        <Form.Control type='date' value={collection?.PayDate} name='PayDate' onChange={handleChangeDate}  
                        //  min={getPastTwoDays()} max={getToday()} 
                         
                         />

                    </Form.Group>
                    </Col>
                   

                </Row>

                <Row className='mt-3'>
                    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Payment Mode <span className='req-t'>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" name="PaymentModeID" onChange={handleChange}>
                        <option></option>

    {
      paymentMode?.map((pay,i)=>{
        return(
          <>
          
          <option value={pay?.PaymentModeID}>{pay?.PaymentMode}</option>
          </>
        )
      })
    }
      {/* <option value="Cash">Cash</option>
      <option value="Cheque">Cheque</option>
      <option value="UPI">UPI</option>
      <option value="Netbanking">Netbanking</option>
      <option value="Debit/Credit">Debit/Credit card</option> */}
      
    </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>



    
{/* :""
} */}
                

                {/* ---------------------------cheque */}
{
    collection?.PaymentModeID==="2"?<Row className='mt-3' id='cheque'>
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
        <Form.Label>IFSC Code</Form.Label>
        <Form.Control type='text' name='IFSCcode' onChange={handleChange}/>

    </Form.Group>
    </Col>
    <Col md={2}>
    <Form.Group>
        <Form.Label>Cheque No.</Form.Label>
        <Form.Control type='text' name='ChequeNo' onChange={handleChange}/>

    </Form.Group>
    </Col>
    <Col md={2}>
    <Form.Group>
        <Form.Label>Cheque Amount</Form.Label>
        <Form.Control type='number' name='ChequeAmount' onChange={handleChange}/>

    </Form.Group>
    </Col>
    <Col md={2}>
    <Form.Group>
        <Form.Label>Cheque Date</Form.Label>
        <Form.Control type='date' name='ChequeDate' onChange={handleChange}/>

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
                

                {
collection?.PaymentModeID==="3"?    <Row className='mt-3' id='upi' >
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
    <Form.Label>Transaction ID</Form.Label>
    <Form.Control type='text' name='TransactionID' onChange={handleChange}/>

</Form.Group>
</Col>
<Col md={2}>
<Form.Group>
    <Form.Label>UTR NO</Form.Label>
    <Form.Control type='text' name='UTRno' onChange={handleChange}/>

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



         {
            collection?.PaymentModeID==="4"?<Row className='mt-3' id='netb' >
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
                                <Col md={3}>
                                <Form.Group>
                                <Form.Label>Total Paid Amount</Form.Label>
                                <Form.Control type='number' name='TotalPaidAmount'onChange={handleChange}/>
        
                            </Form.Group>
                                </Col>
                            </Row> */}
        </Row>:""
         }   




{
    collection?.PaymentModeID==="5"?<Row className='mt-3' id='dc'>
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
<Row className='mt-3' id='cash'>
    <Col md={2}>
    <Form.Group>
        <Form.Label>Total Paid Amount <span className='req-t'>*</span></Form.Label>
        <Form.Control type='number' name='TotalPaidAmount' id='tpa' onChange={handleChange}/>

    </Form.Group>
    </Col>
    <Col md={2}>
                    <Form.Group>
                        <Form.Label>Pending Amount</Form.Label>
                        <Form.Control type='number' id="penamt" name='PendingAmount' readOnly value={collection?.TotalCost-collection?.TotalPaidAmount}/>

                    </Form.Group>
                    </Col>
</Row>


<Row>
    <Col>
    <Button variant='' className='genIn p-2' onClick={handleSubmitCollection}>{loading?<Spinner animation="border" className="load"/>:"Save"}</Button>
    </Col>
    <Col>
    <Button variant=''  className='addColl p-2' id='prnt' style={{display:"none"}} onClick={()=>{
      navigate("/view-inv");
    }}>Print</Button>
    </Col>
</Row>

            </Form>

            </Col>
        </Row>
       </Card>
   </Sidebar>
   </>
  )
}

export default AddCollection