# Fail on error
set -e

# Echo commands
set -x

# Diagnostics
node --version
npm --version

# Install
[ ! -d "node_modules" ] && npm ci

# Build

# Start
pushd "packages/proj-api"
#npm run build
npm run start
popd
