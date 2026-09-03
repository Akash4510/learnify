import { Heading } from "@/components/heading";

const DisclaimerPage = () => {
  return (
    <div className="p-4 pt-5 pb-12 md:pb-20 space-y-5">
      <Heading
        title="Disclaimer"
        titleClassName="uppercase"
        subtitle="Read This to Understand Our Limitations and Responsibilities Before Using Our Services"
        subtitleClassName="text-base"
      />

      <div className="leading-7">
        <p>Disclaimer content goes here.</p>
      </div>
    </div>
  );
};

export default DisclaimerPage;
