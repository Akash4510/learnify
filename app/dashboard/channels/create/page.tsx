import { Heading } from "@/components/heading";
import { CreateChannelForm } from "@/components/dashboard/channel/create-channel-form";
import { NavigateBack } from "@/components/navigate-back";

const CreateChannelPage = () => {
  return (
    <div className="space-y-6">
      <NavigateBack href="/dashboard/channels" label="Back to channels" />

      <div className="space-y-8">
        <Heading
          title="Create a new channel"
          subtitle="Create a new channel, add make courses and spread your knowledge to the whole world"
        />

        <CreateChannelForm />
      </div>
    </div>
  );
};

export default CreateChannelPage;
