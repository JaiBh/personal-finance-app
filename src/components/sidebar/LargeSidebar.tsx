"use client";

import { useGlobalContext } from "../../../context";
import OpenSidebar from "./OpenSidebar";
import ClosedSidebar from "./ClosedSidebar";

function largeSidebar() {
  const { sidebarExpanded } = useGlobalContext();

  return (
    <aside className="bg-grey-900 rounded-r-xl h-screen">
      {sidebarExpanded ? (
        <OpenSidebar></OpenSidebar>
      ) : (
        <ClosedSidebar></ClosedSidebar>
      )}
    </aside>
  );
}
export default largeSidebar;
