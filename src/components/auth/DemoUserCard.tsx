"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy } from "lucide-react";

function DemoUserCard() {
  const onCopyDemoEmail = () => {
    navigator.clipboard.writeText("demo@demo.com");
    toast.success("Demo email copied to clipboard");
  };
  const onCopyDemoPassword = () => {
    navigator.clipboard.writeText("demo-user123");
    toast.success("Demo password copied to clipboard");
  };
  return (
    <Card className="max-w-sm shadow-lg mx-auto">
      <CardHeader className="font-semibold">
        Demo User Login (shared):
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4">
          <p>
            Email : <span>demo@demo.com</span>
          </p>
          <button className="cursor-pointer" onClick={onCopyDemoEmail}>
            <Copy size={16}></Copy>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <p>
            Password : <span>demo-user123</span>
          </p>
          <button className="cursor-pointer" onClick={onCopyDemoPassword}>
            <Copy size={16}></Copy>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
export default DemoUserCard;
