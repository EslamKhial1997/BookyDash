import { Box, Image, Divider, Stack, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import theme from "../../../global/theme"

const PersonalInfoTab = () => {
  const auth = useSelector(state => state.auth);
  return (
    <>
      <Box textAlign="center">
        <Image
          src={"https://icon-library.com/images/no-user-image-icon/no-user-image-icon-22.jpg"}
          w="80px" h="80px" borderRadius="50%" bg={theme.body} margin="auto"
        />
        <Box
          color={theme.text} mt={3}
          textTransform="capitalize"
        >
          {auth.user.name}
        </Box>
        <Box
          color={theme.dark}
          textTransform="capitalize"
        >
          {auth.user.role}
        </Box>
      </Box>

      <Divider marginBlock={6} />

      <Stack spacing={4}>
        <Flex alignItems="center">
          <Box me={2}>
            Email:
          </Box>
          <Box textTransform="capitalize" fontSize="1rem">
            {auth.user.email}
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Box me={2}>
            Name:
          </Box>
          <Box textTransform="capitalize" fontSize="1rem">
            {auth.user.name}
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Box me={2}>
            Code:
          </Box>
          <Box textTransform="capitalize" fontSize="1rem">
            {auth.user.id}
          </Box>
        </Flex>
      </Stack>
    </>
  )
}

export default PersonalInfoTab