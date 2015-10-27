let instances = {};

class SmHelperShare {
  beforeRegister() {
    this.is = 'sm-helper-share';

    this.properties = {
      type: String,
      key: String,
      value: {
        type: String,
        observer: '_valueChanged',
        notify: true
      }
    }

    this.observers = [
      '_updateInstance(type, key)'
    ];
  }

  _updateInstance(type, key) {
    instances[type] = instances[type] || {};
    instances[type][key] = instances[type][key] || [];

    if (instances[type][key].length > 0) {
      this.value = instances[type][key][0].value;
    }

    instances[type][key].push(this);
  }

  _valueChanged(value) {
    instances[this.type][this.key]
      .filter(element => element !== this)
      .forEach(element => element.value = value);
  }
}

window.inst = instances;

Polymer(SmHelperShare);
