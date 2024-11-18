async function Delay(delayMs: number) {
  return new Promise<boolean>((res, rej) => {
    setTimeout(() => {
      res(true);
    }, delayMs);
  });
}

function trimText(trimLength: number, text: string) {
  if (text.length > trimLength) {
    return `${text.slice(0, trimLength)}...`;
  } else {
    return text;
  }
}

export { Delay, trimText };
