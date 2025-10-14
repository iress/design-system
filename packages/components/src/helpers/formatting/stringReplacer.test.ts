import { stringReplacer } from './stringReplacer';

describe('stringReplacer', () => {
  const str =
    '{{first}} aa {{second}} bb {{first}} cc {{second}} dd {{third}} ee {{third}}';

  it('replaced multiple instances in a string', () => {
    const replaceArr = [
      { name: '{{first}}', value: '1st' },
      { name: '{{second}}', value: '2nd' },
      { name: '{{third}}', value: '3rd' },
    ];
    expect(stringReplacer(str, replaceArr)).toBe(
      '1st aa 2nd bb 1st cc 2nd dd 3rd ee 3rd',
    );
  });

  it('returns an unaltered string when not passed a replace array', () => {
    expect(stringReplacer(str)).toBe(str);
  });
});
