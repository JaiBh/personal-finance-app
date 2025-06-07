import { AuthScreen } from "@/features/auth/components/AuthScreen";
import Image from "next/image";
import logo from "@/assets/logoLarge.svg";
import illustration from "@/assets/illustrationAuthentication.svg";

function AuthPage() {
  return (
    <div className="h-full grid max-xl:grid-rows-[auto,_1fr] xl:grid-cols-[auto,_1fr]  items-center xl:px-5">
      <aside className="max-xl:hidden">
        <Image
          src={illustration}
          alt={"authentication illustration"}
          className="object-cover"
          priority
        ></Image>
      </aside>
      <header className="xl:hidden flex justify-center py-6 bg-grey-900 rounded-b-lg">
        <Image src={logo} alt={logo} priority className="object-cover"></Image>
      </header>
      <AuthScreen></AuthScreen>
    </div>
  );
}
export default AuthPage;
