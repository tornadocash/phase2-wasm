import("../pkg/index.js").catch(console.error);

async function main() {
    const pkg = await import("../pkg/index.js")
    console.log('Downloading previous contribution from /params.bin')
    let params = await fetch('params.bin')
    params = new Uint8Array(await params.arrayBuffer())
    const entropy = new Uint8Array(32)
    window.crypto.getRandomValues(entropy)
    console.log('Contributing with entropy', entropy) // shouldn't be logged on prod
    const result = pkg.contribute(params, entropy)
    console.log('Your contribution', result)
    console.log('Contribution raw data:', '0x' + Buffer.from(result).toString('hex'))
}

main()