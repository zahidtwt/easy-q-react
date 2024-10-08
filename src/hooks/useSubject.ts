import { userQueryPayload } from "@/hooks/userUserList";
import { endpoints } from "@/configs/config";
import { IEditSubjectPayload, ISubject, ISubjectPayload } from "@/interfaces/subject.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const getSUbjectList = async ({ query, sortField, sortOrder = 1 }: userQueryPayload) => {
  return (
    await axiosInstance.post(
      `${endpoints.dashboard.subject}/list`,
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

const addQuestionCategory = async ({ id, questionCategory }: { id: string; questionCategory: string }) => {
  return (
    await axiosInstance.post(
      `${endpoints.dashboard.subject}add-category/${id}`,
      {
        category: questionCategory,
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

const addSubject = async (payload: ISubjectPayload) => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.subject}/create`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const updateSubject = async (payload: IEditSubjectPayload) => {
  return (
    await axiosInstance.put(`${endpoints.dashboard.subject}/update`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const useGetSubjectList = ({
  dataDecorator,
  filterData,
}: {
  dataDecorator?: (data: ISubject[]) => ISubject[];
  filterData: userQueryPayload;
}) => {
  return useQuery<ISubject[], Error>({
    queryKey: ["subjectList"],
    queryFn: () => getSUbjectList(filterData),
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as ISubject[];
      }
      return data;
    },
  });
};

export const useAddQuestionCategoryInSubject = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; questionCategory: string }) => addQuestionCategory(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["subjectList"],
      });
      toast.success("Class created successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};

export const useAddSubject = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ISubjectPayload) => addSubject(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["subjectList"],
      });
      toast.success("Class created successfully");

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

export const useUpdateSubject = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditSubjectPayload) => updateSubject(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["subjectList"],
      });
      toast.success("Subject Detail Updated !!");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};
