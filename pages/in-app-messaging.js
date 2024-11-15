import { Box, Flex, Link, Select } from "@chakra-ui/react";
import { useState } from "react";

import { Heading, Text } from "@telegraph/typography";

import useIdentify from "../hooks/useIdentify";
import SendInAppMessageForm from "../components/SendInAppMessageForm";
import AppContainer from "../components/layout/AppContainer";
import { TenantLabels, Tenants } from "../lib/constants";
import InAppMessageContainer from "../components/InAppMessageContainer";

const Home = () => {
  const { userId } = useIdentify();
  const [tenant, setTenant] = useState(Tenants.TeamA);

  return (
    <>
      <Flex
        bgColor="white"
        width="420px"
        height="100%"
        borderRightWidth={1}
        borderRightColor="var(--tgph-gray-4)"
        flexDir="column"
        p={5}
      >
        <Flex
          mb={5}
          pb={5}
          borderBottomColor="var(--tgph-gray-4)"
          borderBottomWidth={1}
        >
          <Box>
            <Heading as="h1" size="5">
              In-app messaging example
            </Heading>
            <Text as="p">
              This is an example application to show in-app messaging{" "}
              <Text as="a" href="https://knock.app" color="blue">
                powered by Knock
              </Text>
              .
            </Text>
          </Box>
        </Flex>
        <Flex flex={1}>
          <SendInAppMessageForm userId={userId} tenant={tenant} />
        </Flex>
      </Flex>
      <Flex flex={1} flexDir="column">
        <Flex>
          {/* Bring back in tenants later */}
          {/* <Flex ml="auto" p={2} alignItems="center">
            <Text as="span" weight="medium" style={{ marginRight: "10px" }}>
              Tenant{" "}
            </Text>
            <Select
              size="sm"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
            >
              {Object.values(Tenants).map((tenant) => (
                <option key={tenant} value={tenant}>
                  {TenantLabels[tenant]}
                </option>
              ))}
            </Select>
          </Flex> */}
        </Flex>
        <Flex alignItems="center" justifyContent="center" flex={1} mt="-160px">
          <InAppMessageContainer />
        </Flex>
      </Flex>
    </>
  );
};

Home.getLayout = (page) => <AppContainer>{page}</AppContainer>;

export default Home;
