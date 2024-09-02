import { useContext } from "react"
import { DiscordSdkContext } from "@/contexts/DiscordSdkContext"

export const useDiscordSdk = () => {
  const discordSdk = useContext(DiscordSdkContext)
  if (!discordSdk) {
    throw Error('DiscordSdkProvider is not provided!')
  }
  return discordSdk
}