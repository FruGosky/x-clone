import { SignOutButton, UserButton } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";

type TPostWizardProps = {
	user: UserResource;
};

export default function PostWizard(props: TPostWizardProps) {
	return (
		<>
			<UserButton />
			<input
				type="text"
				className="grow bg-transparent outline-none"
				placeholder="Type some message..."
			/>
			<SignOutButton />
		</>
	);
}
