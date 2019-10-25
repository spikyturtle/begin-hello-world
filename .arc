@app
wonder-p3m

@static

@http
get /
get /api
post /api
post /fresh-api

@scheduled
test_schedule rate (1 hour)

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
