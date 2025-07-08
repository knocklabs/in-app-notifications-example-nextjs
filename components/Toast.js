import { Icon } from "@telegraph/icon";
import { Stack } from "@telegraph/layout";
import { Text } from "@telegraph/typography";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

const IconType = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
  error: XCircle,
};

const IconColors = {
  info: "gray",
  warning: "yellow",
  success: "green",
  error: "red",
};

const Toast = ({ title, description, status = "success" }) => {
  return (
    <Stack p="2" border="px" direction="row" shadow="3" align="center" gap="4">
      <Icon
        icon={IconType[status]}
        color={IconColors[status]}
        size="3"
        ml="2"
        aria-hidden="true"
      />
      <Stack direction="column">
        <Text as="span" weight="medium" size="3">
          {title}
        </Text>
        <Text
          as="span"
          size="2"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Toast;
