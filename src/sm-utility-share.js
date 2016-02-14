let instances = {};

class SmUtilityShare {
  beforeRegister() {
    this.is = 'sm-utility-share';

    this.properties = {
      type: String,
      key: String,
      value: {
        type: String,
        observer: '_valueChanged',
        notify: true
      },
      readonly: {
        type: Boolean,
        value: false
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
    const toUpdate = instances[this.type][this.key]
                      .filter(element => element !== this);

    if (this.readonly) {
      this.value = toUpdate[0].value;
    } else {
      toUpdate.forEach(element => element.value = value);
    }
  }
}

window.inst = instances;

Polymer(SmUtilityShare);
