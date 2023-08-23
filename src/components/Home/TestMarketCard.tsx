import ChakraNextLink from "../ChakraNextLink";
import Balancer from "react-wrap-balancer";
import React, { Suspense } from "react";
import {
  Flex,
  Stack,
  HStack,
  useColorModeValue as mode,
  Image,
  Text,
  Heading,
  ScaleFade,
  Skeleton,
  SkeletonText,
  Tooltip,
  Collapse,
} from "@chakra-ui/react";
import { formatNumber } from "@/utils/helpers";
import { CustomTooltip } from "../common/CustomTooltip";

// Style config //
const statStyle = {
  align: "center",
  direction: "row",
  filter: "invert(40%)",
};
// Style config //

const TestMarketCard = ({ market, event }) => {
  const { eventName, categoryTitle, participants } = event;
  const {
    marketAccount,
    marketLock,
    marketPriceSummary,
    liquidityTotal,
    matchedTotal,
  } = market;

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const dt = React.useMemo(() => {
    const timestamp = marketLock * 1000;
    return new Date(timestamp);
  }, [marketLock]);

  const iconColor = mode("invert(0%)", "invert(100%)");

  return (
    <ChakraNextLink
      to={`/market/${marketAccount}`}
      _hover={{ textDecoration: "none" }}
    >
      <ScaleFade initialScale={0.9} in={true}>
        <Stack
          spacing={4}
          p={5}
          borderColor={mode("#CFDAE1", "rgb(255, 255, 255, 0.08)")}
          borderWidth={1}
          rounded={"10px"}
          backdropFilter={{ base: "none", md: "blur(0px)" }} // <-- Somehow improves page transition latency
          bg={mode("transparent", "rgba(255, 255, 255, 0.012)")}
          bgImage={mode(
            "none",
            "radial-gradient(at top left, hsl(265.16, 86%, 86%) -400%, transparent 17%), radial-gradient(at bottom right, hsl(265.16, 86%, 86%) -400%, transparent 10%)"
          )}
          transition={"all .3s ease"}
          _hover={{
            boxShadow: "2xl",
            borderColor: mode("white", "rgb(255, 255, 255, 0.2)"),
            background: mode("white", ""),
            bgImage: mode(
              "none",
              "radial-gradient(at 20% 20%, hsl(0.00, 0%, 100%) -600%, transparent 80%)"
            ),
          }}
          minH={"310px"}
          justifyContent={"space-between"}
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
        >
          <Image
            filter={iconColor}
            src={`/${categoryTitle}.png`}
            alt={categoryTitle}
            width={25}
            height={25}
            fallback={<Skeleton width={25} height={25} />}
          />

          <Suspense
            fallback={<SkeletonText width={{ base: "80%", md: "100px" }} />}
          >
            <Stack spacing={2}>
              <Heading size={"md"}>
                <Balancer>{eventName}</Balancer>
              </Heading>
              <Text>
                {`on ${dt.getDate()} ${dt.toLocaleString("default", {
                  month: "long",
                })} ${dt.getFullYear()}`}
              </Text>
            </Stack>
          </Suspense>

          <Flex flexWrap="wrap" justifyContent="space-between">
            {participants.map((participant, index) => (
              <Flex key={participant.id} flexDirection="column" width="50%">
                <Text textAlign="start" fontWeight={"medium"}>
                  {participant.id}
                </Text>
                <Stack direction={"row"} spacing={3}>
                  <Text color={"purple.500"}>
                    {marketPriceSummary[index]["against"][0]?.price ?? "-"}
                  </Text>
                  <Text color={"teal.500"}>
                    {marketPriceSummary[index]["for"][0]?.price ?? "-"}
                  </Text>
                </Stack>
                <Collapse in={show}>
                  <Stack direction={"row"} spacing={3} fontSize="xs">
                    <Text color={"purple.500"}>Back</Text>
                    <Text color={"teal.500"}>Lay</Text>
                  </Stack>
                </Collapse>
              </Flex>
            ))}
          </Flex>

          <hr />

          <Stack pt={2} spacing={5} direction={"row"}>
            <CustomTooltip
              p={2}
              label={"Total liquidity"}
              placement="bottom-start"
              fontSize="xs"
            >
              <HStack sx={statStyle}>
                <Image
                  filter={iconColor}
                  src={"/liquidity.png"}
                  width={17}
                  height={17}
                  alt="Liquidity"
                  mr={-1}
                  fallback={<Skeleton width={17} height={17} />}
                />
                <h4>${formatNumber(liquidityTotal)}</h4>
              </HStack>
            </CustomTooltip>

            <CustomTooltip
              p={2}
              label={"Volume traded"}
              placement="bottom-start"
              fontSize="xs"
            >
              <HStack sx={statStyle}>
                <Image
                  filter={iconColor}
                  src={"/volume-traded.png"}
                  width={17}
                  height={17}
                  alt="Volume Traded"
                  fallback={<Skeleton width={17} height={17} />}
                />
                <h4>${formatNumber(matchedTotal)}</h4>
              </HStack>
            </CustomTooltip>
          </Stack>
        </Stack>
      </ScaleFade>
    </ChakraNextLink>
  );
};

export default TestMarketCard;
