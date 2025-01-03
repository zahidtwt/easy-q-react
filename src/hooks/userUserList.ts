import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../Modules/AdminDashboard/Pages/UserList/User.Interface";
import axiosInstance from "@/utils/axios";
import { endpoints } from "@/configs/config";
import Cookies from "js-cookie";
import { toast } from "sonner";

export type userQueryPayload = {
  query: {
    [key: string]: string;
  };
  sortField: string;
  sortOrder?: number;
};

type updateAccountStatusPayload = { id: string; accountStatus: string };
type updateAccountRolePayload = { id: string; role: string };

const fetchUserList = async ({ query, sortField, sortOrder = 1 }: userQueryPayload) => {
  return (
    await axiosInstance.post(
      `${endpoints.dashboard.users}/userList`,
      {
        query,
        sortField,
        sortOrder,
      },
      {
        headers: {
          ...axiosInstance.defaults.headers.common, // Merge existing common headers
          Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
        },
      }
    )
  ).data;
};

const updateAccountStatus = async (payload: updateAccountStatusPayload) => {
  return (
    await axiosInstance.patch(`${endpoints.dashboard.users}/change-account-status`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const updateAccountRole = async (payload: updateAccountRolePayload) => {
  return (
    await axiosInstance.patch(`${endpoints.dashboard.users}/update-user-role`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const useGetUserList = ({
  dataDecorator,
  filterData,
}: {
  dataDecorator?: (data: unknown) => unknown;
  filterData: userQueryPayload;
}) => {
  return useQuery<IUser[], Error>({
    queryKey: ["userList"],
    queryFn: () => fetchUserList(filterData),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IUser[];
      }
      return data;
    },
  });
};

export const useUpdateUserStatus = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: updateAccountStatusPayload) => updateAccountStatus(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userList"],
      });
      toast.success("User Status change successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};

export const useUpdateUserRole = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: updateAccountRolePayload) => updateAccountRole(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userList"],
      });
      toast.success("User Role change successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
