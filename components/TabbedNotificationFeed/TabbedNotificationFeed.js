import {
  BellIcon,
  formatBadgeCount,
  useKnockClient,
  useNotifications,
} from "@knocklabs/react";
import { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@telegraph/layout";
import create from "zustand";

import { PageType } from "./constants";
import Feed from "./Feed";

function pageTypeToStatus(pageType) {
  switch (pageType) {
    case PageType.All:
      return "all";
    case PageType.New:
      return "unread";
    case PageType.Archived:
      return undefined;
  }
}

const UNARCHIVED_TYPES = [PageType.All, PageType.New];

const TabbedNotificationFeed = ({ tenant }) => {
  const [currentPageType, setCurrentPageType] = useState(PageType.All);
  const containerRef = useRef(null);

  const knockClient = useKnockClient();

  const archivedFeed = useNotifications(
    knockClient,
    process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID,
    { status: "all", archived: "only", tenant }
  );

  const regularFeed = useNotifications(
    knockClient,
    process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID,
    { status: pageTypeToStatus(currentPageType), archived: "exclude", tenant }
  );

  useEffect(() => {
    if (UNARCHIVED_TYPES.includes(currentPageType)) {
      regularFeed.fetch({ status: pageTypeToStatus(currentPageType), tenant });
    } else {
      archivedFeed.fetch({ tenant });
    }
  }, [currentPageType, regularFeed, archivedFeed, tenant]);

  const { metadata } = create(regularFeed.store)();

  return (
    <Stack display="flex" direction="column" style={{ width: "420px" }}>
      <Box ml="auto">
        <button
          className={`rnf-notification-icon-button`}
          role="button"
          aria-label="Open notification feed"
        >
          <BellIcon />

          {metadata.unread_count !== 0 && (
            <div className="rnf-unseen-badge">
              <span className="rnf-unseen-badge__count">
                {formatBadgeCount(metadata.unread_count)}
              </span>
            </div>
          )}
        </button>
      </Box>
      <Box
        mt="2"
        style={{
          height: "450px",
          borderColor: "var(--tgph-gray-4)",
          borderWidth: 1,
        }}
      >
        <Feed
          key={`${currentPageType}-${tenant}`}
          feedClient={
            UNARCHIVED_TYPES.includes(currentPageType)
              ? regularFeed
              : archivedFeed
          }
          currentPageType={currentPageType}
          setCurrentPageType={setCurrentPageType}
          containerRef={containerRef}
          onNotificationButtonClick={(item, action) => {
            window.alert(`Notification button clicked: ${action.label}`);
          }}
        />
      </Box>
    </Stack>
  );
};

export default TabbedNotificationFeed;
