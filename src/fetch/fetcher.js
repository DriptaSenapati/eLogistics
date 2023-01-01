import { trackPromise } from "react-promise-tracker";


export const fetcher = async function(
    path,
    options,
    trackPromiseId = null,
    keepTrack = true
) {
    if (keepTrack) {
        const promise = trackPromise(
            fetch(path, options),
            trackPromiseId
        )
        return promise
    } else {
        const promise = fetch(path, options)
        return promise
    }
}