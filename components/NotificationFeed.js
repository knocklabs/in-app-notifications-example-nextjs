import { NotificationFeed, NotificationIconButton } from "@knocklabs/react";

import { Box, Stack } from "@telegraph/layout";

import { useState, useRef } from "react";

const KnockNotificationFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <Stack display="flex" direction="column" style={{ width: "420px" }}>
      <Box ml="auto">
        <NotificationIconButton
          ref={notifButtonRef}
          onClick={(e) => setIsVisible(!isVisible)}
        />
      </Box>
      <Box
        mt="2"
        style={{
          height: "450px",
          borderColor: "var(--tgph-gray-4)",
          borderWidth: 1,
        }}
      >
        <NotificationFeed
          buttonRef={notifButtonRef}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </Box>
    </Stack>
  );
};

export default KnockNotificationFeed;
