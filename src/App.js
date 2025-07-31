import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Branch from './Menu/Clinic Settings/Branch';
import AddBranch from './Menu/Clinic Settings/AddBranch';
import SkinAndLaser from './Menu/Clinic Settings/Treatments/Skin&Laser';
import WeightLoss from './Menu/Clinic Settings/Treatments/WeightLoss';
import HairT from './Menu/Clinic Settings/Treatments/Hair';
import Homeopathy from './Menu/Clinic Settings/Treatments/Homeopathy';
import LeadSources from './Menu/Clinic Settings/LeadSources';
import Role from './Menu/User Settings/Role';
import AccessPermission from './Menu/User Settings/AccessPermission';
import AddAccess from './Menu/User Settings/AddAccess';
import DoctorRegistration from './Menu/User Settings/DoctorRegistration';
import AddDoctor from './Menu/User Settings/AddDoctor';
import EmployeeRegistration from './Menu/User Settings/EmployeeRegistration';
import AddEmployee from './Menu/User Settings/AddEmployee';
import Enquiries from './Menu/Leads/Enquiries';
import AddEntry from './Menu/Leads/AddEntry';
import ViewEntry from './Menu/Leads/ViewEntry';
import FollowUpEntries from './Menu/Leads/FollowUpEntries';
import FollowupDetails from './Menu/Leads/FollowupDetails';
import PatientFollowUpEntries from './Menu/Leads/PatientFollowUpEntries';
import ViewPatientFollowUpDetails from './Menu/Leads/ViewPatientFollowUpDetails';
import PatientFollowUpDetails from './Menu/Leads/PatientFollowUpDetails';
import ViewFollowupDetails from './Menu/Leads/ViewFollowupDetails';
import PatientConversion from './Menu/Leads/PatientConversion';
import Patients from './Menu/Leads/Patients';
import ViewPatient from './Menu/Leads/ViewPatient';
import UploadLeads from './Menu/Leads/UploadLeads';
// import BookAppointmnet from './Menu/Appointment/BookAppointment';
import BookAppointment from './Menu/Appointment/BookAppointment';
import AddAppointment from './Menu/Appointment/AddAppointment';
import ViewAppointment from './Menu/Appointment/ViewAppointment';
// import TodaysAppointment from './Pages/TodaysFollowups';
import TodaysFollowups from './Pages/TodaysFollowups';
import ViewDoctorProfile from './Menu/User Settings/ViewDoctorProfile';
import Dashboard from './Pages/Dashboard';
import ConvertToPatient from './Menu/Leads/ConvertToPatient';
import Invoice from './Pages/Invoice';
import AddTreatments from './Pages/AddTreatments';
import AddCollection from './Pages/AddCollection';
import ClinicwiseCollection from './Pages/Reports/ClinicwiseCollection';
import DoctorwiseCollection from './Pages/Reports/DoctorwiseCollection';
import PatientwiseCollection from './Pages/Reports/PatientwiseCollection';
import EnquiryToPatient from './Pages/Reports/EnquiryToPatient';
import LeadSourceEnquiry from './Pages/Reports/LeadSourceEnquiry';
import PatientTreatments from './Pages/Reports/PatientTreatments';
import Consultations from './Pages/Consultations';
import EditDoctor from './Menu/User Settings/EditDoctor';
import ConsultationHistory from './Pages/ConsultationHistory';
import ViewConsultationHistory from './Pages/ViewConsultationHistory';
import ConsultationReport from './Pages/Reports/ConsultationReport';
import EditEmployee from './Menu/User Settings/EditEmployee';
import EditBranch from './Menu/Clinic Settings/EditBranch';
import EditPatients from './Menu/Leads/EditPatients';
import EditEnquiry from './Menu/Leads/EditEnquiry';
import InvoiceView from './Pages/InvoiceView';
import ConsultationInvoice from './Pages/ConsultationInvoice';
import ConsultationInvoiceView from './Pages/ConsultationInvoiceView';
import EditAccessPermission from './Menu/User Settings/EditAccessPermission';
import InvoiceReport from './Pages/Reports/InvoiceReports';
import CollectionReport from './Pages/Reports/CollectionReport';
import ActivityReport from './Pages/Reports/ActivityReport';
import Dashboard2 from './Pages/Dashboard2';
import ChangePassword from './Pages/ChangePassword';
import CancelledAppointments from './Pages/Reports/CancelledAppointments';
import PendingFollowups from './Pages/Reports/PendingFollowups';
import PatientFollowups from './Pages/Reports/PatientFollowups';
import Dummy from './Pages/Dummy';
import EditConsultation from './Pages/EditConsultation';


