import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  HStack,
  Center,
  useDisclosure,
} from "@chakra-ui/react"
import Link from "next/link"
import { RiAddLine, RiDeleteBin2Line, RiPencilLine } from "react-icons/ri"

import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { SidebarDrawerProvider } from "../../contexts/SidebarDrawerContext"
import { DialogModal } from "../../components/DialogModal"
import { useToast } from "../../contexts/toast"
import { api } from "../../services/api"

interface Customer {
  id: string
  name: string
  cpf: string
  phone: string
  email: string
  zip_code: string
  city: string
  state: boolean
  street: string
  neighborhood: string
  number: number
  complement?: string
  type: "comercial" | "residencial" | "rural" | "casa de praia"
  secondary_customer_address: {
    id?: string
    zip_code_secondary?: string
    city_secondary?: string
    state_secondary?: string
    street_secondary?: string
    neighborhood_secondary?: string
    number_secondary?: number
    complement_secondary?: string
    type_secondary?: "comercial" | "residencial" | "rural" | "casa de praia"
  }
}

export default function CustomersList() {
  const router = useRouter()
  const { addToast } = useToast()

  const [customers, setCustomers] = useState<Customer[]>([])
  const [customerModal, setCustomerModal] = useState({})

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    api.get("clientes").then((response) => {
      setCustomers(response.data)
    })
  }, [customers])

  const handleOpenDialogModal = ({ id, name }) => {
    setCustomerModal({ id, name })
    onOpen()
  }

  const handleDeleteCustomer = async (id) => {
    await api.delete(`clientes/${id}`)

    onClose()
    router.push("/clientes")

    addToast({
      type: "success",
      title: "Removido com sucesso",
      description: "O cliente foi removido com sucesso.",
    })
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Clientes | X Solar Tech</title>
      </Head>
      <SidebarDrawerProvider>
        <Box>
          <Header />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.800" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal">
                  Clientes
                </Heading>
                <Link href="/clientes/adicionar" passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize={15}
                    colorScheme="green"
                    leftIcon={<Icon as={RiAddLine} display="flex" />}
                  >
                    Criar novo
                  </Button>
                </Link>
              </Flex>
              <Box overflowX="auto" w={["240px", "650px", "1020px"]}>
                {customers.length > 0 ? (
                  <Table colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th px="6" color="gray.300" width="8">
                          <Checkbox colorScheme="red" />
                        </Th>
                        <Th>Nome/E-mail</Th>
                        <Th>CPF</Th>
                        <Th>Telefone</Th>
                        <Th>CEP</Th>
                        <Th>Cidade</Th>
                        <Th>Estado</Th>
                        <Th>Bairro</Th>
                        <Th>Rua</Th>
                        <Th>Número</Th>
                        <Th>Complemento</Th>
                        <Th>Tipo</Th>
                        <Th>Ações</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {customers.map((customer) => (
                        <Tr key={customer.id}>
                          <Td px="6">
                            <Checkbox colorScheme="red" />
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="bold">{customer.name}</Text>
                              <Text fontSize="sm" color="gray.300">
                                {customer.email}
                              </Text>
                            </Box>
                          </Td>
                          <Td>{customer.cpf}</Td>
                          <Td>{customer.phone}</Td>
                          <Td>{customer.zip_code}</Td>
                          <Td>{customer.city}</Td>
                          <Td>{customer.state}</Td>
                          <Td>{customer.neighborhood}</Td>
                          <Td>{customer.street}</Td>
                          <Td>{customer.number}</Td>
                          <Td>{customer.complement}</Td>
                          <Td>{customer.type}</Td>
                          <Td>
                            <HStack spacing="4">
                              <Link
                                href={`/clientes/editar/${customer.id}`}
                                passHref
                              >
                                <Button
                                  as="a"
                                  size="sm"
                                  fontSize={15}
                                  colorScheme="blue"
                                  leftIcon={
                                    <Icon as={RiPencilLine} display="flex" />
                                  }
                                >
                                  Editar
                                </Button>
                              </Link>
                              <Button
                                onClick={() =>
                                  handleOpenDialogModal({
                                    id: customer.id,
                                    name: customer.name,
                                  })
                                }
                                size="sm"
                                fontSize={15}
                                colorScheme="red"
                                leftIcon={
                                  <Icon as={RiDeleteBin2Line} display="flex" />
                                }
                              >
                                Excluir
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Center>Nenhum cliente encontrado!</Center>
                )}
              </Box>
            </Box>
          </Flex>
        </Box>
        <DialogModal
          customer={customerModal}
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteCustomer}
        />
      </SidebarDrawerProvider>
    </>
  )
}
