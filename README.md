# phase2-wasm

This demo generates contributions for phase 2 of trusted setup MPC in a browser using WebAssembly  

## How to install

```sh
git clone --recursive https://github.com/tornadocash/phase2-wasm
npm install
```

## How to run in debug mode

```sh
# Builds the project and opens it in a new browser tab. Auto-reloads when the project changes.
npm start
```

## How to build in release mode

```sh
# Builds the project and places it into the `dist` folder.
npm run build
```

## Project structure

* `webpack.config.js` config that is used to build .wasm and other project files
* `phase2-bn254/phase2` trusted setup crate, we build .wasm module from it
* `js/index.js` main frontend script that calls .wasm to generate the contribution
* `static/index.html` empty index file that just includes .js
* `static/params.bin` example previous contribution

This example uses static previous contribution file and outputs new contribution to console. On prod this should be handled by the server.