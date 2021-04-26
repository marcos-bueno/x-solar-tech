import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react"
import {
  FormLabel,
  FormControl,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormErrorMessage,
} from "@chakra-ui/react"
import { FieldError } from "react-hook-form"

type SelectProps = {
  name: string
  label?: string
  error?: FieldError
  children: ReactNode
} & ChakraSelectProps

const style = {
  background: "rgba(0, 0, 0, 0.3)",
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, error = null, children, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraSelect
        name={name}
        id={name}
        focusBorderColor="red.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        textColor="gray.500"
        size="lg"
        ref={ref}
        {...rest}
      >
        {children}
      </ChakraSelect>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
