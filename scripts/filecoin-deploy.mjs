import dotenv from 'dotenv';
import { NFTStorage } from 'nft.storage';
import elf from  '../metadata/chainlink-elf.mjs'
import knight from  '../metadata/chainlink-knight.mjs'
import wizard from  '../metadata/chainlink-wizard.mjs'
import orc from  '../metadata/chainlink-orc.mjs'

dotenv.config();
const apiKey = process.env.NFTSTORAGE_API_KEY;

async function main() {

const client = new NFTStorage({ token: apiKey })

const metadata = await client.store(elf);
const metadata2 = await client.store(knight);
const metadata3 = await client.store(wizard);
const metadata4 = await client.store(orc);
console.log(metadata.url);
console.log(metadata2.url);
console.log(metadata3.url);
console.log(metadata4.url);
}

main();

