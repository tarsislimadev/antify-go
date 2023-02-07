TOKEN=0000
USERNAME=username
PASSWORD=password
HOST=localhost

bash ./tests/__curl.sh "createuser?token=${TOKEN}&username=${USERNAME}&password=${PASSWORD}&host=${HOST}"
