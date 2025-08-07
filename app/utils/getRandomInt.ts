export default function (min: number, max: number) {
  min = Math.ceil(min) // Ensure minimum is an integer and rounded up
  max = Math.floor(max) // Ensure maximum is an integer and rounded down
  return Math.floor(Math.random() * (max - min + 1)) + min
}
