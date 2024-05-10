
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import LoginPage from "views/Login";
import AddNewEntities from "views/AddNewEntities";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-bar-32",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "User Managements",
    rtlName: "الرموز",
    icon: "tim-icons icon-badge",
    component: <Icons />,
    layout: "/admin",
  },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-map-big",
  //   component: <Map />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "Admin Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: <UserProfile />,
  //   layout: "/admin",
  // },
  {
    path: "/tables",
    name: "Cars",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-delivery-fast",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "login",
    rtlName: "تسجيل دخول",
    icon: "tim-icons icon-app",
    component: <LoginPage />,
    layout: "/admin",
  },
  {
    path: "/Add-Cars/Agencies",
    name: "Add Cars/Agencies",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-simple-add",
    component: <AddNewEntities />,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: <Rtl />,
  //   layout: "/rtl",
  // },
];
export default routes;
