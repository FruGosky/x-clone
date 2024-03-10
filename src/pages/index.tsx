import { SignInButton, useUser } from "@clerk/nextjs";
import PostList from "~/components/PostList";
import PostWizard from "~/components/PostWizard";

export default function Home() {
	const { user, isSignedIn: isUserSignedIn } = useUser();

	// Do not display anything bcs user should load fast so with LoadingIcon can generate weird behavior
	if (!user) return;

	return (
		<main className="flex h-screen justify-center">
			<div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
				<header className="flex items-center justify-between gap-4 border-b border-slate-400 p-4">
					{isUserSignedIn ? <PostWizard /> : <SignInButton />}
				</header>
				<PostList />
			</div>
		</main>
	);
}
