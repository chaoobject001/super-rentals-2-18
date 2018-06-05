import Component from '@ember/component';

export default Component.extend({
  className: ['list-filter'],
  value: '',
  // init hook seed initial listing 
  init() {
    this._super(...arguments);
    // this.get('filter')('').then(
    //   (results) => this.set('results', results)
    // );
    this.get('filter')('').then(
      (allResults) => {
        this.set('results', allResults.results);
      }
    );
  },

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.get('value');
      let filterAction = this.get('filter');
      // filterAction(filterInputValue).then(
      //   (filterResults) => this.set('results', filterResults)
      // );
      filterAction(filterInputValue).then((filterResults) => {
        if(filterResults.query === this.get('value')) {
          this.set('results', filterResults.results);
        }
      });
    }
  }
});
