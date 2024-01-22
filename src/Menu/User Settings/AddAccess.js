import React, { useState, useMemo, useEffect } from "react";
import "../../Styles/Menu/User Settings/AddAccess.css";
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
import { Card, Col, Row, Modal, Form, Table } from "react-bootstrap";
import MaterialReactTable from "material-react-table";
// import "../../index.css";
import { Delete, Edit } from "@mui/icons-material";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
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

import { MdLogout } from "react-icons/md";
import Swal from "sweetalert2";
import invoice from "../../Assets/invoice.png";
import addTmnt from "../../Assets/addtmt.png";
import addColl from "../../Assets/addcoln.png";
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

function AddAccess() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();
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
      {
        accessorKey: "srNo",
        header: "Sr No.",
        muiTableHeadCellFilterTextFieldProps: { placeholder: "Sr.No." },
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "menu",
        header: "Menu",
      },
      {
        accessorKey: "add",
        header: "Add",
      },
      {
        accessorKey: "edit",
        header: "Edit",
      },
      {
        accessorKey: "delete",
        header: "Delete",
      },
      {
        accessorKey: "view",
        header: "view",
      },
      {
        accessorKey: "download",
        header: "Download",
        Cell: ({ cell }) => {
          let a = cell.getValue();
          return a === "unChecked" ? (
            <img
              src="https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-cross-icon-flat-style-png-image_1811243.jpg"
              alt=""
              srcset=""
              width={50}
            />
          ) : (
            <img
              src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
              width={50}
            />
          );
        },
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
        role: "Admin",
        menu: "Clinic Settings",
        add: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
        edit: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
        delete: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
        view: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
        download: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
      },
      {
        srNo: 2,
        role: "Doctor",
        menu: "User Settings",
        add: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
        edit: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
        delete: (
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
            width={50}
          />
        ),
        view: (
          <img
            src="https://flyclipart.com/thumb2/x-button-327024.png"
            width={50}
          />
        ),
        download: "unChecked",
      },
    ],
    []
  );

  //   $('#selectall').click(function() {
  //     $(this.form.elements).filter(':checkbox').prop('checked', this.checked);
  // });

  // $(document).ready(function () {
  //   $("#chkParent").click(function () {
  //     var isChecked = $(this).prop("checked");
  //     $("#tblData:has(td)")
  //       .find('input[type="checkbox"]')
  //       .prop("checked", isChecked);
  //   });
  //   $("#tblData:has(td)")
  //     .find('input[type="checkbox"]')
  //     .click(function () {
  //       var isChecked = $(this).prop("checked");
  //       var isHeaderChecked = $("#chkParent").prop("checked");
  //       if (isChecked == false && isHeaderChecked)
  //         $("#chkParent").prop("checked", isChecked);
  //       else {
  //         $("#tblData:has(td)")
  //           .find('input[type="checkbox"]')
  //           .each(function () {
  //             if ($(this).prop("checked") == false) isChecked = false;
  //           });
  //         $("#chkParent").prop("checked", isChecked);
  //       }
  //     });
  // });



  $(document).ready(function () {
    $("#chkParent").click(function () {
      var isChecked = $(this).prop("checked");
      $("#tblData:has(td)")
        .find('input[type="checkbox"]')
        .prop("checked", isChecked);
  
      // Update setAddAccess based on chkParent checkbox state
      if (isChecked) {
        setAddAccess((pre) => ({
          ...pre,
          Adds: 1,
          Views: 1,
          Edits: 1,
          Deletes: 1,
          Download: 1,
        }));
      } else {
        setAddAccess((pre) => ({
          ...pre,
          Adds: 0,
          Views: 0,
          Edits: 0,
          Deletes: 0,
          Download: 0,
        }));
      }

      console.log(addAccess);

    });
  
    $("#tblData:has(td)")
      .find('input[type="checkbox"]')
      .click(function () {
        var isChecked = $(this).prop("checked");
        var isHeaderChecked = $("#chkParent").prop("checked");
        if (isChecked == false && isHeaderChecked)
          $("#chkParent").prop("checked", isChecked);
        else {
          $("#tblData:has(td)")
            .find('input[type="checkbox"]')
            .each(function () {
              if ($(this).prop("checked") == false) isChecked = false;
            });
          $("#chkParent").prop("checked", isChecked);
        }
  
        // Update setAddAccess based on chkParent checkbox state
        if (isChecked) {
          setAddAccess((pre) => ({
            ...pre,
            Adds: 1,
            Views: 1,
            Edits: 1,
            Deletes: 1,
            Download: 1,
          }));
        } else {
          setAddAccess((pre) => ({
            ...pre,
            Adds: 0,
            Views: 0,
            Edits: 0,
            Deletes: 0,
            Download: 0,
          }));
        }

        console.log(addAccess);

      });
  });
  

  $(document).ready(function () {
    $("#chkParent1").click(function () {
      var isChecked = $(this).prop("checked");
      $("#tblData2:has(td)")
        .find('input[type="checkbox"]')
        .prop("checked", isChecked);
    });
    $("#tblData2:has(td)")
      .find('input[type="checkbox"]')
      .click(function () {
        var isChecked = $(this).prop("checked");
        var isHeaderChecked = $("#chkParent1").prop("checked");
        if (isChecked == false && isHeaderChecked)
          $("#chkParent1").prop("checked", isChecked);
        else {
          $("#tblData2:has(td)")
            .find('input[type="checkbox"]')
            .each(function () {
              if ($(this).prop("checked") == false) isChecked = false;
            });
          $("#chkParent1").prop("checked", isChecked);
        }
      });
  });

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


  const [roles, setRoles] = useState([]);

  const rolesUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetRoleList`;
  useEffect(() => {
    fetch(rolesUrl)
      .then((res) => res.json())
      .then((rolesRes) => {
        console.log(rolesRes.Data);
        setRoles(rolesRes.Data);
      });
  }, []);

  const [permission, setPermission] = useState("");

  const [addAccess, setAddAccess] = useState({
    AccessID:"0",
    RoleID: "",
    MenuID: "",
    Adds:"",
    Edits:"",
    Views:"",
    Deletes:"",
    Download:"",
    CreatedBy:"1",
    IPAddress:"1"
  });

  const [menuAccess, setMenuAccess] = useState([]);


  const handleChange = (e) => {
    const newdata = { ...addAccess };
    newdata[e.target.name] = e.target.value;
    setAddAccess(newdata);



    fetch(`https://reviveapplication.com/ReviveAPI/Revive.svc/GetRoleMenuList/${newdata?.RoleID}`)
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);
setMenuAccess(result.Data)
    })
    // console.log(newdata);

    // let perm = document.getElementById("menuAP");
    // let text = perm.innerHTML;
    // console.log(text);


    // setPermission(text);

    let sAll=document.getElementById("chkParent");
    let add=document.getElementById("Add");
    let edit=document.getElementById("Edit");
    let dlt=document.getElementById("Delete");
    let view=document.getElementById("View");
    let dwnld=document.getElementById("Download");


    // if(sAll?.checked){
    //   setAddAccess((pre)=>{
    //     return{
    //       ...pre,
    //       Adds:1,
    //       Views:1,
    //       Edits:1,
    //       Deletes:1,
    //       Download:1
    //     }
    //   })
    // }
    // else{
    //   setAddAccess((pre)=>{
    //     return{
    //       ...pre,
    //       Adds:0,
    //       Views:0,
    //       Edits:0,
    //       Deletes:0,
    //       Download:0
    //     }
    //   })
    // }


    if(add?.checked){
      setAddAccess((pre)=>{
        return{
          ...pre,
          Adds:1
        }
      })
    }
    else{
      setAddAccess((pre)=>{
        return{
          ...pre,
          Adds:0
        }
      })
    }


    if(view?.checked){
      setAddAccess((pre)=>{
        return{
          ...pre,
          Views:1
        }
      })
    }
    else{
      setAddAccess((pre)=>{
        return{
          ...pre,
          Views:0
        }
      })
    }



    if(edit?.checked){
      setAddAccess((pre)=>{
        return{
          ...pre,
          Edits:1
        }
      })
    }
    else{
      setAddAccess((pre)=>{
        return{
          ...pre,
          Edits:0
        }
      })
    }




    if(dlt?.checked){
      setAddAccess((pre)=>{
        return{
          ...pre,
          Deletes:1
        }
      })
    }
    else{
      setAddAccess((pre)=>{
        return{
          ...pre,
          Deletes:0
        }
      })
    }




    if(dwnld?.checked){
      setAddAccess((pre)=>{
        return{
          ...pre,
          Download:1
        }
      })
    }
    else{
      setAddAccess((pre)=>{
        return{
          ...pre,
          Download:0
        }
      })
    }

    


   




    console.log(addAccess);
  };





  const handleSubmitAccess=(e)=>{
    e.preventDefault();

    const addAccessUrl=`https://reviveapplication.com/ReviveAPI/Revive.svc/AddNewMenuAccess`;

    fetch(addAccessUrl,{
      method:"POST",
          headers:{
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(addAccess)
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result);

      if(result.Status===true){
        Swal.fire({
          icon:'success',
          title:"Added successfully!",
          timer:2000,
          showConfirmButton:false
        })

        

        navigate("/access-perm");
      }
    })
  }


  // const menuAccessUrl = `https://reviveapplication.com/ReviveAPI/Revive.svc/GetMenuList`;

  // useEffect(() => {
  //   fetch(menuAccessUrl)
  //     .then((res) => res.json())
  //     .then((menuaccRes) => {
  //       console.log(menuaccRes.Data);
  //       setMenuAccess(menuaccRes.Data);
  //     });
  // }, []);

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
    <Card className="m-1 mt-3 addap-crd p-3">
            <Row>
              <Col>
                <p className="addap-t">Add Access Permission</p>
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

                <Form onSubmit={handleSubmitAccess}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="RoleID"
                          onChange={handleChange}
                        >
                          <option></option>
                          {roles.map((role, i) => {
                            return (
                              <>
                                <option value={role.RoleID}>
                                  {role.Roles}
                                </option>
                              </>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Menu</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="MenuID"
                          onChange={handleChange}
                        >
                          <option></option>
                          {menuAccess.map((menuAcc, i) => {
                            return (
                              <>
                                <option
                                  id="menuAP"
                                  value={menuAcc.MenuID}
                                  menu={menuAcc.MenuName}
                                >
                                  {menuAcc.MenuName}
                                </option>
                              </>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Menu Name</th>
                        <th>Select All</th>
                        <th>Add</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    {
                      addAccess.MenuID?
                    <tbody>
                      <tr id="tblData">
                        <td>
                          {addAccess.MenuID === "1"
                            ? "Dashboard"
                            : addAccess.MenuID === "3"
                            ? "Menu"
                            : addAccess.MenuID === "6"
                            ? "Leads/Patients"
                            : addAccess.MenuID === "7"
                            ? "Appointment"
                            : addAccess.MenuID === "8"
                            ? "Reports"
                            : addAccess.MenuID === "23"
                            ? "Invoice"
                            : addAccess.MenuID === "26"
                            ? "Add Patients Treatment"
                            : addAccess.MenuID === "27"
                            ? "Add Collection"
                            : addAccess.MenuID === "36"
                            ? "Consultation Invoice"
                            :""}
                        </td>
                        <td>
                          <Form.Check
                            aria-label="option 1"
                            type="checkbox"
                            id="chkParent"
                            name="SelectAll"
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <Form.Check
                            aria-label="option 2"
                            type="checkbox"
                            name="Adds"
                            id="Add"
                            onChange={handleChange}

                          />
                        </td>
                        <td>
                          <Form.Check
                            aria-label="option 3"
                            type="checkbox"
                            name="Edits"
                            id="Edit"
                            onChange={handleChange}

                          />
                        </td>
                        <td>
                          <Form.Check
                            aria-label="option 4"
                            type="checkbox"
                            name="Deletes"
                            id="Delete"
                            onChange={handleChange}

                          />
                        </td>
                        <td>
                          <Form.Check
                            aria-label="option 5"
                            type="checkbox"
                            name="Views"
                            id="View"
                            onChange={handleChange}

                          />
                        </td>
                        <td>
                          <Form.Check
                            aria-label="option 6"
                            type="checkbox"
                            name="Download"
                            id="Download"
                            onChange={handleChange}

                          />
                        </td>
                      </tr>
                      {/* <tr id="tblData2">
                        <td>User Settings</td>
                        <td><input aria-label="option 1" type="checkbox" id="chkParent1"/></td>
                        <td><input aria-label="option 2" type="checkbox" name="chk1"/></td>
                        <td><input aria-label="option 3" type="checkbox" name="chk1"/></td>
                        <td><input aria-label="option 4" type="checkbox" name="chk1"/></td>
                        <td><input aria-label="option 5" type="checkbox" name="chk1"/></td>
                        <td><input aria-label="option 6" type="checkbox" name="chk1"/></td>
                    </tr> */}
                    </tbody>:""
                    }
                  </Table>
                  <Row className="mt-4 text-center">
                    <Col>
                      <Button variant="" type="submit" className="addap-sub">
                        Submit
                      </Button>
                    </Col>
                    {/* <Col>
                      <Button variant="" type="reset" className="addap-back">
                        Reset
                      </Button>
                    </Col> */}
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
    </Sidebar>
    </>
  );
}

export default AddAccess;
