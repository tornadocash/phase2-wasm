import("../pkg/index.js").catch(console.error);

async function main() {
    const pkg = await import("../pkg/index.js")
    console.log('Downloading previous contribution from /params.bin')
    const params = await fetch('params.bin')
    params = new Uint8Array(await params.arrayBuffer())

    const userInput = prompt('Please enter some random symbols')
    if (!userInput.length) {
        throw new Error('Zero symbols entered')
    }
    const msgBuffer = new TextEncoder('utf-8').encode(userInput)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer)
    const entropyFromUser = new Uint8Array(hashBuffer)
    const entropyFromBrowser = window.crypto.getRandomValues(new Uint8Array(32))
    const entropy = new Uint8Array(entropyFromBrowser.length)
    for (let i = 0; i < entropyFromBrowser.length; i++) {
      entropy[i] = entropyFromBrowser[i] ^ entropyFromUser[i]
    }

    console.log('Contributing with entropy', entropy) // shouldn't be logged on prod
    const result = pkg.contribute(params, entropy)
    console.log('Your contribution', result)
    console.log('Contribution raw data:', '0x' + Buffer.from(result).toString('hex'))
}

main()