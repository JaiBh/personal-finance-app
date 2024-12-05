import { BlobOptions } from "buffer";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

function SummaryCard({
  text,
  amount,
  active = false,
}: {
  text: string;
  amount: number;
  active?: boolean;
}) {
  return (
    <Card className={`rounded-xl ${active && "bg-foreground text-white"}`}>
      <CardHeader>
        <CardDescription className="text-present-4">{text}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-present-1">{`$${(amount / 100).toFixed(2)}`}</h1>
      </CardContent>
    </Card>
  );
}
export default SummaryCard;
