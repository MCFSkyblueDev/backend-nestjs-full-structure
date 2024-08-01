import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Account, Contract, RpcProvider } from 'starknet';

@Injectable()
export class StarknetService {
  constructor(private readonly configService: ConfigService) {
  }

  async connectContract(contractAddress: string) {
    try {
      const provider = new RpcProvider({
        nodeUrl: this.configService.getOrThrow('RPC_PROVIDER'),
      });

      const account = new Account(
        provider,
        'config.WALLET_ADDRESS',
        'config.WALLET_PRIVATE_KEY',
      );
      const { abi } = await provider.getClassAt(contractAddress);
      return new Contract(abi, contractAddress, account);
    } catch (error) {
      throw error;
    }
  };
}
