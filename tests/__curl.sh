ADDRESS="0.0.0.0"

PORT="80"

docker-compose exec app /usr/bin/curl -isSL "${ADDRESS}:${PORT}/$@" 
