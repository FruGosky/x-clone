import Head from "next/head";

export default function SinglePostPage() {
	return (
		<>
			<Head>
				<title>Post</title>
			</Head>
			<main className="flex h-screen justify-center">
				<div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
					Single Post Page
				</div>
			</main>
		</>
	);
}
