import { Flex, Icon, Link, Spinner } from "@chakra-ui/react";

import { Text } from "@telegraph/typography";

import KnockLogo from "../KnockLogo";
import { IoDocument, IoLogoGithub } from "react-icons/io5";
import useIdentify from "../../hooks/useIdentify";
import { KnockProvider } from "@knocklabs/react";

const AppContainer = ({ children }) => {
  const { userId, isLoading } = useIdentify();

  return (
    <Flex width="100vw" height="100vh" flexDir="column">
      <Flex borderColor="var(--tgph-gray-4)" borderWidth={1} p={5}>
        <Link href="https://knock.app">
          <KnockLogo />
        </Link>

        <Flex gap={4} ml="auto" alignItems="center">
          <Text
            as="a"
            href="https://github.com/knocklabs/in-app-notifications-example-nextjs"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Icon as={IoLogoGithub} mr={1} />
            Github repo
          </Text>
          <Text
            as="a"
            href="https://docs.knock.app/in-app-ui/react/overview"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Icon as={IoDocument} mr={1} />
            Documentation
          </Text>
        </Flex>
      </Flex>
      <Flex bgColor="var(--tgph-gray-2)" width="100vw" height="100vh">
        {isLoading ? (
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Spinner color="var(--tgph-accent-9)" />
          </Flex>
        ) : (
          <KnockProvider
            userId={userId}
            apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
          >
            {children}
          </KnockProvider>
        )}
      </Flex>
    </Flex>
  );
};

export default AppContainer;
