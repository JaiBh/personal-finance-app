import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/assets/logoLarge.svg";
import illustration from "@/assets/illustrationAuthentication.svg";

function page() {
  return (
    <div className=" grid max-xl:grid-rows-[auto,_1fr] xl:grid-cols-[auto,_1fr] items-center xl:px-5 min-h-screen">
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
      <div className="my-8 h-full flex items-center justify-center">
        <div className="w-[90%] max-w-[35rem] md:h-auto">
          <SignUp></SignUp>
        </div>
      </div>
    </div>
  );
}
export default page;
