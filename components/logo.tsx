import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  asLink?: boolean;
  full?: boolean;
}

export const Logo = ({ size, asLink, full }: LogoProps) => {
  const logoSize = size || 40;

  const content = (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="logo"
        width={logoSize}
        height={logoSize}
        quality={100}
      />
      {full && <p className="font-bold pt-2 text-lg font-heading">Learnify</p>}
    </div>
  );

  return asLink ? (
    <Link href="/" className="cursor-pointer">
      {content}
    </Link>
  ) : (
    content
  );
};
