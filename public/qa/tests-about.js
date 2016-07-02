suite('"About" Page Test', function(){
  test('page should contain link to contact page', function(){
    console.log($('a[href="/contact"]'));
    assert($('a[href="/contact"]').length);
  });
});
