import {
  KnockFeedProvider,
  NotificationFeed,
  NotificationIconButton,
} from "@knocklabs/react";

import { Box, Stack } from "@telegraph/layout";

import { useState, useRef } from "react";
import TabbedNotificationFeed from "./TabbedNotificationFeed/TabbedNotificationFeed";
import NotificationToasts from "./NotificationToasts";

const KnockNotificationFeed = ({ tenant }) => {
  const notifButtonRef = useRef(null);

  return (
    <KnockFeedProvider
      feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}
      defaultFeedOptions={{ tenant }}
    >
      <Stack display="flex" direction="column" style={{ width: "420px" }}>
        <Box ml="auto">
          <NotificationIconButton
            ref={notifButtonRef}
            badgeCountType="unread"
          />
        </Box>
        <Box
          mt="2"
          style={{
            height: "450px",
            borderColor: "var(--tgph-gray-4)",
            borderWidth: 1,
          }}
        >
          <NotificationFeed
            onNotificationButtonClick={(item, action) => {
              window.alert(`Notification button clicked: ${action.label}`);
            }}
          />
        </Box>

        <NotificationToasts />
      </Stack>
    </KnockFeedProvider>
  );
};

export default KnockNotificationFeed;
