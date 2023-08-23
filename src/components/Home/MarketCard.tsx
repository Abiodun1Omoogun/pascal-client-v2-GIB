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
} from "@chakra-ui/react";

// Style config //
const statStyle = {
  align: "center",
  direction: "row",
  filter: "invert(40%)",
};
// Style config //
const MarketCard = ({ market }) => {
  const {
    publicKey,
    title,
    category,
    prices,
    marketLockTimestamp,
    liquidityTotal,
    matchedTotal,
  } = market;

  const dt = React.useMemo(() => {
    const timestamp = parseInt(marketLockTimestamp, 16) * 1000;
    return new Date(timestamp);
  }, [marketLockTimestamp]);

  const iconColor = mode("invert(0%)", "invert(100%)");

  return (
    <ChakraNextLink
      to={`/market/${publicKey}`}
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
          minH={"300px"}
          justifyContent={"space-between"}
        >
          <Image
            filter={iconColor}
            src={`/${category}.svg`}
            alt={category}
            width={25}
            height={25}
            fallback={<Skeleton width={25} height={25} />}
          />

          <Suspense
            fallback={<SkeletonText width={{ base: "80%", md: "100px" }} />}
          >
            <Stack spacing={2}>
              <Heading size={"md"}>
                <Balancer>{title}</Balancer>
              </Heading>
              <h3>
                {`on ${dt.getDate()} ${dt.toLocaleString("default", {
                  month: "long",
                })} ${dt.getFullYear()}`}
              </h3>
            </Stack>
          </Suspense>

          <Flex
            fontWeight={"semibold"}
            justify={"space-between"}
            direction={{ base: "row", md: "column", lg: "row" }}
          >
            <Stack direction={"row"} spacing={3}>
              <Text color={"purple.500"}>{`Yes ${
                prices[0].against[prices[0].against.length - 1]?.price
              }`}</Text>
              <Text color={"teal.500"}>{`No ${
                prices[1].against[prices[1].against.length - 1]?.price
              }`}</Text>
            </Stack>
          </Flex>

          <hr />

          <Stack pt={2} spacing={4} direction={"row"}>
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
              <h4>${liquidityTotal}</h4>
            </HStack>
            <HStack sx={statStyle}>
              <Image
                filter={iconColor}
                src={"/volume-traded.png"}
                width={17}
                height={17}
                alt="Volume Traded"
                fallback={<Skeleton width={17} height={17} />}
              />
              <h4>${matchedTotal}</h4>
            </HStack>
          </Stack>
        </Stack>
      </ScaleFade>
    </ChakraNextLink>
  );
};

export default MarketCard;
