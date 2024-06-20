// clone from src/hooks/useEducationBoard.ts to src/hooks/useInstitution.ts and update the file as below

import { endpoints } from "@/configs/config";
import { ICreateInstitutionPayload, IEditInstitutionPayload, IInstitution } from "@/interfaces/institution";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const fetchInstitutionList = async () => {
  return (
    await axiosInstance.get(endpoints.dashboard.institution, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const fetchInstitutionDetail = async ({ id }: { id: string }) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.institution}${id}`, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const createNewInstitution = async (payload: ICreateInstitutionPayload) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.institution}create`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

const updateInstitution = async ({ _id, ...restPayload }: IEditInstitutionPayload) => {
  const res = await axiosInstance.put(`${endpoints.dashboard.institution}update/${_id}`, restPayload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

export const useGetInstitutionList = ({ dataDecorator }: { dataDecorator?: (data: unknown) => unknown }) => {
  return useQuery<IInstitution[], Error>({
    queryKey: ["institutionList"],
    queryFn: () => fetchInstitutionList(),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IInstitution[];
      }
      return data;
    },
  });
};

export const useCreateInstitution = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateInstitutionPayload) => createNewInstitution(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["institutionList"],
      });

      toast.success("Institution created successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};

export const useUpdateInstitution = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditInstitutionPayload) => updateInstitution(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["institutionList"],
      });

      toast.success("Institution details update successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};
