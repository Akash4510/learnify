import { Heading } from "@/components/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const WhyUPIND = () => {
  return (
    <div className="my-10 md:mt-20 space-y-4 md:space-y-6">
      <div className="lg:text-center">
        <Heading
          title="Why Choose LearnUPIND"
          titleClassName="lg:text-4xl font-medium tracking-normal"
          subtitle="Level up your career with Learnupind Industry-leading training programs and expert guidance for success"
          subtitleClassName="lg:text-base"
        />
      </div>

      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="uppercase">
              1. Top Notch Courses
            </AccordionTrigger>
            <AccordionContent>
              Keep oneself up to date with the most recent market trends because
              of the fierce rivalry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="uppercase">
              2. Courses Certificate
            </AccordionTrigger>
            <AccordionContent>
              Keep oneself up to date with the most recent market trends because
              of the fierce rivalry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="uppercase">
              3. Online Quizzes
            </AccordionTrigger>
            <AccordionContent>
              Keep oneself up to date with the most recent market trends because
              of the fierce rivalry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="uppercase">
              4. Professional system
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
