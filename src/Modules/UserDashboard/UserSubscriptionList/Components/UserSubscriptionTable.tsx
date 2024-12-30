import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetUserSubscriptionList } from "@/hooks/useSubscription";
import TableSkeleton from "@/Modules/AdminDashboard/Components/CustomTable/TableSkeleton";
import { ISubscriptionResponse } from "@/interfaces/subscription.interface";

const UserSubscriptionTable = ({ approveStatus }: { approveStatus: "all" | "approved" | "pending" | "rejected" }) => {
  const { data: subscriptionList, isLoading: subscriptionLoading } = useGetUserSubscriptionList({
    approveStatus: approveStatus,
  });

  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Subscription Type</TableHead>
            <TableHead className="hidden md:table-cell">Amount</TableHead>
            <TableHead className="hidden md:table-cell">Question Set Quantity</TableHead>
            <TableHead>Status</TableHead>

            {/* <TableHead>
                   <span className="sr-only">Actions</span>
                 </TableHead> */}
          </TableRow>
        </TableHeader>

        {!subscriptionLoading && (
          <TableBody>
            {subscriptionList &&
              subscriptionList.data &&
              subscriptionList.data.map((subscription: ISubscriptionResponse) => (
                <TableRow key={subscription?._id}>
                  <TableCell className="text-center hidden md:table-cell capitalize">
                    {subscription.packageType}
                  </TableCell>

                  <TableCell className="text-center hidden md:table-cell">{subscription.packagePrice}</TableCell>

                  <TableCell className="text-center hidden md:table-cell">{subscription.questionSetQuantity}</TableCell>

                  <TableCell className="hidden md:table-cell">
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

export default UserSubscriptionTable;
