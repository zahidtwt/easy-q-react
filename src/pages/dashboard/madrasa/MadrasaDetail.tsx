import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useGetMadrasaDetail from "./hooks/useGetMadrasaDetail";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  mobile: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const MadrasaDetail = () => {
  const { id } = useParams();

  const { isLoading } = useGetMadrasaDetail({ Id: id });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      mobile: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    toast.success(data.email);
  }

  if (isLoading) {
    return <p> loading ...</p>;
  }

  return (
    <div className="p-3">
      <div className="grid grid-cols-12 gap-2 items-center mb-5">
        <div className="col-span-3">
          <Avatar className="size-[100%] rounded-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{"Ja".toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-9 grid ">
          <h3 className="text-center font-semibold text-xl mb-1">Jamia Islamia Rowjatul Ulum Madrasa</h3>
          <small className="text-center text-gray-500">Hat Govindpur, Faridpur</small>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="col-span-12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="abcd..@.mail.com"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage>{form?.formState?.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="col-span-12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="01......"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form?.formState?.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="col-span-12">
          <div className="w-full flex justify-between items-center mb-2">
            <p className="font-medium text-xl">Education Board</p>
            <button className="flex justify-center align-middle px-2 py-1 bg-red-400 rounded-lg">
              <Plus size={18} />
              <small className="ml-1">New Board</small>
            </button>
          </div>

          <div className="w-full border-2 border-spacing-1 border-gray-50 rounded-md min-h-10">
            <div className="flex flex-wrap gap-3 p-2">
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name Name Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="w-full flex justify-between items-center mb-2">
            <p className="font-medium text-xl">Classes</p>
            <button className="flex justify-center align-middle px-2 py-1 bg-red-400 rounded-lg">
              <Plus size={18} />
              <small className="ml-1">New Class</small>
            </button>
          </div>
          <div className="w-full border-2 border-spacing-1 border-gray-50 rounded-md min-h-10">
            <div className="flex flex-wrap gap-3 p-2">
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
              <div className="flex border-2 border-red-500 col-auto rounded-full p-1">
                <p>Board Name</p>
                <div className="rounded-full border-2 border-red-500 ml-1">
                  <X size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MadrasaDetail;
