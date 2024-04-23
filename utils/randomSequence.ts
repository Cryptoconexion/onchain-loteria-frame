export function randomSequence(length: number): number[] {
  const sequence: number[] = [];
  const used: Set<number> = new Set();

  while (sequence.length < length) {
    const randomIndex = Math.floor(Math.random() * 54) + 1;
    if (!used.has(randomIndex)) {
      used.add(randomIndex);
      sequence.push(randomIndex);
    }
  }
  return sequence;
}
