import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

type TUserProfileHeaderProps = {
	userData: RouterOutputs["profile"]["getUserByUsername"];
};

export default function UserProfileHeader(props: TUserProfileHeaderProps) {
	return (
		<>
			<div className={`relative mb-[64px] h-36 bg-slate-600`}>
				<Image
					src={props.userData.imageUrl}
					alt={`${props.userData.username}'s profile picture`}
					height={128}
					width={128}
					className={`absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black`}
				/>
			</div>
		</>
	);
}
