export default class Stack {
  public list: number[] = [];

  addToStack(block: number[]) {
    this.list.push(...block);
  }
}
