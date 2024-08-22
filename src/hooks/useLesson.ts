import { endpoints } from "@/configs/config";
import { ICreateLesson, IEditLesson, ILesson } from "@/interfaces/lesson.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const getLessonList = async ({ subjectId }: { subjectId: string }) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.lesson}/list/${subjectId}`, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const createLesson = async (payload: ICreateLesson) => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.lesson}/create`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const updateLesson = async (payload: IEditLesson) => {
  return (
    await axiosInstance.put(`${endpoints.dashboard.lesson}/update`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

export const useGetLessonList = ({
  dataDecorator,
  filterData,
}: {
  dataDecorator?: (data: ILesson[]) => ILesson[];
  filterData: { subjectId: string };
}) => {
  return useQuery<ILesson[], Error>({
    queryKey: ["lessonList", filterData.subjectId],
    queryFn: () => getLessonList(filterData),
    enabled: !!filterData.subjectId,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data);
      }
      return data;
    },
  });
};

export const useCreateLesson = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateLesson) => createLesson(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["lessonList"],
      });
      toast.success("Lesson Created successfully");

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

export const useUpdateLesson = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IEditLesson) => updateLesson(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["lessonList"],
      });
      toast.success("Lesson update successfully");

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
