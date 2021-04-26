import { Flex, Box, Text, Avatar } from "@chakra-ui/react"

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4">
          <Text>Gerente</Text>
          <Text color="gray.300" fontSize="small">
            joao@gmail.com
          </Text>
        </Box>
      )}
      <Avatar borderColor="gray.900" size="md" name="Gerente" />
    </Flex>
  )
}
