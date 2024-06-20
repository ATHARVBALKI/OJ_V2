import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./components/adminSets/Users";
import Submissions from "./components/adminSets/Submissions";
import Contests from "./components/adminSets/Contests";
import ProblemsPage from "./components/Allproblems/ProblemsPage";
import CreateProblem from "./components/Allproblems/CreateProblem";
import Singleproblem from "./components/Problemcompiler/Singleproblem";
import ProblempageAdmin from "./components/adminSets/ProblempageAdmin";
import UpdateForm from "./components/adminSets/UpdateForm";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import ResetForm from "./pages/ResetForm";
import About from "./pages/About";
import PrivateDash from "./components/PrivateRoutes/PrivateDash";
import MySubmissions from "./components/Problemcompiler/MySubmissions";
import Prizes from "./components/Prizes";
import Leaderboard from "./components/Leaderboard";
import ProblemDay from "./components/adminSets/ProblemDay";

const App = () => {
  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Mainpage></Mainpage>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/students"
          element={
            <PrivateDash roles={["Admin"]}>
              <Users />
            </PrivateDash>
          }
        />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/contests" element={<Contests />} />
        <Route
          path="/problemset"
          element={<ProblemsPage></ProblemsPage>}
        ></Route>
        <Route
          path="/create"
          element={
            <PrivateDash roles={["Admin"]}>
              <CreateProblem></CreateProblem>
            </PrivateDash>
          }
        ></Route>
        <Route
          path="/edit-problem"
          element={
            <PrivateDash roles={["Admin"]}>
              <ProblempageAdmin></ProblempageAdmin>
            </PrivateDash>
          }
        ></Route>
        <Route
          path="/singleprob/:id"
          element={<Singleproblem></Singleproblem>}
        ></Route>
        <Route
          path="updateprob/:id"
          element={
            <PrivateDash roles={["Admin"]}>
              <UpdateForm></UpdateForm>
            </PrivateDash>
          }
        ></Route>
        <Route path="/resetform" element={<ResetForm></ResetForm>}></Route>
        <Route path="/mysubmissions/:userid/:problemid" element={<MySubmissions></MySubmissions>}></Route>
        <Route path="/prizes" element={<Prizes></Prizes>}></Route>
        <Route path="/leaderboard" element={<Leaderboard></Leaderboard>}></Route>
        <Route path="/problem-of-the-day" element={<ProblemDay></ProblemDay>}></Route>
      </Routes>
    </div>
  );
};

export default App;
