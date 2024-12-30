import {
  Image,
  //   MoreHorizontal,
  // ListFilter,
  // Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAdminSubscriptionList, useUpdatePaymentStatus } from "@/hooks/useSubscription";
import TableSkeleton from "@/Modules/AdminDashboard/Components/CustomTable/TableSkeleton";
import { ISubscriptionResponse } from "@/interfaces/subscription.interface";

const SubscriptionTable = ({ approveStatus }: { approveStatus: "all" | "approved" | "pending" | "rejected" }) => {
  const {
    data: subscriptionList,
    isLoading: subscriptionLoading,
    refetch,
  } = useGetAdminSubscriptionList({
    approveStatus: approveStatus,
  });

  const afterUpdate = () => {
    refetch();
  };

  const {
    // data: updatePaymentStatusData,
    isPending: updatePaymentStatusLoading,
    // error: updatePaymentStatusError,
    mutate: updatePaymentStatus,
  } = useUpdatePaymentStatus({ dataDecorator: afterUpdate });

  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Phone No</TableHead>
            <TableHead className="hidden md:table-cell">Subscription Type</TableHead>
            <TableHead className="hidden md:table-cell">Amount</TableHead>
            <TableHead className="hidden md:table-cell">Question Set Quantity</TableHead>
            <TableHead>Status</TableHead>

            {/* <TableHead>
             <span className="sr-only">Actions</span>
           </TableHead> */}
          </TableRow>
        </TableHeader>

        {(!subscriptionLoading || !updatePaymentStatusLoading) && (
          <TableBody>
            {subscriptionList &&
              subscriptionList.data &&
              subscriptionList.data.map((subscription: ISubscriptionResponse) => (
                <TableRow key={subscription?._id}>
                  <TableCell className="hidden sm:table-cell">
                    {subscription.user?.imageURL ? (
                      <img
                        src={subscription.user?.imageURL}
                        alt="Board Image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        width="64"
                      />
                    ) : (
                      <Image size={64} />
                    )}
                  </TableCell>

                  <TableCell className="font-medium">
                    {subscription.user?.firstName} {subscription.user?.lastName}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">{subscription.user.phone}</TableCell>

                  <TableCell className="text-center hidden md:table-cell">{subscription.packageType}</TableCell>

                  <TableCell className="text-center hidden md:table-cell">{subscription.packagePrice}</TableCell>

                  <TableCell className="text-center hidden md:table-cell">{subscription.questionSetQuantity}</TableCell>

                  <TableCell className="hidden md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost">
                          <Badge
                            variant="outline"
                            className={`active:outline-none ${
                              subscription.approvedStatus === "approved"
                                ? "bg-green-500 text-green-500"
                                : subscription.approvedStatus === "pending"
                                  ? "bg-yellow-500 text-yellow-500"
                                  : "bg-red-500 text-red-500"
                            } ${subscription.approvedStatus === "rejected" ? "text-white" : "text-black"}`}>
                            {" "}
                            {subscription.approvedStatus}
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}

                        {["approved", "pending", "rejected"]?.map((status) => (
                          <DropdownMenuItem
                            className={`${subscription.approvedStatus === status ? "hidden" : ""}`}
                            key={status}
                            onClick={() => {
                              updatePaymentStatus({ subscriptionId: subscription._id, updateStatus: status });
                            }}>
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>

      {subscriptionLoading && <TableSkeleton />}
    </CardContent>
  );
};

export default SubscriptionTable;
