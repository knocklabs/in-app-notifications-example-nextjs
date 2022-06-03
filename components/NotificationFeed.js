import {
  KnockFeedProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react-notification-feed";

import { useState, useRef } from "react";

const NotificationFeed = ({ userId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <KnockFeedProvider
      userId={userId}
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}
    >
      <>
        <NotificationIconButton
          ref={notifButtonRef}
          onClick={(e) => setIsVisible(!isVisible)}
        />
        <NotificationFeedPopover
          buttonRef={notifButtonRef}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </>
    </KnockFeedProvider>
  );
};

export default NotificationFeed;
