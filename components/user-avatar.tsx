import Image from "next/image";

interface UserAvatarProps {
  url: string;
  size?: number;
}

export const UserAvatar = ({ url, size }: UserAvatarProps) => {
  return (
    <Image
      src={url}
      alt="profile-pic"
      width={size || 100}
      height={size || 100}
      className="rounded-full object-cover"
    />
  );
};
