import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../api/root";
import { db } from "../db";
import SuperJSON from "superjson";

export const generateSSGHelper = () => {
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: { db, userId: null },
		transformer: SuperJSON,
	});

	return ssg;
};
