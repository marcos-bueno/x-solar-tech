import { Stack } from "@chakra-ui/react"
import { RiDashboardLine, RiContactsLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="geral">
        <NavLink href="/" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href="/clientes" icon={RiContactsLine}>
          Clientes
        </NavLink>
      </NavSection>
    </Stack>
  )
}
