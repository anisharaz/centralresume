#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")"
mkdir -p dockertmp

cp -rL ./prisma ./dockertmp/prisma
mkdir -p dockertmp/src
cp -rL ./src/meta ./dockertmp/src/meta

docker buildx build --progress=plain  --load --tag native_porotocol_backend:latest .

rm -rf dockertmp

