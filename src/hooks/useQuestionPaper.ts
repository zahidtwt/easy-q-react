import { endpoints } from "@/configs/config";
import { IQuestionPaperPayload, IQuestionPaperRes } from "@/interfaces/question-paper.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const createQuestionPaper = async (data: IQuestionPaperPayload) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.questionPaper}/create`, data, {
    headers: {
      ...axiosInstance.defaults.headers.common,
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data;
};

const fetchQuestionPaperDetails = async (id?: string) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.questionPaper}/${id}`, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data;
};

const updateQuestionPaperCategory = async ({ _id, subjectList }: { _id: string; subjectList: string[] }) => {
  const res = await axiosInstance.put(
    `${endpoints.dashboard.class}/update-subject-list/${_id}`,
    { subjectList },
    {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return res.data;
};

export const useCreateQuestionPaper = ({
  dataDecorator,
}: {
  dataDecorator?: (data: IQuestionPaperRes) => IQuestionPaperRes;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IQuestionPaperPayload) => createQuestionPaper(payload),
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
    onError: (error) => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });
};

export const useUpdateQuestionPaperCategory = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { _id: string; subjectList: string[] }) => updateQuestionPaperCategory(payload),
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
    onError: (error) => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });
};

export const useGetQuestionPaperDetails = ({
  id,
  dataDecorator,
}: {
  id?: string;
  dataDecorator?: (data: IQuestionPaperRes) => IQuestionPaperRes;
}) => {
  return useQuery<IQuestionPaperRes, Error>({
    queryKey: ["question-paper-detail"],
    queryFn: () => fetchQuestionPaperDetails(id),
    enabled: !!id,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IQuestionPaperRes;
      }
      return data;
    },
  });
};
