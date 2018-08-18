/*
 * @see https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)

export default (): string => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
