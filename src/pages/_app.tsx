import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ClerkProvider {...pageProps}>
			<Head>
				<title>X-Clone</title>
				<meta
					name="description"
					content="Simple X-Clone page created for learning new stuff"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Toaster position="bottom-right" />
			<Component {...pageProps} />
		</ClerkProvider>
	);
};

export default api.withTRPC(MyApp);
