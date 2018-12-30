import { compute, greet, getCurrencies, VoteComponent } from './unittest.component';

describe('compute', () => {
  it('should return 0 if input is negative', () => {
    const result = compute(-1);
    expect(result).toBe(0);
  });

  it('should increment the input if it is positive', () => {
    const result = compute(0);
    expect(result).toBe(1);
  });
});

describe('greet', () => {
  it('should include the name in the message', () => {
    expect(greet('mosh')).toContain('mosh');
  });
});

describe('getCurrencies', () => {
  it('should return the supported currentcies', () => {
    expect(getCurrencies()).toContain('USD');
    expect(getCurrencies()).toContain('AUD');
    expect(getCurrencies()).toContain('EUR');
  });
});

describe('VoteComponent', () => {
  let component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should increment totalVotes when upvoted', () => {
    component.upVote();
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when downvoted', () => {
    component.downVote();
    expect(component.totalVotes).toBe(-1);
  });
});
