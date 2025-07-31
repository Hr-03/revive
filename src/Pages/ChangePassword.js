import React,{useState,useMemo,useEffect} from "react";
import "../Styles/Menu/Leads/AddEntry.css";
import "../Components/Sidebar.css";
import Button from '@mui/material/Button';
import { Card, Col, Row ,Modal,Form, InputGroup, Spinner} from "react-bootstrap";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import Sidebar from "../Components/Sidebar";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function ChangePassword(){

    const navigate=useNavigate();

    const [data, setData] = useState({
        OldPassword:"",
        NewPassword:"",
        ConfirmNewPassword: "",
       
      })

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleClickShowOldPassword = () => {
        setShowOldPassword( !showOldPassword );
      };
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowNewPassword = () => {
        setShowNewPassword( !showNewPassword );
      };
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleClickShowConfirmNewPassword = () => {
        setShowConfirmNewPassword( !showConfirmNewPassword);
      };



    const handleChange=(e)=>{
        const newdata={...data};
        newdata[e.target.name]=e.target.value;
        setData(newdata);
        console.log(newdata);
    }

    const changePassUrl="https://reviveapplication.com/ReviveAPI/Revive.svc/ChangePassword";
    const handleSubmit=(e)=>{
        e.preventDefault();
        // Validate if New Password and Confirm New Password match
        if (data.NewPassword !== data.ConfirmNewPassword) {
            Swal.fire({
            icon: "error",
            title: "New Password and Confirm New Password do not match",
            });
            return;
        }

        const apiData = {
            UserID: sessionStorage.getItem("UserId"),
            OldPassword: data.OldPassword,
            NewPassword: data.ConfirmNewPassword,
          };

        
        fetch(changePassUrl,{
            method:"POST",
            headers:{
              Accept: "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiData)
          }).then((res)=>res.json()).then((resp)=>{
             setLoading(false)
             if(resp.Status===true){
                Swal.fire({
                    icon:"success",
                    title:"Password Changed Successfully!",
                    timer:2500
                  })
                  navigate("/dashboard");
             }
             else{
                Swal.fire({
                    icon:"error",
                    title:resp.Message
                  })
             }
          })
    }    

return(
    <>
   <Sidebar>
   <Card className="m-1 mt-3 ent-crd p-3">
    <Row>
        <Col>
        <p className="ent-t">Change Admin Password</p>
        <hr />

      
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Old Password <span className="req-f">*</span></Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control  type={showOldPassword?"text":"password"} placeholder="" name="OldPassword" className="fn"  onChange={(e) => handleChange(e)} />
                    
                    <InputGroup.Text
                        id="basic-addon2"
                        className="pass-icon"
                    >
                        <Button variant="" onClick={(e)=>{ handleClickShowOldPassword()}}>{showOldPassword?<AiFillEye fontSize={20}/>:<AiFillEyeInvisible fontSize={20}/>}</Button>
                        
                    </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>New Password <span className="req-f">*</span></Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control type={showNewPassword?"text":"password"} placeholder="" name="NewPassword" className="fn" onChange={(e) => handleChange(e)}/>
                    <InputGroup.Text
                        id="basic-addon2"
                        className="pass-icon"
                    >
                        <Button variant="" onClick={(e)=>{ handleClickShowNewPassword()}}>{showNewPassword?<AiFillEye fontSize={20}/>:<AiFillEyeInvisible fontSize={20}/>}</Button>
                        
                    </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                </Col>
                <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Confirm New Password <span className="req-f">*</span></Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control type={showConfirmNewPassword?"text":"password"} placeholder="" name="ConfirmNewPassword" className="fn" onChange={(e) => handleChange(e)} />
                    <InputGroup.Text
                        id="basic-addon2"
                        className="pass-icon"
                    >
                        <Button variant="" onClick={(e)=>{ handleClickShowConfirmNewPassword()}}>{showConfirmNewPassword?<AiFillEye fontSize={20}/>:<AiFillEyeInvisible fontSize={20}/>}</Button>
                        
                    </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                </Col>

            </Row>
                <Row className="mt-5">
                <Col>
                <Button variant="" type="submit" className="ent-sub">Submit
                {loading?<Spinner animation="border" className="load"/>:""}</Button>
                </Col>
                <Col>
                <Button variant="" type="reset" className="ent-res">Reset</Button>
                </Col>
            </Row>
          </Form>



        </Col>
    </Row>
   </Card>
   </Sidebar>
    </>
);
}


export default ChangePassword;