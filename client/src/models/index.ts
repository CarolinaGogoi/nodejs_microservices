export interface Block{
    height: number;
    hash: string;
    time: number;
    main_chain: boolean;
}

export interface BlocksResponse{
    blocks: [Block];
}

export interface BlockDetails{
    size: number;
    block_index: number;
    prev_block: string;
    tx: [Transaction];
    txnCount: number;
}

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
