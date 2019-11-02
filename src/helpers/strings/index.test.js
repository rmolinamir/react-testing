import stringsModule from '.';
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {},
}

it('returns correct submit string for english', () => {
  const string = getStringByLanguage('en', 'submit', strings);
  expect(string).toBe(strings.en.submit);
});

it('returns the correct submit string for emoji', () => {
  const string = getStringByLanguage('emoji', 'submit', strings);
  expect(string).toBe(strings.emoji.submit);
});

it('returns english submit string when language does not exist', () => {
  const string = getStringByLanguage('notALanguage', 'submit', strings);
  expect(string).toBe(strings.en.submit);

});

it('returns english submit string when submit key does not exist for language (`mermish`)', () => {
  const string = getStringByLanguage('mermish', 'submit', strings);
  expect(string).toBe(strings.en.submit);
});
