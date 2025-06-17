"use client";
import { useEffect, useState } from "react";
import { ClientTransactionUser, TimeFrameOptions } from "../../../utils/types";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { toast } from "sonner";
import getTransactions from "@/actions/getTransactions";
import TimeFrameDropdown from "./TimeFrameDropdown";
import LoadingSpinner from "../LoadingSpinner";

interface SummaryCardsProps {
  transactionUser: ClientTransactionUser;
}

function SummaryCards({ transactionUser }: SummaryCardsProps) {
  const beginning = new Date();
  beginning.setDate(beginning.getDate() - 30);

  const [interval, setInterval] = useState<{
    type: TimeFrameOptions;
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    type: "30-days",
    startDate: beginning,
    endDate: new Date(),
  });
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const resp = await getTransactions({
          startDate: interval.startDate,
          endDate: interval.endDate,
        });
        const newIncome = resp.transactions
          .filter((item) => item.recipient)
          .reduce((acc, curr) => {
            return (acc += Number(curr.amount));
          }, 0);
        const newExpenses = resp.transactions
          .filter((item) => item.sender)
          .reduce((acc, curr) => {
            return (acc += Number(curr.amount));
          }, 0);
        if (mounted) {
          setIncome(newIncome);
          setExpenses(newExpenses);
        }
      } catch (err) {
        console.log("Error calculating income/expenses", err);
        toast.error("Something went wrong with calculating income & expenses.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchInfo();
    return () => {
      mounted = false;
    };
  }, [interval]);

  return (
    <section className="section-center">
      <ul className="grid gap-3 md:grid-cols-3 md:gap-6">
        <Card
          className={`rounded-xl bg-foreground text-white flex flex-col justify-between`}
        >
          <CardHeader>
            <CardDescription className="text-present-4">
              Balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-present-1">{`$${Number(
              ((transactionUser.balance || 0) / 100).toFixed(2)
            ).toLocaleString()}`}</h1>
          </CardContent>
        </Card>
        <Card className={`rounded-xl flex flex-col justify-between`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardDescription className="text-present-4">
                Income
              </CardDescription>
              <TimeFrameDropdown
                onSubmit={(value) => setInterval(value)}
                loading={loading}
                interval={interval}
              ></TimeFrameDropdown>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>
                <LoadingSpinner className="size-[36px]"></LoadingSpinner>
              </div>
            ) : (
              <h1 className="text-present-1">{`$${Number(
                (income / 100).toFixed(2)
              ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</h1>
            )}
          </CardContent>
        </Card>
        <Card className={`rounded-xl flex flex-col justify-between`}>
          <CardHeader>
            <CardDescription className="text-present-4">
              Expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>
                <LoadingSpinner className="size-[36px]"></LoadingSpinner>
              </div>
            ) : (
              <h1 className="text-present-1">{`$${Number(
                (expenses / 100).toFixed(2)
              ).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</h1>
            )}
          </CardContent>
        </Card>
      </ul>
    </section>
  );
}
export default SummaryCards;
