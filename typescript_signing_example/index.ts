import { CompassApiSDK } from "@compass-labs/api-sdk";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import { http } from "viem";
import { createWalletClient } from "viem";
import dotenv from "dotenv";
import { SendTransactionRequest } from "viem";
import { base } from 'viem/chains';


dotenv.config();



const main = async () => {


    const COMPASS_API_KEY = process.env.COMPASS_API_KEY as string;
    const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;
    const WALLET_ADDRESS = process.env.WALLET_ADDRESS as `0x${string}`;
    const SPECIFIC_MORPHO_VAULT = process.env.SPECIFIC_MORPHO_VAULT as `0x${string}`;
    const BASE_RPC_URL = process.env.BASE_RPC_URL as string;
    const compass = new CompassApiSDK({apiKeyAuth: COMPASS_API_KEY});


    const account = privateKeyToAccount(PRIVATE_KEY);


    const walletClient = createWalletClient({
        account: account,
        chain: base,
        transport: http(BASE_RPC_URL as string),
    });

    const UnsignedTransaction = await compass.universal.allowanceSet({
        token: "USDC",
        contract: SPECIFIC_MORPHO_VAULT,
        amount: 1.5,
        chain: "base:mainnet",
        sender: WALLET_ADDRESS,
    });

console.log(UnsignedTransaction)

const tx = await walletClient.sendTransaction(UnsignedTransaction as unknown as SendTransactionRequest);

console.log(tx)


}

main()


