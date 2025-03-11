import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Sidebar from "./component/Sidebar";
import EmployeeProgress from "./component/Employee/EmployeeProgress";
import ParentView from "./component/Parent/ParentView";
import MainEnquiry from "./component/Enquiry/MainEnquiry";
import EnquiryStatus from "./component/Enquiry/EnquiryStatus";
import StudentTable from "./component/Enquiry/AllData";
import AddStudentdata from "./component/StudentAdmission/Addstudent";
import FamilyDetail from "./component/StudentAdmission/FamilyDetails";
import Document from "./component/StudentAdmission/Document";
import AddStaff from "./component/Staff/AddStaff";
import StaffDetail from "./component/Staff/StaffDetails";
import StaffDocument from "./component/Staff/StaffDocument";
import AllStaff from "./component/Staff/AllStaff";
import OfferLetter from "./component/Staff/OfferLetter";
import IdCard from "./component/Staff/IdCard";
import VisitorEntry from "./component/FrontOffice/VisitorEntry";
import EarlyLeaving from "./component/FrontOffice/EarlyLeavingStudent";
import FeeParticular from "./component/Admin/FeeParticular";
import Login from "./component/Login/Login";
import AttendenceType from "./component/AttendanceModule/AttandenceType";
import StudentAttendence from "./component/AttendanceModule/StudentAttendence";
import AttendanceTable from "./component/AttendanceModule/AttendanceTable";
import CollectFees from "./component/Fee/CollectFees";
import Payment from "./component/Fee/Payment";
import FeeSubmitted from "./component/Fee/FeeSubmitted";
import FeeSlip from "./component/Fee/FeeSlip";
import GenerateSalary from "./component/Salary/GenerateSalary";
import SalaryForm from "./component/Salary/SalaryForm";
import SalarySlip from "./component/Salary/SalarySlip";
import SalarySubmit from "./component/Salary/SalarySubmit";
import PostalRecieved from "./component/FrontOffice/PostalRecieved";
import PostalDispatch from "./component/FrontOffice/PostalDispatch";
import Allowence from "./component/Salary/Allowence";
import Deduction from "./component/Salary/Deduction";
import AllStudent from "./component/StudentAdmission/AllStudent";
import AddExpenseHead from "./component/Expense/AddExpenseHead";
import AddExpense from "./component/Expense/AddExpense";
import AddIncomehead from "./component/Expense/AddIncomehead";
import AddIncome from "./component/Expense/AddIncome";
import AddVendor from "./component/Expense/AddVendor";
import AddAccount from "./component/Expense/AddAccount";
import CashDeposit from "./component/Expense/CashDeposit";
import Complaint from "./component/FrontOffice/Complaint";
import Electricity from "./component/FrontOffice/Electricity";
import Addperiod from "./component/TimeTable/Addperiod";
import CreateTimeTable from "./component/TimeTable/CreateTimeTable";
import HomeworkType from "./component/Homework/HomeworkType";
import Homework from "./component/Homework/Homework";
import AddExam from "./component/Exam/AddExam";
import CreateBluePrint from "./component/Exam/CreateBluePrint";
import AddSubject from "./component/Subject/AddSubject";
import CreateSyllabus from "./component/Subject/CreateSyllabus";
import AdminSidebar from "./component/Admin/AdminSidebar";
import Setup from "./component/SchoolSetup.jsx/Setup";
import AddClass from "./component/SchoolSetup.jsx/AddClass";
import AddSection from "./component/SchoolSetup.jsx/AddSection";
import AddDepartment from "./component/SchoolSetup.jsx/AddDepartment";
import AddRole from "./component/SchoolSetup.jsx/AddRole";
import AddDesignation from "./component/SchoolSetup.jsx/AddDesignation";
import AcademicYearInfo from "./component/SchoolSetup.jsx/AcademicYearInfo";
import AcademicPlan from "./component/SchoolSetup.jsx/Academicplan";
import DateSheet from "./component/SchoolSetup.jsx/DateSheet";
import DateSheetTable from "./component/SchoolSetup.jsx/DateSheetTable";
import AllotedSubject from "./component/Subject/AllotedSubject";
import CreateFeeHeader from "./component/Fee/CreateFeeHeader";
import FeeSlab from "./component/Fee/FeeSlab";
import FineSetUp from "./component/Fee/FineSetUp";
import FeeDiscount from "./component/Fee/FeeDiscount";
import FeeReconciliation from "./component/Fee/FeeReconciliation";
import AdminLayout from "./Layout/AdminLayout";
import EmployeeLayout from "./Layout/EmployeeLayout";
import StudentLayout from "./Layout/StudentLayout";
import AddEnquiryForm from "./component/Enquiry/AddEnquiry";
import Ledger from "./component/Expense/Ledger";
import AddHouse from "./component/SchoolSetup.jsx/AddHouse";
import AddRoute from "./component/SchoolSetup.jsx/AddRoute";
import AddGrade from "./component/SchoolSetup.jsx/AddGrade";
import ViewStudent from "./component/StudentAdmission/ViewStudent";
import AllHomework from "./component/Homework/AllHomework";
import AdminProfile from "./component/Profiles/AdminProfile";
import EmployeeProfile from "./component/Profiles/EmployeeProfile";
import StudentProfile from "./component/Profiles/StudentProfile";
import Result from "./component/SchoolSetup.jsx/Result";
import StudentWise from "./component/Result/StudentWise";
import Consolidated from "./component/Result/Consolidated";
import SalaryAll from "./component/Salary/SalaryAll";
import ViewStaff from "./component/Staff/ViewStaff";
import FeeTable from "./component/Fee/FeeTable";
import EditStudent from "./component/StudentAdmission/EditStudent";
import EditStaff from "./component/Staff/EditStaff";
import TimetableDashboard from "./component/TimeTable/TimeTableDashboard";
import ResultUpdate from "./component/Result/ResultUpdate";
import ResultUpdateSubject from "./component/Result/ResultUpdateSubject";
import NewForm from "./component/StudentAdmission/NewForm";
import FeeReceipt from "./component/Fee/FeeReceipt";
import TimeTableForm from "./component/TimeTable/TimeTableForm";
import Test from "./component/Test";
import StudentFeeTable from "./component/StudentFeeTable";
import FeePaid from "./component/Fee/FeePaid";
import FeeRemaining from "./component/Fee/FeeRemaining";
import ViewResult from "./component/Result/ViewResult";
import StudentBulkUpload from "./component/StudentAdmission/StudentBulkUpload";
import AddAcademicEvents from "./component/SchoolSetup.jsx/AddAcademicEvents";
import AddNoticeBox from "./component/SchoolSetup.jsx/AddNoticeBox";
import AdmitCard from "./component/StudentAdmission/AdmitCard";
import StaffBulkUpload from "./component/Staff/StaffBulkUpload";
import SchoolReport from "./component/Admin/EOD";
import ExamTimeTable from "./component/Parent/ExamTimeTable";
import SchoolTimeTable from "./component/Parent/SchoolTimeTable";
import FeeDemand from "./component/Fee/FeeDemand";
import AllTimetable from "./component/TimeTable/AllTimetable";
import SyllabusStudent from "./component/Student/SyllabusStudent";
import BirthdayCard from "./component/BirthdayCard";
import BirthdayWishesTable from "./component/BirthDayTable";
import LoginForm from "./component/LoginForm";

