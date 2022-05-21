import { useMemo } from 'react'

import { LocalTerraNetwork, TerraAssetsPathEnum, TerraNetworkEnum } from 'types'
import useTerraAssets from './useTerraAssets'

export const defaultTerraNetworks: Record<TerraNetworkEnum, LocalTerraNetwork> =
  {
    mainnet: {
      name: TerraNetworkEnum.mainnet,
      chainID: 'columbus-5',
      lcd: 'https://lcd.terra.dev',
      fcd: 'https://fcd.terra.dev',
      mantle: 'https://mantle.terra.dev',
      walletconnectID: 1,
    },
    testnet: {
      name: TerraNetworkEnum.testnet,
      chainID: 'bombay-12',
      lcd: 'https://bombay-lcd.terra.dev',
      fcd: 'https://bombay-fcd.terra.dev',
      mantle: 'https://bombay-mantle.terra.dev',
      walletconnectID: 0,
    },
  }

const useTerraNetwork = (): {
  getTerraNetworkByName: (
    name: TerraNetworkEnum
  ) => LocalTerraNetwork | undefined
  getTerraNetworkByWalletconnectID: (
    id: number
  ) => LocalTerraNetwork | undefined
} => {
  const { data } = useTerraAssets<Record<TerraNetworkEnum, LocalTerraNetwork>>({
    path: TerraAssetsPathEnum.chains,
  })

  const networkList: LocalTerraNetwork[] = useMemo(() => {
    const getOptions = (net: TerraNetworkEnum): LocalTerraNetwork => {
      return { ...defaultTerraNetworks[net], ...data?.[net] }
    }

    return [
      getOptions(TerraNetworkEnum.mainnet),
      getOptions(TerraNetworkEnum.testnet),
    ]
  }, [data])

  const getTerraNetworkByName = (
    name: TerraNetworkEnum
  ): LocalTerraNetwork | undefined => {
    return networkList.find((x) => x.name === name)
  }

  const getTerraNetworkByWalletconnectID = (
    id: number
  ): LocalTerraNetwork | undefined => {
    return networkList.find((x) => x.walletconnectID === id)
  }

  return {
    getTerraNetworkByName,
    getTerraNetworkByWalletconnectID,
  }
}

export default useTerraNetwork
