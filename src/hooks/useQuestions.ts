import { userQueryPayload } from "@/Modules/AdminDashboard/Pages/UserList/Hooks/userUserList";
import { endpoints } from "@/configs/config";
import { IEditQuestionPayload, IQuestion, IQuestionPayload } from "@/interfaces/question.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const getQuestionList = async ({ query, sortField, sortOrder = 1 }: userQueryPayload) => {
  if (query.subjectId === "all") {
    delete query.subjectId;
  }

  return (
    await axiosInstance.post(
      `${endpoints.dashboard.questions}`,
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

const addQuestion = async (payload: IQuestionPayload) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.questions}create`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common, // Merge existing common headers
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
    },
  });
  return res.data;
};

const updateQuestion = async ({ _id, ...payload }: IEditQuestionPayload) => {
  return (
    await axiosInstance.put(`${endpoints.dashboard.subject}${_id}`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const useGetQuestionList = ({
  dataDecorator,
  filterData,
}: {
  dataDecorator?: (data: unknown) => unknown;
  filterData: userQueryPayload;
}) => {
  return useQuery<IQuestion[], Error>({
    queryKey: ["questionList", filterData.query.classId, filterData.query.subjectId, filterData.query.queryText],
    queryFn: () => getQuestionList(filterData),
    enabled: !!filterData.query.classId && !!filterData.query.subjectId,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IQuestion[];
      }
      return data;
    },
  });
};

export const useAddQuestion = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IQuestionPayload) => addQuestion(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["questionList"],
      });
      toast.success("Question added successfully");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useUpdateQuestion = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditQuestionPayload) => updateQuestion(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["questionList"],
      });
      toast.success("Question update successfully.");

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
  });
};
