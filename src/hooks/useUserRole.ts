import { endpoints } from "@/configs/config";
import { IUserRole } from "@/interfaces/userRole.interface";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const fetchUserRoles = async () => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.userRole}`, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const useGetUserRoles = ({ dataDecorator }: { dataDecorator?: (data: unknown) => unknown }) => {
  return useQuery<IUserRole[], Error>({
    queryKey: ["userRoleList"],
    queryFn: () => fetchUserRoles(),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IUserRole[];
      }
      return data;
    },
  });
};
