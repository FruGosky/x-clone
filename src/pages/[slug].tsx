import Head from "next/head";

export default function ProfilePage() {
	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<main className="flex h-screen justify-center">
				<div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
					Profile view
				</div>
			</main>
		</>
	);
}
