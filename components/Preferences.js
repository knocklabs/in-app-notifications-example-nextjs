import { Box, Stack } from "@telegraph/layout";
import { Heading, Text } from "@telegraph/typography";
import { useEffect, useState } from "react";

import { TenantLabels } from "../lib/constants";

const ChannelTypes = {
  in_app_feed: "In-app",
  email: "Email",
};

const RowSettings = {
  collaboration: {
    title: "Comments & mentions",
    subline: "New comments and replies to threads.",
  },
  "project-updates": {
    title: "Project updates",
    subline: "New activity on projects you're subscribed to.",
  },
  "invoice-issued": {
    title: "Billing invoices",
    subline: "Issued when a new invoice is created for this account.",
  },
};

const PreferenceSettingRow = ({
  type,
  name,
  channelTypeSettings,
  onChange,
}) => (
  <Stack borderBottom="px" align="center" p="4">
    <Box>
      <Heading as="h3">{RowSettings[name].title}</Heading>
      <Text as="span">{RowSettings[name].subline}</Text>
    </Box>
    <Stack ml="auto" gap="4" direction="row">
      {Object.keys(ChannelTypes).map((channelType) => {
        return (
          <Stack key={channelType} width="16" justify="center" align="center">
            <input
              type="checkbox"
              disabled={typeof channelTypeSettings[channelType] === "undefined"}
              checked={channelTypeSettings[channelType]}
              onChange={(e) => {
                onChange({
                  type,
                  key: name,
                  channelTypeSettings: {
                    ...channelTypeSettings,
                    [channelType]: e.target.checked,
                  },
                });
              }}
            />
          </Stack>
        );
      })}
    </Stack>
  </Stack>
);

const Preferences = ({ tenant, preferenceSet, updatePreferences }) => {
  const [localPrefSet, setLocalPrefSet] = useState(preferenceSet);

  useEffect(() => {
    setLocalPrefSet(preferenceSet);
  }, [preferenceSet]);

  const onSettingsChange = ({ type, key, channelTypeSettings }) => {
    // Update the preference set with the new values
    const newPreferences = {
      ...localPrefSet,
      [type === "category" ? "categories" : "workflows"]: {
        ...(type === "category"
          ? localPrefSet.categories
          : localPrefSet.workflows),
        [key]: {
          channel_types: channelTypeSettings,
        },
      },
    };

    updatePreferences(newPreferences);
    setLocalPrefSet(newPreferences);
  };

  return (
    <Stack direction="column" w="full" h="full">
      <Box borderBottom="px" py="5">
        <Heading as="h1" size="4">
          Notification settings
        </Heading>
        <Text as="p">
          Update your{" "}
          {!tenant
            ? "global notification settings"
            : `notification settings for ${TenantLabels[tenant]}`}
          .
        </Text>
      </Box>
      <Stack py="4">
        <Box>
          <Text as="span">Notification type</Text>
        </Box>
        <Stack gap="4" ml="auto" mr="4" direction="row">
          {Object.keys(ChannelTypes).map((channelType) => (
            <Stack key={channelType} width="16" justify="center" align="center">
              <Text size="1" as="span">
                {ChannelTypes[channelType]}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack
        direction="column"
        borderTop="px"
        borderLeft="px"
        borderRight="px"
        bg="surface-1"
        w="full"
      >
        {localPrefSet.categories &&
          Object.keys(localPrefSet.categories).map((category) => (
            <PreferenceSettingRow
              key={category}
              type="category"
              name={category}
              channelTypeSettings={
                localPrefSet.categories[category].channel_types
              }
              onChange={onSettingsChange}
            />
          ))}

        {localPrefSet.workflows &&
          Object.keys(localPrefSet.workflows).map((workflow) => (
            <PreferenceSettingRow
              key={workflow}
              type="workflow"
              name={workflow}
              channelTypeSettings={
                localPrefSet.workflows[workflow].channel_types
              }
              onChange={onSettingsChange}
            />
          ))}
      </Stack>
    </Stack>
  );
};

export default Preferences;
