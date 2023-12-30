#!/bin/bash
set -eu

TEMP_ZIP=$(mktemp)

echo Downloading highlight.js to $TEMP_ZIP
curl -sS 'https://highlightjs.org/api/download' \
  -H 'content-type: application/json' \
  --data '{"api":2,"languages":["makefile","bash","c","cpp","csharp","css","diff","go","graphql","ini","java","javascript","json","kotlin","less","lua","makefile","markdown","objectivec","perl","php-template","php","plaintext","python-repl","python","r","ruby","rust","scss","shell","sql","swift","typescript","vbnet","wasm","xml","yaml","ini","yaml","css","less","scss","q","sql","java","q","clean","coq","elixir","elm","erlang-repl","erlang","flix","fsharp","haskell","mercury","ocaml","prolog","q","reasonml","scala","sml","xquery","lua","markdown","json","r","bash","javascript","lua","ruby","typescript","c","cpp","go","rust","swift","css","graphql","javascript","json","less","scss","wasm","xml"]}' \
  -o "$TEMP_ZIP"

echo Extracting to lib/lighlight.js
mkdir -p lib
unzip -d lib/highlight.js "$TEMP_ZIP"

echo Removing the temporary file at $TEMP_ZIP
rm "$TEMP_ZIP"
