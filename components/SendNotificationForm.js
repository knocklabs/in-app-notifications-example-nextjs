import { Button } from "@telegraph/button";
import { Stack } from "@telegraph/layout";
import { Select } from "@telegraph/select";
import { TextArea } from "@telegraph/textarea";
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
    await notify({
      message,
      showToast,
      userId,
      tenant,
      templateType,
    });
    setIsLoading(false);

    setTemplateType(TemplateType.Standard);
    setMessage("");
    setShowToast(false);
  };

  return (
    <Stack as="form" onSubmit={onSubmit} direction="column" w="full">
      <Stack direction="column" gap="4" mb="4">
        <Stack gap="2" direction="column">
          <Text as="label" weight="medium">
            Template type
          </Text>
          <Select.Root
            value={templateType}
            onValueChange={(value) => setTemplateType(value)}
            size="2"
          >
            <Select.Option value={TemplateType.Standard}>
              Standard
            </Select.Option>
            <Select.Option value={TemplateType.SingleAction}>
              Single-action
            </Select.Option>
            <Select.Option value={TemplateType.MultiAction}>
              Multi-action
            </Select.Option>
          </Select.Root>
        </Stack>
        <Stack gap="2" direction="column">
          <Text as="label" weight="medium" htmlFor="message">
            Message
          </Text>
          <TextArea
            id="message"
            name="message"
            placeholder="Message to be shown in the notification"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Stack>
        <Stack as="label" direction="row" w="full" justify="space-between">
          <Text as="span">Show a toast</Text>
          <input
            type="checkbox"
            value={showToast}
            onChange={(e) => setShowToast(e.target.checked)}
            name="showToast"
          />
        </Stack>
      </Stack>
      <Stack borderTop="px" pt="4">
        <Button
          type="submit"
          color="accent"
          variant="solid"
          state={isLoading ? "loading" : "default"}
          disabled={message === ""}
        >
          Send notification
        </Button>
      </Stack>
    </Stack>
  );
};

export default SendNotificationForm;
