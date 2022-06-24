import type { NextPage } from "next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import listCryptoStyles from "./listCrypto.module.css";

const ListCryptoTitle: NextPage<{}> = () => {
    return (
        <Grid id={listCryptoStyles.fixGrid} item xs={12} md={10}>
            <Typography id={listCryptoStyles.fixGridText}>Name</Typography>
            <Typography id={listCryptoStyles.fixGridText}>Price</Typography>
            <Typography
                id={listCryptoStyles.fixGridText}
                className={listCryptoStyles.fixGridText3}
            >
                Change (24h)
            </Typography>
        </Grid>
    );
};

export default ListCryptoTitle;
