import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useCallback } from "react";

import useIdentify from "../hooks/useIdentify";
import { notify } from "../lib/api";

import NotificationFeed from "../components/NotificationFeed";

import "@knocklabs/react-notification-feed/dist/index.css";

export default function Home() {
  const { userId, isLoading } = useIdentify();

  const sendNotification = useCallback(
    async (inputs) => {
      return await notify({
        message: "Some new message",
        type: "feed",
        userId,
      });
    },
    [userId]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Flex>
      <Box>
        <Text>User ID: {userId}</Text>

        <Button onClick={sendNotification}>Send notification</Button>

        <NotificationFeed userId={userId} />
      </Box>
    </Flex>
  );
}
