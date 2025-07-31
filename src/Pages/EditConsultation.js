import React,{useState,useEffect,useMemo} from 'react';
import "./../Styles/Consultations.css";
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
import { useParams } from 'react-router-dom';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import "./../Components/Sidebar.css";
import logo from "./../Assets/logo.png";
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
import { Card, Col, Row, Modal, Form, Table, Tabs, Tab,Spinner,InputGroup } from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import { FaCheckCircle, FaEye, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import dashIcon from "./../Assets/Dashboard.png";
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import menuIcon from "./../Assets/Vector.png";
import gearIcon from "./../Assets/gear.png";
import userGearIcon from "./../Assets/userGear.png";
import cliGearIcon from "./../Assets/cset.png";
import lp from "./../Assets/lp.png";
import report from "./../Assets/reports.png";
import calendarap from "../Assets/calendar.png";

import { MdLogout } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import invoice from "./../Assets/invoice.png";
import addTmnt from "./../Assets/addtmt.png";
import addColl from "./../Assets/addcoln.png";
import Sidebar from '../Components/Sidebar';

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


function EditConsultation() {

  let pntID=sessionStorage.getItem("pntID");

  const [consultation, setConsultation] = useState({
    PatientID:pntID,
    CreatedBy:"1",
    Date:"",
    TreatmentID:"",
    TreatmentDetails:"",
    Images:[],
    Remarks:"",
    Status:"",
    Measurement:"",
    RecordID:"0"
  })

  const [measurement, setMeasurement] = useState({
    Neck:"",
    LeftArm:"",
    RightArm:"",
    Chest:"",
    UpperAbdomen:"",
    MidAbdomen:"",
    LowerAbdomen:"",
    Hips:"",
    UpperLeftThigh:"",
    MiddleLeftThigh:"",
    LowerLeftThigh:"",
    UpperRightThigh:"",
    MiddleRightThigh:"",
    LowerRightThigh:"",
    RightCalf:"",
    LeftCalf:"",
    CreatedBy:"1"
  })

    const [consultationData, setConsultationData] = useState(null);
    const [consultationImageDBData, setConsultationImageDBData] = useState(null);
  const { consultId } = useParams(); // Extract the 'id' parameter from the URL
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://reviveapplication.com/ReviveAPI/Revive.svc/GetUpdateDataConsultation/${consultId}`);
        if (response.ok) {
          const data = await response.json();
          setConsultationData(data);
          setConsultation((pre)=>{
            return{
                ...pre,
                Date:data.Data[0]?.Date,
                TreatmentID:data.Data[0]?.TreatmentID,
                TreatmentDetails:data.Data[0]?.TreatmentDetails,
                Images:data.Data[0]?.Image,
                Remarks:data.Data[0]?.Remarks,
                Status:data.Data[0]?.Status,
                Measurement:data.Data[0]?.Measurement,
                RecordID:data.Data[0]?.Record
            }
        })

          console.log(data);
          setConsultationImageDBData(data.Data[0]?.Image);
          
          if (data.Data[0].Record !== null) {
            // Fetch measurement record using RecordID
            fetch(`https://reviveapplication.com/ReviveAPI/Revive.svc/GetMeasurementRecord/${data.Data[0].Record}`)
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                setRecoredTable(result.Data[0]);
                setMeasurement((pre)=>{
                  return{
                      ...pre,
                      Neck:result.Data[0]?.Neck,
                      LeftArm:result.Data[0]?.LeftArm,
                      RightArm:result.Data[0]?.RightArm,
                      Chest:result.Data[0]?.Chest,
                      UpperAbdomen:result.Data[0]?.UpperAbdomen,
                      MidAbdomen:result.Data[0]?.MidAbdomen,
                      LowerAbdomen:result.Data[0]?.LowerAbdomen,
                      Hips:result.Data[0]?.Hips,
                      UpperLeftThigh:result.Data[0]?.UpperLeftThigh,
                      MiddleLeftThigh:result.Data[0]?.MiddleLeftThigh,
                      LowerLeftThigh:result.Data[0]?.LowerLeftThigh,
                      UpperRightThigh:result.Data[0]?.UpperRightThigh,
                      MiddleRightThigh:result.Data[0]?.MiddleRightThigh,
                      LowerRightThigh:result.Data[0]?.LowerRightThigh,
                      RightCalf:result.Data[0]?.RightCalf,
                      LeftCalf:result.Data[0]?.LeftCalf,
                  }
              })
              }); 
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [consultId]);
  

   console.log(consultation?.Data);
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


    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
  

//   const [pntdtl, setPntDtl] = useState([]);

//   const getpntDtlUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientTreatmentDetails/4`;
// useEffect(()=>{
//   fetch(getpntDtlUrl)
//   .then((res)=>res.json())
//   .then((geteRes)=>{
//     console.log(geteRes.Data);
//     setPntDtl(geteRes.Data)
//   })
// },[])



let frmNo=sessionStorage.getItem("formNo");
let mobile=sessionStorage.getItem("mobile");
let pntName=sessionStorage.getItem("pntName");
let rDate=sessionStorage.getItem("regDate");
let cName=sessionStorage.getItem("clinicName");


let record=sessionStorage.getItem("recordID");





const handleChangeConsultations=(e)=>{
  const newdata={...consultation};
  newdata[e.target.name]=e.target.value;
  setConsultation(newdata);
  console.log(newdata);
}


    const columns = useMemo(
        () => [
          // {
          //   accessorKey: "UserID",
          //   header: "User ID",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "User ID" },
            
          // },
          {
            accessorKey: "LeadName",
            header: "Lead Name",
            // Cell:({cell})=>{
            //   let imurl=cell.getValue();

            //   return <div>{<img src={imurl?imurl:"https://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"} width={150} height={150}/>}</div>
            // }
          },
          {
            accessorKey: "LeadSource",
            header: "Lead Source",
          },
          {
            accessorKey: "Email",
            header: "Email",
          },
          {
            accessorKey: "MobileNo",
            header: "Mobile No.",
          },
          {
            accessorKey: "EnquiryDate",
            header: "Enquiry Date",
          },
         
        //   {
        //     accessorKey: "PendingAmount",
        //     header: "Pending Amount",
        //     // Cell:({cell})=>{
        //     //   let date=cell.getValue();
        //     //   return <div>{date.split(" ")[0]}</div>
        //     // }
        //   },
         
      
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




  const [inputList, setInputList] = useState([{ file: null, previewUrl: '' }]);

  // const [files, setfiles] = useState([])

  const [images, setimages] = useState([])

  const handleInputChange = (e, index) => {
    const { files } = e.target;
    const updatedInputList = [...inputList];
    updatedInputList[index].file = files[0];
    updatedInputList[index].previewUrl = URL.createObjectURL(files[0]);
    setInputList(updatedInputList);
    console.log(inputList)
    let filesArray = inputList.map((input) => input.file);
    console.log(filesArray);
    setimages(filesArray)
    console.log("below is images ");
    console.log(images);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { file: null, previewUrl: '' }]);
  };

  const handleRemoveClick = (index) => {
    const updatedInputList = [...inputList];
    updatedInputList.splice(index, 1);
    setInputList(updatedInputList);
  };

  const handleDbPicRemoveClick = (index) => {
      const updatedImageData = consultationImageDBData.filter((_, i) => i !== index);
      setConsultationImageDBData(updatedImageData);
      console.log(updatedImageData);
  };


const handleChange=(e)=>{
  let check=document.getElementById("wlTT");

  if(check.checked){
    handleShow1();
    setConsultation((pre)=>{
      return{
        ...pre,
        Measurement:"1"
      }
    })
  }else{
    handleClose1();
    setConsultation((pre)=>{
      return{
        ...pre,
        Measurement:"0"
      }
    })
  }
  
}

// let imageUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/UploadMultiplePhotos`;


const handleImages=async (e)=>{
  e.preventDefault();
  
  let fd=new FormData();

  // fd.append("stream",JSON.stringify(images));
  // const formData = new FormData();
  images.forEach((image, index) => {
    fd.append("stream", image);
  });

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
    let imgPath = res.data.data.map((img,i)=>img.imageurl);
   
    // Append imgPath to existing consultationImageDBData
    const updatedImageData = [...consultationImageDBData, ...imgPath];

    // Update the state with the updatedImageData
    setConsultationImageDBData(updatedImageData);

    console.log(updatedImageData);

    setConsultation((pre) => {
      return { ...pre, Images: consultationImageDBData };
    });

    console.log(consultation);


    if(res.data.status==="1"){
      // setProgress3(null);
     
      Swal.fire({
        icon:"success",
        title:"Uploaded successfully!",
        timer:2000,
        showConfirmButton:false
      })
    }
  });


}




