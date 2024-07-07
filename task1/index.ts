const commonPrefixLength = (s1: string, s2: string): number => {
    let length = 0

    const minLength = Math.min(s1.length, s2.length)

    for (let i = 0; i < minLength; i++) {
        if (s1[i] !== s2[i]) {
            break
        }

        length++
    }

    return length
}

const commonPrefix = (inputs: string[]): number[] => {

    return inputs.map(input => {
        let totalLength = 0

        const inputLength = input.length

        for (let i = 0; i <= inputLength; i++) {
            const suffix = input.substring(i)

            totalLength += commonPrefixLength(input, suffix)
        }

        return totalLength
    });
}

console.log(commonPrefix(['abcabcd']))