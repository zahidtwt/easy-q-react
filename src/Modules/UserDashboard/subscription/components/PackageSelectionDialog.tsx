import * as React from "react";
import "./PackageSelectionDialog.css";
// import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  //   DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPackage, ISubscriptionPackagePayload } from "@/interfaces/subscription.interface";
import { Slider } from "@/components/ui/slider";
import { debounce } from "lodash";
import { useCallback } from "react";

export function PackageSelectionDialog({
  isOpen,
  updateDialogState,
  selectedPackage,
  buyRequest,
}: {
  isOpen: boolean;
  updateDialogState: (state: boolean) => void;
  selectedPackage: IPackage | null;
  buyRequest: (payload: ISubscriptionPackagePayload) => void;
}) {
  //   const [open, setOpen] = React.useState(false);
  //   const isDesktop = useMediaQuery("(min-width: 768px)");
  const isDesktop = false;
  const maxNumber = 200;
  const [tnxId, setTnxId] = React.useState("");
  const [sliderValue, setSliderValue] = React.useState(0);

  const debouncedSetSliderValue = debounce((value) => {
    setSliderValue(value[0]);
  }, 300);

  const handleValueChange = useCallback(
    (value: number[]) => {
      debouncedSetSliderValue(value);
    },
    [debouncedSetSliderValue]
  );

  const submitBtn = () => {
    buyRequest({
      tnxId: tnxId,
      packageId: selectedPackage?._id || "",
      questionSetQuantity:
        selectedPackage?.packageType === "custom" ? sliderValue : selectedPackage?.questionSetQuantity || 0,
    });
    setTnxId("");
  };

  if (isDesktop) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={() => updateDialogState(!isOpen)}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
          </DialogHeader>
          {/* <ProfileForm /> */}
        </DialogContent>
      </Dialog>
    );
  }

  if (selectedPackage?.packageType === "custom") {
    return (
      <Drawer
        open={isOpen}
        onOpenChange={() => updateDialogState(!isOpen)}>
        <DrawerContent>
          <div className="flex justify-center">
            <div className="max-w-[500px] w-full">
              <DrawerHeader className="text-left">
                <DrawerTitle>{selectedPackage?.packageName}</DrawerTitle>
                <DrawerDescription>{selectedPackage?.description}</DrawerDescription>
              </DrawerHeader>

              <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200 mb-4">
                {/* Circular Progress */}
                <div className="flex justify-center items-center mb-4">
                  <div className="relative w-20 h-20">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 36 36">
                      {/* Background circle */}
                      <path
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      {/* Dynamic progress */}
                      <path
                        className="text-pink-500 transition-all duration-500 ease-in-out"
                        strokeWidth="4"
                        strokeDasharray={`${(sliderValue / maxNumber) * 100}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">{maxNumber}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mb-4">প্রশ্ন সংখ্যা</p>

                <Slider
                  className="mb-4"
                  defaultValue={[0]}
                  max={maxNumber}
                  step={1}
                  onValueChange={(value) => handleValueChange(value)}
                />

                <div className="flex justify-between items-center">
                  <span>Payment amount</span>
                  <span>
                    {selectedPackage?.perQuestionSetPrice} TK * {sliderValue} set ={" "}
                    {selectedPackage?.perQuestionSetPrice * sliderValue}
                    TK
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 px-4">
                <div>
                  <Label htmlFor="TnxId">Purchasing TnxId</Label>
                  <Input
                    type="text"
                    id="TnxId"
                    value={tnxId}
                    onChange={(e) => setTnxId(e.target.value)}
                  />
                </div>
              </div>
              <DrawerFooter className="pt-2">
                <button
                  disabled={!tnxId || tnxId.length < 5}
                  onClick={() => submitBtn()}
                  className={`w-full mt-6 border-2 border-pink-600 font-bold py-2 px-4 rounded-full bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50`}>
                  Continue
                </button>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={() => updateDialogState(!isOpen)}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        {/* <DrawerHeader className="text-left">
          <DrawerTitle>{selectedPackage?.packageName}</DrawerTitle>
          <DrawerDescription>{selectedPackage?.description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}

        <div className="flex justify-center">
          <div className="max-w-[500px] w-full">
            <DrawerHeader className="text-left">
              <DrawerTitle>{selectedPackage?.packageName}</DrawerTitle>
              <DrawerDescription>{selectedPackage?.description}</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-2 px-4">
              <div className="flex justify-between items-center">
                <span>Payment amount</span>
                <span>{selectedPackage?.packagePrice} TK</span>
              </div>
              <div>
                <Label htmlFor="TnxId">Purchasing TnxId</Label>
                <Input
                  type="text"
                  id="TnxId"
                  value={tnxId}
                  onChange={(e) => setTnxId(e.target.value)}
                />
              </div>
            </div>
            <DrawerFooter className="pt-2">
              <button
                disabled={!tnxId || tnxId.length < 5}
                onClick={() => submitBtn()}
                className={`w-full mt-6 border-2 border-pink-600 font-bold py-2 px-4 rounded-full bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50`}>
                Continue
              </button>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
