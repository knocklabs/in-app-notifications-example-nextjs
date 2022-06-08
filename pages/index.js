import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { KnockFeedProvider } from "@knocklabs/react-notification-feed";
import { IoDocument, IoLogoGithub } from "react-icons/io5";

import useIdentify from "../hooks/useIdentify";
import NotificationFeed from "../components/NotificationFeed";
import SendNotificationForm from "../components/SendNotificationForm";
import NotificationToasts from "../components/NotificationToasts";

import "@knocklabs/react-notification-feed/dist/index.css";

export default function Home() {
  const { userId, isLoading } = useIdentify();

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="100vh"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <KnockFeedProvider
      userId={userId}
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}
    >
      <Box maxW="520px" mx="auto" py={12}>
        <Flex mb={6}>
          <Box>
            <Heading size="md" mb={2}>
              React in-app notifications example
            </Heading>

            <Text>
              This is an example application to show in-app notifications{" "}
              <Link
                href="https://knock.app"
                color="blue.600"
                fontWeight="semibold"
              >
                powered by Knock
              </Link>
              .
            </Text>
          </Box>

          <Box ml="auto">
            <NotificationFeed />
          </Box>
        </Flex>

        <SendNotificationForm userId={userId} />
        <NotificationToasts />

        <Flex mt={6} borderTopWidth={1} borderTopColor="gray.100" py={2}>
          <Link
            href="https://github.com/knocklabs/in-app-notifications-example-nextjs"
            fontSize={14}
            color="gray.600"
            mr={3}
          >
            <Icon as={IoLogoGithub} mr={1} />
            Github repo
          </Link>

          <Link
            href="https://docs.knock.app/in-app-ui/react/overview"
            fontSize={14}
            color="gray.600"
          >
            <Icon as={IoDocument} mr={1} />
            Documentation
          </Link>

          <Link
            href="https://knock.app"
            fontSize={14}
            color="gray.600"
            ml="auto"
          >
            Powered by Knock
          </Link>
        </Flex>
      </Box>
    </KnockFeedProvider>
  );
}
