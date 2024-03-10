import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";

type TPostProps = RouterOutputs["posts"]["getAll"][number];

export default function Post(props: TPostProps) {
	dayjs.extend(relativeTime);

	return (
		<Link href={`/post/${props.post.id}`}>
			<article className="flex gap-3 border-b border-slate-400 p-8">
				<Link href={`/@${props.author.username}`}>
					<Image
						src={props.author.imageUrl}
						alt="Author profile image"
						height={50}
						width={50}
						className="rounded-full"
					/>
				</Link>
				<div className="flex flex-col">
					<div className="flex gap-1 text-slate-400">
						<Link href={`/@${props.author.username}`}>
							<span>{`@${props.author.username}`}</span>
						</Link>
						<div className="flex gap-1">
							<span>·</span>
							<span>{dayjs(props.post.createdAt).fromNow()}</span>
						</div>
					</div>
					<p>{props.post.content}</p>
				</div>
			</article>
		</Link>
	);
}
