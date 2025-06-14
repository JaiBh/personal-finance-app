"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

function page() {
  const onClick = async () => {
    // await axios.post("/api/misc");
  };
  return (
    <div className="space-y-6 pl-10">
      <Button onClick={onClick}>Click me</Button>
    </div>
  );
}
export default page;
