import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import { Button } from "@/components/ui/button";
import SpinningLoader from "@/components/loader";
import { useAddSubject, useUpdateSubject } from "@/hooks/useSubject";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Clip from "@/components/Clip";
import { IEditSubjectPayload } from "@/interfaces/subject.interface";

// type Field = {
//   value: string[];
//   onChange: (newValue: string[]) => void;
// };

const SubjectDetailFormSchema = zod.object({
  name: zod.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  code: zod.string().min(2, {
    message: "code must be at least 2 characters.",
  }),
  // questionCategory: zod.array(zod.string()).nonempty({
  //   message: "questionCategory must be at least 1 characters.",
  // }),
  // active should be either active or inactive
  active: zod.enum(["active", "inactive"]),
});

type SubjectDetailFormFields = zod.infer<typeof SubjectDetailFormSchema>;

const SubjectDetailFormModal = ({
  open,
  setOpen,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues?: IEditSubjectPayload;
}) => {
  const formMethods = useForm<SubjectDetailFormFields>({
    resolver: zodResolver(SubjectDetailFormSchema),
    mode: "all",
    defaultValues: initialValues || {
      name: "",
      code: "",
      // questionCategory: [],
      active: "active",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = formMethods;

  const dataDecorator = (data: unknown) => {
    setOpen(false);
    reset();
    return data;
  };

  const { mutate: createSubject } = useAddSubject({ dataDecorator });
  const { mutate: updateSubject } = useUpdateSubject({ dataDecorator });

  // const [inputValue, setInputValue] = useState("");

  // const handleAddBadge = (value: string, field: Field) => {
  //   if (value && !field.value.includes(value)) {
  //     field.onChange([...field.value, value]);
  //     setInputValue("");
  //   } else {
  //     // throw new Error("Category already exists");
  //   }
  // };

  // const handleRemoveBadge = (value: string, field: Field) => {
  //   if (value && field.value.includes(value)) {
  //     field.onChange(field.value.filter((badge) => badge !== value));
  //     // setInputValue("");
  //   }
  // };

  const submitForm: SubmitHandler<SubjectDetailFormFields> = async (data) => {
    if (initialValues) {
      updateSubject({ ...data, _id: initialValues._id });
    } else {
      createSubject({ ...data });
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        reset();
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h5 className="text-center">Subject Details</h5>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4 sm:space-y-6 p-1 w-[300px] sm:w-[350px] lg:w-[450px]">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Subject Name here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Subject Code here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.code?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors.active?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* <FormField
                control={control}
                name="questionCategory"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Question Category here..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddBadge(inputValue, field);
                          e.preventDefault();
                        }
                      }}
                      onBlur={() => handleAddBadge(inputValue, field)}
                    />

                    <div className="flex gap-2 flex-wrap">
                      {field?.value.map((badge) => (
                        <Clip
                          key={badge}
                          name={badge}
                          borderColor={"border-red-400"}
                          bgColor={"bg-red-400"}
                          func={() => handleRemoveBadge(badge, field)}
                        />
                      ))}
                    </div>
                    <FormMessage>{errors.questionCategory?.message}</FormMessage>
                  </FormItem>
                )}
              /> */}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="mt-4 cursor-pointer"
                  disabled={isSubmitting || !isDirty}>
                  {isSubmitting ? (
                    <div className="mr-2">
                      <SpinningLoader />
                    </div>
                  ) : null}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDetailFormModal;
