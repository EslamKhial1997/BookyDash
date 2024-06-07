import { Flex, Box } from "@chakra-ui/react";
import theme from "../../../global/theme";

const Card = ({
  title,
  count,
  icon
}) => {
  return (
    <Box
      borderRadius={2} color={theme.dark} bg={theme.light}
      boxShadow={theme.shadow}
      borderEnd={`3px solid ${theme.primary}`} padding={4}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Box
            fontSize="20px" textTransform="capitalize"
          >
            {title}
          </Box>
          <Box fontSize="18px">
            {count}
          </Box>
        </Box>
        {icon}
      </Flex>
    </Box>
  )
}

export default Card