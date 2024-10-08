// clone from src/hooks/useEducationBoard.ts to src/hooks/useInstitution.ts and update the file as below

import { endpoints } from "@/configs/config";
import { IQueryPayload } from "@/interfaces/commonTypes";
import { ICreateInstitutionPayload, IEditInstitutionPayload, IInstitution } from "@/interfaces/institution";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const fetchInstitutionList = async (payload: IQueryPayload) => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.getAllInstitute}all`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const fetchUserInstitutionList = async (payload: IQueryPayload) => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.getAllInstitute}users-institution`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const fetchInstitutionDetail = async ({ id }: { id: string | undefined }) => {
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

export const useGetInstitutionDetail = ({
  id,
  dataDecorator,
}: {
  id: string | undefined;
  dataDecorator?: (data: unknown) => void;
}) => {
  return useQuery({
    queryKey: ["madrasaDetail", id],
    queryFn: () => fetchInstitutionDetail({ id }),
    enabled: !!id,
    staleTime: 10000,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data);
      }
      return data;
    },
  });
};

export const useGetInstitutionList = ({ dataDecorator }: { dataDecorator?: (data: unknown) => unknown }) => {
  return useQuery<IInstitution[], Error>({
    queryKey: ["institutionList"],
    queryFn: () =>
      fetchInstitutionList({
        query: {},
        sortField: "name",
        sortOrder: 1,
      }),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IInstitution[];
      }
      return data;
    },
  });
};

export const useGetUserInstitutionList = ({ dataDecorator }: { dataDecorator?: (data: unknown) => unknown }) => {
  return useQuery<IInstitution[], Error>({
    queryKey: ["institutionList"],
    queryFn: () =>
      fetchUserInstitutionList({
        query: {},
        sortField: "name",
        sortOrder: 1,
      }),
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
    onError: (error) => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });
};

export const useUpdateInstitution = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditInstitutionPayload) => updateInstitution(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["madrasaDetail"],
      });

      toast.success("Institution details update successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};
