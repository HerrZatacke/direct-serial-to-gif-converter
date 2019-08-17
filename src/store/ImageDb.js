/* eslint-disable no-underscore-dangle */
import path from 'path';
import crypto from 'crypto';
import Datastore from 'nedb';

class ImageDb {
  constructor() {
    this.db = new Datastore({ filename: path.join(process.cwd(), 'db', 'images.db'), autoload: true });
    this.db.persistence.setAutocompactionInterval(5000);

    this.db.ensureIndex({
      fieldName: 'hash',
      unique: true,
      sparse: true,
    });
  }

  update(binary) {
    if (binary.length !== 360) {
      return Promise.reject(new Error('invalid image data'));
    }

    const hasher = crypto.createHash('sha1');
    hasher.update(binary.join('\n'));
    const hash = hasher.digest('hex');

    return new Promise((resolve, reject) => {
      this.db.find({ hash }, (error, documents) => {
        if (error) {
          reject(error);
          return;
        }

        const foundDoc = documents[0];

        const newDoc = {
          hash,
          created: foundDoc ? foundDoc.created : new Date().getTime(),
          binary,
        };

        if (foundDoc) {
          this.db.update({ hash }, newDoc, { returnUpdatedDocs: true }, (updateError, num, document) => {
            if (updateError) {
              reject(updateError);
              return;
            }
            resolve(`updated ${document._id}`);
          });
        } else {
          this.db.insert(newDoc, (insertError, document) => {
            if (insertError) {
              reject(insertError);
              return;
            }
            resolve(`inserted ${document._id}`);
          });
        }
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      this.db.find({}).sort({ created: 1 }).exec((error, documents) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(documents);
      });
    });
  }
}

export default ImageDb;
