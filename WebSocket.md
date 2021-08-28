# WebSocket Methods

<dl>
<dt><a href="#start">start()</a></dt>
<dd><p>Start the WebSocket.</p>
</dd>
</dl>

---

# WebSocket Events

<dl>
<dt><a href="#payment_status">payment_status</a> ⇒ <code>Event</code></dt>
<dd><p>Get payment_status.</p>
</dd>
<dt><a href="#refresh">refresh</a> ⇒ <code>Event</code></dt>
<dd><p>Refresh.</p>
</dd>
<dt><a href="#reward">reward</a> ⇒ <code>Event</code></dt>
<dd><p>Reward.</p>
</dd>
<dt><a href="#total_paid">total_paid</a> ⇒ <code>Event</code></dt>
<dd><p>Get the total paid by the pool in BTC.</p>
</dd>
<dt><a href="#total_workers">total_workers</a> ⇒ <code>Event</code></dt>
<dd><p>Get the total of workers on the pool.</p>
</dd>
<dt><a href="#worker">worker</a> ⇒ <code>Event</code></dt>
<dd><p>Get worker stats.</p>
</dd>
<dt><a href="#etchash_last_reward">etchash_last_reward</a> ⇒ <code>Event</code></dt>
<dd><p>Get last reward on Etchash.</p>
</dd>
<dt><a href="#ethash_last_reward">ethash_last_reward</a> ⇒ <code>Event</code></dt>
<dd><p>Get last reward on Ethash.</p>
</dd>
<dt><a href="#randomx_last_reward">randomx_last_reward</a> ⇒ <code>Event</code></dt>
<dd><p>Get last reward on RandomX.</p>
</dd>
<dt><a href="#x16rv2_last_reward">x16rv2_last_reward</a> ⇒ <code>Event</code></dt>
<dd><p>Get last reward on KawPow.</p>
</dd>
</dl>

---

# WebSocket Methods

## start(uuid)

Start the WebSocket.

**Kind**: method

| Param | Type                |
| ----- | ------------------- |
| uuid  | <code>String</code> |

**Example**

```js
start("0cc5691e-cedb-11eb-b8bc-0242ac130003");
```

---

# WebSocket Events

<a name="payment_status"></a>

## payment_status ⇒ <code>Event</code>

Get payment_status.

**Kind**: event

**Returns**:

```js
{
    Object,
}
```

**Example**

```js
client.on("payment_status");
```

<a name="refresh"></a>

## refresh ⇒ <code>Event</code>

Refresh.

**Kind**: event

**Returns**:

```js
{
    Object,
}
```

**Example**

```js
client.on("refresh");
```

<a name="reward"></a>

## reward ⇒ <code>Event</code>

Get reward.

**Kind**: event

**Returns**:

```js
{
    Object,
}
```

**Example**

```js
client.on("reward");
```

<a name="total_paid"></a>

## total_paid ⇒ <code>Event</code>

Get the total paid by the pool in BTC.

**Kind**: event

**Returns**:

```js
{
    total: Number,
}
```

**Example**

```js
client.on("total_paid");
```

<a name="total_workers"></a>

## total_workers ⇒ <code>Event</code>

Get the total of workers on the pool.

**Kind**: event

**Returns**:

```js
{
    total: Number,
}
```

**Example**

```js
client.on("total_workers");
```

<a name="worker"></a>

## worker ⇒ <code>Event</code>

Get worker stats.

**Kind**: event

**Returns**:

```js
{
    name: String,
    reportedHashrate: Number,
    calculatedHashrate: Number,
    lastShareAt: Number,
    online: Boolean,
}
```

**Example**

```js
client.on("worker");
```

<a name="etchash_last_reward"></a>

## etchash_last_reward ⇒ <code>Event</code>

Get last reward on Etchash.

**Kind**: event

**Returns**:

```js
{
    timestamp: Number,
}
```

**Example**

```js
client.on("etchash_last_reward");
```

<a name="ethash_last_reward"></a>

## ethash_last_reward ⇒ <code>Event</code>

Get last reward on Ethash.

**Kind**: event

**Returns**:

```js
{
    timestamp: Number,
}
```

**Example**

```js
client.on("ethash_last_reward");
```

<a name="randomx_last_reward"></a>

## randomx_last_reward ⇒ <code>Event</code>

Get last reward on RandomX.

**Kind**: event

**Returns**:

```js
{
    timestamp: Number,
}
```

**Example**

```js
client.on("randomx_last_reward");
```

<a name="x16rv2_last_reward"></a>

## x16rv2_last_reward ⇒ <code>Event</code>

Get last reward on KawPow.

**Kind**: event

**Returns**:

```js
{
    timestamp: Number,
}
```

**Example**

```js
client.on("x16rv2_last_reward");
```
