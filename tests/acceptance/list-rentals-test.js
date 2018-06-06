import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals-2-18/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

// test('visiting /', function(assert){
//   visit('/');

//   andThen(function(){
//     assert.equal(currentURL(), '/');
//   })
// });

test('should show rentals as the home page', function(assert){
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});
test('should link to information about the company', function(assert){
  visit('/');
  click('a:contains("About")');
  andThen(function() {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});
test('should link to contact information', function(assert){
  visit('/');
  click('a:contains("Contact")');
  andThen( function() {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});
test('should list available rentals', function(assert){
  visit('/');
  andThen(function() {
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});
test('should filter the list of rentals by city', function(assert){
  visit('/');
  // fillIn() helper fill in given text to a given input field with given selector
  fillIn('.list-filter input', 'Seattle');
  // keyEvent() helper sends key stroke event to UI
  keyEvent('.list-filter input', 'keyup', 69); // 69: the 'e' key
  andThen(function() {
    assert.equal(find('.listing').length, 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should show 1 listing with location Seattle');
  });

});
test('should show details of a selected rental', function(assert){
  
});