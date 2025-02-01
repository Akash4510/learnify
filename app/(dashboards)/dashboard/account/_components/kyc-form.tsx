"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { KYC } from "@prisma/client";

import { KYCSchema } from "@/schemas/kyc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { createKYC, updateKYC } from "@/actions/kyc";

interface KYCFormProps {
  initialData?: KYC;
}

export const KYCForm = ({ initialData }: KYCFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<KYCSchema>({
    resolver: zodResolver(KYCSchema),
    defaultValues: {
      dob: initialData?.dob ? new Date(initialData.dob) : undefined,
      aadhaarNumber: initialData?.aadhaarNumber || "",
      bankAccountNumber: initialData?.bankAccountNumber || "",
      bankIfscCode: initialData?.bankIfscCode || "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: KYCSchema) => {
    startTransition(() => {
      if (initialData) {
        updateKYC(values)
          .then((data) => {
            const { error, success } = data;

            if (success) {
              toast.success(success.message);
            }
            if (error) {
              toast.error(error.message);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Something went wrong!");
          });
      } else {
        createKYC(values)
          .then((data) => {
            const { error, success } = data;

            if (success) {
              toast.success(success.message);
            }
            if (error) {
              toast.error(error.message);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Something went wrong!");
          });
      }
    });
  };

  const text = initialData ? "Update" : "Complete";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-bold">{text} your KYC details</h1>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Personal Details</h3>
            <p className="text-sm text-muted-foreground">
              Please provide your personal details as per your government ID.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 
            Personal Details:
              1. Rirst Name
              2. Last Name
              3. Email
              4. Age
              5. Gender
              6. Date of Birth
              7. Phone Number
            
            Address:
              3. Country
              4. State

            Bank Details:
              8. Bank Name
              9. Bank Account Number
              10. IFSC Code
              11. Account Holder Name
              12. UPI ID
            */}

            <FormField
              control={control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Bank Details</h3>
            <p className="text-sm text-red-400">
              Please make sure you are entering the correct bank details. This
              will affect your payouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="bankAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bankIfscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="min-w-32">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            `${text} KYC`
          )}
        </Button>
      </form>
    </Form>
  );
};
