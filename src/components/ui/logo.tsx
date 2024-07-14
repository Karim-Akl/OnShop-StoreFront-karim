// import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	storeName?: string;
}

const Logo: React.FC<LogoProps> = ({ className, storeName, ...props }) => {
	return (
		<Link
			href={siteSettings.logo.href}
			className={cn("inline-flex focus:outline-none", className)}
			{...props}
		>
			{/* <Image
				src={siteSettings.logo.url}
				alt={siteSettings.logo.alt}
				height={siteSettings.logo.height}
				width={siteSettings.logo.width}
				layout="fixed"
				loading="eager"
			/> */}
			<span style={{ whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: 'large' }}>{storeName ? storeName : "On Shop"}</span>


		</Link>
	);
};

export default Logo;
