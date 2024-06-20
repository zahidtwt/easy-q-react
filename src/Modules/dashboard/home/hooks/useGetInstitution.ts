import { endpoints } from "@/configs/config";
import axiosInstance from "@/utils/axios";
import { errorHandler } from "@/utils/errorHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

type InstituteType = {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  // educationBoardId: string;
  educationBoardIds: string[];
  classes: string[];
  userId: string;
};

const apiCallingFunc = async () => {
  return (
    await axiosInstance.get(endpoints.dashboard.getAllInstitute, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const getInstituteDetail = async (id: string) => {
  return (
    await axiosInstance.get(`${endpoints.dashboard.getAllInstitute}${id}`, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

const createInstitute = async (payload: InstituteType) => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.getAllInstitute}`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common, // Merge existing common headers
        Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization header
      },
    })
  ).data;
};

// const useGetInstitution = ({ Id, dataDecorator }: { Id?: string; dataDecorator?: (data: unknown) => void }) => {
const useGetInstitution = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  return useQuery({
    queryKey: ["madrasaList"],
    queryFn: () => apiCallingFunc(),
    // enabled: !!Id,
    staleTime: 10000,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data);
      }
      return data;
    },
  });
};

export const useGetInstitutionDetail = ({
  id,
  dataDecorator,
}: {
  id: string;
  dataDecorator?: (data: unknown) => void;
}) => {
  return useQuery({
    queryKey: ["madrasaDetail", id],
    queryFn: () => getInstituteDetail(id),
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

export const useCreateInstitute = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: InstituteType) => createInstitute(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["madrasaList"],
      });

      if (dataDecorator) {
        return dataDecorator(data);
      }

      return data;
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
      return error;
    },
  });
};

export default useGetInstitution;
