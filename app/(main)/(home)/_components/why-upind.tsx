import { Heading } from "@/components/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export const WhyUPIND = () => {
  return (
    <div className="my-10 md:mt-20 space-y-4 md:space-y-6 p-4">
      <div className="lg:text-center">
        <Heading
          title="Why Choose Learnify"
          titleClassName="lg:text-4xl font-medium tracking-normal"
          subtitle="Level up your career with Learnify Industry-leading training programs and expert guidance for success"
          subtitleClassName="lg:text-base"
        />
      </div>

      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="uppercase">
              <div className="flex items-center gap-2">
                <div className="bg-accent/60 p-1 rounded-md aspect-square">
                  <Image
                    src="/images/courses.png"
                    alt="Top Notch Courses"
                    quality={100}
                    width={65}
                    height={65}
                    className="rounded-md aspect-square"
                  />
                </div>
                1. Top Notch Courses
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Keep oneself up to date with the most recent market trends because
              of the fierce rivalry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="uppercase">
              <div className="flex items-center gap-2">
                <div className="bg-accent/60 p-1 rounded-md aspect-square">
                  <Image
                    src="/images/certificate.png"
                    alt="Courses Certificate"
                    quality={100}
                    width={65}
                    height={65}
                    className="rounded-md aspect-square"
                  />
                </div>
                2. Courses Certificate
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Keep oneself up to date with the most recent market trends because
              of the fierce rivalry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="uppercase">
              <div className="flex items-center gap-2">
                <div className="bg-accent/60 p-1 rounded-md aspect-square">
                  <Image
                    src="/images/quiz.png"
                    alt="Online Quizzes"
                    quality={100}
                    width={65}
                    height={65}
                    className="rounded-md aspect-square"
                  />
                </div>
                3. Online Quizzes
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Keep oneself up to date with the most recent market trends because
              of the fierce rivalry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="uppercase">
              <div className="flex items-center gap-2">
                <div className="bg-accent/60 p-1 rounded-md aspect-square">
                  <Image
                    src="/images/professional-system.png"
                    alt="Professional system"
                    quality={100}
                    width={65}
                    height={65}
                    className="rounded-md aspect-square"
                  />
                </div>
                4. Professional system
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Keep oneself up to date with the most recent market trends because
              of the fierce rivalry.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
