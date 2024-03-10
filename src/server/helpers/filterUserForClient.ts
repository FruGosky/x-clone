import type { User } from "@clerk/nextjs/server";

export const filterUserForClient = (user: User) => {
	const { id, username, imageUrl } = user;
	return { id, username, imageUrl };
};
