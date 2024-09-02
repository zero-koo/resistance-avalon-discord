import { createContext } from "react";
import type { DiscordSDK } from '@discord/embedded-app-sdk'
import { getDiscordClient } from "playroomkit";

export const DiscordSdkContext = createContext<DiscordSDK | null>(null)

export const DiscordSdkProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const discordSdk = getDiscordClient() as unknown as DiscordSDK | undefined
  if (!discordSdk) {
    throw Error('DiscordSdkProvider should be provided after discord client is initialized!')
  }
  return <DiscordSdkContext.Provider value={discordSdk}>{children}</DiscordSdkContext.Provider>
}