const [treatments, setTreatments] = useState([]);
// const tUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetPatientTreatment/${pntID}`;

const tUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetTreatmentList`



useEffect(()=>{
  fetch(tUrl)
  .then((res)=>res.json())
  .then((treatmnt)=>{
    
    console.log(treatmnt.Data);
    
    setTreatments(treatmnt.Data);

  })

},[])




const handleChangeMeasurement=(e)=>{
  const newdata={...measurement};
  newdata[e.target.name]=e.target.value;
  setMeasurement(newdata);
  console.log(newdata);
}


const [RecoredTable, setRecoredTable] = useState([]);

// Function to convert date format from 'DD/MM/YYYY' to 'YYYY-MM-DD'
const convertDateFormat = (dateString) => {
  if (!dateString) return ''; // If dateString is null or empty, return empty string
  
  const parts = dateString.split('/'); // Split the date string by '/'
  if (parts.length !== 3) return ''; // If parts length is not 3, return empty string
  
  // Reorder parts to match 'YYYY-MM-DD' format
  const yyyy = parts[2];
  const mm = parts[1].padStart(2, '0'); // Ensure month is two digits
  const dd = parts[0].padStart(2, '0'); // Ensure day is two digits
  
  // Return date string in 'YYYY-MM-DD' format
  return `${yyyy}-${mm}-${dd}`;
};


  return (
    <>
   <Sidebar>
   <Card className="m-1 mt-3 emp-crd p-3">
        <Row>
            <Col>
            <Row>
              <Col>
            <p className="ap-t">Consultations</p>
              
              </Col>
              <Col>
              <Button variant='' className='hist-btn p-3' onClick={()=>{
                navigate(`/consult-hst/${pntID}`);
              }}>View Consultation History</Button>
              </Col>
            </Row>
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

            {/* <MaterialReactTable
                  columns={columns}
                  data={pntdtl}
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
                        onClick={() => table.setEditingRow(row)}
                        disabled
                        >
                          <FaRegEdit/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          // onClick={() => handleDeleteRow(row)}
                        disabled

                        >
                          <HiOutlineTrash/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                 



                  positionActionsColumn="last"
                
                /> */}


<Row>
    <Col>
    <Card className='cnslt-crd p-3 pt-4'>
        <Row>
            <Col>
            <p className='text-center lbls'>Patient ID</p>
            <p className='text-center'>{pntID}</p>
            </Col>
            <Col>
            <p className='text-center lbls'>Form No.</p>
            <p className='text-center'>{frmNo}</p>
            </Col>
            <Col>
            <p className='text-center lbls'>Name</p>
            <p className='text-center'>{pntName}</p>
            </Col>
            <Col>
            <p className='text-center lbls'>Mobile Number</p>
            <p className='text-center'>{mobile}</p>
            </Col>
            
            <Col>
            <p className='text-center lbls'>Reg Date</p>
            <p className='text-center'>{rDate}</p>
            </Col>
            <Col>
            <p className='text-center lbls'>Clinic</p>
            <p className='text-center'>{cName}</p>
            </Col>
        </Row>
    </Card>

    <Row className='mt-4'>
    <Col md={2}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" placeholder="" name='Date' defaultValue={convertDateFormat(consultationData?.Data[0].Date)} onChange={handleChangeConsultations}/>
      </Form.Group>
    </Col>
      <Col md={4}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Treatments</Form.Label>
          <Form.Select aria-label="Default select example" name='TreatmentID' value={consultationData?.Data[0].TreatmentID || ''} onChange={handleChangeConsultations}>
            <option></option>
            {treatments?.map((t, i) => (
              <option key={i} value={t?.TreatmentID}>{t?.Treatment}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>

    <Row className='mt-4'>
    <Col md={6}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Treatment Details</Form.Label>
            <Form.Control as="textarea" rows={3} name='TreatmentDetails' value={consultationData?.Data[0].TreatmentDetails || ''} onChange={handleChangeConsultations} />
          </Form.Group>
        </Col>
    </Row>
    <Row className='mt-4'>
      <Col>
      <Form.Check type='checkbox' id='wlTT' label="Weight Loss Treatment Taken?" checked={consultationData?.Data[0].Measurement === 'Yes'} onChange={handleChange}/>
      
      </Col>
    </Row>
{
  RecoredTable?<Table responsive className='msrmnt-tbl'>
  <tbody>
    <tr>
      <th className='msrmnt-heading'>Neck</th>
      <td className='msrmnt-data'>{RecoredTable?.Neck} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Left Arm</th>
      <td className='msrmnt-data'>{RecoredTable?.LeftArm} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Right Arm</th>
      <td className='msrmnt-data'>{RecoredTable?.RightArm} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Chest</th>
      <td className='msrmnt-data'>{RecoredTable?.Chest} <span>(inch)</span></td>
    </tr>
    <tr>
      <th className='msrmnt-heading'>Upper Abdomen</th>
      <td className='msrmnt-data'>{RecoredTable?.UpperAbdomen} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Mid Abdomen</th>
      <td className='msrmnt-data'>{RecoredTable?.MidAbdomen} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Lower Abdomen</th>
      <td className='msrmnt-data'>{RecoredTable?.LowerAbdomen} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Hips</th>
      <td className='msrmnt-data'>{RecoredTable?.Hips} <span>(inch)</span></td>
    </tr>
    <tr>
      <th className='msrmnt-heading'>Upper Left Thigh</th>
      <td className='msrmnt-data'>{RecoredTable?.UpperLeftThigh} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Middle Left Thigh</th>
      <td className='msrmnt-data'>{RecoredTable?.MiddleLeftThigh} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Lower Left Thigh</th>
      <td className='msrmnt-data'>{RecoredTable?.LowerLeftThigh} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Upper Right Thigh</th>
      <td className='msrmnt-data'>{RecoredTable?.UpperRightThigh} <span>(inch)</span></td>
    </tr>
    <tr>
      <th className='msrmnt-heading'>Middle Right Thigh</th>
      <td className='msrmnt-data'>{RecoredTable?.MiddleRightThigh} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Lower Right Thigh</th>
      <td className='msrmnt-data'>{RecoredTable?.LowerRightThigh} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Right Calf</th>
      <td className='msrmnt-data'>{RecoredTable?.RightCalf} <span>(inch)</span></td>
      <th className='msrmnt-heading'>Left Calf</th>
      <td className='msrmnt-data'>{RecoredTable?.LeftCalf} <span>(inch)</span></td>
    </tr>
  </tbody>
      </Table>:""
}
    {consultationData?.Data[0].Image.map((image, index) => (
  <Row className='mt-4' key={index}>
    <Col md={1}>
      <p>Image</p>
    </Col>
    <Col md={1}>
      {/* Instead of allowing user to upload new file, show already stored image */}
      <img src={image.Image} alt="Preview" style={{ width: '100px', height: '100px' }} />
    </Col>
    <Col md={1}>
      {/* Add a remove button for each stored image */}
      <button onClick={() => handleDbPicRemoveClick(index)}>Remove</button>
    </Col>
  </Row>
))}
    {inputList.map((input, index) => {
        return (
         <>
    <Row className='mt-4' key={index}>
<Col md={1}>
<p>Image</p>
</Col>
<Col md={1}>
<Form.Control type="file" placeholder="" name='Files' onChange={(e) => handleInputChange(e, index)}/>




</Col>

<Col md={2}>
    <Row className='mt-0 m-5'>
        <Col>

        
        {input.previewUrl && input.previewUrl ? (
              <img
                src={input.previewUrl}
                alt="Preview"
                style={{ width: '100px', height: '100px' }}
              />
            ) : (
                                <img
                                  src="https://www.kineosystem.com/wp-content/uploads/2016/08/dummy-prod-1.jpg"
                                  alt="image"
                                  className='consultimg' 
                                  name="ImagesBG"
                                 
                                 
                                />
                              )}
{/* <img src="https://www.kineosystem.com/wp-content/uploads/2016/08/dummy-prod-1.jpg" alt="" srcset="" className='consultimg' name="ImagesBG"/> */}
        </Col>
    </Row>
</Col>
<Col md={1}>
{inputList.length > 1 && (
              <button onClick={() => handleRemoveClick(index)}>
                Remove
              </button>
            )}
</Col>
       
<Col md={2}>
{/* {inputList.length - 1 === i &&<Button variant='' className='mt-4 px-4' style={{backgroundColor:"#FF719B",color:"white",textTransform:"capitalize"}} onClick={handleAddClick}>Add more Images</Button>} */}

    
{inputList.length - 1 === index &&<Button onClick={handleAddClick} style={{backgroundColor:"#FF719B",color:"white",textTransform:"capitalize"}}>Add More Images</Button>}
    </Col>
    </Row>
</>
     )})}
      <Row>
      <Col md={6}>
      
<Button variant='' className='mt-4 px-4 m-auto' style={{backgroundColor:"#9B7BB7",color:"white",textTransform:"capitalize"}} onClick={handleImages}>Upload Image(s)</Button>
      </Col>
     </Row>
     <Row className='mt-4'>
      <Col md={3}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Observations/Remarks</Form.Label>
        <Form.Control as="textarea" rows={1} name='Remarks' value={consultationData?.Data[0].Remarks || ''}  onChange={handleChangeConsultations}/>
      </Form.Group>
      </Col>
      <Col md={3}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Status</Form.Label>
        <Form.Select aria-label="Default select example" name='Status' value={consultationData?.Data[0]?.Status || ''} onChange={handleChangeConsultations}>
      <option></option>
      <option value="Open">Open</option>
      <option value="Close">Close</option>
      <option value="Ongoing">Ongoing</option>
    </Form.Select>
      </Form.Group>
      </Col>
     </Row>


<Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        centered
        size='xl'
      >
        <Form>

       
        <Modal.Header closeButton>
          <Modal.Title>Record Measurement</Modal.Title>
        </Modal.Header>
       <Modal.Body>
        <Row>
          <Col md={3}>
        <Form.Label className='m-0'>Neck</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='Neck' value={RecoredTable?.Neck} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>
      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Left Arm</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='LeftArm' value={RecoredTable?.LeftArm} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Right Arm</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='RightArm' value={RecoredTable?.RightArm} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Chest</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='Chest' value={RecoredTable?.Chest} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
        <Form.Label className='m-0'>Upper Abdomen</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='UpperAbdomen' value={RecoredTable?.UpperAbdomen} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Mid Abdomen</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='MidAbdomen' value={RecoredTable?.MidAbdomen} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Lower Abdomen</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='LowerAbdomen' value={RecoredTable?.LowerAbdomen} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Hips</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='Hips' value={RecoredTable?.Hips} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2"className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
        <Form.Label className='m-0'>Upper Left Thigh</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='UpperLeftThigh' value={RecoredTable?.UpperLeftThigh} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Middle Left Thigh</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='MiddleLeftThigh' value={RecoredTable?.MiddleLeftThigh} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Lower Left Thigh</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='LowerLeftThigh' value={RecoredTable?.LowerLeftThigh} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>
        
      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Upper Right Thigh</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='UpperRightThigh' value={RecoredTable?.UpperRightThigh} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
        <Form.Label className='m-0'>Middle Right Thigh</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='MiddleRightThigh' value={RecoredTable?.MiddleRightThigh} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Lower Right Thigh</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='LowerRightThigh' value={RecoredTable?.LowerRightThigh} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>
        
      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Right Calf</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='RightCalf' value={RecoredTable?.RightCalf} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
          <Col md={3}>
        <Form.Label className='m-0'>Left Calf</Form.Label>
          <InputGroup className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="" name='LeftCalf' value={RecoredTable?.LeftCalf} onChange={handleChangeMeasurement} className='igc'/>
        <InputGroup.Text id="basic-addon2" className='igt'>Inch</InputGroup.Text>

      </InputGroup>
          </Col>
        </Row>

       </Modal.Body>
        {/* <Modal.Footer className=''> */}
      <hr />
          <Row className='m-3'>
            <Col>
          <Button variant="" className='clt-reset' type='reset'>
            Reset
          </Button>
            
            </Col>
            <Col>
          <Button variant="" className='clt-submit' onClick={(e)=>{
    e.preventDefault();

    const url=`https://reviveapplication.com/ReviveAPI/Revive.svc/UpdateMeasurementRecord`;


    let n={
      ...measurement,
      RecordID:consultationData?.Data[0].Record
    }

    fetch(url,{
      method:"POST",
          headers:{
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(n)
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);
      if(result.Status===true){
        Swal.fire({
          icon:"success",
          title:"Added successfully !"
        })
        sessionStorage.setItem("recordID",consultationData?.Data[0].Record)
        handleClose1();

        fetch(`https://reviveapplication.com/ReviveAPI/Revive.svc/GetMeasurementRecord/${consultationData?.Data[0].Record}`)
        .then((res)=>res.json())
        .then((result)=>{
          console.log(result);
          setRecoredTable(result.Data[0])

        })
      }
      else{
        Swal.fire({
          icon:"error",
          title:"Something went wrong !"
        })
      }
    })

  }}>Submit</Button>
            
            </Col>
          </Row>
        {/* </Modal.Footer> */}
        </Form>
      </Modal>

