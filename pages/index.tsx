import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import ListCrypto from "./lists/listCrypto";

const Home: NextPage<{}> = () => {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <ListCrypto />
            </section>
        </Layout>
    );
};

export default Home;
