import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./components/Auth/LoginPage";
import { SignUpPage } from "./components/Auth/SignUpPage";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { Courses } from "./components/Course/Courses";
import { Route, Switch } from "react-router-dom";
import { InstructorCourses } from "./components/Instructor/InstructorCourses";
import { CreateCourse } from "./components/Instructor/CreateCourse";
import { CoursePage } from "./components/Course/CoursePage";
import { MyCoursePage } from "./components/Trainee/MyCoursePage";
import { CreateUser } from "./components/Admin/CreateUser";
import { SuccessPage } from "./components/Trainee/SuccessPayment";
import { CancelPayment } from "./components/Trainee/CancelPayment";
import { MyCourses } from "./components/Trainee/MyCourses";
import { DashboardContent } from "./components/Admin/Dashboard";
import { InstructorPage } from "./components/Instructor/InstructorPage";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { ConfirmPassword } from "./components/Auth/ConfirmPassword";
import { Profile } from "./components/Profile/Profile";
function App() {
  return (
    <Route>
      <Switch>
        <Route exact path="/auth" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/dashboard" component={DashboardContent}></Route>
        <Route exact path="/email" component={ResetPassword}></Route>
        <Route
          exact
          path="/resetPassword/:id"
          component={ConfirmPassword}
        ></Route>

        <Route>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/courses" component={Courses} />
            <Route
              exact
              path="/instructor/courses"
              component={InstructorCourses}
            />
            <Route exact path="/createCourse" component={CreateCourse} />
            <Route exact path="/coursePage/:id" component={CoursePage} />
            <Route
              exact
              path="/coursePage/instructorPage/:id"
              component={InstructorPage}
            />
            <Route exact path="/trainee/course/:id" component={MyCoursePage} />
            <Route exact path="/trainee/courses" component={MyCourses} />
            <Route exact path="/createUser" component={CreateUser} />
            <Route exact path="/success" component={SuccessPage} />
            <Route exact path="/cancel" component={CancelPayment} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Route>
      </Switch>
    </Route>
  );
}

export default App;