<Row className='mt-4'>
  <Col>
  <Button variant='' className='clt-reset' type='reset'>Reset</Button>
  </Col>
  <Col>
  <Button variant='' className='clt-submit' type='submit' onClick={(e)=>{
    e.preventDefault();

    const url=`https://reviveapplication.com/ReviveAPI/Revive.svc/UpdateConsultation`;

    let n={
      ...consultation,
      RecordID: consultationData?.Data[0].Record,
      Images: consultation?.Images.map(obj => obj.Image).join(', ')
    }

    console.log(n);

    fetch(url,{
      method:"POST",
          headers:{
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(n)
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);
      if(result.Status===true){
        Swal.fire({
          icon:"success",
          title:"Added successfully !"
        })
        navigate("/patients")
      }
      else{
        Swal.fire({
          icon:"error",
          title:"Something went wrong !"
        })
      }

    })
  }}>Submit</Button>
  </Col>
</Row>

    </Col>
    
   
</Row>

{/* 
<hr />

<Row>
  <Col>
  <p>Consultation History</p>

  <MaterialReactTable
                  columns={columns}
                  data={todaysFollowup}
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
                        className="view-btn"
                        // onClick={() => table.setEditingRow(row)}
                        >
                          <FaEye/>
                        </IconButton>
                      </Tooltip>
                     
                    </Box>
                  )}
               
                  positionActionsColumn="last"
                
                />
  </Col>
</Row> */}

            </Col>
        </Row>
       </Card>
   </Sidebar>
    </>
  )
}

export default EditConsultation