function App() {
  return (
    <>
      <Routes>
        {/* Admin------------- */}
        <Route path="/feeparticular" element={<FeeParticular />} />

        {/* Enquiry------------- */}
        {/* <Route path="/addenquiry" element={<MainEnquiry />} /> */}
        {/* <Route path="/enquirystatus" element={<EnquiryStatus />} /> */}
        {/* <Route path="/alldata" element={<StudentTable />} /> */}

        {/* Student admission------------- */}
        {/* <Route path="/addstudent" element={<AddStudentdata />} /> */}
        {/* <Route path="/familydetail" element={<FamilyDetail />} /> */}
        {/* <Route path="/document" element={<Document />} /> */}
        {/* <Route path="/allstudent" element={<AllStudent />} /> */}

        {/* Staff ------------- */}
        {/* <Route path="/addstaff" element={<AddStaff />} /> */}
        {/* <Route path="/staffdetail" element={<StaffDetail />} /> */}
        {/* <Route path="/staffdocument" element={<StaffDocument />} /> */}
        {/* <Route path="/allstaff" element={<AllStaff />} /> */}
        {/* <Route path="/offerletter" element={<OfferLetter />} /> */}
        {/* <Route path="/idcard" element={<IdCard />} /> */}

        {/* Frontoffice ------------- */}
        {/* <Route path="/visitorentry" element={<VisitorEntry />} /> */}
        {/* <Route path="/earlyliving" element={<EarlyLeaving />} /> */}
        {/* <Route path="/postalrecieved" element={<PostalRecieved />} /> */}
        {/* <Route path="/postaldispatch" element={<PostalDispatch />} /> */}
        {/* <Route path="/complaint" element={<Complaint />} /> */}
        {/* <Route path="/electricity" element={<Electricity />} /> */}

        {/* Attendence module */}
        {/* <Route path="/attendancetype" element={<AttendenceType />} /> */}
        {/* <Route path="/StudentAttendance" element={<StudentAttendence />} /> */}
        {/* <Route path="/AttendanceTable" element={<AttendanceTable />} /> */}

        {/* Fee ++++++++++++ */}
        {/* <Route path="/CollectFees" element={<CollectFees />} /> */}
        {/* <Route path="/Payment" element={<Payment />} /> */}
        {/* <Route path="/feesubmitted" element={<FeeSubmitted />} /> */}
        {/* <Route path="/feeslip" element={<FeeSlip />} /> */}
        {/* <Route path="/createfeeheader" element={<CreateFeeHeader />} /> */}
        {/* <Route path="/feeslab" element={<FeeSlab />} /> */}
        {/* <Route path="/finesetup" element={<FineSetUp />} /> */}
        {/* <Route path="/feediscount" element={<FeeDiscount />} /> */}
        {/* <Route path="/feereconciliation" element={<FeeReconciliation />} /> */}


        {/* Salary ++++++++++++ */}
        {/* <Route path="/generatesalary" element={<GenerateSalary />} /> */}
        {/* <Route path="/salaryform" element={<SalaryForm />} /> */}
        {/* <Route path="/salaryslip" element={<SalarySlip />} /> */}
        {/* <Route path="/salarysubmit" element={<SalarySubmit />} /> */}
        {/* <Route path="/allowence" element={<Allowence />} /> */}
        {/* <Route path="/deduction" element={<Deduction />} /> */}

        {/* expense ++++++++++++ */}
        {/* <Route path="/addexpensehead" element={<AddExpenseHead />} /> */}
        {/* <Route path="/addincomehead" element={<AddIncomehead />} /> */}
        {/* <Route path="/addexpense" element={<AddExpense />} /> */}
        {/* <Route path="/addincome" element={<AddIncome />} /> */}
        {/* <Route path="/addvendor" element={<AddVendor />} /> */}
        {/* <Route path="/addaccount" element={<AddAccount />} /> */}
        {/* <Route path="/cashdeposit" element={<CashDeposit />} /> */}

        {/* Time table++++++++++++ */}
        {/* <Route path="/addperiod" element={<Addperiod />} /> */}
        {/* <Route path="/createtimetable" element={<CreateTimeTable />} /> */}

        {/* Homework++++++++++++ */}
        {/* <Route path="/homeworktype" element={<HomeworkType />} /> */}
        {/* <Route path="/homework" element={<Homework />} /> */}

        {/* exam++++++++++++ */}
        {/* <Route path="/addexam" element={<AddExam />} /> */}
        {/* <Route path="/createblueprint/:examId" element={<CreateBluePrint />} /> */}


        {/* Subject++++++++++++ */}
        {/* <Route path="/addsubject" element={<AddSubject />} /> */}
        {/* <Route path="/createsyllabus" element={<CreateSyllabus />} /> */}
        {/* <Route path="/allotedsubject" element={<AllotedSubject />} /> */}

        {/* SchoolSetup++++++++++++ */}
        {/* <Route path="/setup" element={<Setup />} /> */}
        {/* <Route path="/addclass" element={<AddClass />} /> */}
        {/* <Route path="/addsetion" element={<AddSection />} /> */}
        {/* <Route path="/adddepartment" element={<AddDepartment />} /> */}
        {/* <Route path="/addrole" element={<AddRole />} /> */}
        {/* <Route path="/adddesignation" element={<AddDesignation />} /> */}
        {/* <Route path="/academicyearinfo" element={<AcademicYearInfo />} /> */}
        {/* <Route path="/academicplan" element={<AcademicPlan />} /> */}
        {/* <Route path="/datesheet" element={<DateSheet />} /> */}
        {/* <Route path="/datesheettable" element={<DateSheetTable />} /> */}


        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="EOD" element={<SchoolReport />} />
          <Route path="birthday" element={<BirthdayCard />} />
          <Route path="logins" element={<LoginForm />} />

          <Route path="feeparticular" element={<FeeParticular />} />

          {/* Enquiry */}
          <Route path="addenquiry" element={<AddEnquiryForm />} />
          <Route path="enquirystatus" element={<EnquiryStatus />} />
          <Route path="alldata" element={<StudentTable />} />

          {/* Student */}
          <Route path="addstudent" element={<AddStudentdata />} />
          <Route path="add-student" element={<NewForm />} />
          <Route path="familydetail" element={<FamilyDetail />} />
          <Route path="document" element={<Document />} />
          <Route path="allstudent" element={<AllStudent />} />
          <Route path="viewstudent" element={<ViewStudent />} />
          <Route path="editstudent" element={<EditStudent />} />
          <Route path="admitcard" element={<AdmitCard />} />
          <Route path="student-bulk" element={<StudentBulkUpload />} />

          {/* Staff */}
          <Route path="addstaff" element={<AddStaff />} />
          <Route path="staffdetail" element={<StaffDetail />} />
          <Route path="staffdocument" element={<StaffDocument />} />
          <Route path="allstaff" element={<AllStaff />} />
          <Route path="offerletter" element={<OfferLetter />} />
          <Route path="idcard" element={<IdCard />} />
          <Route path="viewstaff" element={<ViewStaff />} />
          <Route path="editstaff" element={<EditStaff />} />
          <Route path="staff-bulk" element={<StaffBulkUpload />} />

          {/* Frontoffice */}
          <Route path="visitorentry" element={<VisitorEntry />} />
          <Route path="earlyliving" element={<EarlyLeaving />} />
          <Route path="postalrecieved" element={<PostalRecieved />} />
          <Route path="postaldispatch" element={<PostalDispatch />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="electricity" element={<Electricity />} />

          {/* Attendence module */}
          <Route path="attendancetype" element={<AttendenceType />} />
          <Route path="StudentAttendance" element={<StudentAttendence />} />
          <Route path="AttendanceTable" element={<AttendanceTable />} />

          {/* Fee  */}
          <Route path="allfees" element={<FeeTable />} />
          <Route path="CollectFees" element={<CollectFees />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="feesubmitted" element={<FeeSubmitted />} />
          <Route path="feeslip" element={<FeeSlip />} />
          <Route path="createfeeheader" element={<CreateFeeHeader />} />
          <Route path="feeslab" element={<FeeSlab />} />
          <Route path="finesetup" element={<FineSetUp />} />
          <Route path="fee-receipt" element={<FeeReceipt />} />
          <Route path="feediscount" element={<FeeDiscount />} />
          <Route path="feereconciliation" element={<FeeReconciliation />} />
          <Route path="fee-paid" element={<FeePaid />} />
          <Route path="fee-remaining" element={<FeeRemaining />} />
          <Route path="feedemand" element={<FeeDemand />} />


          {/* Salary */}
          <Route path="generatesalary" element={<GenerateSalary />} />
          <Route path="salaryform" element={<SalaryForm />} />
          <Route path="salary-slip" element={<SalarySlip />} />
          <Route path="salarysubmit" element={<SalarySubmit />} />
          <Route path="allowence" element={<Allowence />} />
          <Route path="deduction" element={<Deduction />} />
          <Route path="allsalary" element={<SalaryAll />} />

          {/* expense */}
          <Route path="addexpensehead" element={<AddExpenseHead />} />
          <Route path="addincomehead" element={<AddIncomehead />} />
          <Route path="addexpense" element={<AddExpense />} />
          <Route path="addincome" element={<AddIncome />} />
          <Route path="addvendor" element={<AddVendor />} />
          <Route path="addaccount" element={<AddAccount />} />
          <Route path="cashdeposit" element={<CashDeposit />} />
          <Route path="ledger" element={<Ledger />} />


          {/* Time table */}
          <Route path="addperiod" element={<Addperiod />} />
          <Route path="create-timetable" element={<CreateTimeTable />} />
          <Route path="createtimetable" element={<TimeTableForm />} />
          <Route path="alltimetable" element={<AllTimetable />} />

          {/* <Route path="timetabledashboard" element={<TimetableDashboard />} /> */}


          {/* Homework */}
          <Route path="homeworktype" element={<HomeworkType />} />
          <Route path="homework" element={<Homework />} />
          <Route path="allhomework" element={<AllHomework />} />

          {/* exam */}
          <Route path="addexam" element={<AddExam />} />
          <Route path="createblueprint/:examId" element={<CreateBluePrint />} />

          {/* Subject */}
          <Route path="addsubject" element={<AddSubject />} />
          <Route path="createsyllabus" element={<CreateSyllabus />} />
          {/* <Route path="allotedsubject" element={<AllotedSubject />} /> */}

          {/* SchoolSetup++++++++++++ */}
          <Route path="setup" element={<Setup />} />
          <Route path="addclass" element={<AddClass />} />
          <Route path="addsetion" element={<AddSection />} />
          <Route path="adddepartment" element={<AddDepartment />} />
          <Route path="adddesignation" element={<AddDesignation />} />
          <Route path="academicyearinfo" element={<AcademicYearInfo />} />
          <Route path="noticebox" element={<AddNoticeBox />} />
          <Route path="academicplan" element={<AcademicPlan />} />
          <Route path="datesheet" element={<DateSheet />} />
          <Route path="house" element={<AddHouse />} />
          <Route path="academicevents" element={<AddAcademicEvents />} />
          <Route path="datesheettable" element={<DateSheetTable />} />
          <Route path="addroute" element={<AddRoute />} />
          <Route path="addgrade" element={<AddGrade />} />
          <Route path="profile" element={<AdminProfile />} />

          {/* Result */}
          <Route path="result" element={<Result />} />
          <Route path="studentwise" element={<StudentWise />} />
          <Route path="viewresult/:studentId" element={<ViewResult />} />
          <Route path="consolidated" element={<Consolidated />} />
        </Route>

        <Route path="/resultupdate" element={<ResultUpdate />} />{/* --------------------------------------------------------------- */}
        <Route path="/resultupdateSubject" element={<ResultUpdateSubject />} />{/* --------------------------------------------------------------- */}
        <Route path="/initial-setup" element={<Setup />} />

        {/* Student */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<ParentView />} />
          <Route path="examtimetable" element={<ExamTimeTable />} />
          <Route path="schooltimetable" element={<SchoolTimeTable />} />
          <Route path="syllabusstudent" element={<SyllabusStudent />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="birthday" element={<BirthdayWishesTable />} />

        </Route>

        {/* Employee */}
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route path="dashboard" element={<EmployeeProgress />} />

          {/* Enquiry */}
          <Route path="addenquiry" element={<AddEnquiryForm />} />
          <Route path="enquirystatus" element={<EnquiryStatus />} />
          <Route path="alldata" element={<StudentTable />} />

          {/* Student */}
          <Route path="addstudent" element={<AddStudentdata />} />
          <Route path="add-student" element={<NewForm />} />
          <Route path="familydetail" element={<FamilyDetail />} />
          <Route path="document" element={<Document />} />
          <Route path="allstudent" element={<AllStudent />} />
          <Route path="viewstudent" element={<ViewStudent />} />
          <Route path="editstudent" element={<EditStudent />} />
          {/* <Route path="admitcard" element={<AdmitCard />} /> */}
          {/* <Route path="student-bulk" element={<StudentBulkUpload />} /> */}

          {/* Staff */}
          <Route path="addstaff" element={<AddStaff />} />
          <Route path="staffdetail" element={<StaffDetail />} />
          <Route path="staffdocument" element={<StaffDocument />} />
          <Route path="allstaff" element={<AllStaff />} />
          <Route path="offerletter" element={<OfferLetter />} />
          <Route path="idcard" element={<IdCard />} />
          <Route path="viewstaff" element={<ViewStaff />} />
          <Route path="editstaff" element={<EditStaff />} />
          {/* <Route path="staff-bulk" element={<StaffBulkUpload />} /> */}

          {/* Frontoffice */}
          <Route path="visitorentry" element={<VisitorEntry />} />
          <Route path="earlyliving" element={<EarlyLeaving />} />
          <Route path="postalrecieved" element={<PostalRecieved />} />
          <Route path="postaldispatch" element={<PostalDispatch />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="electricity" element={<Electricity />} />

          {/* Attendence module */}
          <Route path="attendancetype" element={<AttendenceType />} />
          <Route path="StudentAttendance" element={<StudentAttendence />} />
          <Route path="AttendanceTable" element={<AttendanceTable />} />

          {/* Fee  */}
          <Route path="allfees" element={<FeeTable />} />
          <Route path="CollectFees" element={<CollectFees />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="feesubmitted" element={<FeeSubmitted />} />
          <Route path="feeslip" element={<FeeSlip />} />
          <Route path="createfeeheader" element={<CreateFeeHeader />} />
          <Route path="feeslab" element={<FeeSlab />} />
          <Route path="finesetup" element={<FineSetUp />} />
          <Route path="fee-receipt" element={<FeeReceipt />} />
          <Route path="feediscount" element={<FeeDiscount />} />
          <Route path="feereconciliation" element={<FeeReconciliation />} />
          <Route path="fee-paid" element={<FeePaid />} />
          <Route path="fee-remaining" element={<FeeRemaining />} />
          <Route path="feedemand" element={<FeeDemand />} />


          {/* Salary */}
          <Route path="generatesalary" element={<GenerateSalary />} />
          <Route path="salaryform" element={<SalaryForm />} />
          <Route path="salary-slip" element={<SalarySlip />} />
          <Route path="salarysubmit" element={<SalarySubmit />} />
          <Route path="allowence" element={<Allowence />} />
          <Route path="deduction" element={<Deduction />} />
          <Route path="allsalary" element={<SalaryAll />} />


          {/* expense */}
          <Route path="addexpensehead" element={<AddExpenseHead />} />
          <Route path="addincomehead" element={<AddIncomehead />} />
          <Route path="addexpense" element={<AddExpense />} />
          <Route path="addincome" element={<AddIncome />} />
          <Route path="addvendor" element={<AddVendor />} />
          <Route path="addaccount" element={<AddAccount />} />
          <Route path="cashdeposit" element={<CashDeposit />} />
          <Route path="ledger" element={<Ledger />} />

          {/* Time table */}
          <Route path="addperiod" element={<Addperiod />} />
          <Route path="create-timetable" element={<CreateTimeTable />} />
          <Route path="createtimetable" element={<TimeTableForm />} />
          <Route path="alltimetable" element={<AllTimetable />} />

          {/* Homework */}
          <Route path="homeworktype" element={<HomeworkType />} />
          <Route path="homework" element={<Homework />} />
          <Route path="allhomework" element={<AllHomework />} />

          {/* exam */}
          <Route path="addexam" element={<AddExam />} />
          <Route path="createblueprint/:examId" element={<CreateBluePrint />} />

          {/* Subject */}
          <Route path="addsubject" element={<AddSubject />} />
          <Route path="createsyllabus" element={<CreateSyllabus />} />
          <Route path="allotedsubject" element={<AllotedSubject />} />

          {/* Result */}
          <Route path="result" element={<Result />} />
          <Route path="studentwise" element={<StudentWise />} />
          <Route path="viewresult/:studentId" element={<ViewResult />} />
          <Route path="consolidated" element={<Consolidated />} />

          <Route path="birthday" element={<BirthdayWishesTable />} />
          <Route path="profile" element={<EmployeeProfile />} />
        </Route>


        <Route path="/test" element={<Test />} />
        <Route path="/fee" element={<StudentFeeTable />} />
      </Routes>
    </>
  );
}

export default App;
