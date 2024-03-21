import { Box, Code, Flex, Link, Select, Spinner } from "@chakra-ui/react";
import { Heading, Text } from "@telegraph/typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import syntaxStyles from "react-syntax-highlighter/dist/cjs/styles/hljs/stackoverflow-light";

import AppContainer from "../components/layout/AppContainer";
import PreferenceSetting from "../components/Preferences";

import useIdentify from "../hooks/useIdentify";
import { useKnockClient } from "@knocklabs/react";
import { useCallback, useEffect, useState } from "react";
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
    [knockClient]
  );

  if (!preferenceSet)
    return (
      <Flex flex={1} alignItems="center" justifyContent="center">
        <Spinner color="var(--tgph-accent-9)" />
      </Flex>
    );

  return (
    <>
      <Flex
        bgColor="white"
        width="420px"
        height="100%"
        borderRightWidth={1}
        borderRightColor="var(--tgph-gray-4)"
        flexDir="column"
        p={5}
      >
        <Flex
          mb={5}
          pb={5}
          borderBottomColor="var(--tgph-gray-4)"
          borderBottomWidth={1}
        >
          <Box>
            <Heading as="h2" size="5">
              Preferences example
            </Heading>
            <Text as="p">
              This is an example of using{" "}
              <Link
                href="https://knock.app"
                color="blue.600"
                fontWeight="semibold"
              >
                Knock
              </Link>{" "}
              to power notification preferences.
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box width="100%">
            <Heading as="h3">User preference set</Heading>
            <SyntaxHighlighter
              language="json"
              style={syntaxStyles}
              customStyle={{ fontSize: "12px" }}
            >
              {JSON.stringify(preferenceSet, null, 2)}
            </SyntaxHighlighter>
          </Box>
        </Flex>
      </Flex>
      <Flex
        flex={1}
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex ml="auto" p={2} alignItems="center">
          <Text as="span" style={{ marginRight: "10px" }}>
            Tenant{" "}
          </Text>
          <Select
            size="sm"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
          >
            <option value="">None</option>
            {Object.values(Tenants).map((tenant) => (
              <option key={tenant} value={tenant}>
                {TenantLabels[tenant]}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex justifyContent="center" alignItems="center" flex={1}>
          <PreferenceSetting
            preferenceSet={preferenceSet}
            updatePreferences={updatePreferences}
            tenant={tenant === "" ? undefined : tenant}
          />
        </Flex>
      </Flex>
    </>
  );
};

Preferences.getLayout = (page) => <AppContainer>{page}</AppContainer>;

export default Preferences;
