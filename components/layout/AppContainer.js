import { KnockProvider } from "@knocklabs/react";
import { Button } from "@telegraph/button";
import { Icon } from "@telegraph/icon";
import { Stack } from "@telegraph/layout";
import { Select } from "@telegraph/select";
import { Book, Loader2, createLucideIcon } from "lucide-react";

const Github = createLucideIcon("Github", [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "1gfcsp",
    },
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
]);
import Link from "next/link";
import { useRouter } from "next/router";

import useIdentify from "../../hooks/useIdentify";
import KnockLogo from "../KnockLogo";

const AppContainer = ({ children }) => {
  const { userId, isLoading } = useIdentify();
  const router = useRouter();

  return (
    <Stack
      direction="column"
      style={{
        height: "100vh",
      }}
    >
      <Stack
        border="px"
        p="4"
        gap="4"
        align="center"
        postion="relative"
        zIndex="sticky"
      >
        <Link href="https://knock.app">
          <KnockLogo />
        </Link>
        <Stack maxW="40" w="full">
          <Select.Root
            value={router.asPath}
            onValueChange={(value) => router.push(value)}
            size="2"
          >
            <Select.Option value="/">In-app feed</Select.Option>
            <Select.Option value="/preferences">Preferences</Select.Option>
          </Select.Root>
        </Stack>

        <Stack gap="4" ml="auto" align="center">
          <Button
            as={Link}
            href="https://github.com/knocklabs/in-app-notifications-example-nextjs"
            variant="ghost"
            icon={{ icon: Github, "aria-hidden": true }}
          >
            Github repo
          </Button>
          <Button
            as={Link}
            variant="ghost"
            icon={{ icon: Book, "aria-hidden": true }}
            href="https://docs.knock.app/in-app-ui/react/overview"
          >
            Documentation
          </Button>
        </Stack>
      </Stack>
      <Stack bg="surface-2" w="full" h="full">
        {isLoading ? (
          <Stack align="center" justify="center">
            <Icon icon={Loader2} alt="Loading" />
          </Stack>
        ) : (
          <KnockProvider
            userId={userId}
            apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
          >
            {children}
          </KnockProvider>
        )}
      </Stack>
    </Stack>
  );
};

export default AppContainer;
