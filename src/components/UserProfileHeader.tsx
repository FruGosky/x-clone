import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

type TUserProfileHeaderProps = {
	userData: RouterOutputs["profile"]["getUserByUsername"];
	imageSize?: number;
};

export default function UserProfileHeader(props: TUserProfileHeaderProps) {
	const imageSize = props.imageSize ?? 128;

	return (
		<>
			<div
				className={`relative mb-[${imageSize / 2}px] h-36 bg-slate-600`}
			>
				<Image
					src={props.userData.imageUrl}
					alt={`${props.userData.username}'s profile picture`}
					height={imageSize}
					width={imageSize}
					className={`absolute bottom-0 left-0 -mb-[${imageSize / 2}px] ml-4 rounded-full border-4 border-black`}
				/>
			</div>
		</>
	);
}
