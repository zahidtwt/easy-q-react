import { endpoints } from "@/configs/config";
import {
  IEditQuestionPaperCategoryPayload,
  IQuestionPaperPayload,
  IQuestionPaperRes,
} from "@/interfaces/question-paper.interface";
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
    await axiosInstance.get(`${endpoints.dashboard.questionPaper}/details/${id}`, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data;
};

const fetchQuestionPaperList = async () => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.questionPaper}/list`, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data;
};

const addQuestionPaperCategory = async ({ _id, categoryList }: { _id: string; categoryList: string[] }) => {
  const questionCategory: { questionCategoryId: string; position: number; marks: number }[] = [];

  categoryList.map((item) => {
    questionCategory.push({ questionCategoryId: item, position: 0, marks: 0 });
  });

  const res = await axiosInstance.post(
    `${endpoints.dashboard.questionPaper}/add-question-category`,
    {
      questionPaperId: _id,
      questionCategory: questionCategory,
    },
    {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return res.data;
};

const updateQuestionPaper = async ({
  _id,
  ...rest
}: {
  _id: string;
  primarySymbol: string;
  secondarySymbol: string;
  optionSymbol: string;
}) => {
  const res = await axiosInstance.put(`${endpoints.dashboard.questionPaper}/update/${_id}`, rest, {
    headers: {
      ...axiosInstance.defaults.headers.common,
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data;
};

const updateQuestionPaperCategory = async (payload: IEditQuestionPaperCategoryPayload) => {
  const res = await axiosInstance.put(`${endpoints.dashboard.questionPaper}/update-question-category`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common,
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data;
};

const removeQuestionPaperCategory = async ({ _id, categoryId }: { _id: string; categoryId: string }) => {
  const res = await axiosInstance.patch(
    `${endpoints.dashboard.questionPaper}/remove-question-category`,
    { questionPaperId: _id, questionCategoryId: categoryId },
    {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return res.data;
};

const questionPaperDownloadPermission = async (id: string) => {
  const res = await axiosInstance.get(`${endpoints.dashboard.questionPaper}/download-question-paper/${id}`, {
    headers: {
      ...axiosInstance.defaults.headers.common,
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data;
};

// ========================================================================================================
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
        queryKey: ["question-paper-list"],
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

export const useAddCategoryInQuestionPaper = ({
  dataDecorator,
}: {
  dataDecorator?: (data: IQuestionPaperRes) => IQuestionPaperRes;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { _id: string; categoryList: string[] }) => addQuestionPaperCategory(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["question-paper-detail"],
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

export const useGetQuestionPaperList = ({
  dataDecorator,
}: {
  dataDecorator?: (data: IQuestionPaperRes[]) => IQuestionPaperRes[];
}) => {
  return useQuery<IQuestionPaperRes[], Error>({
    queryKey: ["question-paper-list"],
    queryFn: () => fetchQuestionPaperList(),
    // enabled: !!id,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IQuestionPaperRes[];
      }
      return data;
    },
  });
};

export const useGetQuestionPaperDownloadPermission = ({
  dataDecorator,
}: {
  dataDecorator?: (data: IQuestionPaperRes) => IQuestionPaperRes;
}) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: string) => questionPaperDownloadPermission(payload),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["question-paper-detail"],
      // });

      toast.success("Download Permission Granted");

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

export const useUpdateQuestionPaper = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { _id: string; primarySymbol: string; secondarySymbol: string; optionSymbol: string }) =>
      updateQuestionPaper(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["question-paper-detail"],
      });

      toast.success("Question Paper update successfully");

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
    mutationFn: (payload: IEditQuestionPaperCategoryPayload) => updateQuestionPaperCategory(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["question-paper-detail"],
      });

      toast.success("Question Paper update successfully");

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

export const useRemoveCategoryFromQuestionPaper = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { _id: string; categoryId: string }) => removeQuestionPaperCategory(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["question-paper-detail"],
      });

      toast.success("Question category removed");
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
