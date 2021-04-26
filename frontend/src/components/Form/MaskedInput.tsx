import { forwardRef, ForwardRefRenderFunction } from "react"
import InputMask, {
  Props as InputMaskProps,
  ReactInputMask,
} from "react-input-mask"
import { FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react"
import { FieldError } from "react-hook-form"

type MaskedInputProps = {
  name: string
  label?: string
  error?: FieldError
} & InputMaskProps

const MaskedInputBase: ForwardRefRenderFunction<
  ReactInputMask,
  MaskedInputProps
> = ({ name, label, mask, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputMask
        name={name}
        id={name}
        mask={mask}
        ref={ref}
        className="chakra-input css-fcn2r2"
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const MaskedInput = forwardRef(MaskedInputBase)
