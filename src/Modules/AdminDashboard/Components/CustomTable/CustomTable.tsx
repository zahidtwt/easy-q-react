import {
  Image,
  MoreHorizontal,
  // ListFilter,
  // Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { IUser } from "../../Pages/UserList/User.Interface";
import { useUpdateUserStatus } from "../../Pages/UserList/Hooks/userUserList";
import TableSkeleton from "./TableSkeleton";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

const CustomTable = ({
  userList,
  getUserLoading,
  // setUserFilter,
}: {
  userList: IUser[] | undefined;
  getUserLoading: boolean;
  // setUserFilter: (filter: userQueryPayload) => void;
}) => {
  const { mutate: updateAccountStatus } = useUpdateUserStatus({});
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
                    {/* <div className="relative ml-auto flex-1 md:grow-0">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                      />
                    </div> */}
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1">
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}

                    {/* <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1">
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button> */}
                    {/* <Button
                      size="sm"
                      className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                    </Button> */}
                  </div>
                </div>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Phone No</TableHead>
                        <TableHead className="hidden md:table-cell">Role</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    {!getUserLoading && (
                      <TableBody>
                        {userList &&
                          userList.map((user) => (
                            <TableRow key={user?._id}>
                              <TableCell className="hidden sm:table-cell">
                                {user?.imageURL ? (
                                  <img
                                    src={user?.imageURL}
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
                                {user?.firstName} {user?.lastName}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{user?.accountStatus}</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{user?.phone}</TableCell>
                              <TableCell className="hidden md:table-cell">{user?.role?.title}</TableCell>
                              <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    {user?.accountStatus === "inactive" ? (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateAccountStatus({
                                            id: user._id,
                                            accountStatus: "active",
                                          })
                                        }>
                                        Active
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          updateAccountStatus({
                                            id: user._id,
                                            accountStatus: "inactive",
                                          })
                                        }>
                                        Inactive
                                      </DropdownMenuItem>
                                    )}
                                    {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                                    {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    )}
                  </Table>

                  {getUserLoading && <TableSkeleton />}
                </CardContent>
                <CardFooter>
                  {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                  </div> */}

                  {/* <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination> */}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CustomTable;
