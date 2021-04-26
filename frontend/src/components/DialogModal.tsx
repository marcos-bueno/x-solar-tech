import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react"

interface Customer {
  id?: string
  name?: string
}

interface DialogModalProps {
  customer: () => string
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string) => Promise<void>
}

export function DialogModal({
  customer,
  isOpen,
  onClose,
  onDelete,
}: DialogModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="gray.800">
        <ModalHeader>Deletar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Tem certeza que deseja deletar {`"${customer.name}"`}?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onDelete(customer.id)} colorScheme="red">
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
