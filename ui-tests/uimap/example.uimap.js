"use strict";

  class ExampleUIMap {
      get searchInput() {
        return '.searchbar input';
    }

    get resultsList() {
        return '.commands.property a' ;
    }
}
module.exports = new ExampleUIMap();