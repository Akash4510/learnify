"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { createOrder } from "@/actions/course/checkout";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseId,
  price,
}: CourseEnrollButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const confetti = useConfettiStore();

  const onClick = async () => {
    startTransition(() => {
      createOrder({ courseId })
        .then((data) => {
          const { error, success } = data;

          if (error) {
            toast.error(error.message);
          }
          if (success) {
            const { order, metadata } = success;

            const paymentData = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              amount: price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "LearnUPIND", // The company name
              description: "Course Enrollment", // A description of the product
              image: "/logo.png", // Company logo
              order_id: order.id,
              handler: async function (response: any) {
                try {
                  // Verify the payment
                  const verifyRes = await fetch(
                    `/api/course/${courseId}/verify-order`,
                    {
                      method: "POST",
                      body: JSON.stringify({
                        orderId: order.id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                        userId: metadata.userId,
                      }),
                    }
                  );

                  const verifyData = await verifyRes.json();

                  console.log(verifyData);

                  if (verifyData.error) {
                    toast.error(verifyData.error.message);
                  } else {
                    toast.success("Payment successful");
                    confetti.onOpen();
                    router.refresh();
                  }
                } catch (error) {
                  console.log({ paymentHandlerError: error });
                  toast.error("Something went wrong!");
                }
              },
            };

            const rzp = new (window as any).Razorpay(paymentData);
            rzp.open();
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <Button
      size="sm"
      className={cn("w-full md:w-auto", isPending && "md:w-32")}
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        `Enroll for ${formatPrice(price)}`
      )}
    </Button>
  );
};
