export function compute(number) {
  if (number < 0) {
    return 0;
  }
  return number + 1;
}

export function greet(name) {
  return 'Welcome ' + name;
}

export function getCurrencies() {
  return ['USD', 'AUD', 'EUR'];
}

export class VoteComponent {
  totalVotes = 0;

  upVote() {
    this.totalVotes++;
  }

  downVote() {
    this.totalVotes--;
  }
}
