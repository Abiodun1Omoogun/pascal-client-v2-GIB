import {
  Box,
  Button,
  useColorModeValue as mode,
  Text,
  Link,
  Flex,
  SlideFade,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Banner = () => {
  const [cookies, setCookie] = useCookies(["isBannerClosed"]);
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isBannerClosed = cookies.isBannerClosed;
    if (isBannerClosed) {
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setIsLoading(false);
  }, [cookies]);

  const handleClose = () => {
    setCookie("isBannerClosed", true);
    setShowBanner(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <SlideFade in={showBanner} offsetY="20px">
      <Box
        position="sticky"
        rounded="2xl"
        w={{ base: "90%", sm: "581px" }}
        h={{ base: "full", sm: "80px" }}
        padding="1"
        zIndex="10"
        bottom={{ base: "2", sm: "10" }}
        left="0"
        right="0"
        mx="auto"
      >
        <Flex
          rounded="14px"
          w="full"
          h="full"
          bg={mode("gray.50", "gray.800")}
          border="1px"
          borderColor={mode("gray.200", "rgba(255,255,255,0.12)")}
          flexDir={{ base: "column", sm: "row" }}
          alignItems="center"
          justifyContent={{ base: "center", sm: "space-between" }}
          px="5"
          py="4"
          shadow={{ base: "xl", sm: "none" }}
        >
          <Text
            color={mode("black", "white")}
            fontSize="13px"
            fontFamily="mono"
            w={{ base: "full", sm: "304px" }}
            h="10"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: "0", sm: "3" }}
            mb={{ base: "3", sm: "0" }}
          >
            Pascal is currently only live on devnet.{" "}
            <Button
              display={"contents"}
              textColor={"blue.600"}
              fontSize="13px"
              onClick={handleClose}
            >
              Dismiss →
            </Button>
          </Text>
          <Link
            isExternal
            color={mode("white", "gray.800")}
            fontSize="13px"
            fontFamily="mono"
            bg={mode("gray.900", "gray.100")}
            _hover={{
              bg: mode("gray.700", "gray.300"),
              transition: "all 0.3s ease",
            }}
            transition="all"
            rounded="md"
            w={{ base: "full", sm: "220px" }}
            h="10"
            display="flex"
            alignItems="center"
            justifyContent="center"
            whiteSpace="nowrap"
            href="https://usdcfaucet.com/"
          >
            Airdrop USDC
          </Link>
        </Flex>
      </Box>
    </SlideFade>
  );
};

export default Banner;
