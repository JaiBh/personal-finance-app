import LargeSidebar from "@/components/sidebar/LargeSidebar";
import SmallSidebar from "@/components/sidebar/SmallSidebar";
import Providers from "../Providers";
import Modals from "@/components/Modals";
import FirstTimeLoginInit from "@/components/FirstTimeLoginInit";

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Modals></Modals>
      <main className="lg:grid lg:grid-cols-[auto,_1fr]">
        <div className="hidden lg:block sticky top-0  h-screen">
          <LargeSidebar></LargeSidebar>
        </div>
        <div className=" grid max-lg:grid-rows-[1fr,_auto] min-h-screen">
          <FirstTimeLoginInit>{children}</FirstTimeLoginInit>

          <div className="lg:hidden  sticky bottom-0 min-w-screen">
            <SmallSidebar></SmallSidebar>
          </div>
        </div>
      </main>
    </Providers>
  );
}
