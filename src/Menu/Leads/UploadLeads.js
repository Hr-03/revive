import React,{useState,useEffect,useRef,useMemo} from "react";
import "../../Styles/Menu/Leads/UploadLeads.css";
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

import * as xlsx from "xlsx";
import Swal from "sweetalert2";
import ExampleDoc from "../../Assets/Upload Leads.xlsx";
import {HiDownload} from "react-icons/hi";
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



function UploadLeads(){
    const navigate=useNavigate();
    const [createModalOpen, setCreateModalOpen] = useState(false);
const xlInput=useRef(null);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  

    const [newobj, setnewObj] = useState({
      ObjLeads:[]
    })

    
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
    let UserId=sessionStorage.getItem("UserId");


    const [xlFileName, setxlFileName] = useState("");


    const readUploadFile = (e) => {
     let newob={
      ObjLeads:[],
      CreatedBy:UserId
     }
    //  let flatar=flatob
     
      e.preventDefault();
      let xlfile=e.target.files[0].name
     setxlFileName(xlfile);
      console.log(e.target.files[0].name);
      if (e.target.files) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const data = e.target.result;
              const workbook = xlsx.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = xlsx.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'mm-dd-yyyy' });
            //  setnewObj((pre)=>{
            //   return{
            //     ...pre,
            //     ObjLeads:json
            //   }
            //  })
            
            newob.ObjLeads.push(json)
    newob.ObjLeads=newob.ObjLeads[0]

              console.log(json);
              console.log(newob);
              sessionStorage.setItem("excel",JSON.stringify(newob));
// console.log("parsed");
              // let d=sessionStorage.getItem("excel");
              // let pd=JSON.parse(d);
              // console.log(pd);
          
              // console.log(e.target);
          };
          reader.readAsArrayBuffer(e.target.files[0]);
      }
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


  const [leads, setLeads] = useState([]);

  useEffect(()=>{
    const leadsUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetLeadsList/${UserId}`;

    fetch(leadsUrl)
    .then((res)=>res.json())
    .then((lead)=>{
      console.log(lead.Data);
      setLeads(lead.Data);
    })
  },[])


  const columns=useMemo(
    () => [
      {
        accessorKey: "SerialNumber",
        header: "Serial Number",
      },
      {
        accessorKey: "Centre",
        header: "Centre",
      },
      {
        accessorKey: "Source",
        header: "Source",
      },
      {
        accessorKey: "Name",
        header: "Name",
      },
      {
        accessorKey: "Inquiry",
        header: "Inquiry",
      },
      {
        accessorKey: "MobileNumber",
        header: "Mobile Number",
      },
      {
        accessorKey: "EmailID",
        header: "Email ID",
      },
      {
        accessorKey: "Comments",
        header: "Comments",
      },
      {
        accessorKey: "LastFollowupDate",
        header: "Last Followup Date",
      },
      {
        accessorKey: "FollowupDate",
        header: "Followup Date",
      },
      // {
      //   accessorKey: "CreatedBy",
      //   header: "Created By",
      // },
      {
        accessorKey: "EnquiryDate",
        header: "Enquiry Date",
      },
      {
        accessorKey: "AssignToUser",
        header: "Assigned to",
      },
      
      
    ])

  
    return(
        <>
       <Sidebar>
       <Card className="m-1 mt-3 upl-crd p-3">
        <Row>
            <Col>
            <p className="upl-t">Upload Leads</p>
            <hr />

           <Row>
            <Col md={3}>
            <input
                                             type="file"
                                             name="upload"
                                             id="upload"
                                             onChange={readUploadFile}
                                            ref={xlInput}
                                            hidden
                                          
                                            
                                          />
            <Button
                      // color="secondary"
                      className="dr-up-btn mx-2"
                      // onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        // navigate("/add-access")
                      
                      // }}
                      onClick={() =>
                        xlInput.current.click()
                      }
                      variant="contained"
                    >
                     Upload Excel
                    </Button>  <span>{xlFileName}</span>
            </Col>
            {

              xlFileName && (
                <Col md={2}>
                <Button className="conf-up" onClick={(e)=>{
                  e.preventDefault();
                  const excelUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewLeads`;
let getxl=sessionStorage.getItem("excel");
let data=JSON.parse(getxl);

                  fetch(excelUrl,{
                    method:"POST",
          headers:{
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
                  })
                  .then((res)=>res.json())
                  .then((result)=>{
                    console.log(result);
                    let inputid=document.getElementById("upload");
                    if(result.Status===true){
                      Swal.fire({
                        icon:"success",
                        title:"Excel uploaded successfully!",
                        timer:2000,
                        showConfirmButton: false

                      })

                      alert(result?.Message);

                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);

                     
                    }
                  })
                }}>Click to upload!</Button>
                </Col>
              )
            }

            <Col>
            <a href={ExampleDoc} download="Excel Format" target='_blank'>
   <Button className="xlFormat"><HiDownload fontSize={22} className="me-2" style={{float:"right"}}/>Excel Format</Button>
</a>

            </Col>

           
           </Row>


           <Row>
            <Col>
            <MaterialReactTable
                  columns={columns}
                  data={leads}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  // enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  // renderRowActions={({ row, table }) => (
                  //   <Box sx={{ display: "flex", gap: "1rem" }}>
                  //     <Tooltip arrow placement="left" title="Edit">
                  //       <IconButton 
                  //       className="edit-btn"
                  //       onClick={() => table.setEditingRow(row)}>
                  //         <FaRegEdit/>
                  //       </IconButton>
                  //     </Tooltip>

                  //     <Tooltip arrow placement="left" title="View">
                  //       <IconButton 
                  //       className="view-btn"
                  //       onClick={() => navigate("/view-enquiry")}
                  //       >
                  //         <AiOutlineEye/>
                  //       </IconButton>
                  //     </Tooltip>

                  //     <Tooltip arrow placement="right" title="Delete">
                  //       <IconButton
                  //         color="error"
                  //         // onClick={() => handleDeleteRow(row)}
                  //       >
                  //         <HiOutlineTrash/>
                  //       </IconButton>
                  //     </Tooltip>
                  //   </Box>
                  // )}
//                   renderTopToolbarCustomActions={() => (
//                     <>
//                     <Button
//                       // color="secondary"
//                       className="addemp-btn"
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
//                      Upload Excel
//                     </Button>
//                     </>
//                   )}
                  // positionActionsColumn="last"
                
                />
            </Col>
           </Row>

           

           {/* <Row className="mt-5">
                        <Col>
                        <Button variant="" className="add-dr-back">Back</Button>
                        </Col>
                        <Col>
                        <Button variant="" className="add-dr-btn">Submit</Button>
                        </Col>
                      </Row> */}



            </Col>
        </Row>
       </Card>
       </Sidebar>
        </>
    );
}

export default UploadLeads;