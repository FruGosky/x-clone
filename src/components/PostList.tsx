import { LoadingPage } from "~/components/LoadingIcon";
import Post from "~/components/Post";
import { api } from "~/utils/api";

export default function PostList() {
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
}
