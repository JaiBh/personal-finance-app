import { GoTriangleRight } from "react-icons/go";
import RouteLink from "../RouteLink";

function OverviewCardHeader({
  title,
  btnText,
  href,
}: {
  title: string;
  btnText: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-present-2">{title}</h2>
      <RouteLink
        href={href}
        className="flex items-center gap-4 text-grey-500 hover:text-foreground transition-all"
      >
        <span className="text-present-4">{btnText}</span>
        <GoTriangleRight className="text-sm"></GoTriangleRight>
      </RouteLink>
    </div>
  );
}
export default OverviewCardHeader;
