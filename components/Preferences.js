import { Box, Checkbox, Flex } from "@chakra-ui/react";
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
  <Flex
    borderBottomColor="var(--tgph-gray-4)"
    borderBottomWidth={1}
    alignItems="center"
    p={4}
  >
    <Box>
      <Heading as="h3">{RowSettings[name].title}</Heading>
      <Text as="span">{RowSettings[name].subline}</Text>
    </Box>
    <Flex ml="auto" gap={3}>
      {Object.keys(ChannelTypes).map((channelType) => {
        return (
          <Flex
            key={channelType}
            width="50px"
            justifyContent="center"
            alignItems="center"
          >
            <Checkbox
              disabled={typeof channelTypeSettings[channelType] === "undefined"}
              isChecked={channelTypeSettings[channelType]}
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
          </Flex>
        );
      })}
    </Flex>
  </Flex>
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
    <Flex flexDirection="column">
      <Box borderBottomWidth={1} borderBottomColor="var(--tgph-gray-4)" py={5}>
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
      <Flex py={3}>
        <Box>
          <Text as="span">Notification type</Text>
        </Box>
        <Flex gap={3} ml="auto" mr={3}>
          {Object.keys(ChannelTypes).map((channelType) => (
            <Flex
              key={channelType}
              width="50px"
              justifyContent="center"
              alignItems="center"
            >
              <Text size="1" as="span">
                {ChannelTypes[channelType]}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex
        flexDir="column"
        bgColor="white"
        width="550px"
        borderColor="var(--tgph-gray-4)"
        borderWidth={1}
        borderBottomColor="transparent"
      >
        {Object.keys(localPrefSet.categories).map((category) => (
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

        {Object.keys(localPrefSet.workflows).map((workflow) => (
          <PreferenceSettingRow
            key={workflow}
            type="workflow"
            name={workflow}
            channelTypeSettings={localPrefSet.workflows[workflow].channel_types}
            onChange={onSettingsChange}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Preferences;
