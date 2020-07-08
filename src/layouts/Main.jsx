import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import RequestModal from "../components/request-modal.component";
import UserName from "../components/user-name.component";
import { SASContext } from "../context/sasContext";
import LoginComponent from "../components/login.component";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  companyTitle: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer"
  },
  title: {
    color: "white",
    padding: "0 8px"
  }
}));

const Main = props => {
  const sasContext = useContext(SASContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [debug, setDebug] = useState(
    sasContext.sasService.getSasjsConfig().debug
  );
  const classes = useStyles();
  const { children } = props;
  const open = Boolean(anchorEl);

  useEffect(() => {
    sasContext.sasService.setDebugState(debug);
  }, [debug, sasContext.sasService]);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <img
              src="logo-white.png"
              alt="logo"
              style={{ width: "2%", cursor: "pointer" }}
              onClick={() => props.history.push("/home")}
            />
            <Typography variant="h6" className={classes.title}>
              <Link to="/home" className={classes.companyTitle}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/demo" className={classes.companyTitle}>
                Demo
              </Link>
            </Typography>
            <div
              style={{
                display: "flex",
                flexGrow: "1",
                justifyContent: "flex-end"
              }}
            >
              <UserName
                userName={sasContext.userName}
                onClickHandler={handleMenu}
                className={classes.title}
              />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <FormControlLabel
                    value="start"
                    control={
                      <Switch
                        color="primary"
                        checked={debug}
                        onChange={e => setDebug(e.target.checked)}
                      />
                    }
                    label="Debug"
                    labelPlacement="start"
                  ></FormControlLabel>
                </MenuItem>

                <Divider variant="middle" />

                {/* <MenuItem onClick={() => props.history.push('debug-logs')}>Debug Logs</MenuItem> */}
                <MenuItem onClick={() => setIsModalOpen(true)}>
                  Requests
                </MenuItem>
                <MenuItem>Documentation</MenuItem>
                <Divider variant="middle" />
                <MenuItem onClick={sasContext.logout}>
                  <Button variant="contained" color="secondary">
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>{children}</main>
        <RequestModal
          programLogs={sasContext.sasService.getSasRequests()}
          sasjsConfig={sasContext.sasService.getSasjsConfig()}
          isModalOpen={isModalOpen}
          handleClose={handleClose}
          open={open}
        />
      </div>
      {!(sasContext.isUserLoggedIn || sasContext.checkingSession) && (
        <LoginComponent />
      )}
    </>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
