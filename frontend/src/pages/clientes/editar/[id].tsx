import Head from "next/head"
import { useEffect, useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import Link from "next/link"

import { Header } from "../../../components/Header"
import { Sidebar } from "../../../components/Sidebar"
import { Input } from "../../../components/Form/Input"
import { MaskedInput } from "../../../components/Form/MaskedInput"
import { Select } from "../../../components/Form/select"
import { api } from "../../../services/api"
import { useToast } from "../../../contexts/toast"

type EditCustomerData = {
  id: string
  name: string
  cpf: string
  phone: string
  email: string
  zip_code: string
  city: string
  state: string
  street: string
  neighborhood: string
  number: string
  complement?: string
  type: "Comercial" | "Residencial" | "Rural" | "Casa de Praia"
  secondary_customer_address: {
    zip_code_secondary?: string
    city_secondary?: string
    state_secondary?: string
    street_secondary?: string
    neighborhood_secondary?: string
    number_secondary?: string
    complement_secondary?: string
    type_secondary?: "Comercial" | "Residencial" | "Rural" | "Casa de Praia"
  }
}

const editCustomerSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatória"),
  cpf: yup.string().required("CPF obrigatório"),
  phone: yup.string().required("Telefone obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  zip_code: yup.string().required("CEP obrigatório"),
  city: yup.string().required("Cidade obrigatório"),
  state: yup.string().required("Estado obrigatório"),
  street: yup.string().required("Rua obrigatório"),
  neighborhood: yup.string().required("Bairro obrigatório"),
  number: yup.string().required("Número obrigatório"),
  type: yup.string().required("Tipo obrigatório"),
})

