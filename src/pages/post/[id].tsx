import Head from "next/head";
import { api } from "~/utils/api";
import PageLayout from "~/components/PageLayout";

type TSinglePostPageProps = {
	id: string;
};

export default function SinglePostPage(props: TSinglePostPageProps) {
	const { data } = api.posts.getById.useQuery({
		id: props.id,
	});

	if (!data) return <div>404</div>;

	return (
		<>
			<Head>
				<title>{`${data.post.content} - @${data.author.username}`}</title>
			</Head>
			<PageLayout>
				<Post {...data} />
			</PageLayout>
		</>
	);
}

import { type GetStaticProps } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import Post from "~/components/Post";

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = generateSSGHelper();

	const id = context.params?.id;

	if (typeof id !== "string") throw new Error("no id");

	await ssg.posts.getById.prefetch({ id });

	return {
		props: {
			trpcState: ssg.dehydrate(),
			id,
		},
	};
};

export const getStaticPaths = async () => {
	return { paths: [], fallback: "blocking" };
};
