import { LoadingPage } from "~/components/LoadingIcon";
import Post from "~/components/Post";
import { api } from "~/utils/api";

type TProfilePostList = {
	userId: string;
};

export default function ProfilePostList(props: TProfilePostList) {
	const {
		data: posts,
		isLoading: isPostsLoading,
		isError: isPostsError,
		error: postsError,
	} = api.posts.getPostsByUserId.useQuery({ userId: props.userId });

	if (isPostsError) return <p>{`Error: ${postsError.message}`}</p>;

	if (isPostsLoading) return <LoadingPage />;

	if (posts.length === 0) return <div>User has not posted yet!</div>;

	return (
		<div className="flex flex-col">
			{posts?.map((fullPost) => (
				<Post {...fullPost} key={fullPost.post.id} />
			))}
		</div>
	);
}
