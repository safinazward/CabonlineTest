import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
    
Enzyme.configure({ adapter: new Adapter() });


class Platform {
  createDefaultLayers() {
    return {
      normal: {
        map: '',
      },
    };
  }
}

class Map {
  addObject() {}
  removeObject() {}
}
/*** Mock Here Maps JavaScript API ***/
global.H = {
  service: {
    Platform,
  },
  Map
};

