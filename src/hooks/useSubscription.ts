import { ISubscriptionResponse } from "./../interfaces/subscription.interface";
import { endpoints } from "@/configs/config";
import { IPackage, ISubscription, ISubscriptionPackagePayload } from "@/interfaces/subscription.interface";
import axiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

// interface SubscriptionQuery {
//   type: "all" | "active";
// }

// interface SubscriptionSort {
//   sortField: string;
//   sortOrder: number;
// }

interface SubscriptionFilter {
  query: object;
  sortField: keyof IPackage;
  sortOrder: number;
}

interface ISubscriptionFullRes {
  data: ISubscriptionResponse[];
  total: number;
}

const fetchSubscriptionPackage = async (): Promise<IPackage[]> => {
  return (
    await axiosInstance.post(
      `${endpoints.dashboard.subscriptionPackage}/get-package-list`,
      {
        query: {
          type: "active", // all | active
        },
        sortField: "packagePrice",
        sortOrder: -1,
      },
      {
        headers: {
          ...axiosInstance.defaults.headers.common,
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    )
  ).data;
};

const fetchAdminSubscriptionList = async (payload: SubscriptionFilter): Promise<ISubscriptionFullRes> => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.subscription}/get-admin-subscription-list`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data[0];
};

const fetchUserSubscriptionList = async (payload: SubscriptionFilter): Promise<ISubscriptionFullRes> => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.subscription}/get-my-subscription-list`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data[0];
};

const packageBuyRequest = async (payload: ISubscriptionPackagePayload): Promise<ISubscription> => {
  return (
    await axiosInstance.post(`${endpoints.dashboard.subscription}/request-for-subscription`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data;
};

const updatePaymentStatus = async (payload: {
  subscriptionId: string;
  updateStatus: string;
}): Promise<ISubscription> => {
  return (
    await axiosInstance.put(`${endpoints.dashboard.subscription}/update-payment-status`, payload, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
  ).data;
};

// const updateSubscriptionPackage = async ({ _id, ...restPayload }) => {
//   const res = await axiosInstance.put(`${endpoints.dashboard.class}update/${_id}`, restPayload, {
//     headers: {
//       ...axiosInstance.defaults.headers.common,
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//   });
//   return res.data;
// };

export const useGetSubscriptionPackageList = ({
  //   boardId,
  dataDecorator,
}: {
  //   boardId: string | undefined;
  dataDecorator?: (data: unknown) => unknown;
}) => {
  return useQuery<IPackage[], Error>({
    queryKey: ["subscription-package-list"],
    queryFn: () => fetchSubscriptionPackage(),
    //     enabled: !!boardId,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as IPackage[];
      }
      return data;
    },
  });
};

export const useGetUserSubscriptionList = ({
  approveStatus,
  dataDecorator,
}: {
  approveStatus: "all" | "approved" | "pending" | "rejected";
  dataDecorator?: (data: unknown) => unknown;
}) => {
  return useQuery<ISubscriptionFullRes, Error>({
    queryKey: ["user-subscription-list", approveStatus],
    queryFn: () =>
      fetchUserSubscriptionList({
        query: {
          approvedStatus: approveStatus,
        },
        sortField: "packagePrice",
        sortOrder: -1,
      }),
    enabled: !!approveStatus,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as ISubscriptionFullRes;
      }
      return data;
    },
  });
};

export const useGetAdminSubscriptionList = ({
  approveStatus,
  dataDecorator,
}: {
  approveStatus: "all" | "approved" | "pending" | "rejected";
  dataDecorator?: (data: unknown) => unknown;
}) => {
  return useQuery<ISubscriptionFullRes, Error>({
    queryKey: ["admin-subscription-list", approveStatus],
    queryFn: () =>
      fetchAdminSubscriptionList({
        query: {
          approvedStatus: approveStatus,
        },
        sortField: "packagePrice",
        sortOrder: -1,
      }),
    enabled: !!approveStatus,
    select: (data) => {
      if (dataDecorator) {
        return dataDecorator(data) as ISubscriptionFullRes;
      }
      return data;
    },
  });
};

export const usePackageBuyRequest = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ISubscriptionPackagePayload) => packageBuyRequest(payload),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["subscription-package-list"],
      // });

      if (data.packageType === "free") {
        toast.success("Free Package taken successfully");
      } else {
        toast.success("Subscription Package buy request successfully");
      }
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

// export const useUpdateSubscriptionPackage = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: any) => updateSubscriptionPackage(payload),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: ["subscription-package-list"],
//       });

//       toast.success("Subscription Package update successfully");
//       if (dataDecorator) {
//         return dataDecorator(data);
//       }

//       return data;
//     },
//     onError: (error) => {
//       toast.error(error.message);
//       throw new Error(error.message);
//     },
//   });
// };

export const useUpdatePaymentStatus = ({ dataDecorator }: { dataDecorator?: (data: unknown) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { subscriptionId: string; updateStatus: string }) => updatePaymentStatus(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-subscription-list"],
      });

      toast.success("Payment status updated successfully");
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
