import Head from "next/head"
import { Flex } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"

export default function ListCustomers() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Dashboard | X Solar Tech</title>
      </Head>
      <SidebarDrawerProvider>
        <Flex direction="column" h="100vh">
          <Header />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
          </Flex>
        </Flex>
      </SidebarDrawerProvider>
    </>
  )
}
