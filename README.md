# Jayanta-Gogoi-Coding-Challenge

Let's go through the readme file to understand the project work and source code execution flow.

The Backend Part is developed on NodeJs, and the Frontend part is built on  React Js. Both the project written on Typescript.

Usages Libraries:
- Express
- Redis
- Axios
- redux, react-redux
- materializecss

Back-end APIs communicate with Blockchain APIs through Server to Server call with the help of axios library and temporarily preserve the respective data on in-memory cache for better availability of requested data from the client. The following endpoints are exposed to the client.

- Get Latest Blocks:  
    
		Method Type: GET
		Content-Type: application/json
		URL: http://server_url/blocks
		
		Example response:
		{
        "blocks": [
            {
              "height": 66XXX,
              "hash": "000XXXX",
              "time": 160XXXX,
              "main_chain": true
            },
	          { .. more}
           ]
       }

- Get Block Details:  
    
		Method Type: GET
		Content-Type: application/json
		URL: http://server_url/block/[block_hash]
		
		Example response:
		{
        "ver": 671XXXX,
        "next_block": [],
        "time": 16XXXX,
        "bits": 386XXXX,
        "fee": 70XXXX,
        "nonce": -2104XXXX,
        "n_tx": 13XXXX,
        "size": 12XXXX,
        "block_index": 0,
        "main_chain": true,
        "height": 66XXXXX,
        "weight": 39XXXX,
        "hash": "000XXX",
        "prev_block": "0000XXXX",
        "mrkl_root": "f37XXX",
        "tx": [ { .. first 10 transactions}]
       }

- Get More Transactions Details:  
    
		Method Type: GET
		Content-Type: application/json
		URL: http://server_url/transactions/[block_hash]
		
		Example response:
		{
        "ver": 671XXXX,
        "next_block": [],
        "time": 16XXXX,
        "bits": 386XXXX,
        "fee": 70XXXX,
        "nonce": -2104XXXX,
        "n_tx": 13XXXX,
        "size": 12XXXX,
        "block_index": 0,
        "main_chain": true,
        "height": 66XXXXX,
        "weight": 39XXXX,
        "hash": "000XXX",
        "prev_block": "0000XXXX",
        "mrkl_root": "f37XXX",
        "tx": [ { ..list of all transactions from cache}]
       }

Backend API consists of three services to accomplish the final result, and cache middleware is used to handle the swift response to saving network provider network calls.

- <b>Block Services:</b>  It responds to the client's requested data by making a live call to the provider and evaluating the data for future usages to give a quick response.
- <b>Express App:</b> It handles all route and middleware-related functionality to hooking up Block Services and acts as a server to listen to a specified port.
- <b>Cache Service:</b> It is simply creating a Redis client to handle the in-memory storage for a temporary period to make data availability more efficient. 

Now let's understand the workflow of request execution:
Once we send a request to the server, it will look for existing data on in-memory cache storage against the specified logic, and if data exist, it will respond with the copy where the client will receive it instantly. 

If data is not present or never searched for, the server will make a live call to the provider for the first time. It will preserve the response data against a key and forward the same to the client by normalizing the amount of data for a faster process. If the client is requesting more information, the server will respond to the preserve data from the cache.

The front-end is a simple application with two screens that handle the responses and present them to the user.

Initially, when the landing page is loading, it sends a get request to the server for the latest blocks. Axios is used to make all network requests, and redux used to handle all global state changes. 

The following major components are used to obtain the outcome.
  
<b>Home Screen:</b>  It handles the render of the latest blocks and gives options to view details of the block.

Used Actions: Load latest blocks if not loaded

     useEffect(() => {
      if(!Array.isArray(blocks)){
          dispatch(OnGetBlocks())
      }     
    }, []);

<b>View Details Screen:</b> It handles the render of the block details as specified on product requirements, and additionally, it is displaying related transactions of the block.

Used Actions: Load  block details and get more transactions

    useEffect(() => {
        dispatch(OnGetBlockDetails(hash, false));
    }, []);

    // Load More Transactions
    const onTapViewMore = () => {
        dispatch(OnGetBlockDetails(hash, true));
    }

<b>Scope of improvement:</b>

We can make it more interesting by introducing NoSQL for keeping requested data to make consistent availability. But it will depend on the business logic and data changes policy. 
Another area to improve for processing the requested data normalize to small chunks to respond quickly. The block details transactions are sometimes coming with huge numbers, and it will be costly to handle on the client-side. So rather than sending it as it is, we can normalize it to make it more concise.

Front-end perspective, we can make it more interactive by changing the look and feels by introducing some UI library or making some awesome CSS changes.  For example, we can show some loading progress bar on fetching data and representation of data on the page.

Deploy: We can use docker to deploy our build on production through AWS or other cloud environment through the CICD process.
