
export interface Transaction{
    hash: string;
    ver: number;
    size: number;
    block_height: number;
    weight: number;
    fee: number;
    time: number;
    block_index: number;
    input: [any];
    out: [any]
} 
