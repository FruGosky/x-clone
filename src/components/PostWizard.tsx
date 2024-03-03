import { UserButton } from "@clerk/nextjs";
import { type KeyboardEvent, useState } from "react";
import { api } from "~/utils/api";
import { Button } from "./ui/Button";
import toast from "react-hot-toast";
import LoadingIcon from "./LoadingIcon";

export default function PostWizard() {
	const [message, setMessage] = useState("");

	const ctx = api.useUtils();

	const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
		onSuccess: () => {
			setMessage("");
			void ctx.posts.getAll.invalidate();
			toast.success("Posted!");
		},
		onError: (error) => {
			const zodErrorMessages =
				error.data?.zodError?.fieldErrors?.content?.[0] ??
				"Failed to post!, Please try again later.";

			toast.error(zodErrorMessages);
		},
	});

	const handleButtonOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter" || message === "") return;
		e.preventDefault();
		mutate({ content: message });
	};

	return (
		<>
			<UserButton />
			<input
				type="text"
				className="grow bg-transparent outline-none"
				placeholder="What is happening?!"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleButtonOnKeyDown}
				disabled={isPosting}
			/>
			{!isPosting ? (
				<Button
					variant={"secondary"}
					onClick={() => mutate({ content: message })}
					disabled={isPosting || message.length === 0}
				>
					Post
				</Button>
			) : (
				<LoadingIcon />
			)}
		</>
	);
}
