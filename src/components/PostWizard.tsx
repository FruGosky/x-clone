import { UserButton } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";
import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "./ui/Button";

type TPostWizardProps = {
	user: UserResource;
};

export default function PostWizard(props: TPostWizardProps) {
	const [message, setMessage] = useState("");

	const ctx = api.useUtils();

	const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
		onSuccess: () => {
			setMessage("");
			void ctx.posts.getAll.invalidate();
		},
	});

	return (
		<>
			<UserButton />
			<input
				type="text"
				className="grow bg-transparent outline-none"
				placeholder="What is happening?!"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				disabled={isPosting}
			/>
			<Button
				variant={"secondary"}
				onClick={() => mutate({ content: message })}
				disabled={isPosting}
			>
				Post
			</Button>
		</>
	);
}