function App() {
  return (
   <>
  <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/sbar" element={<Sidebar/>} />
          <Route path="/branch" element={<Branch/>} />
          <Route path="/add-branch" element={<AddBranch/>} />
          <Route path="/s&l" element={<SkinAndLaser/>} />
          <Route path="/wl" element={<WeightLoss/>} />
          <Route path="/ht" element={<HairT/>} />
          <Route path="/homeopathy" element={<Homeopathy/>} />
          <Route path="/lead-srcs" element={<LeadSources/>} />
          <Route path="/role" element={<Role/>} />
          <Route path="/access-perm" element={<AccessPermission/>} />
          <Route path="/add-access" element={<AddAccess/>} />
          <Route path="/dr-reg" element={<DoctorRegistration/>} />
          <Route path="/add-dr" element={<AddDoctor/>} />
          <Route path="/emp-reg" element={<EmployeeRegistration/>} />
          <Route path="/add-emp" element={<AddEmployee/>} />
          <Route path="/enquiries" element={<Enquiries/>} />
          <Route path="/add-entry" element={<AddEntry/>} />
          <Route path="/view-enquiry/:enquiryId" element={<ViewEntry/>} />
          <Route path="/fup-entries" element={<FollowUpEntries/>} />
          <Route path="/patientsfup-entries" element={<PatientFollowUpEntries/>} />
          <Route path="/patientsfup-view/:patientId" element={<ViewPatientFollowUpDetails/>} />
          <Route path="/fup-details/:enquiryId" element={<FollowupDetails/>} />
          <Route path="/patientsfup-details/:patientId" element={<PatientFollowUpDetails/>} />
          <Route path="/fup-view/:enquiryId" element={<ViewFollowupDetails/>} />
          <Route path="/p-cvrt" element={<PatientConversion/>} />
          <Route path="/patients" element={<Patients/>} />
          <Route path="/view-p/:patientId" element={<ViewPatient/>} />
          <Route path="/up-leads" element={<UploadLeads/>} />
          <Route path="/appmnt" element={<BookAppointment/>} />
          <Route path="/changepassword" element={<ChangePassword/>} />
          <Route path="/book-apmt/:enqId" element={<AddAppointment/>} />
          <Route path="/view-apmt" element={<ViewAppointment/>} />
          <Route path="/today-fup" element={<TodaysFollowups/>} />
          <Route path="/view-dr/:UserID" element={<ViewDoctorProfile/>} />
          <Route path="/fup-pnt/:enquiryId" element={<ConvertToPatient/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/add-treatment" element={<AddTreatments/>} />
          <Route path="/add-collection" element={<AddCollection/>} />
          <Route path="/clinic-collection" element={<ClinicwiseCollection/>} />
          <Route path="/doctor-collection" element={<DoctorwiseCollection/>} />
          <Route path="/patient-collection" element={<PatientwiseCollection/>} />
          <Route path="/e2p" element={<EnquiryToPatient/>} />
          <Route path="/lsrc" element={<LeadSourceEnquiry/>} />
          <Route path="/pntdtl" element={<PatientTreatments/>} />
          <Route path="/consultations/:patientId" element={<Consultations/>} />
          <Route path="/edit-dr/:doctorId" element={<EditDoctor/>} />
          <Route path="/consult-hst/:pntID" element={<ConsultationHistory/>} />
          <Route path="/consult-edt/:consultId" element={<EditConsultation/>} />
          <Route path="/view-consult-hst/:consultId" element={<ViewConsultationHistory/>} />
          <Route path="/consult-rpt" element={<ConsultationReport/>} />
          <Route path="/edit-emp/:userID" element={<EditEmployee/>} />
          <Route path="/edit-branch/:clinicID" element={<EditBranch/>} />
          <Route path="/edit-pnt/:pntID" element={<EditPatients/>} />
          <Route path="/edit-enq/:enquiryId" element={<EditEnquiry/>} />
          <Route path="/view-inv" element={<InvoiceView/>} />  
          <Route path="/consult-view-inv" element={<ConsultationInvoiceView/>} />  
          <Route path="/add-consult-inv" element={<ConsultationInvoice/>} />
          <Route path="/edit-acc-perm/:AccessId" element={<EditAccessPermission/>} />
          <Route path="/inv-rpt" element={<InvoiceReport/>} />
          <Route path="/clln-rpt" element={<CollectionReport/>} />
          <Route path="/activity-rpt" element={<ActivityReport/>} />
          <Route path="/dashboard2" element={<Dashboard2/>} />
          <Route path="/cancelled-apmnt" element={<CancelledAppointments/>} />
          <Route path="/pending-fups" element={<PendingFollowups/>} />
          <Route path="/pending-pups" element={<PatientFollowups/>} />
          <Route path="/dummy" element={<Dummy/>} />
     


          </Routes>
          </Router>
   </>
  );
}

export default App;
