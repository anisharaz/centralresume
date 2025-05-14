import { PartialDeep } from 'type-fest';

interface ResumeInterface {
  version: string; // eg . "1" , "2"
}

export class Resume<T extends ResumeInterface> {
  private _resume: T;

  constructor(resume: T) {
    this._resume = resume;
  }

  makeResume(tag: string): T {
    let resume = structuredClone(this._resume);

    const update = (chunk: any) => {
      if (Object.prototype.toString.call(chunk) === '[object Date]') {
        return chunk;
      } else if (Array.isArray(chunk)) {
        let newChunk = [];
        for (let element of chunk) {
          let newElement: any = update(element);
          if (newElement !== undefined) newChunk.push(newElement);
        }
        return newChunk;
      } else if (typeof chunk == 'object') {
        let tags = chunk['tags'];
        if ((tags && Array.isArray(tags) && tags.includes(tag)) || !tags) {
          let newChunk: any = {};
          for (let key in chunk) {
            let newElement: any = update(chunk[key]);
            if (newElement !== undefined) newChunk[key] = newElement;
          }
          return newChunk;
        } else {
          return undefined;
        }
      } else {
        return chunk;
      }
    };

    resume = update(resume);
    return resume;
  }

  updateResume(tag: string, resume: PartialDeep<T>) {
    return this._resume;
  }

  getAll(): T {
    return this._resume;
  }
}
