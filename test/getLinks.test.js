const fs = require('fs');
const { getLinks } = require('../getLinks');

// arrange don't call real fs
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => `
    [Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
    ligero muy popular entre developers. Es usado en muchísimas plataformas que
    manejan texto plano (GitHub, foros, blogs, ...) y es muy común
    `),
}));

describe('getLinks', () => {
  test('Return array with links', () => {
    // act to start the main function
    const links = getLinks('./File.md');
    // assertion to match after run
    expect(links).toEqual([
      { text: 'Markdown', url: 'https://es.wikipedia.org/wiki/Markdown' },
    ]);
    expect(fs.readFileSync).toHaveBeenCalledWith('./File.md', 'utf8');
  });
});
