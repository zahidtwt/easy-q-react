import { endpoints } from "@/configs/config";
import { IClass, ICreateClassPayload, IEditClassPayload } from "@/interfaces/class";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const fetchClassList = async () => {
  return (
    await axiosInstance.get(endpoints.dashboard.class, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const fetchClassDetail = async ({ id }: { id: string }) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.class}${id}`, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const createNewClass = async (payload: ICreateClassPayload) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.class}create`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

const updateClass = async ({ id, ...restPayload }: IEditClassPayload) => {
  const res = await axiosInstance.put(`${endpoints.dashboard.class}update/${id}`, restPayload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

export const useGetClassList = ({ dataDecorator }: { dataDecorator?: (data: unknown) => unknown }) => {
  return useQuery<IClass[], Error>({
    queryKey: ["classList"],
    queryFn: () => fetchClassList(),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IClass[];
      }
      return data;
    },
  });
};

export const useCreateClass = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateClassPayload) => createNewClass(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["classList"],
      });
      toast.success("Class created successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};

export const useUpdateClass = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditClassPayload) => updateClass(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["classList"],
      });

      toast.success("Class update successfully");
      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};
