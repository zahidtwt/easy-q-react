import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserSubscriptionTable from "./Components/UserSubscriptionTable";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserSubscriptionList = () => {
  const navigate = useNavigate();
  const [approveStatus, setApproveStatus] = React.useState<"all" | "approved" | "rejected" | "pending">("all");
  return (
    <div className={`shadow-lg rounded-lg p-6 relatives`}>
      <div className="flex items-center justify-start gap-2">
        <Button
          variant="ghost"
          color="primary"
          onClick={() => navigate(-1)}
          className="p-2 rounded-full">
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Subscription</h1>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <div className="flex justify-between items-start">
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage Users and view their details.</CardDescription>
          </CardHeader>

          <div className="ml-auto flex items-center gap-2 p-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor="approveStatus"
                className="text-sm font-medium">
                Approve Status
              </label>
              <select
                onChange={(e) => {
                  setApproveStatus(e.target.value as typeof approveStatus);
                }}
                id="approveStatus"
                name="approveStatus"
                className="border border-gray-300 rounded-md p-1 text-sm">
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        <UserSubscriptionTable approveStatus={approveStatus} />
      </Card>
    </div>
  );
};

export default UserSubscriptionList;
