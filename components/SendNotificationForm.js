import { Flex, FormControl, Select, Switch, Textarea } from "@chakra-ui/react";

import { Button } from "@telegraph/button";
import { Text } from "@telegraph/typography";
import { useState } from "react";

import { notify } from "../lib/api";

const TemplateType = {
  Standard: "standard",
  SingleAction: "single-action",
  MultiAction: "multi-action",
};

const SendNotificationForm = ({ userId, tenant }) => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [templateType, setTemplateType] = useState(TemplateType.Standard);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await notify({ message, showToast, userId, tenant, templateType });
    setIsLoading(false);

    e.target.reset();
  };

  return (
    <Flex as="form" onSubmit={onSubmit} flexDir="column" width="100%">
      <Flex flexDir="column">
        <FormControl mb={4}>
          <Text as="label" weight="medium">
            Template type
          </Text>
          <Select
            mr={3}
            size="sm"
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
          >
            <option value={TemplateType.Standard}>Standard</option>
            <option value={TemplateType.SingleAction}>Single-action</option>
            <option value={TemplateType.MultiAction}>Multi-action</option>
          </Select>
        </FormControl>
        <FormControl mb={3}>
          <Text as="label" weight="medium">
            Message
          </Text>
          <Textarea
            id="message"
            name="message"
            placeholder="Message to be shown in the notification"
            size="sm"
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <Text
            as="label"
            weight="medium"
            style={{ display: "flex", alignItems: "center" }}
          >
            Show a toast
            <Switch
              ml="auto"
              size="sm"
              isChecked={showToast}
              onChange={(e) => setShowToast(e.target.checked)}
              name="showToast"
            />
          </Text>
        </FormControl>
      </Flex>

      <Flex
        mt="auto"
        borderTopWidth={1}
        borderTopColor="var(--tgph-gray-4)"
        pt={5}
      >
        <Button
          type="submit"
          color="accent"
          variant="solid"
          disabled={message === ""}
          style={{ marginLeft: "auto" }}
        >
          Send notification
        </Button>
      </Flex>
    </Flex>
  );
};

export default SendNotificationForm;
