import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  madrasaName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  madrasaAddress: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  mobile: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type formValuesType = z.infer<typeof FormSchema>;

const MadrasaForm = ({
  editable,
  defaultValues,
  updateMadrasaDetail,
}: {
  editable: boolean;
  defaultValues: formValuesType;
  updateMadrasaDetail: () => void;
}) => {
  const form = useForm<formValuesType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: formValuesType) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    updateMadrasaDetail();
    toast.success(data.email);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3">
          {editable && (
            <>
              <FormField
                control={form.control}
                name="madrasaName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Madrasa Name</FormLabel>
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

              <FormField
                control={form.control}
                name="madrasaAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Madrasa Address</FormLabel>
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
            </>
          )}

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
                    disabled={!editable}
                  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage>{form?.formState?.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

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
                    disabled={!editable}
                  />
                </FormControl>
                <FormMessage>{form?.formState?.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          {editable && (
            <div className="flex justify-center">
              <Button className="bg-green-500">
                <input type="submit" />
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default MadrasaForm;
