import * as React from "react";
import type { NextPage } from "next";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import lightThemeOptions from "../styles/theme/lightThemeOptions";

const CircularIndeterminate: NextPage<{}> = () => {
    const primaryMain = lightThemeOptions.palette.primary.main;
    return (
        <Box>
            <CircularProgress
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "light" ? { primaryMain } : "",
                    transform: "rotate(-90deg)",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    margin: "auto",
                    top: "555px",
                }}
                size={40}
            />
        </Box>
    );
};

export default CircularIndeterminate;
