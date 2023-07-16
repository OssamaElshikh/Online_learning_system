import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Container from "@mui/material/Container";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router-dom";
import { ListItem } from "@mui/material";
import { CourseRequests } from "./CourseRequests";
import { ReportedProblems } from "./ReportedProblems";
import { RefundRequests } from "./RefundRequests";
import { CreateUser } from "./CreateUser";
import { DefinePromotions } from "./DefinePromotions";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DiscountIcon from "@mui/icons-material/Discount";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { ListItemIcon } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const DashboardContent = () => {
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const [currentPage, setCurrentPage] = React.useState("home");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    history.push("dashboard?source=" + currentPage);
  }, [currentPage]);

  let content = null;
  if (currentPage === "courseRequests") {
    content = <CourseRequests />;
  } else if (currentPage === "reportedProblems") {
    content = <ReportedProblems />;
  } else if (currentPage === "refundRequests") {
    content = <RefundRequests />;
  } else if (currentPage === "definePromotions") {
    content = <DefinePromotions />;
  } else if (currentPage === "createUser") {
    content = <CreateUser />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            fontWeight="bold"
          >
            Admin Dashboard
          </Typography>
          <IconButton color="inherit">
            <HomeIcon onClick={() => history.push("/home")} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItem
            key="courseRequests"
            button
            onClick={() => setCurrentPage("courseRequests")}
          >
            <ListItemIcon>
              <AddToQueueIcon />
            </ListItemIcon>
            Course Requests
          </ListItem>
          <ListItem
            key="reportedProblems"
            button
            onClick={() => setCurrentPage("reportedProblems")}
          >
            <ListItemIcon>
              <ReportProblemIcon />
            </ListItemIcon>
            Reported Problems
          </ListItem>
          <ListItem
            key="refundRequests"
            button
            onClick={() => setCurrentPage("refundRequests")}
          >
            <ListItemIcon>
              <CurrencyExchangeIcon />
            </ListItemIcon>
            Refund Requests
          </ListItem>
          <ListItem
            key="definePromotions"
            button
            onClick={() => setCurrentPage("definePromotions")}
          >
            <ListItemIcon>
              <DiscountIcon />
            </ListItemIcon>
            Define Promotions
          </ListItem>
          <ListItem
            key="createUser"
            button
            onClick={() => setCurrentPage("createUser")}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            Create User
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {content}
        </Container>
      </Box>
    </Box>
  );
};
