import { KnockProvider } from "@knocklabs/react";
import { Button } from "@telegraph/button";
import { Icon, Lucide } from "@telegraph/icon";
import { Stack } from "@telegraph/layout";
import { Select } from "@telegraph/select";
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
            icon={{ icon: Lucide.Github, "aria-hidden": true }}
          >
            Github repo
          </Button>
          <Button
            as={Link}
            variant="ghost"
            icon={{ icon: Lucide.Book, "aria-hidden": true }}
            href="https://docs.knock.app/in-app-ui/react/overview"
          >
            Documentation
          </Button>
        </Stack>
      </Stack>
      <Stack bg="surface-2" w="full" h="full">
        {isLoading ? (
          <Stack align="center" justify="center">
            <Icon icon={Lucide.Loader2} alt="Loading" />
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
