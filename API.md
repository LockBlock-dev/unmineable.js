# Website Methods

<dl>
<dt><a href="#calculate">web.calculate(algo, coin, hashrate)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get calculated reward for a coin.</p>
</dd>
<dt><a href="#coin">web.coin(coin, more)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a coin info.</p>
</dd>
<dt><a href="#coins">web.coins()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get all pool coins.</p>
</dd>
<dt><a href="#news">web.news()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the pool news.</p>
</dd>
<dt><a href="#pay">web.pay(uuid)</a> ⇒ <code>Promise</code></dt>
<dd><p>Ask a payment for a coin.</p>
</dd>
<dt><a href="#payouts">web.payouts(uuid, page)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a coin payouts.</p>
</dd>
<dt><a href="#setAutoPay">web.setAutoPay(uuid, setting)</a> ⇒ <code>Promise</code></dt>
<dd><p>Set your auto payment setting for a coin.</p>
</dd>
<dt><a href="#stats">web.stats()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the pool status.</p>
</dd>
<dt><a href="#version">web.version()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the website version.</p>
</dd>
<dt><a href="#wallet">web.wallet(address, coin)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a wallet stats.</p>
</dd>
</dl>

---

# Miner Methods

<dl>
<dt><a href="#version">miner.version()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get the miner version.</p>
</dd>
<dt><a href="#coins">miner.coins()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get all miner coins.</p>
</dd>
<dt><a href="#wallet">miner.wallet(address, coin)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a wallet stats.</p>
</dd>
</dl>

---

# Website Methods

<a name="calculate"></a>

## web.calculate(algo, coin, hashrate) ⇒ <code>Promise</code>
Get calculated reward for a coin.

**Kind**: method  
**Returns**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| algo | <code>String</code> | algorithm |
| coin | <code>String</code> | coin symbol |
| hashrate | <code>Number</code> | hashrate for this algorithm |

**Example**  
```js
web.calculate("ethash", "DOGE", 30)
```

<a name="coin"></a>

## web.coin(coin, more) ⇒ <code>Promise</code>
Get a coin info.

**Kind**: method  
**Returns**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| coin | <code>String</code> | coin symbol |
| more | <code>Boolean</code> | show more infos: payment info + rewards |

**Example**  
```js
web.coin("ETH")
web.coin("ETH", true)
```

<a name="coins"></a>

## web.coins() ⇒ <code>Promise</code>
Get all pool coins.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**  
```js
web.coins()
```

<a name="news"></a>

## web.news() ⇒ <code>Promise</code>
Get the pool news.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**  
```js
web.news()
```

<a name="pay"></a>

## web.pay(uuid) ⇒ <code>Promise</code>
Ask a payment for a coin.

**Kind**: method  
**Returns**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>String</code> | uuid: can be found in client.web.wallet() |

**Example**  
```js
web.pay("0cc5691e-cedb-11eb-b8bc-0242ac130003")
```

<a name="payouts"></a>

## web.payouts(uuid, page) ⇒ <code>Promise</code>
Get a coin payouts.

**Kind**: method  
**Returns**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>String</code> | uuid: can be found in client.web.wallet() |
| page | <code>Number</code> | payouts page |

**Example**  
```js
web.payouts("0cc5691e-cedb-11eb-b8bc-0242ac130003")
web.payouts("0cc5691e-cedb-11eb-b8bc-0242ac130003", 1)
```

<a name="setAutoPay"></a>

## web.setAutoPay(uuid, setting) ⇒ <code>Promise</code>
Set your auto payment setting for a coin.

**Kind**: method  
**Returns**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>String</code> | uuid: can be found in client.web.wallet() |
| setting | <code>Number</code> | value of the setting |

**Example**  
```js
web.setAutoPay("0cc5691e-cedb-11eb-b8bc-0242ac130003", true)
```

<a name="stats"></a>

## web.stats() ⇒ <code>Promise</code>
Get the pool status.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**  
```js
web.stats()
```

<a name="version"></a>

## web.version() ⇒ <code>Promise</code>
Get the website version.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**  
```js
web.version()
```

<a name="wallet"></a>

## web.wallet(address, coin) ⇒ <code>Promise</code>
Get a wallet stats.

**Kind**: method  
**Returns**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | wallet address |
| coin | <code>String</code> | vcoin symbol |

**Example**  
```js
web.wallet("0xfd2D76F7Cf04863F2B221E56Af6fF94105EC2e5e", "ETH")
```

---

# Miner Methods

<a name="version"></a>

## miner.version() ⇒ <code>Promise</code>
Get the miner version.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**  
```js
miner.version()
```

<a name="coins"></a>

## miner.coins() ⇒ <code>Promise</code>
Get all miner coins.

**Kind**: method  
**Returns**: <code>Promise</code>  
**Example**  
```js
miner.coins()
```

<a name="wallet"></a>

## miner.wallet(address, coin) ⇒ <code>Promise</code>
Get a wallet stats.

**Kind**: method  
**Returns**: <code>Promise</code>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | wallet address |
| coin | <code>String</code> | vcoin symbol |

**Example**  
```js
miner.wallet("0xfd2D76F7Cf04863F2B221E56Af6fF94105EC2e5e", "ETH")
```
