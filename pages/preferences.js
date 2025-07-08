import { useKnockClient } from "@knocklabs/react";
import { Icon } from "@telegraph/icon";
import { Box, Stack } from "@telegraph/layout";
import { Select } from "@telegraph/select";
import { Heading, Text } from "@telegraph/typography";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import syntaxStyles from "react-syntax-highlighter/dist/cjs/styles/hljs/stackoverflow-light";

import PreferenceSetting from "../components/Preferences";
import AppContainer from "../components/layout/AppContainer";
import useIdentify from "../hooks/useIdentify";
import { TenantLabels, Tenants } from "../lib/constants";

const DEFAULT_PREFERENCE_SET = {
  __typename: "PreferenceSet",
  categories: {
    collaboration: {
      channel_types: { email: true, in_app_feed: true },
    },
    "project-updates": {
      channel_types: { email: false, in_app_feed: true },
    },
  },
  channel_types: null,
  workflows: {
    "invoice-issued": {
      channel_types: { email: true },
    },
  },
};

const Preferences = () => {
  const { userId } = useIdentify();
  const [preferenceSet, setPreferenceSet] = useState(null);
  const [tenant, setTenant] = useState("");

  const knockClient = useKnockClient();

  useEffect(() => {
    if (!userId) return;

    const preferenceSetId = tenant === "" ? "default" : tenant;

    knockClient.user
      .getPreferences({ preferenceSet: preferenceSetId })
      .then((maybePrefSet) => {
        if (maybePrefSet.categories === null) {
          setPreferenceSet({
            ...maybePrefSet,
            ...DEFAULT_PREFERENCE_SET,
          });

          return;
        }

        setPreferenceSet(maybePrefSet);
      });
  }, [knockClient, userId, tenant]);

  const updatePreferences = useCallback(
    async (preferenceSet) => {
      setPreferenceSet(preferenceSet);

      await knockClient.user.setPreferences(preferenceSet, {
        preferenceSet: preferenceSet.id,
      });
    },
    [knockClient],
  );

  if (!preferenceSet)
    return (
      <Stack align="center" justify="center">
        <Icon icon={Loader2} alt="Loading" />
      </Stack>
    );

  return (
    <>
      <Stack
        bg="surface-1"
        maxW="120"
        w="full"
        height="full"
        borderRight="px"
        direction="column"
        p="3"
      >
        <Stack mb="4" pb="4" borderBottom="px" gap="2" direction="column">
          <Heading as="h2" size="5">
            Preferences example
          </Heading>
          <Text as="p">
            This is an example of using{" "}
            <Text as="a" href="https://knock.app" color="blue" target="_blank">
              Knock
            </Text>{" "}
            to power notification preferences.
          </Text>
        </Stack>
        <Stack>
          <Box width="full">
            <Heading as="h3">User preference set</Heading>
            <SyntaxHighlighter
              language="json"
              style={syntaxStyles}
              customStyle={{ fontSize: "12px" }}
            >
              {JSON.stringify(preferenceSet, null, 2)}
            </SyntaxHighlighter>
          </Box>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        justify="center"
        align="center"
        w="full"
        h="full"
      >
        <Stack ml="auto" p="2" align="center">
          <Text as="span" mr="3">
            Tenant
          </Text>
          <Select.Root
            value={tenant}
            onValueChange={(value) => setTenant(value)}
            placeholder="Select tenant"
          >
            <Select.Option value="">None</Select.Option>
            {Object.values(Tenants).map((tenant) => (
              <Select.Option key={tenant} value={tenant}>
                {TenantLabels[tenant]}
              </Select.Option>
            ))}
          </Select.Root>
        </Stack>
        <Stack justify="center" align="center" w="full" h="full" maxW="160">
          <PreferenceSetting
            preferenceSet={preferenceSet}
            updatePreferences={updatePreferences}
            tenant={tenant === "" ? undefined : tenant}
          />
        </Stack>
      </Stack>
    </>
  );
};

Preferences.getLayout = (page) => <AppContainer>{page}</AppContainer>;

export default Preferences;
