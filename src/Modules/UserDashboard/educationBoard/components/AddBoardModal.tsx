// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Dispatch, SetStateAction } from "react";
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm } from "react-hook-form";
// import zod from "zod";
// import { useCreateEducationBoard } from "../hooks/useEducationBoard";
// import { SubmitButton } from "@/components/custom-buttons";

// const EduBoardFormSchema = zod.object({
//   name: zod.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

// type EduBoardFormFields = zod.infer<typeof EduBoardFormSchema>;

// const AddBoardModal = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
//   const dataDecorator = (data: unknown) => {
//     setOpen(false);
//     return data;
//   };
//   const { mutate: createBoard } = useCreateEducationBoard({ dataDecorator });

//   const formMethods = useForm<EduBoardFormFields>({
//     resolver: zodResolver(EduBoardFormSchema),
//     mode: "all",
//     defaultValues: {
//       name: "",
//     },
//   });

//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting, isDirty },
//   } = formMethods;

//   const submitForm: SubmitHandler<EduBoardFormFields> = async (data) => {
//     createBoard(data);
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             <h5 className="text-center">Create New Board</h5>
//           </DialogTitle>
//         </DialogHeader>
//         <DialogDescription className="">
//           <Form {...formMethods}>
//             <form
//               onSubmit={handleSubmit(submitForm)}
//               className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
//               <FormField
//                 control={control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="Write your mobile number here"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage>{errors.name?.message}</FormMessage>
//                   </FormItem>
//                 )}
//               />

//               <div className="flex justify-center">
//                 <SubmitButton
//                   isSubmitting={isSubmitting}
//                   isDirty={isDirty}
//                 />
//               </div>
//             </form>
//           </Form>
//         </DialogDescription>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddBoardModal;
