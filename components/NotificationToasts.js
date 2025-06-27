import { useKnockFeed } from "@knocklabs/react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

import Toast from "./Toast";

const NotificationToasts = () => {
  const { feedClient } = useKnockFeed();

  const onNotificationsReceived = useCallback(
    ({ items }) => {
      // Whenever we receive a new notification from our real-time stream, show a toast
      // (note here that we can receive > 1 items in a batch)
      items.forEach((notification) => {
        if (notification.data.showToast === false) return;

        toast("New notification received", {
          jsx: (
            <Toast
              title="New notification received"
              description={notification.blocks[0].rendered}
              status="success"
            />
          ),
          onAutoClose: () => {
            feedClient.markAsSeen(notification);
          },
          onDismiss: () => {
            feedClient.markAsSeen(notification);
          },
          position: "bottom-right",
        });
      });
    },
    [feedClient, toast],
  );

  useEffect(() => {
    // Receive all real-time notifications on our feed
    feedClient.on("items.received.realtime", onNotificationsReceived);

    // Cleanup
    return () =>
      feedClient.off("items.received.realtime", onNotificationsReceived);
  }, [feedClient, onNotificationsReceived]);

  return null;
};

export default NotificationToasts;
