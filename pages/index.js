import { Stack } from "@telegraph/layout";
import { Select } from "@telegraph/select";
import { Heading, Text } from "@telegraph/typography";
import { useState } from "react";

import NotificationFeed from "../components/NotificationFeed";
import SendNotificationForm from "../components/SendNotificationForm";
import TabbedNotificationFeed from "../components/TabbedNotificationFeed/TabbedNotificationFeed";
import Toast from "../components/Toast";
import AppContainer from "../components/layout/AppContainer";
import useIdentify from "../hooks/useIdentify";
import { TenantLabels, Tenants } from "../lib/constants";

const FeedType = {
  Default: "default",
  Tabbed: "tabbed",
};

const Home = () => {
  const { userId } = useIdentify();
  const [feedType, setFeedType] = useState(FeedType.Default);
  const [tenant, setTenant] = useState(Tenants.TeamA);

  return (
    <>
      <Stack
        maxW="120"
        borderRight="px"
        direction="column"
        p="4"
        bg="surface-1"
      >
        <Stack mb="4" pb="4" borderBottom="px" gap="2" direction="column">
          <Heading as="h1" size="5">
            In-app notification feed example
          </Heading>
          <Text as="p">
            This is an example application to show in-app notifications{" "}
            <Text as="a" href="https://knock.app" color="blue" target="_blank">
              powered by Knock
            </Text>
            .
          </Text>
        </Stack>
        <Stack>
          <SendNotificationForm userId={userId} tenant={tenant} />
        </Stack>
      </Stack>
      <Stack direction="column" w="full" h="full">
        <Stack gap="4" justify="space-between" p="4">
          <Stack align="center" w="40">
            <Select.Root
              value={feedType}
              onValueChange={(value) => setFeedType(value)}
              size="2"
            >
              <Select.Option value="default">Default feed</Select.Option>
              <Select.Option value="tabbed">With tabs</Select.Option>
            </Select.Root>
          </Stack>

          <Stack align="center" gap="4">
            <Text as="span" weight="medium">
              Tenant
            </Text>
            <Stack w="40">
              <Select.Root
                value={tenant}
                onValueChange={(value) => setTenant(value)}
                size="2"
              >
                {Object.values(Tenants).map((tenant) => (
                  <Select.Option key={tenant} value={tenant}>
                    {TenantLabels[tenant]}
                  </Select.Option>
                ))}
              </Select.Root>
            </Stack>
          </Stack>
        </Stack>
        <Stack align="center" justify="center">
          {feedType === FeedType.Default && (
            <NotificationFeed tenant={tenant} />
          )}

          {feedType === FeedType.Tabbed && (
            <TabbedNotificationFeed tenant={tenant} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

Home.getLayout = (page) => <AppContainer>{page}</AppContainer>;

export default Home;
