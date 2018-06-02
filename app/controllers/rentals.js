import Controller from '@ember/controller';

export default Controller.extend({
  // controller will apply to route with the same name 
  actions: {
    filterByCity(param) {
      if(param !== '') {
        return this.get('store').query('rental', {city: param});
      } else {
        return this.get('store').findAll('rental');
      }
    }
  }
});
