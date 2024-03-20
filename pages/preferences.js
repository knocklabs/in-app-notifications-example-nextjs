import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import AppContainer from "../components/layout/AppContainer";
import useIdentify from "../hooks/useIdentify";

const Preferences = () => {
  const { userId } = useIdentify();

  return (
    <>
      <Flex
        bgColor="white"
        width="420px"
        height="100%"
        borderRightWidth={1}
        borderRightColor="gray.100"
        flexDir="column"
        p={5}
      >
        <Flex mb={5} pb={5} borderBottomColor="gray.100" borderBottomWidth={1}>
          <Box>
            <Heading size="md" mb={2}>
              Preferences example
            </Heading>
            <Text>
              This is an example of using{" "}
              <Link
                href="https://knock.app"
                color="blue.600"
                fontWeight="semibold"
              >
                Knock
              </Link>{" "}
              to power notification preferences.
            </Text>
          </Box>
        </Flex>
        <Flex flex={1}></Flex>
      </Flex>
      <Flex flex={1} flexDir="column"></Flex>
    </>
  );
};

Preferences.getLayout = (page) => <AppContainer>{page}</AppContainer>;

export default Preferences;
