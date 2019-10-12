#!/bin/bash

set -euo pipefail

package_name=$1

script_dir=$(dirname "$(pwd)/$0")

# shellcheck disable=SC2164
pushd "$script_dir" > /dev/null

cd ..

package_folder="packages/${package_name}"

mkdir "${package_folder}"

echo "
{
    \"name\": \"@jsfsi-core/${package_name}\",
    \"version\": \"0.0.0\",
    \"scripts\": {
        \"clean\": \"npm run clean:build; rm -rf node_modules\",
        \"clean:build\": \"rm -rf dist\",
        \"lint\": \"eslint . --quiet --fix --ext .ts,.tsx\",
        \"build\": \"npm run lint && tsc\"
    },
    \"devDependencies\": {
        \"@typescript-eslint/eslint-plugin\": \"^2.3.3\",
        \"@typescript-eslint/parser\": \"^2.3.3\",
        \"eslint\": \"^6.5.1\",
        \"eslint-config-prettier\": \"^6.4.0\",
        \"eslint-plugin-prettier\": \"^3.1.1\",
        \"eslint-plugin-react\": \"^7.16.0\",
        \"eslint-plugin-react-hooks\": \"^2.1.2\",
        \"typescript\": \"3.6.4\"
    }
}
" > "${package_folder}/package.json"

echo "
{
    \"extends\": \"../../tsconfig.json\",
    \"compilerOptions\": {
        \"outDir\": \"./dist\"
    }
}
" > "${package_folder}/tsconfig.json"

mkdir "${package_folder}/src"
touch "${package_folder}/src/index.ts"
mkdir "${package_folder}/test"
touch "${package_folder}/test/index.spec.ts"

echo "console.log('Im the package ${package_folder}')" > "${package_folder}/index.ts"

yarn bootstrap

# shellcheck disable=SC2164
popd > /dev/null