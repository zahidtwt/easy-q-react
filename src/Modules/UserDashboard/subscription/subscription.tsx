import { Button } from "@/components/ui/button";
import { useGetSubscriptionPackageList, usePackageBuyRequest } from "@/hooks/useSubscription";
import { ChevronLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PackageSelectionDialog } from "./components/PackageSelectionDialog";
import { useState } from "react";
import { IPackage } from "@/interfaces/subscription.interface";

const Subscription = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IPackage | null>(null);

  const dataDecorator = (data: unknown) => {
    navigate("/profile");
    setOpen(false);
    return data;
  };

  const { isLoading, data: packageList } = useGetSubscriptionPackageList({});
  const { mutate: buyRequest, isPending: buyRequestLoading } = usePackageBuyRequest({ dataDecorator });

  const selectPackage = (plan: IPackage) => {
    // console.log(plan);
    setSelectedPackage(plan);
    if (plan.packageType === "free") {
      buyRequest({ tnxId: "123456", packageId: plan._id, questionSetQuantity: plan.questionSetQuantity });
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={`shadow-lg rounded-lg p-6 relative ${buyRequestLoading ? "overflow-hidden h-[93.4vh]" : ""}`}>
      <div
        className={`absolute top-0 left-0 h-[100vh] w-full bg-gray-500 bg-opacity-50 z-[1] ${buyRequestLoading ? "block" : "hidden"}`}>
        <div className="flex justify-center items-center h-full w-full">
          <p>loading ...</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-2">
        <Button
          variant="ghost"
          color="primary"
          onClick={() => navigate(-1)}
          className="p-2 rounded-full">
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Subscription</h1>
      </div>

      <p className="text-gray-500 my-4">Select Package</p>

      {isLoading ? (
        <div>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 mb-4 border-2 rounded-lg animate-pulse bg-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-6 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded mt-1 w-48"></div>
                </div>
                <div>
                  <div className="h-6 bg-gray-300 rounded w-12"></div>
                </div>
              </div>
              <div className="mt-2 inline-block px-3 py-1 text-xs bg-gray-300 rounded-full w-24 h-6"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {packageList &&
            packageList.length &&
            packageList.map((plan) => (
              <div
                key={plan._id}
                className={`p-4 border-2 rounded-lg  bg-white shadow-md relative ${plan.recommended ? "border-orange-400" : "border-gray-200"}`}>
                {plan.recommended && (
                  <div className="absolute top-[-14px] left-0 w-full">
                    <div className="flex justify-center items-center">
                      <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full flex gap-2 items-center">
                        <Star size={14} />
                        Recommended
                      </span>
                    </div>
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2">{plan.packageName}</h2>
                <p className="text-green-600 text-2xl font-bold">
                  Tk {plan.packageType === "custom" ? plan.perQuestionSetPrice : plan.packagePrice}
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="mr-2 text-yellow-400">✔</span>
                      প্রশ্ন সংখ্যা ২৪০ সেট (সর্বোচ্চ ৩০০ সেট পর্যন্ত)
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-yellow-400">✔</span>
                      প্রতি সেট ৫ টাকা
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-yellow-400">✔</span>
                      মেয়াদ ১ বছর
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => selectPackage(plan)}
                  className={`w-full mt-6 border-2 border-pink-600 font-bold py-2 px-4 rounded-full ${plan.recommended ? "bg-pink-600 hover:bg-pink-700 text-white" : "text-pink-600 hover:text-white hover:bg-pink-600"}`}>
                  Continue
                </button>
              </div>
            ))}
        </div>
      )}

      <PackageSelectionDialog
        isOpen={open}
        updateDialogState={(state) => setOpen(state)}
        selectedPackage={selectedPackage}
        buyRequest={buyRequest}
      />
    </div>
  );
};

export default Subscription;
