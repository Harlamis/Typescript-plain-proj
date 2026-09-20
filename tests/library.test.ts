import { expect } from 'chai';
import { Library } from '../src/services/Library';

interface TestItem {
  id: string;
  value: string;
}

describe('Library', () => {
  it('should add items and return them in order', () => {
    const library = new Library<TestItem>();

    library.add({ id: '1', value: 'one' });
    library.add({ id: '2', value: 'two' });

    expect(library.size()).to.equal(2);
    expect(library.getAll()).to.have.lengthOf(2);
  });

  it('should find an item by id', () => {
    const library = new Library<TestItem>([
      { id: 'a', value: 'alpha' },
      { id: 'b', value: 'beta' },
    ]);

    expect(library.find('a')).to.deep.equal({ id: 'a', value: 'alpha' });
    expect(library.find('z')).to.equal(undefined);
  });

  it('should remove an item by id', () => {
    const library = new Library<TestItem>([
      { id: '1', value: 'first' },
      { id: '2', value: 'second' },
    ]);

    expect(library.remove('1')).to.equal(true);
    expect(library.remove('missing')).to.equal(false);
    expect(library.getAll()).to.deep.equal([{ id: '2', value: 'second' }]);
  });

  it('should filter items by predicate', () => {
    const library = new Library<TestItem>([
      { id: '1', value: 'red' },
      { id: '2', value: 'blue' },
      { id: '3', value: 'green' },
    ]);

    const filtered = library.filter((item) => item.value.includes('e'));

    expect(filtered).to.have.lengthOf(3);
    expect(filtered.map((item) => item.id)).to.deep.equal(['1', '2', '3']);
  });
});
