# ANTIFY

[![github/actions/workflow/status](https://img.shields.io/github/actions/workflow/status/brtmvdl/antify/docker-push.yml)](https://img.shields.io/github/actions/workflow/status/brtmvdl/antify/docker-push.yml) [![github/license](https://img.shields.io/github/license/brtmvdl/antify)](https://img.shields.io/github/license/brtmvdl/antify)

# About it

See [MySQL vs Antify]()

## Setup

## How to with Docker

Install [Docker]() 

Run a container

```sh
$ docker run -d -v $HOME/data:/data -p 80:80 tmvdl/projects:antify
```

## Services

Validate our services with Postman using [docs/antify.json](./docs/antify.json)

### LOGIN

Login

```sh
curl -sSL 'http://0.0.0.0/login?username=root&password=root'

$ login --user user123 --password " abc 123 "
```

### USERS

Create a new user

```sh
curl -sSL 'http://0.0.0.0/createuser?username=user123&password=abc123&host=sub.domain.com'

$ createuser --user user123 --password " abc 123 " --host sub.domain.com
```

Show user details (grants, last modification, last access, ...)

```sh
curl -sSL 'http://0.0.0.0/describeuser?username=user123&host=sub.domain.com'

$ describeuser --user user123 --host sub.domain.com
```

Set a permission to user

```sh
# by access
curl -sSL 'http://0.0.0.0/grantuser?perm=all&access=user123@sub.domain.com&username=/files/123'

$ grantuser --perm all --access user123@sub.domain.com --name /files/123

# by user and password
curl -sSL 'http://0.0.0.0/grantuser?perm=all&username=user123&host=sub.domain.com&username=/files/123'

$ grantuser --perm all --user user123 --host sub.domain.com --name /files/123
```

Revoke a permission from user

```sh
# by access
curl -sSL 'http://0.0.0.0/revokeuser?perm=all&access=user123@sub.domain.com&username=/files/123'

$ revokeuser --perm all --access user123@sub.domain.com --name /files/123

# by user and password
curl -sSL 'http://0.0.0.0/revokeuser?perm=all&username=user123&host=sub.domain.com&username=/files/123'

$ revokeuser --perm all --user user123 --host sub.domain.com --name /files/123
```

Delete a user and his grants

```sh
curl -sSL 'http://0.0.0.0/deleteuser?username=user123&host=sub.domain.com'

$ deleteuser --user user123 --host sub.domain.com
```

Delete all users and his grants from filter

```sh
# all (DANGER)
curl -sSL 'http://0.0.0.0/deleteallusers'

$ deleteallusers

# users with name "user123"
curl -sSL 'http://0.0.0.0/deleteallusers?username=user123'

$ deleteallusers --user user123

# users from host "sub.domain.com"
curl -sSL 'http://0.0.0.0/deleteallusers?host=sub.domain.com'

$ deleteallusers --host sub.domain.com
```

List all users and his grants

```sh
# all (DANGER)
curl -sSL 'http://0.0.0.0/listallusers'

$ listallusers

# users with name "user123"
curl -sSL 'http://0.0.0.0/listallusers?username=user123'

$ listallusers --user user123

# users from host "sub.domain.com"
curl -sSL 'http://0.0.0.0/listallusers?host=sub.domain.com'

$ listallusers --host sub.domain.com
```

### DIRECTORIES

Create a new directory

```sh
# private directory
curl -sSL 'http://0.0.0.0/createdir?dirname=/dir123&recursive'

$ createdir --name /dir123 --recursive

# public directory
curl -sSL 'http://0.0.0.0/createdir?dirname=/dir123&recursive&public'

$ createdir --name /dir123 --recursive --public
```

List all in a directory

```sh
# with hidden
curl -sSL 'http://0.0.0.0/listdir?dirname=/dir123&hidden'

$ listdir --name /dir123 --hidden

# without hidden
curl -sSL 'http://0.0.0.0/listdir?dirname=/dir123'

$ listdir --name /dir123
```

Set a directory acessible to all users

```sh
# write and read
curl -sSL 'http://0.0.0.0/publicdir?dirname=/dir123'

$ publicdir --name /dir123

# read only
curl -sSL 'http://0.0.0.0/publicdir?dirname=/dir123&readonly'

$ publicdir --name /dir123 --readonly
```

Set a directory acessible to granted users

```sh
curl -sSL 'http://0.0.0.0/privatedir?dirname=/dir123'

$ privatedir --name /dir123
```

Delete a directory and his grants

```sh
curl -sSL 'http://0.0.0.0/deletedir?dirname=/dir123&force'

$ deletedir --name /dir123 --force
```

### FILES

Create a new file

```sh
# private file
curl -sSL 'http://0.0.0.0/createfile?filename=/file123&recursive'

$ createfile --name /file123 --recursive

# public file
curl -sSL 'http://0.0.0.0/createfile?filename=/file123&recursive&public'

$ createfile --name /file123 --recursive --public
```

List all in a file

```sh
# with hidden
curl -sSL 'http://0.0.0.0/listfile?filename=/file123&hidden'

$ listfile --name /file123 --hidden

# without hidden
curl -sSL 'http://0.0.0.0/listfile?filename=/file123'

$ listfile --name /file123
```

Read a file content

```sh
curl -sSL 'http://0.0.0.0/readfile?filename=/file123'

$ readfile --name /file123
```

Write in a text file

```sh
curl -sSL 'http://0.0.0.0/writetext?filename=/file123&content=text'

# POST [multipart/formdata] http://0.0.0.0/writetext?filename=/file123

# by eof
$ writetext --name /file123 --eof ....
text
....

# by bytes
$ writetext --name /file123 --bytes 5
text

```

Write in a binary file

```sh
curl -X POST -F file=@app.js 'http://0.0.0.0/writefile?filename=/photo.jpg'

$ writefile --name /file123 --bytes 9
[12][00][24][00][48]
[nil][nil][nil][nil]
```

Delete a file and his grants

```sh
curl -sSL 'http://0.0.0.0/deletefile?filename=/file123&force'

$ deletefile --name /file123 --force
```
