import LargeSidebar from "@/components/sidebar/LargeSidebar";
import SmallSidebar from "@/components/sidebar/SmallSidebar";

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="lg:grid lg:grid-cols-[auto,_1fr]">
      <div className="hidden lg:block sticky top-0 bg-green-700 h-screen">
        <LargeSidebar></LargeSidebar>
      </div>
      <div className=" grid max-lg:grid-rows-[1fr,_auto] min-h-screen">
        <div>{children}</div>
        <div className="lg:hidden">
          <SmallSidebar></SmallSidebar>
        </div>
      </div>
    </main>
  );
}
