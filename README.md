# REST Proxy

Very simple selfhostable proxy service for REST requests.

## Usage

Lets say you want to send a request:

`POST https://example.com/api/foo/bar`

Body:

```json
{
  "foo": true,
  "bar": "baz"
}
```

Headers:

```yaml
Authorization: Bearer your_token_here
```

Then you can send a request to the proxy like this:

`POST https://rest-proxy.com/proxy`

Body:

```json
{
  "url": "https://example.com/api/foo/bar",
  "method": "POST",
  "body": {
    "foo": true,
    "bar": "baz"
  },
  "headers": {
    "Authorization": "Bearer your_token_here"
  }
}
```

Headers:

```yaml
Authorization: Bearer your_proxy_token_here
```

(You can configure the proxy to require an authorization token.)
