import isEqual from 'lodash.isequal';
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

  updateResume(tag: string, resumePatch: PartialDeep<DeepOmitTags<T>>) {
    let resume = structuredClone(this._resume);
    const update = (chunk: any, chunkPatch: any) => {
      if (!chunkPatch) return chunk;

      if (Object.prototype.toString.call(chunk) === '[object Date]') {
        return chunkPatch;
      } else if (Array.isArray(chunk) && Array.isArray(chunkPatch)) {
        let newChunk = [];
        for (let elementPatch of chunkPatch) {
          let isAdded = false;
          for (let element of chunk) {
            let newElement: any = update(element, elementPatch);
            if (newElement !== undefined) {
              isAdded = true;
              newChunk.push(newElement);
              break;
            } else newChunk.push(element);
          }
          if (!isAdded) newChunk.push(elementPatch);
        }
        return newChunk;
      } else if (typeof chunk == 'object') {
        let tags = chunk['tags'];
        if ((tags && Array.isArray(tags) && tags.includes(tag)) || !tags) {
          let newChunk: any = {};
          for (let key in chunk) {
            let newElement: any = update(chunk[key], chunkPatch[key]);
            if (newElement !== undefined) newChunk[key] = newElement;
          }
          return newChunk;
        } else if (tags && isEqual(removeTags(chunk), chunkPatch)) {
          chunk['tags'].push(tag);
          return chunk;
        } else {
          return undefined;
        }
      } else {
        return chunkPatch;
      }
    };
    resume = update(resume, resumePatch);
    return resume;
  }

  getAll(): T {
    return this._resume;
  }
}

type DeepOmitTags<T> =
  T extends Array<infer U>
    ? DeepOmitTags<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends 'tags' ? never : K]: DeepOmitTags<T[K]>;
        }
      : T;

function removeTags<T extends ResumeInterface>(
  input: PartialDeep<T> | string,
): PartialDeep<DeepOmitTags<T>> {
  let update = () => {
    if (Array.isArray(input)) {
      return input.map(removeTags) as PartialDeep<DeepOmitTags<T>>;
    }

    if (input !== null && typeof input === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(input)) {
        if (key === 'tags') continue;
        result[key] = removeTags(value);
      }
      return result;
    }

    return input;
  };
  return update() as PartialDeep<DeepOmitTags<T>>;
}
