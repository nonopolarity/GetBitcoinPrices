function getMaxGain(arr) {
    if (arr.length <= 1) return 0;

    let minPriceSoFar = arr[0],
        maxPossibleGain = 0;

    arr.forEach(p => {
        minPriceSoFar = Math.min(minPriceSoFar, p);
        maxPossibleGain = Math.max(maxPossibleGain, p - minPriceSoFar);
    });

    return maxPossibleGain;
}


