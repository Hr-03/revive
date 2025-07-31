import React, { useState, useMemo, useEffect } from "react";
import "../../Styles/Menu/Leads/FollowUpEntries.css";
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
import { Card, Col, Row, Modal, Form } from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import { AiOutlineEye } from "react-icons/ai";
import { BsSnow } from "react-icons/bs";
import { FaCheckCircle, FaEye, FaRegEdit } from "react-icons/fa";
import { MdCall, MdLogout } from "react-icons/md";
import { HiOutlineTrash, HiFire, HiUserAdd } from "react-icons/hi";
import { SiMicrosoftexcel } from "react-icons/si";
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
import calendarap from "../../Assets/calendar.png";

import invoice from "../../Assets/invoice.png";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
import { CSVLink, CSVDownload } from "react-csv";
import { LiaDownloadSolid } from "react-icons/lia";
import Sidebar from "../../Components/Sidebar";
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

function FollowUpEntries() {
  const [datedata, setdatedata] = useState({
    startDate:"",
    endDate:""
  })

  const [filterValues, setFilterValues] = useState(() => {
    const savedFilters = localStorage.getItem('filterValues');
    return savedFilters ? JSON.parse(savedFilters) : {};
  });

  const handleFilterChange = (columnId, filterValue) => {
    const newFilterValues = { ...filterValues, [columnId]: filterValue };
    setFilterValues(newFilterValues);
    localStorage.setItem('filterValues', JSON.stringify(newFilterValues));
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem('filterValues');
    if (savedFilters) {
      setFilterValues(JSON.parse(savedFilters));
    }
  }, []);


  const handleDates=(e)=>{
    const newdata={...datedata};
    newdata[e.target.name]=e.target.value;
    setdatedata(newdata);
    localStorage.setItem('followupentriesdatedata', JSON.stringify(newdata));
    console.log(newdata);
  }
  
  // Function to load saved dates from local storage on component mount
  useEffect(() => {
    const savedDates = localStorage.getItem('followupentriesdatedata');
    if (savedDates) {
      setdatedata(JSON.parse(savedDates));
    }
  }, []);


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
        accessorKey: "Name",
        header: "Name",
      },
      {
        accessorKey: "MobileNo",
        header: "Mobile Number",
      },
      {
        accessorKey: "FollowUpDate",
        header: "Follow Up Date",
        Cell: ({ cell }) => {
          let fupdate = cell.getValue();
          return (
            <>
              <div>{fupdate.split(" ")[0]}</div>
            </>
          );
        },
        filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
      },
      {
        accessorKey: "Comments",
        header: "Comments",
      },
      {
        accessorKey: "SourceType",
        header: "Source Type",
      },
     
      {
        accessorKey: "AssignedToDoctor",
        header: "Assigned To Doctor ",
      },
      {
        accessorKey: "AssignedToClinic",
        header: "Assigned To Clinic",
      },
      {
        accessorKey: "EnquiryFor",
        header: "Enquiry For",
      }, 
      // {
      //   accessorKey: "totalFollowUp’s",
      //   header: "Total Follow Up’s",

      // },
      {
        accessorKey: "FollowUpStatus",
        header: "Follow-Up Status",
      },
      {
        accessorKey: "EnquiryDate",
        header: "Enquiry Date",
        Cell: ({ cell }) => {
          let enqdate = cell.getValue();
          return (
            <>
              <div>{enqdate.split(" ")[0]}</div>
            </>
          );
        },
        filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
      },
      {
        accessorKey: "LastFollowUpDate",
        header: "Last Follow-Up Date",
        Cell: ({ cell }) => {
          let fupdate = cell.getValue();
          return (
            <>
              <div>{fupdate.split(" ")[0]}</div>
            </>
          );
        },
        filterFn: (row, id, filterValue) =>
        row.getValue(id).startsWith(filterValue),
      },
      {
        accessorKey: "EnquiryType",
        header: "Enquiry Type",
        Cell: ({ cell }) => {
          let etype = cell.getValue();
          return (
            <>
              <div>
                {etype === "Warm" ? (
                  <span>
                    {etype}{" "}
                    <HiFire fontSize={20} className="mx-2" color="#FFA500" />
                  </span>
                ) : etype === "cold" ? (
                  <span>
                    {etype}{" "}
                    <BsSnow fontSize={20} className="mx-2" color="#47b2ff" />
                  </span>
                ) : etype === "Hot" ? (
                  <span>
                    {etype}{" "}
                    <HiFire fontSize={20} className="mx-2" color="red" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  const [data, setData] = useState(
    [
      {
        srNo: 1,
        // enquiry: "001",
        name: "Akshay Valiya",
        mobileNumber: "726917944",
        enquiryDate: "09 Feb 2023",
        sourceType: "Internet",
        assignedToDoctor: "Dr. Pankti",
        assignedToClinic: "Borivali",
        enquiryFor: "Acne (Pimples)",
        followUpDate: "15/01/2023",
        totalFollowUps: "0",
        followUpStatus: "In Progress",
        enquiryType: (
          <span>
            Warm 
          </span>
        ),
      },
      {
        srNo: 2,
        // enquiry: "002",
        name: "Ayush Shah",
        mobileNumber: "726917944",
        enquiryDate: "09 Feb 2023",
        sourceType: "Just Dial",
        assignedToDoctor: "Dr. Pankti",
        assignedToClinic: "Kandivali",
        enquiryFor: "Under Eye Dark Circles",
        followUpDate: "15/01/2023",
        totalFollowUps: "0",
        followUpStatus: "In Progress",
        enquiryType: <span>Cold </span>,
      },
    ],
    []
  );

  let Role=sessionStorage.getItem("RoleId");

  let User=Role==="1"?0:sessionStorage.getItem("UserId")

//   useEffect(()=>{
// if(Role==="1"){
//   User+=0;
//   console.log(User);
// }

//   },[])

  const [fupentries, setFupEntries] = useState([]);

  var fentUrl= null;

  if(localStorage.getItem('followupentriesdatedata') != null){
    const searchdatedata = JSON.parse(localStorage.getItem('followupentriesdatedata'));
    // Use the extracted startDate and endDate in the API URL
    fentUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetFollowUpList/0/0/0/0/${searchdatedata.startDate}/${searchdatedata.endDate}/${User}/0`;
  }
  else{
    fentUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetFollowUpList/0/0/0/0/0/0/${User}/0`;
  }
 
  useEffect(() => {
    fetch(fentUrl)
      .then((res) => res.json())
      .then((entry) => {
        console.log(entry.Data);
        setFupEntries(entry.Data);
      });
  }, []);




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
  return (
    <>
    <Sidebar>
    <Card className="m-1 mt-3 fup-crd p-3">
            <Row>
              <Col>
                <p className="ap-t">Follow Up Entries</p>
                <hr />

                <Row className="mt-4">
          <Col>
          <span><b>Note : </b>Search by last followup date</span>
          <div className='d-flex flex-wrap mt-3'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>From date</Form.Label>
        <Form.Control type="date" name="startDate" value={datedata?.startDate} placeholder="" onChange={handleDates} />
      </Form.Group>
      <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
        <Form.Label>To date</Form.Label>
        <Form.Control type="date" name="endDate" value={datedata?.endDate} placeholder="" onChange={handleDates}/>
      </Form.Group>
<div className='pt-3'>

      <Button variant='' className='mx-3 rptBtn mt-4' onClick={(e)=>{
        e.preventDefault();

        const datefiltered=`https://reviveapplication.com/ReviveAPI/Revive.svc/GetFollowUpList/0/0/0/0/${datedata?.startDate}/${datedata?.endDate}/${User}/0`
        fetch(datefiltered)
        .then((res)=>res.json())
        .then((geteRes)=>{
          console.log(geteRes.Data);
          setFupEntries(geteRes.Data)
        })

      }}>Search</Button>
</div>
          </div>
          </Col>
        </Row>

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
  <CSVLink data={fupentries} style={{textDecoration:"none",color:"white",backgroundColor:"green",borderRadius:"5px"}} className='p-2'><LiaDownloadSolid fontSize={25}/>Excel</CSVLink>
  {/* <p className='text-end'><b>Total :</b>{Total}</p> */}
</div>:""
            }

            

                <MaterialReactTable
                  columns={columns}
                  data={fupentries}
                  initialState={{ showColumnFilters: true }} //show filters by default
                  // getRowId={(originalRow) => {
                  //   console.log(originalRow.EnquiryID);
                  // sessionStorage.setItem("enqid",originalRow.EnquiryID);
                  // }}

                  //for sr no.
                  // -------------------
                  // enableRowNumbers="original"      
                  muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: "0.5rem 0", width: "100%" },
                    variant: "outlined",
                    onChange: (e, columnId) => handleFilterChange(columnId, e.target.value),
                  }}
                  enableEditing
                  // onEditingRowSave={handleSaveRowEdits}
                  // onEditingRowCancel={handleCancelRowEdits}

                  renderRowActions={({ cell, row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Tooltip arrow placement="left" title="follow-up">
                        <IconButton
                          className="edit-btn"
                          // onClick={() => table.setEditingRow(row)}
                          onClick={() => {
                            // console.log(table.getAllColumns());
                            let enquiryId = cell.row.original.EnquiryID;
                            sessionStorage.setItem("EnqId", enquiryId);
                            console.log(cell.row.original.EnquiryID); //went inside cell logged it then went inside it's objects like row,original,enqId etc

                            navigate(`/fup-details/${enquiryId}`);
                          }}
                        >
                          <MdCall />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="convert">
                        <IconButton
                          color="info"
                          onClick={() => {
                            let enquiryId = cell.row.original.EnquiryID;
                            sessionStorage.setItem("convEnqId", enquiryId);
                            console.log(cell.row.original.EnquiryID);

                            navigate(`/fup-pnt/${enquiryId}`)
                          }}
                        >
                          <HiUserAdd />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="left" title="View">
                        <IconButton
                          className="view-btn"
                          onClick={() => 
                            {
                              let enquiryId = cell.row.original.EnquiryID;
                              sessionStorage.setItem("convEnqId", enquiryId);
                              console.log(cell.row.original.EnquiryID);
                              navigate(`/fup-view/${enquiryId}`)}
                            }
                        >
                          <AiOutlineEye />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
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
                  //                      Upload Excel <SiMicrosoftexcel color="#33c481" className="mx-2" fontSize={20}/>
                  //                     </Button>
                  //                     </>
                  //                   )}
                  //   positionActionsColumn="last"
                />
              </Col>
            </Row>
          </Card>
    </Sidebar>
    </>
  );
}

export default FollowUpEntries;
