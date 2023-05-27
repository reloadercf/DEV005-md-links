const fs = require('fs');
const path = require('path');

const { getFiles } = require('../getFiles');

jest.mock('fs', () => ({
    existsSync: () => true,
    statSync: jest.fn(() => ({
        isFile: () => true
    })),
}))

jest.mock('path', () => ({
    extname: () => '.md',
    isAbsolute: () => true
}))

describe('getFiles', () => {
    test('get absolute path with absolute path', () => {
        const files = getFiles('/Users/macbookpro/Developer/personal/DEV005-md-links/ejemplo.md')
        expect(files).toEqual(['/Users/macbookpro/Developer/personal/DEV005-md-links/ejemplo.md'])
    })
})
