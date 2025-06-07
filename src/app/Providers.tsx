import { JotaiProvider } from "@/components/JotaiProvider";
import { AppProvider } from "../../context";

function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
export default Providers;
