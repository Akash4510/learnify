import { DashboardPageTitle } from "@/components/dashboard/page-title";
import { CreateChannelForm } from "@/components/dashboard/channel/create-channel-form";

const CreateChannelPage = () => {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <DashboardPageTitle
        title="Create a new channel"
        subtitle="Create a new channel, add make courses and spread your knowledge to the whole world"
      />

      <CreateChannelForm />
    </div>
  );
};

export default CreateChannelPage;
