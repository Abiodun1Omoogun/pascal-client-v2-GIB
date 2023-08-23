import { useColorModeValue } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

export const CustomTooltip = ({ children, ...props }) => {
  return (
    <Tooltip
      aria-label="Market has locked."
      width={"full"}
      boxShadow={"2xl"}
      border={useColorModeValue(
        "1px solid rgba(0,0,0,0.12)",
        "1px solid rgba(255,255,255,0.12)"
      )}
      bg={useColorModeValue("#F9FAFB", "gray.900")}
      rounded={"lg"}
      textColor={useColorModeValue("gray.600", "gray.100")}
      {...props}
    >
      {children}
    </Tooltip>
  );
};
