import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import { IoDocument, IoLogoGithub } from "react-icons/io5";

import useIdentify from "../hooks/useIdentify";
import NotificationFeed from "../components/NotificationFeed";
import SendNotificationForm from "../components/SendNotificationForm";
import NotificationToasts from "../components/NotificationToasts";
import { useState } from "react";

const Tenants = {
  TeamA: "team-a",
  TeamB: "team-b",
};

const TenantLabels = {
  [Tenants.TeamA]: "Team A",
  [Tenants.TeamB]: "Team B",
};

export default function Home() {
  const { userId, isLoading } = useIdentify();
  const [tenant, setTenant] = useState(Tenants.TeamA);

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
    <KnockProvider
      userId={userId}
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
    >
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}
        defaultFeedOptionsFeedClientOptions={tenant}
      >
        <Box maxW="520px" mx="auto" py={12}>
          <Flex mb={8}>
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
          </Flex>
          <Flex>
            <Heading size="sm" mb={3}>
              Send an in-app notification
            </Heading>
            <Flex ml="auto" alignItems="center">
              <Select
                mr={3}
                size="sm"
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
              >
                {Object.values(Tenants).map((tenant) => (
                  <option key={tenant} value={tenant}>
                    {TenantLabels[tenant]}
                  </option>
                ))}
              </Select>
              <NotificationFeed />
            </Flex>
          </Flex>
          <SendNotificationForm userId={userId} tenant={tenant} />
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
    </KnockProvider>
  );
}
