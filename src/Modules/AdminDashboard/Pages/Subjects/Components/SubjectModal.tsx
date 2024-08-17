import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import SubjectForm from "./SubjectForm";

interface AddSubjectModalProps<T> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  contentType: string; // 'subject' | 'question_category' | 'lesson'
  contentInitialValues?: T;
}

const SubjectModal = <T,>({ open, setOpen, contentType, contentInitialValues }: AddSubjectModalProps<T>) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Subject Details</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          {contentType === "subject" &&
            (contentInitialValues ? <SubjectForm initialValues={contentInitialValues} /> : <SubjectForm />)}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectModal;
