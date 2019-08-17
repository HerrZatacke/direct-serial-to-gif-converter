import path from 'path';
import Datastore from 'nedb';

class PeristState {
  constructor() {
    this.db = new Datastore({ filename: path.join(process.cwd(), 'db', 'state.db'), autoload: true });
    this.db.persistence.setAutocompactionInterval(5000);

    this.db.ensureIndex({
      fieldName: 'key',
      unique: true,
      sparse: true,
    });


    this.middleware = store => next => (action) => {
      next(action);
      const state = store.getState();
      switch (action.type) {
        case 'SET_CONFIG':
          this.updateDb('config', state.config || {}, store);
          break;
        case 'CHANGE_DUMPDIR':
          this.updateDb('dumpDir', state.dumpDir || '', store);
          break;
        default:
      }
    };
  }

  updateDb(key, value, store) {
    this.db.update({ key }, { key, value }, { upsert: true }, (error) => {
      if (error) {
        store.dispatch({
          type: 'LOG_MESSAGE',
          payload: `Data persist Error: ${error}`,
        });
      } else {
        store.dispatch({
          type: 'LOG_MESSAGE',
          payload: 'Data persisted',
        });
      }
    });
  }

  getMiddleware() {
    return this.middleware;
  }

  getPreloadedState() {
    return new Promise((resolve, reject) => {
      this.db.find({}, (error, entries) => {
        if (error) {
          reject(error);
          return;
        }

        const state = {};
        entries.forEach(({ key, value }) => {
          state[key] = value;
        });
        resolve(state);
      });
    });
  }
}

export default PeristState;
