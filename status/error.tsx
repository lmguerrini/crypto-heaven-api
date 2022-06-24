import * as React from "react";
import type { NextPage } from "next";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const BasicAlerts: NextPage<{}> = () => {
    return (
        <Stack sx={{ paddingTop: "75px", width: "360px", margin: "auto" }}>
            <Alert variant="outlined" severity="error">
                Ops, something went wrong. Please try again!
            </Alert>
        </Stack>
    );
};

export default BasicAlerts;
