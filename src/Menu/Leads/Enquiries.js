import React,{useState,useMemo, useEffect} from "react";
import "../../Styles/Menu/Leads/Enquiries.css";
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
import {FaCheckCircle, FaEye, FaRegEdit} from "react-icons/fa";
import { AiOutlineEye} from "react-icons/ai";
import {HiOutlineTrash} from "react-icons/hi";
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

import { MdLogout } from "react-icons/md";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
import Swal from "sweetalert2";
import { CSVLink, CSVDownload } from "react-csv";
import { LiaDownloadSolid } from "react-icons/lia";
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
  

function Enquiries(){
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

    const [enqIDtoDelete, setenqIDtoDelete] = useState({
      EnquiryID:""
    });

    const [show, setShow] = useState(false);

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    const [enquiryList, setEnquiryList] = useState([]);

    let UserId=sessionStorage.getItem("UserId");
    let RoleId=sessionStorage.getItem("RoleId");


const enquiryUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetEnquiryList/${RoleId==="1"?0:UserId}/0/0/0/0/0`;

    useEffect(()=>{
      fetch(enquiryUrl)
      .then((res)=>res.json())
      .then((enqs)=>{
        console.log(enqs.Data);
        setEnquiryList(enqs.Data);
        console.log(enquiryList.length);
      })
    },[])

    const columns = useMemo(
        () => [
          // {
          //   accessorKey: "srNo",
          //   header: "Sr No.",
          //   muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
            
          // },
          {
            accessorKey: "EnquiryID",
            header: "Enquiry No.",
          },
          {
            accessorKey: "Name",
            header: "Name",
          },
          {
            accessorKey: "Mobile",
            header: "Mobile Number",
          },
          {
            accessorKey: "ClinicName",
            header: "Clinic Name",
          },
          {
            accessorKey: "Source",
            header: "Source Name",
          },
          {
            accessorKey: "IsPatient",
            header: "Status",
            Cell: ({ cell }) => {
              return <div>{cell.getValue()==="True"?<p>Patient</p>:<p>Follow-up</p>}</div>;
            },
          },
          {
            accessorKey: "EnquiryDate",
            header: "Date",
            Cell:({cell})=>{
              let edate=cell.getValue()
              return <div>{edate.split(" ")[0]}</div>
            },
            filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
           
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
            enquiry: "001",
            name:"Akshay Valiya",
            mobileNumber:"726917944",
            clinicName:"Malad",
            sourceName:"Internet",
            status:"Follow up",
            date:"08 Feb 2023"
           
          },
          {
            srNo: 2,
            enquiry: "002",
            name:"Akshay Valiya",
            mobileNumber:"726917944",
            clinicName:"Malad",
            sourceName:"Internet",
            status:"Follow up",
            date:"08 Feb 2023"
            
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
    return(
        <>
       <Sidebar>
       <Card className="m-1 mt-3 ap-crd p-3">
        <Row>
            <Col>
            <p className="ap-t">Enquiries</p>
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

            {
              Role==="1"?
<div className='d-flex justify-content-between m-2'>
  <CSVLink data={enquiryList} style={{textDecoration:"none",color:"white",backgroundColor:"green",borderRadius:"5px"}} className='p-2'><LiaDownloadSolid fontSize={25}/>Excel</CSVLink>
  {/* <p className='text-end'><b>Total :</b>{Total}</p> */}
</div>:""
            }


            <MaterialReactTable
                  columns={columns}
                  data={enquiryList}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                  }}
                  enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}
                  renderRowActions={({ cell,row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton 
                        className="edit-btn"
                        onClick={() =>
                          {
                            let enquiryId = cell.row.original.EnquiryID;
                            sessionStorage.setItem("EditEnq", enquiryId);
                            console.log(cell.row.original.EnquiryID);
                            navigate(`/edit-enq/${enquiryId}`)
                          }
                          }
                        
                        
                        >
                          <FaRegEdit/>
                        </IconButton>
                      </Tooltip>

                      
                      <Tooltip arrow placement="left" title="View">
                        <IconButton 
                        className="view-btn"
                        onClick={() =>
                          {
                            let enquiryId = cell.row.original.EnquiryID;
                            sessionStorage.setItem("viewEnq", enquiryId);
                            console.log(cell.row.original.EnquiryID);
                            navigate(`/view-enquiry/${enquiryId}`)
                          }
                          }
                        >
                          <AiOutlineEye/>
                        </IconButton>
                      </Tooltip>

                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => {
                            setenqIDtoDelete((pre)=>{
                              return{
                                ...pre,

                                EnquiryID:cell.row.original.EnquiryID
                              }
                            }
                              );
                            handleShowModal();
                          }}
                        

                        >
                          <HiOutlineTrash/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  renderTopToolbarCustomActions={() => (
                    <>
                    <Button
                      // color="secondary"
                      className="addemp-btn"
                      onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        navigate("/add-entry")
                      
                      }}
                      variant="contained"
                    >
                     Add New Enquiry
                    </Button>




{/* <Button
                      // color="secondary"
                      className="dr-up-btn mx-2"
                      onClick={() => {
                        // setCreateModalOpen(true);
                        // handleShowAddRole();
                        // navigate("/add-access")
                      
                      }}
                      variant="contained"
                    >
                     Upload Excel
                    </Button> */}
                    </>
                  )}
                  positionActionsColumn="last"
                
                />

<Modal show={show} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this enquiry?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={(e)=>{
            e.preventDefault();

            const url=`https://reviveapplication.com/ReviveAPI/Revive.svc/DeleteEnquiry`;

            fetch(url,{
              method:"POST",
              headers:{
                Accept: "application/json",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(enqIDtoDelete)
            })
            .then((res)=>res.json())
            .then((result)=>{
              console.log(result);

              if(result.Status===true){
                Swal.fire({
                  icon:"success",
                  title:`${result.Message}`
                })
                // handleCloseModal();

                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
              else{
                Swal.fire({
                  icon:"error",
                  title:`${result.Message}`
                })
              }
            })
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


export default Enquiries;