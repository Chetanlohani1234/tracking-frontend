import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import User from "./Pages/User";
import Project from "./Pages/Project";
import UserDetail from "./Pages/UserDetail";
import UserEdit from "./Pages/UserEdit";
import RoleManagement from "./Pages/RoleManagement";
import LeaveStatus from "./Pages/LeaveStatus";
import Holiday from "./Pages/Holiday";
import Attendence from "./Pages/Attendence";
import ViewAttendence from "./Pages/ViewAttendence";
import Expense from "./Pages/Expense";
import Login from "./Pages/Login";
import TeamManagement from "./Pages/TeamManagement";
import ViewTeam from "./Pages/ViewTeam";
import ViewTeamPerformance from "./Pages/ViewTeamPerformace";
import ViewProject from "./Pages/ViewProjectDetail";
import ViewEmployeeDetails from "./Pages/ViewEmployeeDetail";
import ViewEmployeePerformace from "./Pages/ViewEmployeePerformace";
import ViewProfile from "./Pages/ViewProfile";
import { RestrictedAccess } from "./PrivateComponent/RestrictedAccess";
import Chat from "./Pages/Chat";
import AllNotiFication from "./Pages/Notification";
import GroupChat from "./Pages/GroupChat";
import UserTask from "./Pages/UserTask";
import EditTeam from "./Pages/EditTeam";
import EmialText from "./Pages/EmailText";
import AllOrder from "./Section/Order/AllOrder";
import AllOrders from "./Pages/AllOrders";
import AllSupplier from "./Pages/AllSupplier";
import AllItems from "./Pages/AllItems";
import AllCategory from "./Pages/AllCategory";
import AllSubCategory from "./Pages/AllSubCategory";
import EditCategory from "./Section/Categories/EditCategory";
import CategoryEdit from "./Pages/CategoryEdit";
import SubCategoryEdit from "./Pages/SubCategoryEdit";
import ItemsEdit from "./Pages/ItemsEdit";
import EditSupplier from "./Pages/EditSupplier";
import AllPO from "./Pages/AllPO";
import InwardAdd from "./Pages/InwardAdd";
import AllInward from "./Pages/AllInward";
import AllPurchaseOrder from "./Pages/AllPurchaseOrder";
import PoView from "./Pages/PoView";
import PoEdit from "./Pages/PoEdit";
import AddUOM from "./Pages/AddUOM";
import EditUOM from "./Pages/EditUOM";
//import InwardUpdate from "./Pages/InwardUpdate";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Loginpage />} /> */}
        {/* <Route exact path="/Login" element={<Loginpage />} /> */}
        {/* <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} /> */}
         <Route exact path="/" element={<Login />} />
         
         <Route element={<RestrictedAccess />}>
         <Route exact path="/dashboard" element={<Dashboard />} />
         <Route exact path="/all-notifications" element={<AllNotiFication />} />
         <Route exact path="/all-user" element={<User />} />
         
         <Route exact path="/all-order" element={<AllOrders />}/>
         <Route exact path="/all-suppliers" element={<AllSupplier/>}/>
         <Route exact path="/edit-supplier/:id" element={<EditSupplier/>}/>
         <Route exact path="/all-items" element={<AllItems />}/>
         <Route exact path="/edit-items/:id" element={<ItemsEdit/>}/>
         <Route exact path="/category" element={<AllCategory/>}/>
         <Route exact path="/edit-category/:id" element={<CategoryEdit/>}/>

         <Route exact path="/subcategory" element={<AllSubCategory/>}/>
         <Route exact path="/edit-subcategory/:id" element={<SubCategoryEdit/>}/>
          
         <Route exact path="/add-po" element={<AllPO/>}/>
         <Route exact path="/all-po" element={<AllPurchaseOrder/>}/>
         <Route exact path="/view-po/:id" element={<PoView/>}/>
         <Route exact path="/edit-po/:id" element={<PoEdit/>}/>
         
         
         <Route exact path="/add-inward" element={<InwardAdd/>}/>
         <Route exact path="/all-inward" element={<AllInward/>}/>
         {/* <Route exact path="/update-inward" element={<InwardUpdate/>}/> */}
      
         
         <Route exact path="/uom" element={<AddUOM/>}/>
         L<Route exact path="/edit-uom/:id" element={<EditUOM/>}/>
         
         <Route exact path="/user-detail/:id" element={<UserDetail />} />
         <Route exact path="/edit-user/:id" element={<UserEdit />} />
         <Route exact path="/role-management" element={<RoleManagement />} />
         <Route exact path="/all-leaves" element={<LeaveStatus />} />
         <Route exact path="/all-holiday" element={<Holiday />} />
         <Route exact path="/all-attendence" element={<Attendence />} />
         <Route exact path="/view-attendence/:id" element={<ViewAttendence />} />
         <Route exact path="/all-expense" element={<Expense />} />
         <Route exact path="/team-management" element={<TeamManagement />} />
         <Route exact path="/view-team/:id" element={<ViewTeam />} />
         <Route exact path="/edit-team/:id" element={<EditTeam />} />
         <Route exact path="/view-team-performace/:id" element={<ViewTeamPerformance />} />
         <Route exact path="/all-Project" element={<Project />} />
         <Route exact path="/view-project/:id" element={<ViewProject />} />
         <Route exact path="/users-tasks" element={<UserTask />} />
         {/* <Route exact path="/chat" element={<Chat />} /> */}
         <Route exact path="/all-chat" element={<GroupChat />} />
         <Route exact path="/view-employee-detail/:id" element={<ViewEmployeeDetails />} />
         <Route exact path="/view-employee-performace/:id" element={<ViewEmployeePerformace />} />
         <Route exact path="/view-Profile" element={<ViewProfile />} />
         <Route exact path="/email-text" element={<EmialText />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}
