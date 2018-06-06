import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

// list-filter component takes a function as argument
// the function returns matching rentals based on filter string
const ITEMS = [{ city: 'San Francisco' }, { city: 'Portland' }, { city: 'Seattle' }];
const FILTERED_ITEMS = [{ city: 'San Francisco' }];

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

test('should initially load all listings', function (assert) {
  // this.on() provides action function setting the given function 
  // to local scope with given name ('filteredByCity')
  // actions return promises since they fatch data asynchronously 
  this.on('filterByCity', () => {
    return RSVP.resolve({ results: ITEMS }); // ember rsvp library promises
  });

  // For integration test, setup component the same way as in application 
  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
        {{#each results as |item|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});

test('should update with matching listings', function (assert) {
  this.on('filterByCity', (val) => {
    if (val === '') {
      return RSVP.resolve({
        query: val,
        results: ITEMS
      });
    } else {
      return RSVP.resolve({
        query: val,
        results: FILTERED_ITEMS
      });
    }
  });

  this.render(hbs`
  {{#list-filter filter=(action 'filterByCity') as |results|}}
  <ul>
  {{#each results as |item|}}
    <li class="city">
      {{item.city}}
    </li>
  {{/each}}
  </ul>
  {{/list-filter}}
  `);

  // setup key-up event to trigger filtering 
  this.$('.list-filter input').val('San').keyup();

  return wait().then(() => {
    assert.equal(this.$('.city').length, 1);
    assert.equal(this.$('.city').text().trim(), 'San Francisco');
  });
});
