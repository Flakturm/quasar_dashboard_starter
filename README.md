# Quasar dashboard

Example SPA dashboard to be used with a Laravel 8 project.

## Demo

Use `admin@example.local` and password `test1234` to login.

## Local setup

### Install the dependencies

```bash
npm i
```

### Start the app in development mode

```bash
quasar dev
```

## Deployment in production

### Setup

```bash
# install dependencies
npm i

# setup env
nano env.development
## Adjust API_BASE_URL
```

### Build

```bash
quasar build

# Adjust your server configuration according to
# https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

# For Apache(optional)
cp .htaccess dist/spa
```

Deploy on your server.

**Note**: If you use HTTPS, use the protocol in your `.env.development` or `.env.production` file.
