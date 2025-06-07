import chart from "@/assets/chart.svg";
import Image from "next/image";

function BudgetsChart() {
  return (
    <div className="flex justify-center">
      <Image
        src={chart}
        priority
        height={240}
        width={240}
        alt="Budget summary chart"
      ></Image>
    </div>
  );
}
export default BudgetsChart;
