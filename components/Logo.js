import Link from "next/link";
import { Poppins, Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
});

export const Logo = () => {
  return (
    <Link href="/" className="flex flex-col font-bold">
      <div className="flex items-center gap-1">
        <span className={`text-primary text-xl ${oswald.className}`}>Todo</span>
        <span className="h-2 w-2 rounded-full bg-black translate-y-1"></span>
      </div>
      <span className={`text-xs font-light text-gray-600 ${poppins.className}`}>
        Plan, Act, Achieve!
      </span>
    </Link>
  );
};
