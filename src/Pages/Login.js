import React,{useState} from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import brandimg from "../Assets/loginImg.png";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import "../Styles//Login.css";
import {useNavigate} from "react-router-dom";
import logo from "../Assets/logo.png";
import Swal from "sweetalert2";



function Login() {

    const navigate=useNavigate();

    const [data, setData] = useState({
      Username:"",
      Passwords:"",
     
    })


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword( !showPassword );
      };
      const [loading, setLoading] = useState(false)


    const handleChange=(e)=>{
        const newdata={...data};
        newdata[e.target.name]=e.target.value;
        setData(newdata);
        console.log(newdata);
    }

    const logUrl="https://reviveapplication.com/ReviveAPI/Revive.svc/VerifyLogin";




    const handleLogin=(e)=>{
      e.preventDefault();

      try {
  setLoading(true)

        fetch(logUrl,{
          method:"POST",
          headers:{
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res)=>res.json()).then((resp)=>{
    setLoading(false)

          console.log(resp);
if(resp.status===true && resp?.Data[0]?.RoleID===1){
  sessionStorage.setItem("RoleId",resp.Data[0]?.RoleID);
  sessionStorage.setItem("UserId",resp.Data[0]?.UserID);
  Swal.fire({
    icon:"success",
    title:"Logged in successfully!",
    timer:2500,
    showConfirmButton:false
  
  })
  navigate("/dashboard");
}
          else if(resp.status===true && resp?.Data[0]?.RoleID!="1"){
            sessionStorage.setItem("RoleId",resp.Data[0]?.RoleID);
            sessionStorage.setItem("UserId",resp.Data[0]?.UserID);
            Swal.fire({
              icon:"success",
              title:"Logged in successfully!",
              timer:2500,
              showConfirmButton:false
            
            })
            navigate("/dashboard2");
          }
          else{
            Swal.fire({
              icon:"error",
              title:"Please check your credentials and try again!"
            })
          }
        })
      } catch (error) {
        console.log(error);
      }

     
    }
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center vh-100 align-items-center cont-main"
      >
        <Card className="border-0">
          <Row>
            <Col className="pe-0 imgcol" md={6}>
              <img src={brandimg} alt="" srcset=""  className="loginimg" />
              <img src={logo} alt="" srcset="" className="loginlogo m-auto" />
            </Col>
            <Col className="ps-3 pe-3 creds-bg" md={6}>
              <Container className="d-flex justify-content-center h-100 align-items-center">
                <Card className="ms-0 ms-md-3 me-0 me-md-3 p-5 m-3 m-md-0 cred-crd">
                  <p className="text-center wc-txt mb-1">Welcome to</p>
                  <p className="text-center head-txt">
                    Dr. Pankti’s Revive Multi Speciality Clinic
                  </p>
                  <p className="text-center login-txt mt-3">
                    <u>Login to your account</u>
                  </p>
                  <Row className="mt-3">
                    <Col className="">
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>User Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="Username"
                            value={data.Username}
                            placeholder="Enter your username"
                            className="p-3 user-ip"
                            onChange={(e)=>handleChange(e)}

                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Password</Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                      type={showPassword?"text":"password"}
                              placeholder="Enter your password"
                              value={data.Passwords}
                              aria-label="Recipient's username"
                              name="Passwords"
                              aria-describedby="basic-addon2"
                              className="pass-ip p-3"
                              onChange={(e)=>handleChange(e)}
                            />
                            <InputGroup.Text
                              id="basic-addon2"
                              className="pass-icon"
                            >
                                <Button variant="" onClick={(e)=>{ handleClickShowPassword()}}>{showPassword?<AiFillEye fontSize={20}/>:<AiFillEyeInvisible fontSize={20}/>}</Button>
                              
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>

                        <Row className="text-center mt-5">
                          <Col>
                            <Button
                              variant=""
                              type="submit"
                              className="login-btn"
                              onClick={(e)=>handleLogin(e)}
                            >
                              {loading?<Spinner animation="border" className="load"/>:"LOGIN"}
                            </Button> <br />

{/* {
  loading &&

                          <Spinner animation="border" className="load"/>
} */}

                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Card>
              </Container>
            </Col>
          </Row>
        </Card>

        
      </Container>
    </>
  );
}

export default Login;
