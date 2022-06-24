import Head from "next/head";
import layoutStyles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name: string = "Crypto Heaven";
export const siteTitle: string = "Crypto Heaven App";

/*  Layout component which will be shared across all pages */
const Layout: React.FunctionComponent<{}> = ({ children }) => {
    return (
        <div className={layoutStyles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Crypto Heaven App build using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={layoutStyles.header}>
                <h1 className={utilStyles.h1}>{name}</h1>
            </header>
            <main>{children}</main>
            <footer>© 2022 {name}, Inc. All rights reserved.</footer>
        </div>
    );
};

export default Layout;
