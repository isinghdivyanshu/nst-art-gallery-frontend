import Image from 'next/image';
import Link from 'next/link';
import Artium from "@/assets/Artium_logo.svg";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image 
        src={Artium} 
        alt="Artium Logo"
        width={120}
        height={50}
        priority
      />
    </Link>
  );
};

export default Logo;