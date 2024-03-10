import Head from "next/head";
import { api } from "~/utils/api";
import UserProfileHeader from "~/components/UserProfileHeader";
import ProfilePostList from "~/components/ProfilePostList";
import PageLayout from "~/components/PageLayout";

type TProfilePageProps = {
	username: string;
};

export default function ProfilePage(props: TProfilePageProps) {
	const { data } = api.profile.getUserByUsername.useQuery({
		username: props.username,
	});

	if (!data) return <div>404</div>;

	return (
		<>
			<Head>
				<title>{`X-Clone | @${data.username}`}</title>
			</Head>
			<PageLayout>
				<UserProfileHeader userData={data} />
				<div className="p-4 text-2xl font-bold">
					{`@${data.username}`}
				</div>
				<div className="border-y border-slate-400">
					<ProfilePostList userId={data.id} />
				</div>
			</PageLayout>
		</>
	);
}

import { type GetStaticProps } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = generateSSGHelper();

	const slug = context.params?.slug;

	if (typeof slug !== "string") throw new Error("no slug");

	const username = slug.replace("@", "");

	await ssg.profile.getUserByUsername.prefetch({ username });

	return {
		props: {
			trpcState: ssg.dehydrate(),
			username,
		},
	};
};

export const getStaticPaths = async () => {
	return { paths: [], fallback: "blocking" };
};
