import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    navlinks: {
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        marginRight: "40px",
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Employees Directory
                </Typography>
                <div className={classes.navlinks}>
                    <Link to="/employees" className={classes.link}>
                        Employees Table
                    </Link>
                    <Link to="/employees-hierarchy" className={classes.link}>
                        Employees Hierarchy
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;