export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function runSteps(stepCount, setIndex, stepMs = 700) {
  for (let i = 0; i < stepCount; i += 1) {
    setIndex(i)
    await delay(stepMs)
  }
  setIndex(stepCount)
}
