import {
  Flex,
  FormControl,
  Input,
  Select,
  Switch,
  Textarea,
} from "@chakra-ui/react";

import { Button } from "@telegraph/button";
import { Text } from "@telegraph/typography";
import { useState } from "react";

import { notifyInApp } from "../lib/api";

const TemplateType = {
  Standard: "standard",
  SingleAction: "single-action",
  MultiAction: "multi-action",
};

const ComponentType = {
  Modal: "modal",
  Banner: "banner",
  Card: "card",
};

const SendInAppMessageForm = ({ userId, tenant }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [templateType, setTemplateType] = useState(TemplateType.Standard);
  const [componentType, setComponentType] = useState(ComponentType.Modal);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await notifyInApp({
      title,
      userId,
      tenant,
      templateType,
      componentType,
      body,
    });
    setIsLoading(false);

    e.target.reset();
  };

  return (
    <Flex as="form" onSubmit={onSubmit} flexDir="column" width="100%">
      <Flex flexDir="column">
        <FormControl mb={4}>
          <Text as="label" weight="medium">
            Component type
          </Text>
          <Select
            mr={3}
            size="sm"
            value={componentType}
            onChange={(e) => setComponentType(e.target.value)}
          >
            <option value={ComponentType.Modal}>Modal</option>
            <option value={ComponentType.Banner}>Banner</option>
            <option value={ComponentType.Card}>Card</option>
          </Select>
        </FormControl>
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
            Title
          </Text>
          <Input
            id="title"
            name="title"
            placeholder="Title text to be shown in the notification"
            size="sm"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <Text as="label" weight="medium">
            Body
          </Text>
          <Textarea
            id="body"
            name="body"
            placeholder="Body text to be shown in the notification"
            size="sm"
            onChange={(e) => setBody(e.target.value)}
          />
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
          disabled={body === ""}
          style={{ marginLeft: "auto" }}
        >
          Send notification
        </Button>
      </Flex>
    </Flex>
  );
};

export default SendInAppMessageForm;
