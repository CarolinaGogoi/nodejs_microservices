import { Transaction } from './Transaction';
export interface BlockDetails{
    size: number;
    block_index: number;
    prev_block: string
    tx: [Transaction]
}