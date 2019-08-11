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
          store.dispatch({
            type: 'LOG_MESSAGE',
            payload: 'Data persisted',
          });
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
