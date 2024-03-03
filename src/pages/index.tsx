import { SignInButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { LoadingPage } from "~/components/LoadingIcon";
import Post from "~/components/Post";
import PostWizard from "~/components/PostWizard";
import { api } from "~/utils/api";

const PostList = () => {
	const {
		data: posts,
		isLoading: isPostsLoading,
		isError: isPostsError,
		error: postsError,
	} = api.posts.getAll.useQuery();

	if (isPostsError) return <p>{`Error: ${postsError.message}`}</p>;

	if (isPostsLoading) return <LoadingPage />;

	return (
		<div className="flex flex-col">
			{posts?.map((fullPost) => (
				<Post {...fullPost} key={fullPost.post.id} />
			))}
		</div>
	);
};

export default function Home() {
	const { user, isSignedIn: isUserSignedIn } = useUser();

	// Do not display anything bcs user should load fast so with LoadingIcon can generate weird behavior
	if (!user) return;

	return (
		<>
			<Head>
				<title>X-Clone</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex h-screen justify-center">
				<div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
					<header className="flex items-center justify-between gap-4 border-b border-slate-400 p-4">
						{isUserSignedIn ? <PostWizard /> : <SignInButton />}
					</header>
					<PostList />
				</div>
			</main>
		</>
	);
}
