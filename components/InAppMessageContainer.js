import {
  KnockInAppMessagesChannelProvider,
  Banner,
  Modal,
  Card,
} from "@knocklabs/react";

const InAppMessageContainer = () => {
  return (
    <KnockInAppMessagesChannelProvider
      channelId={process.env.NEXT_PUBLIC_KNOCK_IAM_CHANNEL_ID}
    >
      <Banner />
      <Modal />
      <Card />
    </KnockInAppMessagesChannelProvider>
  );
};

export default InAppMessageContainer;
