import { endpoints } from "@/configs/config";
import { IClassRes, ICreateClassPayload, IEditClassPayload } from "@/interfaces/class.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const fetchClassList = async (boardId: string | undefined) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.class}?boardId=${boardId}`, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data;
};

const fetchClassDetails = async (id?: string) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.class}${id}`, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data;
};

const createNewClass = async (payload: ICreateClassPayload) => {
  const res = await axiosInstance.post(`${endpoints.dashboard.class}create`, payload, {
    headers: {
      ...axiosInstance.defaults.headers.common,
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data;
};

const updateClass = async ({ _id, ...restPayload }: IEditClassPayload) => {
  const res = await axiosInstance.put(`${endpoints.dashboard.class}update/${_id}`, restPayload, {
    headers: {
      ...axiosInstance.defaults.headers.common,
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res.data;
};

const updateSubjectListOfClass = async ({ _id, subjectList }: { _id: string; subjectList: string[] }) => {
  const res = await axiosInstance.put(
    `${endpoints.dashboard.class}update-subject-list/${_id}`,
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

export const useGetClassList = ({
  boardId,
  dataDecorator,
}: {
  boardId: string | undefined;
  dataDecorator?: (data: unknown) => unknown;
}) => {
  return useQuery<IClassRes[], Error>({
    queryKey: ["classList"],
    queryFn: () => fetchClassList(boardId),
    enabled: !!boardId,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IClassRes[];
      }
      return data;
    },
  });
};

export const useGetClassDetail = ({
  dataDecorator,
  id,
}: {
  dataDecorator?: (data: IClassRes) => IClassRes;
  id?: string;
}) => {
  return useQuery<IClassRes, Error>({
    queryKey: ["class-detail"],
    queryFn: () => fetchClassDetails(id),
    enabled: !!id,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IClassRes;
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
    onError: (error) => {
      toast.error(error.message);
      throw new Error(error.message);
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
    onError: (error) => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });
};

export const useUpdateSubjectListOfClass = ({ dataDecorator }: { dataDecorator?: (data: IClassRes) => IClassRes }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { _id: string; subjectList: string[] }) => updateSubjectListOfClass(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["class-detail"],
      });

      toast.success("Subject List update successfully");
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
