import path from 'path';
import Datastore from 'nedb';

class PeristState {
  constructor() {
    this.db = new Datastore({ filename: path.join(process.cwd(), 'db', 'state.db'), autoload: true });

    this.db.ensureIndex({
      fieldName: 'key',
      unique: true,
      sparse: true,
    });

    let compDelay = null;

    this.middleware = store => next => (action) => {
      next(action);

      if (
        // Add further actions here when store needs persisting
        action.type !== 'SET_CONFIG'
      ) {
        return;
      }

      this.db.update({ key: 'config' }, { key: 'config', value: store.getState().config || {} }, { upsert: true }, (error) => {
        if (error) {
          store.dispatch({
            type: 'LOG_MESSAGE',
            payload: `Data persist Error: ${error}`,
          });
        } else {
          global.clearTimeout(compDelay);
          compDelay = global.setTimeout(() => {
            store.dispatch({
              type: 'LOG_MESSAGE',
              payload: 'Data persisted',
            });
            this.db.persistence.compactDatafile();
          }, 1000);
        }

      });
    };
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
