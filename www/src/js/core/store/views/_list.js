YUI.add('core-store-view-list', function(Y) {

  var template = new Y.Template();
  template = template.revive(Y.DEMO.CORE.STORE.TMPL.LIST.template);

  ListView = Y.Base.create('storeList', Y.View, [], {

    containerTemplate: '<main class=layout-content></main>',
    template: template,

    render: function() {
      var content = this.template(this.get('list'));
      this.get('container').setHTML(content);

      return this;
    }
  });

}, '0.0.1', {
  requires: [
    'view',
    'template'
  ]
});
