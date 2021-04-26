import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { cloneElement, ReactElement } from "react"

type ActiveLinkProps = {
  children: ReactElement
  shouldMatchExactHref?: boolean
} & LinkProps

export function ActiveLink({
  children,
  shouldMatchExactHref = true,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter()

  let isActive = false

  if ((shouldMatchExactHref && asPath === rest.href) || asPath === rest.as) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "red.400" : "gray.50",
      })}
    </Link>
  )
}
