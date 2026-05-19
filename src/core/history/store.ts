export interface HistoryItem {
  id: number;
  prompt: string;
  result: string;
  time: Date;
}

let history: HistoryItem[] = [];
let id = 0;

export function addHistory(prompt: string, result: string) {
  history.unshift({ id: ++id, prompt, result, time: new Date() });
  if (history.length > 20) history.pop();
}

export function getHistory() {
  return history;
}