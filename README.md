# Lerna Bootstrap

Mono repo to be used as a system implementation bootstrap.
It contains the following technologies:

- eslint for typescript linting
- prettier to apply eslint rules automatically
- lerna for configuring the monorepo
- typescript as the preferable language for implementation. This doesn't mean other languages can not be used.
- nodejs for backend implementation
- reactjs for frontend implementation
- react-native for cross-platform mobile implementation

## Requirements

### Visual Studio Code latest

### NodeJS 12.11.1

#### NodeJS Installation

- MAC OS X

```sh
brew install node
sudo npm install -g n
sudo n 12.11.1
```

## Setup project

```sh
npm run setup
npm run build
```

## Create new package

```sh
./scripts/new-package.sh package-name
```

## Build all packages

```sh
yarn build
```

## Lint all packages

```sh
npm run lint
```

## Build package

```sh
cd packages/<package-name>
npm run build
```

## Add dependencies to packages

```sh
node_modules/.bin/lerna add <dependency> --scope=<package_name>
```

## Update dependencies in packages

```sh
node_modules/.bin/lerna exec --scope=<package_name> -- npm update <dependency>
```

## Execute command in packages

```sh
node_modules/.bin/lerna exec --scope=<package_name> -- <command>
```

## Convert pfx to key and crt

SSL Checker: <https://www.digicert.com/help/>

```sh
openssl pkcs12 -in <filename.pfx> -nocerts -out private.key
openssl pkcs12 -in <filename.pfx> -clcerts -nokeys -out certificate.crt
openssl rsa -in private.key -out decrypted-private.key
```
