"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { Order, OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { updatingOrder } from "./action";
const DashboardDesign = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();
  const WEEKLY_GOALS = 100;
  const MONTHLY_GOALS = 500;

  const today = new Date();
  const sevenDayAgo = new Date(today);
  sevenDayAgo.setDate(today.getDate() - 7);

  const oneMonthAgo = new Date(today);
  oneMonthAgo.setDate(today.getDate() - 30);

  const recentOrders = orders.filter((order) => {
    const orderDate = order.updatedAt;
    return orderDate >= sevenDayAgo && orderDate <= today;
  });

  const monthlyOrder = orders.filter((order) => {
    const orderDate = order.updatedAt;
    return orderDate >= oneMonthAgo && orderDate <= today;
  });
  const weeklyOrderAmount = recentOrders.reduce(
    (accumulator, order) => accumulator + order.amount,
    0
  );
  const monthlyOrderAmount = monthlyOrder.reduce(
    (acc, order) => acc + order.amount,
    0
  );
  const calculateGoals = (goals: number, amount: number) => {
    return (amount / goals) * 100;
  };
  const { mutate: updateOrderStatus } = useMutation({
    mutationKey: ["updating-order-status"],
    mutationFn: updatingOrder,
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleStatusChange = (status: OrderStatus, order: Order) => {
    updateOrderStatus({ orderId: order.id, status });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-16 py-8">
        <Card>
          <CardHeader>
            <CardDescription className="font-lg text-muted-foreground">
              Last Week
            </CardDescription>
            <CardTitle className="text-4xl">
              {formatPrice(weeklyOrderAmount)}
            </CardTitle>
            <CardContent className="px-0 py-2">
              <p className="text-muted-foreground pb-4">
                of {formatPrice(WEEKLY_GOALS)} goal
              </p>
              <Progress
                value={calculateGoals(WEEKLY_GOALS, weeklyOrderAmount)}
              />
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription className="font-lg text-muted-foreground">
              Last Month
            </CardDescription>
            <CardTitle className="text-4xl">
              {formatPrice(monthlyOrderAmount)}
            </CardTitle>
            <CardContent className="px-0 py-2">
              <p className="text-muted-foreground pb-4">
                of {formatPrice(MONTHLY_GOALS)} goal
              </p>
              <Progress
                value={calculateGoals(MONTHLY_GOALS, monthlyOrderAmount)}
              />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="text-4xl font-bold">Incoming Orders</h2>

        <Table className="mt-4">
          <TableHeader className="border-b">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(orders) &&
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>{order.status}</DropdownMenuTrigger>

                      <DropdownMenuContent>
                        {Object.keys(OrderStatus).map((item) => {
                          console.log(item);
                          return (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(item as OrderStatus, order)
                              }
                              className="flex justify-center items-center border-b cursor-pointer hover:text-zinc-600 py-1 last:border-none"
                              key={item}
                            >
                              {item}{" "}
                              {item == order.status && (
                                <Check className="w-4 h-4 text-green-500 ml-1 font-bold" />
                              )}{" "}
                            </DropdownMenuItem>
                          );
                        })}
                        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    {format(order.createdAt, "MMMM d, yyyy h:mm a")}
                  </TableCell>
                  <TableCell>{formatPrice(order.amount)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DashboardDesign;
