import { Text } from "@chakra-ui/react"

export function Logo(): JSX.Element {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      X Solar Tech
      <Text as="span" ml="1" color="red.500">
        .
      </Text>
    </Text>
  )
}