export default function EditCustomer() {
  const router = useRouter()

  const [customer, setCustomer] = useState<EditCustomerData[]>([])

  useEffect(() => {
    const { id } = router.query
    getCustomer(id)
  }, [])

  const getCustomer = async (id) => {
    const { data } = await api.get(`clientes/${id}`)
    setCustomer(data)
  }

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(editCustomerSchema),
  })

  const { errors } = formState

  const { addToast } = useToast()

  const handleEditCustomer: SubmitHandler<EditCustomerData> = async (data) => {
    await api.put(`clientes/${data.id}`, {
      name: data.name,
      cpf: data.cpf,
      phone: data.phone,
      email: data.email,
      zip_code: data.zip_code,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
      complement: data.complement,
      type: data.type,
      secondary_customer_address: {
        zip_code_secondary: data.zip_code_secondary,
        city_secondary: data.city_secondary,
        state_secondary: data.state_secondary,
        neighborhood_secondary: data.neighborhood_secondary,
        street_secondary: data.street_secondary,
        number_secondary: data.number_secondary,
        complement_secondary: data.complement_secondary,
        type_secondary: data.type_secondary,
      },
    })

    router.push("/clientes")

    addToast({
      type: "success",
      title: "Alterado com sucesso",
      description: "O cliente foi atualizado com sucesso.",
    })
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Editar Cliente | X Solar Tech</title>
      </Head>
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          {customer.map((customer) => (
            <Box
              as="form"
              flex="1"
              borderRadius={8}
              bg="gray.800"
              p="8"
              onSubmit={handleSubmit(handleEditCustomer)}
            >
              <Heading size="lg" fontWeight="normal">
                Editar cliente
              </Heading>
              <Divider my="6" borderColor="gray.700" />
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Box>
                  <VStack spacing="4">
                    <Input
                      type="hidden"
                      name="id"
                      defaultValue={customer.id}
                      {...register("id")}
                    />
                    <Input
                      name="name"
                      label="Nome"
                      defaultValue={customer.name}
                      error={errors.name}
                      {...register("name")}
                    />
                    <MaskedInput
                      name="cpf"
                      label="CPF"
                      mask="999.999.999-99"
                      defaultValue={customer.cpf}
                      error={errors.cpf}
                      {...register("cpf")}
                    />
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing="4">
                    <MaskedInput
                      name="phone"
                      label="Telefone"
                      mask="(99) 9999-9999"
                      defaultValue={customer.phone}
                      error={errors.phone}
                      {...register("phone")}
                    />
                    <Input
                      name="email"
                      type="email"
                      label="E-mail"
                      defaultValue={customer.email}
                      error={errors.email}
                      {...register("email")}
                    />
                  </VStack>
                </Box>
              </SimpleGrid>
              <Heading size="md" paddingTop="6" fontWeight="normal">
                Endereço principal
              </Heading>
              <Divider my="6" borderColor="gray.700" />
              <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                <Box>
                  <VStack spacing="4">
                    <MaskedInput
                      name="zip_code"
                      label="CEP"
                      mask="99999-999"
                      defaultValue={customer.zip_code}
                      error={errors.zip_code}
                      {...register("zip_code")}
                    />
                    <Input
                      name="city"
                      label="Cidade"
                      defaultValue={customer.city}
                      error={errors.city}
                      {...register("city")}
                    />
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing="4">
                    <Select
                      name="state"
                      label="Estado"
                      placeholder="Selecione"
                      defaultValue={customer.state}
                      error={errors.state}
                      {...register("state")}
                    >
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </Select>
                    <Input
                      name="neighborhood"
                      label="Bairro"
                      defaultValue={customer.neighborhood}
                      error={errors.neighborhood}
                      {...register("neighborhood")}
                    />
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing="4">
                    <Input
                      name="street"
                      label="Rua"
                      defaultValue={customer.street}
                      error={errors.street}
                      {...register("street")}
                    />
                    <Input
                      name="number"
                      label="Número"
                      defaultValue={customer.number}
                      error={errors.number}
                      {...register("number")}
                    />
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing="4">
                    <Input
                      name="complement"
                      label="Complemento"
                      defaultValue={customer.complement}
                      {...register("complement")}
                    />
                    <Select
                      name="type"
                      label="Tipo"
                      placeholder="Selecione"
                      defaultValue={customer.type}
                      error={errors.type}
                      {...register("type")}
                    >
                      <option value="Comercial">Comercial</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Rural">Rural</option>
                      <option value="Casa na Praia">Casa na praia</option>
                    </Select>
                  </VStack>
                </Box>
              </SimpleGrid>
              <Heading size="md" paddingTop="6" fontWeight="normal">
                Endereço secundário (opcional)
              </Heading>
              <Divider my="6" borderColor="gray.700" />
              <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
                <Box>
                  <VStack spacing="4">
                    <MaskedInput
                      name="zip_code_secondary"
                      label="CEP"
                      mask="99999-999"
                      defaultValue={
                        customer.secondary_customer_address.zip_code_secondary
                      }
                      {...register("zip_code_secondary")}
                    />
                    <Input
                      name="city_sencondary"
                      label="Cidade"
                      defaultValue={
                        customer.secondary_customer_address.city_secondary
                      }
                      {...register("city_secondary")}
                    />
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing="4">
                    <Select
                      name="state_secondary"
                      label="Estado"
                      placeholder="Selecione"
                      defaultValue={
                        customer.secondary_customer_address.state_secondary
                      }
                      {...register("state_secondary")}
                    >
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </Select>
                    <Input
                      name="neighborhood_secondary"
                      label="Bairro"
                      defaultValue={
                        customer.secondary_customer_address
                          .neighborhood_secondary
                      }
                      {...register("neighborhood_secondary")}
                    />
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing="4">
                    <Input
                      name="street_secondary"
                      label="Rua"
                      defaultValue={
                        customer.secondary_customer_address.street_secondary
                      }
                      {...register("street_secondary")}
                    />
                    <Input
                      name="number_secondary"
                      label="Número"
                      defaultValue={
                        customer.secondary_customer_address.number_secondary
                      }
                      {...register("number_secondary")}
                    />
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing="4">
                    <Input
                      name="complement_secondary"
                      label="Complemento"
                      defaultValue={
                        customer.secondary_customer_address.complement_secondary
                      }
                      {...register("complement_secondary")}
                    />
                    <Select
                      name="type_secondary"
                      label="Tipo"
                      placeholder="Selecione"
                      defaultValue={
                        customer.secondary_customer_address.type_secondary
                      }
                      {...register("type_secondary")}
                    >
                      <option value="Comercial">Comercial</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Rural">Rural</option>
                      <option value="Casa na Praia">Casa na praia</option>
                    </Select>
                  </VStack>
                </Box>
              </SimpleGrid>
              <Flex mt="8" justify="flex-end">
                <HStack spacing="4">
                  <Link href="/clientes" passHref>
                    <Button colorScheme="whiteAlpha">Cancelar</Button>
                  </Link>
                  <Button type="submit" colorScheme="red">
                    Atualizar
                  </Button>
                </HStack>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  )
}
