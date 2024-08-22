import { endpoints } from "@/configs/config";
import {
  ICreateQuestionCategoryPayload,
  IEditQuestionCategoryPayload,
  IQuestionCategory,
} from "@/interfaces/question-category.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const getQuestionsCategoryList = async ({ subjectId }: { subjectId: string }) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.questionsCategory}/list/${subjectId}`, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const updateQuestionsCategory = async (payload: IEditQuestionCategoryPayload) => {
  return (
    await axiosInstance.put(`${endpoints.dashboard.questionsCategory}/update`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const createQuestionsCategory = async (payload: ICreateQuestionCategoryPayload) => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.questionsCategory}/create`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const useGetQuestionCategoryList = ({
  dataDecorator,
  filterData,
}: {
  dataDecorator?: (data: IQuestionCategory[]) => IQuestionCategory[];
  filterData: { subjectId: string };
}) => {
  return useQuery<IQuestionCategory[], Error>({
    queryKey: ["questionCategoryList", filterData.subjectId],
    queryFn: () => getQuestionsCategoryList(filterData),
    enabled: !!filterData.subjectId,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data);
      }
      return data;
    },
  });
};

export const useCreateQuestionCategory = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateQuestionCategoryPayload) => createQuestionsCategory(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["questionCategoryList"],
      });
      toast.success("Question category Created successfully");

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

export const useUpdateQuestionCategory = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditQuestionCategoryPayload) => updateQuestionsCategory(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["questionCategoryList"],
      });
      toast.success("Question category update successfully");

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
