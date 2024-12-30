import React from "react";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SubscriptionTable from "./Components/SubscriptionTable";

const SubscriptionList = () => {
  const [approveStatus, setApproveStatus] = React.useState<"all" | "approved" | "rejected" | "pending">("all");
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
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
                {approveStatus && <SubscriptionTable approveStatus={approveStatus} />}
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionList;
