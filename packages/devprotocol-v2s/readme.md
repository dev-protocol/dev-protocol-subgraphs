## Authentication

```bash
> graph auth --product hosted-service <ACCESS_TOKEN>
```

## Deploy

```bash
> yarn workspace @subgraph/devprotocol-v2s [p:matic|p:arb]
> yarn workspace @subgraph/devprotocol-v2s codegen
> yarn workspace @subgraph/devprotocol-v2s build
> yarn workspace @subgraph/devprotocol-v2s deploy [dev-protocol/polygon-v2|dev-protocol/arbitrum-one-v2]
```
