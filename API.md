<dl>
<dt><a href="#calculate">calculate(body)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get calculated reward for a coin.</p>
</dd>
<dt><a href="#coins">coins(coin)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get coins list | a coin info.</p>
</dd>
<dt><a href="#news">news()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the pool news.</p>
</dd>
<dt><a href="#pay">pay(uuid)</a> ⇒ <code>Promise</code></dt>
<dd><p>Ask a payment for a coin.</p>
</dd>
<dt><a href="#payouts">payouts(uuid, params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a coin payouts.</p>
</dd>
<dt><a href="#pool">pool()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the pool info.</p>
</dd>
<dt><a href="#referral">referral(uuid)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get your referral code.</p>
</dd>
<dt><a href="#settings">settings(body)</a> ⇒ <code>Promise</code></dt>
<dd><p>Set settings for a coin (1 at a time).</p>
</dd>
<dt><a href="#stats">stats()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the pool stats.</p>
</dd>
<dt><a href="#version">version(params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the website | miner version.</p>
</dd>
<dt><a href="#wallet">wallet(params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a wallet | account stats.</p>
</dd>
<dt><a href="#workers">workers(uuid)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get your workers stats.</p>
</dd>
</dl>

---

<a name="calculate"></a>

## calculate(algo, coin, hashrate) ⇒ <code>Promise</code>

Get calculated reward for a coin.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param    | Type                | Description                 |
| -------- | ------------------- | --------------------------- |
| algo     | <code>String</code> | algorithm                   |
| coin     | <code>String</code> | coin symbol                 |
| hashrate | <code>Number</code> | hashrate for this algorithm |

**Example**

```js
calculate("ethash", "DOGE", 30);
```

<a name="coin"></a>

## coin(coin, more) ⇒ <code>Promise</code>

Get a coin info.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param | Type                 | Description                             |
| ----- | -------------------- | --------------------------------------- |
| coin  | <code>String</code>  | coin symbol                             |
| more  | <code>Boolean</code> | show more infos: payment info + rewards |

**Example**

```js
coin("ETH");
coin("ETH", true);
```

<a name="coins"></a>

## coins() ⇒ <code>Promise</code>

Get all pool coins.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**

```js
coins();
```

<a name="news"></a>

## news() ⇒ <code>Promise</code>

Get the pool news.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**

```js
news();
```

<a name="pay"></a>

## pay(uuid) ⇒ <code>Promise</code>

Ask a payment for a coin.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param | Type                | Description                           |
| ----- | ------------------- | ------------------------------------- |
| uuid  | <code>String</code> | uuid: can be found in client.wallet() |

**Example**

```js
pay("0cc5691e-cedb-11eb-b8bc-0242ac130003");
```

<a name="payouts"></a>

## payouts(uuid, page) ⇒ <code>Promise</code>

Get a coin payouts.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param | Type                | Description                           |
| ----- | ------------------- | ------------------------------------- |
| uuid  | <code>String</code> | uuid: can be found in client.wallet() |
| page  | <code>Number</code> | payouts page                          |

**Example**

```js
payouts("0cc5691e-cedb-11eb-b8bc-0242ac130003");
payouts("0cc5691e-cedb-11eb-b8bc-0242ac130003", 1);
```

<a name="pool"></a>

## pool() ⇒ <code>Promise</code>

Get the pool info.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**

```js
pool();
```

<a name="referral"></a>

## referral(uuid) ⇒ <code>Promise</code>

Get your referral code.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param | Type                | Description                           |
| ----- | ------------------- | ------------------------------------- |
| uuid  | <code>String</code> | uuid: can be found in client.wallet() |

**Example**

```js
referral("0cc5691e-cedb-11eb-b8bc-0242ac130003");
```

<a name="settings"></a>

## settings(body) ⇒ <code>Promise</code>

Set settings for a coin (1 at a time).

**Kind**: method  
**Returns**: <code>Promise</code>

| Param              | Type                 | Description                           |
| ------------------ | -------------------- | ------------------------------------- |
| body               | <code>Object</code>  | request body                          |
| body<area>.uuid    | <code>String</code>  | uuid: can be found in client.wallet() |
| body<area>.autoPay | <code>Boolean</code> | auto pay setting                      |
| body<area>.network | <code>String</code>  | network setting                       |

**Example**

```js
settings({ uuid: "0cc5691e-cedb-11eb-b8bc-0242ac130003", autoPay: true });
settings({ uuid: "0cc5691e-cedb-11eb-b8bc-0242ac130003", network: "BSC" });
```

<a name="stats"></a>

## stats() ⇒ <code>Promise</code>

Get the pool stats.

**Kind**: method  
**Returns**: <code>Promise</code>

**Example**

```js
stats();
```

<a name="version"></a>

## version(params) ⇒ <code>Promise</code>

Get the website | miner version.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param             | Type                | Description           |
| ----------------- | ------------------- | --------------------- |
| params            | <code>Object</code> | query params          |
| params<area>.type | <code>String</code> | type: website / miner |

**Example**

```js
version({ type: "website" });
version({ type: "miner" });
```

<a name="wallet"></a>

## wallet(params) ⇒ <code>Promise</code>

Get a wallet | account stats.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param                | Type                | Description    |
| -------------------- | ------------------- | -------------- |
| params               | <code>Object</code> | query params   |
| params<area>.address | <code>String</code> | wallet address |
| params<area>.uuid    | <code>String</code> | uuid           |
| params<area>.coin    | <code>String</code> | coin symbol    |

**Example**

```js
wallet({ address: "0xfd2D76F7Cf04863F2B221E56Af6fF94105EC2e5e", coin: "ETH" });
wallet({ uuid: "0cc5691e-cedb-11eb-b8bc-0242ac130003" });
```

<a name="workers"></a>

## workers(uuid) ⇒ <code>Promise</code>

Get your workers stats.

**Kind**: method  
**Returns**: <code>Promise</code>

| Param | Type                | Description                           |
| ----- | ------------------- | ------------------------------------- |
| uuid  | <code>String</code> | uuid: can be found in client.wallet() |

**Example**

```js
workers("0cc5691e-cedb-11eb-b8bc-0242ac130003");
```
