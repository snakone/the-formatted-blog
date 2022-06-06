import { DraftStatusPipe } from './draft-status.pipe';

describe('DraftStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new DraftStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
