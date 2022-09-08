var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// ../../node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i3 = 1; i3 < meta.length; i3++) {
    if (meta[i3] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i3]}`;
      if (meta[i3].indexOf("charset=") === 0) {
        charset = meta[i3].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default;
var init_dist = __esm({
  "../../node_modules/data-uri-to-buffer/dist/index.js"() {
    dist_default = dataUriToBuffer;
  }
});

// ../../node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "../../node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports, function(exports2) {
      "use strict";
      const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
      function noop3() {
        return void 0;
      }
      function getGlobals() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function typeIsObject(x3) {
        return typeof x3 === "object" && x3 !== null || typeof x3 === "function";
      }
      const rethrowAssertionErrorRejection = noop3;
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseResolve = Promise.resolve.bind(originalPromise);
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === "function") {
          return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(void 0);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
      })();
      function reflectCall(F3, V, args) {
        if (typeof F3 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F3, V, args);
      }
      function promiseCall(F3, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F3, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        forEach(callback) {
          let i3 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i3 !== elements.length || node._next !== void 0) {
            if (i3 === elements.length) {
              node = node._next;
              elements = node._elements;
              i3 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i3]);
            ++i3;
          }
        }
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name2) {
        return new TypeError("Cannot " + name2 + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve3, reject) => {
          reader._closedPromise_resolve = resolve3;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
      const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
      const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
      const PullSteps = SymbolPolyfill("[[PullSteps]]");
      const NumberIsFinite = Number.isFinite || function(x3) {
        return typeof x3 === "number" && isFinite(x3);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x3) {
        return typeof x3 === "object" || typeof x3 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x3, context) {
        if (typeof x3 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x3) {
        return typeof x3 === "object" && x3 !== null || typeof x3 === "function";
      }
      function assertObject(x3, context) {
        if (!isObject(x3)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x3, position, context) {
        if (x3 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x3, field, context) {
        if (x3 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x3) {
        return x3 === 0 ? 0 : x3;
      }
      function integerPart(x3) {
        return censorNegativeZero(MathTrunc(x3));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x3 = Number(value);
        x3 = censorNegativeZero(x3);
        if (!NumberIsFinite(x3)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x3 = integerPart(x3);
        if (x3 < lowerBound || x3 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x3) || x3 === 0) {
          return 0;
        }
        return x3;
      }
      function assertReadableStream(x3, context) {
        if (!IsReadableStream(x3)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve3, reject) => {
            resolvePromise = resolve3;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e3) => rejectPromise(e3)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readRequests")) {
          return false;
        }
        return x3 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function defaultReaderBrandCheckException(name2) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name2} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("iterate"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve3, reject) => {
            resolvePromise = resolve3;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("finish iterating"));
          }
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      if (AsyncIteratorPrototype !== void 0) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      }
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x3._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name2) {
        return new TypeError(`ReadableStreamAsyncIterator.${name2} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x3) {
        return x3 !== x3;
      };
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      function TransferArrayBuffer(O) {
        return O;
      }
      function IsDetachedBuffer(O) {
        return false;
      }
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer))
            ;
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state2 = this._controlledReadableByteStream._state;
          if (state2 !== "readable") {
            throw new TypeError(`The stream (in ${state2} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state2 = this._controlledReadableByteStream._state;
          if (state2 !== "readable") {
            throw new TypeError(`The stream (in ${state2} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        error(e3 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e3);
        }
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledReadableByteStream")) {
          return false;
        }
        return x3 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x3 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }, (e3) => {
          ReadableByteStreamControllerError(controller, e3);
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready3 = false;
        if (maxAlignedBytes > currentAlignedBytes) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready3 = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready3;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
          elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        const buffer = TransferArrayBuffer(view.buffer);
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          bytesFilled: 0,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e3 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e3);
            readIntoRequest._errorSteps(e3);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled > 0) {
            const e3 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e3);
            throw e3;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer))
            ;
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e3) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e3);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "errored") {
          return null;
        }
        if (state2 === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, (r3) => {
          ReadableByteStreamControllerError(controller, r3);
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name2) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name2} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name2) {
        return new TypeError(`ReadableByteStreamController.prototype.${name2} can only be used on a ReadableByteStreamController`);
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve3, reject) => {
            resolvePromise = resolve3;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e3) => rejectPromise(e3)
          };
          ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readIntoRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readIntoRequests")) {
          return false;
        }
        return x3 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
      }
      function byobReaderBrandCheckException(name2) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name2} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x3, context) {
        if (!IsWritableStream(x3)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal3(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_writableStreamController")) {
          return false;
        }
        return x3 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
        const state2 = stream._state;
        if (state2 === "closed" || state2 === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state2 === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve3, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve3,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state2 = stream._state;
        if (state2 === "closed" || state2 === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state2} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve3, reject) => {
          const closeRequest = {
            _resolve: resolve3,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state2 === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve3, reject) => {
          const writeRequest = {
            _resolve: resolve3,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state2 = stream._state;
        if (state2 === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state2 = stream._state;
        if (state2 === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state2 = stream._state;
          if (state2 === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state2 === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state2 === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_ownerWritableStream")) {
          return false;
        }
        return x3 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state2 = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state2 === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state2 === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state2 = stream._state;
        if (state2 === "errored" || state2 === "erroring") {
          return null;
        }
        if (state2 === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state2 = stream._state;
        if (state2 === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state2 === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state2 === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        error(e3 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state2 = this._controlledWritableStream._state;
          if (state2 !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e3);
        }
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledWritableStream")) {
          return false;
        }
        return x3 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (r3) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r3);
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let writeAlgorithm = () => promiseResolvedWith(void 0);
        let closeAlgorithm = () => promiseResolvedWith(void 0);
        let abortAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state2 = stream._state;
        if (state2 === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state2 = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state2 === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name2) {
        return new TypeError(`WritableStream.prototype.${name2} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name2) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name2} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name2) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name2} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name2) {
        return new TypeError("Cannot " + name2 + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve3, reject) => {
          writer._closedPromise_resolve = resolve3;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve3, reject) => {
          writer._readyPromise_resolve = resolve3;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a) {
          return false;
        }
      }
      function createDOMExceptionPolyfill() {
        const ctor = function DOMException4(message, name2) {
          this.message = message || "";
          this.name = name2 || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve3, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = new DOMException$1("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve3(void 0);
            }
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        error(e3 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e3);
        }
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledReadableStream")) {
          return false;
        }
        return x3 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
        }, (e3) => {
          ReadableStreamDefaultControllerError(controller, e3);
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e3) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e3);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state2 = controller._controlledReadableStream._state;
        if (state2 === "errored") {
          return null;
        }
        if (state2 === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state2 = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state2 === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, (r3) => {
          ReadableStreamDefaultControllerError(controller, r3);
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name2) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name2} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve3) => {
          resolveCancelPromise = resolve3;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r3) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r3);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r3);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve3) => {
          resolveCancelPromise = resolve3;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r3) => {
            if (thisReader !== reader) {
              return;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r3);
            ReadableByteStreamControllerError(branch2._readableStreamController, r3);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal3(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e3) {
            return promiseRejectedWith(e3);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
      }
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      if (typeof SymbolPolyfill.asyncIterator === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
          value: ReadableStream2.prototype.values,
          writable: true,
          configurable: true
        });
      }
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readableStreamController")) {
          return false;
        }
        return x3 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop3);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
          reader._readRequests = new SimpleQueue();
        }
      }
      function ReadableStreamError(stream, e3) {
        stream._state = "errored";
        stream._storedError = e3;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e3);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._errorSteps(e3);
          });
          reader._readRequests = new SimpleQueue();
        } else {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._errorSteps(e3);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
      }
      function streamBrandCheckException$1(name2) {
        return new TypeError(`ReadableStream.prototype.${name2} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      try {
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name2) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name2} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x3 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      try {
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name2) {
        return new TypeError(`CountQueuingStrategy.prototype.${name2} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x3 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve3) => {
            startPromise_resolve = resolve3;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          TransformStreamErrorWritableAndUnblockWrite(stream, reason);
          return promiseResolvedWith(void 0);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_transformStreamController")) {
          return false;
        }
        return x3 instanceof TransformStream;
      }
      function TransformStreamError(stream, e3) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e3);
        TransformStreamErrorWritableAndUnblockWrite(stream, e3);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e3) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e3);
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve3) => {
          stream._backpressureChangePromise_resolve = resolve3;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledTransformStream")) {
          return false;
        }
        return x3 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
          try {
            TransformStreamDefaultControllerEnqueue(controller, chunk);
            return promiseResolvedWith(void 0);
          } catch (transformResultE) {
            return promiseRejectedWith(transformResultE);
          }
        };
        let flushAlgorithm = () => promiseResolvedWith(void 0);
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e3) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e3);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e3) {
        TransformStreamError(controller._controlledTransformStream, e3);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r3) => {
          TransformStreamError(controller._controlledTransformStream, r3);
          throw r3;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state2 = writable._state;
            if (state2 === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        TransformStreamError(stream, reason);
        return promiseResolvedWith(void 0);
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        return transformPromiseWith(flushPromise, () => {
          if (readable._state === "errored") {
            throw readable._storedError;
          }
          ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, (r3) => {
          TransformStreamError(stream, r3);
          throw readable._storedError;
        });
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function defaultControllerBrandCheckException(name2) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name2} can only be used on a TransformStreamDefaultController`);
      }
      function streamBrandCheckException(name2) {
        return new TypeError(`TransformStream.prototype.${name2} can only be used on a TransformStream`);
      }
      exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports2.CountQueuingStrategy = CountQueuingStrategy;
      exports2.ReadableByteStreamController = ReadableByteStreamController;
      exports2.ReadableStream = ReadableStream2;
      exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports2.TransformStream = TransformStream;
      exports2.TransformStreamDefaultController = TransformStreamDefaultController;
      exports2.WritableStream = WritableStream;
      exports2.WritableStreamDefaultController = WritableStreamDefaultController;
      exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// ../../node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "../../node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE3 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob6 } = require("buffer");
      if (Blob6 && !Blob6.prototype.stream) {
        Blob6.prototype.stream = function name2(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE3));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// ../../node_modules/fetch-blob/index.js
async function* toIterator(parts, clone3 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone3) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob3, fetch_blob_default;
var init_fetch_blob = __esm({
  "../../node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = class Blob2 {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob2) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob2([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob3 = _Blob;
    fetch_blob_default = Blob3;
  }
});

// ../../node_modules/fetch-blob/file.js
var _File, File2, file_default;
var init_file = __esm({
  "../../node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    file_default = File2;
  }
});

// ../../node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F3, B = fetch_blob_default) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F3.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h, r, m, f, e, x, FormData;
var init_esm_min = __esm({
  "../../node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new file_default([b], c, b) : b] : [a, b + ""]);
    e = (c, f5) => (f5 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e3) => {
      if (a.length < e3) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e3} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m3) => typeof o[m3] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
  }
});

// ../../node_modules/node-fetch/src/errors/base.js
var FetchBaseError;
var init_base = __esm({
  "../../node_modules/node-fetch/src/errors/base.js"() {
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
  }
});

// ../../node_modules/node-fetch/src/errors/fetch-error.js
var FetchError;
var init_fetch_error = __esm({
  "../../node_modules/node-fetch/src/errors/fetch-error.js"() {
    init_base();
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
  }
});

// ../../node_modules/node-fetch/src/utils/is.js
var NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain, isSameProtocol;
var init_is = __esm({
  "../../node_modules/node-fetch/src/utils/is.js"() {
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    isDomainOrSubdomain = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    isSameProtocol = (destination, original) => {
      const orig = new URL(original).protocol;
      const dest = new URL(destination).protocol;
      return orig === dest;
    };
  }
});

// ../../node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "../../node_modules/node-domexception/index.js"(exports, module2) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module2.exports = globalThis.DOMException;
  }
});

// ../../node_modules/fetch-blob/from.js
var import_node_fs, import_node_path, import_node_domexception, stat, blobFromSync, blobFrom, fileFrom, fileFromSync, fromBlob, fromFile, BlobDataItem;
var init_from = __esm({
  "../../node_modules/fetch-blob/from.js"() {
    import_node_fs = require("node:fs");
    import_node_path = require("node:path");
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = import_node_fs.promises);
    blobFromSync = (path, type) => fromBlob((0, import_node_fs.statSync)(path), path, type);
    blobFrom = (path, type) => stat(path).then((stat3) => fromBlob(stat3, path, type));
    fileFrom = (path, type) => stat(path).then((stat3) => fromFile(stat3, path, type));
    fileFromSync = (path, type) => fromFile((0, import_node_fs.statSync)(path), path, type);
    fromBlob = (stat3, path, type = "") => new fetch_blob_default([new BlobDataItem({
      path,
      size: stat3.size,
      lastModified: stat3.mtimeMs,
      start: 0
    })], { type });
    fromFile = (stat3, path, type = "") => new file_default([new BlobDataItem({
      path,
      size: stat3.size,
      lastModified: stat3.mtimeMs,
      start: 0
    })], (0, import_node_path.basename)(path), { type, lastModified: stat3.mtimeMs });
    BlobDataItem = class {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      slice(start, end) {
        return new BlobDataItem({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* (0, import_node_fs.createReadStream)(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// ../../node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m3 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m3) {
    return;
  }
  const match = m3[2] || m3[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m4, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body3, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m3 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m3) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m3[1] || m3[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m4 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m4) {
        entryName = m4[2] || m4[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body3) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "../../node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i3 = 0; i3 < boundary.length; i3++) {
          ui8a[i3] = boundary.charCodeAt(i3);
          this.boundaryChars[ui8a[i3]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i3 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state: state2, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name2) => {
          this[name2 + "Mark"] = i3;
        };
        const clear = (name2) => {
          delete this[name2 + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name2, clear2) => {
          const markSymbol = name2 + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name2, this[markSymbol], i3, data);
            delete this[markSymbol];
          } else {
            callback(name2, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i3 = 0; i3 < length_; i3++) {
          c = data[i3];
          switch (state2) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state2 = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state2 = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state2 = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state2 = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state2 = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state2 = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state2 = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state2 = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state2 = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state2 = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i3 += boundaryEnd;
                while (i3 < bufferLength && !(data[i3] in boundaryChars)) {
                  i3 += boundaryLength;
                }
                i3 -= boundaryEnd;
                c = data[i3];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state2 = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state2 = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i3--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state2}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state2;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// ../../node_modules/node-fetch/src/body.js
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var import_node_stream, import_node_util, import_node_buffer, pipeline, INTERNALS, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream;
var init_body = __esm({
  "../../node_modules/node-fetch/src/body.js"() {
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_util = require("node:util");
    import_node_buffer = require("node:buffer");
    init_fetch_blob();
    init_esm_min();
    init_fetch_error();
    init_base();
    init_is();
    pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
    INTERNALS = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = import_node_buffer.Buffer.from(body.toString());
        } else if (isBlob(body)) {
        } else if (import_node_buffer.Buffer.isBuffer(body)) {
        } else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = import_node_buffer.Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default) {
        } else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = import_node_buffer.Buffer.from(String(body));
        }
        let stream = body;
        if (import_node_buffer.Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS].error = error;
          });
        }
      }
      get body() {
        return this[INTERNALS].stream;
      }
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name2, value] of parameters) {
            formData.append(name2, value);
          }
          return formData;
        }
        const { toFormData: toFormData3 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData3(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
        const buf = await this.arrayBuffer();
        return new fetch_blob_default([buf], {
          type: ct
        });
      }
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util.deprecate)(() => {
      }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (import_node_buffer.Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline(body, dest);
      }
    };
  }
});

// ../../node_modules/node-fetch/src/headers.js
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name2, value]) => {
    try {
      validateHeaderName(name2);
      validateHeaderValue(name2, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var import_node_util2, import_node_http, validateHeaderName, validateHeaderValue, Headers;
var init_headers = __esm({
  "../../node_modules/node-fetch/src/headers.js"() {
    import_node_util2 = require("node:util");
    import_node_http = __toESM(require("node:http"), 1);
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name2) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name2)) {
        const error = new TypeError(`Header name must be a valid HTTP token [${name2}]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name2, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error = new TypeError(`Invalid character in header content ["${name2}"]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
        throw error;
      }
    };
    Headers = class extends URLSearchParams {
      constructor(init) {
        let result = [];
        if (init instanceof Headers) {
          const raw = init.raw();
          for (const [name2, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name2, value]));
          }
        } else if (init == null) {
        } else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name2, value]) => {
          validateHeaderName(name2);
          validateHeaderValue(name2, String(value));
          return [String(name2).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name2, value) => {
                  validateHeaderName(name2);
                  validateHeaderValue(name2, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name2).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name2) => {
                  validateHeaderName(name2);
                  return URLSearchParams.prototype[p].call(target, String(name2).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name2) {
        const values = this.getAll(name2);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name2)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name2 of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name2), name2, this]);
        }
      }
      *values() {
        for (const name2 of this.keys()) {
          yield this.get(name2);
        }
      }
      *entries() {
        for (const name2 of this.keys()) {
          yield [name2, this.get(name2)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
  }
});

// ../../node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus, isRedirect;
var init_is_redirect = __esm({
  "../../node_modules/node-fetch/src/utils/is-redirect.js"() {
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
  }
});

// ../../node_modules/node-fetch/src/response.js
var INTERNALS2, Response;
var init_response = __esm({
  "../../node_modules/node-fetch/src/response.js"() {
    init_headers();
    init_body();
    init_is_redirect();
    INTERNALS2 = Symbol("Response internals");
    Response = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS2] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS2].type;
      }
      get url() {
        return this[INTERNALS2].url || "";
      }
      get status() {
        return this[INTERNALS2].status;
      }
      get ok() {
        return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
      }
      get redirected() {
        return this[INTERNALS2].counter > 0;
      }
      get statusText() {
        return this[INTERNALS2].statusText;
      }
      get headers() {
        return this[INTERNALS2].headers;
      }
      get highWaterMark() {
        return this[INTERNALS2].highWaterMark;
      }
      clone() {
        return new Response(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response(null, { status: 0, statusText: "" });
        response[INTERNALS2].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
  }
});

// ../../node_modules/node-fetch/src/utils/get-search.js
var getSearch;
var init_get_search = __esm({
  "../../node_modules/node-fetch/src/utils/get-search.js"() {
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
    };
  }
});

// ../../node_modules/node-fetch/src/utils/referrer.js
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
var import_node_net, ReferrerPolicy, DEFAULT_REFERRER_POLICY;
var init_referrer = __esm({
  "../../node_modules/node-fetch/src/utils/referrer.js"() {
    import_node_net = require("node:net");
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
  }
});

// ../../node_modules/node-fetch/src/request.js
var import_node_url, import_node_util3, INTERNALS3, isRequest, doBadDataWarn, Request, getNodeRequestOptions;
var init_request = __esm({
  "../../node_modules/node-fetch/src/request.js"() {
    import_node_url = require("node:url");
    import_node_util3 = require("node:util");
    init_headers();
    init_body();
    init_is();
    init_get_search();
    init_referrer();
    INTERNALS3 = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS3] === "object";
    };
    doBadDataWarn = (0, import_node_util3.deprecate)(() => {
    }, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
    Request = class extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if (!isRequest(init) && "data" in init) {
          doBadDataWarn();
        }
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS3] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS3].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS3].parsedURL);
      }
      get headers() {
        return this[INTERNALS3].headers;
      }
      get redirect() {
        return this[INTERNALS3].redirect;
      }
      get signal() {
        return this[INTERNALS3].signal;
      }
      get referrer() {
        if (this[INTERNALS3].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS3].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS3].referrer) {
          return this[INTERNALS3].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS3].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS3];
      const headers = new Headers(request[INTERNALS3].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS3].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS3].referrer = "no-referrer";
      }
      if (request[INTERNALS3].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip, deflate, br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
  }
});

// ../../node_modules/node-fetch/src/errors/abort-error.js
var AbortError;
var init_abort_error = __esm({
  "../../node_modules/node-fetch/src/errors/abort-error.js"() {
    init_base();
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
  }
});

// ../../node_modules/node-fetch/src/index.js
var src_exports = {};
__export(src_exports, {
  AbortError: () => AbortError,
  Blob: () => fetch_blob_default,
  FetchError: () => FetchError,
  File: () => file_default,
  FormData: () => FormData,
  Headers: () => Headers,
  Request: () => Request,
  Response: () => Response,
  blobFrom: () => blobFrom,
  blobFromSync: () => blobFromSync,
  default: () => fetch2,
  fileFrom: () => fileFrom,
  fileFromSync: () => fileFromSync,
  isRedirect: () => isRedirect
});
async function fetch2(url, options_) {
  return new Promise((resolve3, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve3(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name2 of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name2);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve3(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve3(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve3(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve3(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve3(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer2.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = import_node_buffer2.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer2.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer2.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var import_node_http2, import_node_https, import_node_zlib, import_node_stream2, import_node_buffer2, supportedSchemas;
var init_src = __esm({
  "../../node_modules/node-fetch/src/index.js"() {
    import_node_http2 = __toESM(require("node:http"), 1);
    import_node_https = __toESM(require("node:https"), 1);
    import_node_zlib = __toESM(require("node:zlib"), 1);
    import_node_stream2 = __toESM(require("node:stream"), 1);
    import_node_buffer2 = require("node:buffer");
    init_dist();
    init_body();
    init_response();
    init_headers();
    init_request();
    init_fetch_error();
    init_abort_error();
    init_is_redirect();
    init_esm_min();
    init_is();
    init_referrer();
    init_from();
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// ../../node_modules/cross-blob/index.js
var cross_blob_exports = {};
__export(cross_blob_exports, {
  default: () => cross_blob_default
});
var cross_blob_default;
var init_cross_blob = __esm({
  "../../node_modules/cross-blob/index.js"() {
    init_fetch_blob();
    cross_blob_default = Blob3;
  }
});

// node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer2(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i3 = 1; i3 < meta.length; i3++) {
    if (meta[i3] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i3]}`;
      if (meta[i3].indexOf("charset=") === 0) {
        charset = meta[i3].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default2;
var init_dist2 = __esm({
  "node_modules/data-uri-to-buffer/dist/index.js"() {
    dist_default2 = dataUriToBuffer2;
  }
});

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es20182 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports, function(exports2) {
      "use strict";
      const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
      function noop3() {
        return void 0;
      }
      function getGlobals() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function typeIsObject(x3) {
        return typeof x3 === "object" && x3 !== null || typeof x3 === "function";
      }
      const rethrowAssertionErrorRejection = noop3;
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseResolve = Promise.resolve.bind(originalPromise);
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === "function") {
          return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(void 0);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
      })();
      function reflectCall(F3, V, args) {
        if (typeof F3 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F3, V, args);
      }
      function promiseCall(F3, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F3, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        forEach(callback) {
          let i3 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i3 !== elements.length || node._next !== void 0) {
            if (i3 === elements.length) {
              node = node._next;
              elements = node._elements;
              i3 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i3]);
            ++i3;
          }
        }
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name2) {
        return new TypeError("Cannot " + name2 + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve3, reject) => {
          reader._closedPromise_resolve = resolve3;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
      const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
      const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
      const PullSteps = SymbolPolyfill("[[PullSteps]]");
      const NumberIsFinite = Number.isFinite || function(x3) {
        return typeof x3 === "number" && isFinite(x3);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x3) {
        return typeof x3 === "object" || typeof x3 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x3, context) {
        if (typeof x3 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x3) {
        return typeof x3 === "object" && x3 !== null || typeof x3 === "function";
      }
      function assertObject(x3, context) {
        if (!isObject(x3)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x3, position, context) {
        if (x3 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x3, field, context) {
        if (x3 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x3) {
        return x3 === 0 ? 0 : x3;
      }
      function integerPart(x3) {
        return censorNegativeZero(MathTrunc(x3));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x3 = Number(value);
        x3 = censorNegativeZero(x3);
        if (!NumberIsFinite(x3)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x3 = integerPart(x3);
        if (x3 < lowerBound || x3 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x3) || x3 === 0) {
          return 0;
        }
        return x3;
      }
      function assertReadableStream(x3, context) {
        if (!IsReadableStream(x3)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve3, reject) => {
            resolvePromise = resolve3;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e3) => rejectPromise(e3)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readRequests")) {
          return false;
        }
        return x3 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function defaultReaderBrandCheckException(name2) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name2} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("iterate"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve3, reject) => {
            resolvePromise = resolve3;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("finish iterating"));
          }
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      if (AsyncIteratorPrototype !== void 0) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      }
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x3._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name2) {
        return new TypeError(`ReadableStreamAsyncIterator.${name2} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x3) {
        return x3 !== x3;
      };
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      function TransferArrayBuffer(O) {
        return O;
      }
      function IsDetachedBuffer(O) {
        return false;
      }
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer))
            ;
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state2 = this._controlledReadableByteStream._state;
          if (state2 !== "readable") {
            throw new TypeError(`The stream (in ${state2} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state2 = this._controlledReadableByteStream._state;
          if (state2 !== "readable") {
            throw new TypeError(`The stream (in ${state2} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        error(e3 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e3);
        }
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledReadableByteStream")) {
          return false;
        }
        return x3 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x3 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }, (e3) => {
          ReadableByteStreamControllerError(controller, e3);
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready3 = false;
        if (maxAlignedBytes > currentAlignedBytes) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready3 = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready3;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
          elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        const buffer = TransferArrayBuffer(view.buffer);
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          bytesFilled: 0,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e3 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e3);
            readIntoRequest._errorSteps(e3);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled > 0) {
            const e3 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e3);
            throw e3;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer))
            ;
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e3) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e3);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "errored") {
          return null;
        }
        if (state2 === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state2 = controller._controlledReadableByteStream._state;
        if (state2 === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, (r3) => {
          ReadableByteStreamControllerError(controller, r3);
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name2) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name2} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name2) {
        return new TypeError(`ReadableByteStreamController.prototype.${name2} can only be used on a ReadableByteStreamController`);
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve3, reject) => {
            resolvePromise = resolve3;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e3) => rejectPromise(e3)
          };
          ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readIntoRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readIntoRequests")) {
          return false;
        }
        return x3 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
      }
      function byobReaderBrandCheckException(name2) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name2} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x3, context) {
        if (!IsWritableStream(x3)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal3(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_writableStreamController")) {
          return false;
        }
        return x3 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
        const state2 = stream._state;
        if (state2 === "closed" || state2 === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state2 === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve3, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve3,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state2 = stream._state;
        if (state2 === "closed" || state2 === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state2} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve3, reject) => {
          const closeRequest = {
            _resolve: resolve3,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state2 === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve3, reject) => {
          const writeRequest = {
            _resolve: resolve3,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state2 = stream._state;
        if (state2 === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state2 = stream._state;
        if (state2 === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state2 = stream._state;
          if (state2 === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state2 === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state2 === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_ownerWritableStream")) {
          return false;
        }
        return x3 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state2 = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state2 === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state2 === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state2 = stream._state;
        if (state2 === "errored" || state2 === "erroring") {
          return null;
        }
        if (state2 === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state2 = stream._state;
        if (state2 === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state2 === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state2 === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        error(e3 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state2 = this._controlledWritableStream._state;
          if (state2 !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e3);
        }
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledWritableStream")) {
          return false;
        }
        return x3 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (r3) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r3);
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let writeAlgorithm = () => promiseResolvedWith(void 0);
        let closeAlgorithm = () => promiseResolvedWith(void 0);
        let abortAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state2 = stream._state;
        if (state2 === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state2 = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state2 === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name2) {
        return new TypeError(`WritableStream.prototype.${name2} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name2) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name2} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name2) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name2} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name2) {
        return new TypeError("Cannot " + name2 + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve3, reject) => {
          writer._closedPromise_resolve = resolve3;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve3, reject) => {
          writer._readyPromise_resolve = resolve3;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a) {
          return false;
        }
      }
      function createDOMExceptionPolyfill() {
        const ctor = function DOMException4(message, name2) {
          this.message = message || "";
          this.name = name2 || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve3, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = new DOMException$1("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve3(void 0);
            }
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        error(e3 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e3);
        }
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledReadableStream")) {
          return false;
        }
        return x3 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
        }, (e3) => {
          ReadableStreamDefaultControllerError(controller, e3);
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e3) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e3);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state2 = controller._controlledReadableStream._state;
        if (state2 === "errored") {
          return null;
        }
        if (state2 === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state2 = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state2 === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, (r3) => {
          ReadableStreamDefaultControllerError(controller, r3);
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name2) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name2} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve3) => {
          resolveCancelPromise = resolve3;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r3) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r3);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r3);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve3) => {
          resolveCancelPromise = resolve3;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r3) => {
            if (thisReader !== reader) {
              return;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r3);
            ReadableByteStreamControllerError(branch2._readableStreamController, r3);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal3(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e3) {
            return promiseRejectedWith(e3);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
      }
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      if (typeof SymbolPolyfill.asyncIterator === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
          value: ReadableStream2.prototype.values,
          writable: true,
          configurable: true
        });
      }
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readableStreamController")) {
          return false;
        }
        return x3 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop3);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
          reader._readRequests = new SimpleQueue();
        }
      }
      function ReadableStreamError(stream, e3) {
        stream._state = "errored";
        stream._storedError = e3;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e3);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._errorSteps(e3);
          });
          reader._readRequests = new SimpleQueue();
        } else {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._errorSteps(e3);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
      }
      function streamBrandCheckException$1(name2) {
        return new TypeError(`ReadableStream.prototype.${name2} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      try {
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name2) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name2} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x3 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      try {
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name2) {
        return new TypeError(`CountQueuingStrategy.prototype.${name2} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x3 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve3) => {
            startPromise_resolve = resolve3;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          TransformStreamErrorWritableAndUnblockWrite(stream, reason);
          return promiseResolvedWith(void 0);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_transformStreamController")) {
          return false;
        }
        return x3 instanceof TransformStream;
      }
      function TransformStreamError(stream, e3) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e3);
        TransformStreamErrorWritableAndUnblockWrite(stream, e3);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e3) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e3);
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve3) => {
          stream._backpressureChangePromise_resolve = resolve3;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledTransformStream")) {
          return false;
        }
        return x3 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
          try {
            TransformStreamDefaultControllerEnqueue(controller, chunk);
            return promiseResolvedWith(void 0);
          } catch (transformResultE) {
            return promiseRejectedWith(transformResultE);
          }
        };
        let flushAlgorithm = () => promiseResolvedWith(void 0);
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e3) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e3);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e3) {
        TransformStreamError(controller._controlledTransformStream, e3);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r3) => {
          TransformStreamError(controller._controlledTransformStream, r3);
          throw r3;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state2 = writable._state;
            if (state2 === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        TransformStreamError(stream, reason);
        return promiseResolvedWith(void 0);
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        return transformPromiseWith(flushPromise, () => {
          if (readable._state === "errored") {
            throw readable._storedError;
          }
          ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, (r3) => {
          TransformStreamError(stream, r3);
          throw readable._storedError;
        });
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function defaultControllerBrandCheckException(name2) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name2} can only be used on a TransformStreamDefaultController`);
      }
      function streamBrandCheckException(name2) {
        return new TypeError(`TransformStream.prototype.${name2} can only be used on a TransformStream`);
      }
      exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports2.CountQueuingStrategy = CountQueuingStrategy;
      exports2.ReadableByteStreamController = ReadableByteStreamController;
      exports2.ReadableStream = ReadableStream2;
      exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports2.TransformStream = TransformStream;
      exports2.TransformStreamDefaultController = TransformStreamDefaultController;
      exports2.WritableStream = WritableStream;
      exports2.WritableStreamDefaultController = WritableStreamDefaultController;
      exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams2 = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE3 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es20182());
      }
    }
    try {
      const { Blob: Blob6 } = require("buffer");
      if (Blob6 && !Blob6.prototype.stream) {
        Blob6.prototype.stream = function name2(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE3));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator2(parts, clone3 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone3) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE2);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE2));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams2, POOL_SIZE2, _Blob2, Blob5, fetch_blob_default2;
var init_fetch_blob2 = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams2 = __toESM(require_streams2(), 1);
    POOL_SIZE2 = 65536;
    _Blob2 = class Blob4 {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob4) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator2(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator2(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator2(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob4([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob2.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob5 = _Blob2;
    fetch_blob_default2 = Blob5;
  }
});

// node_modules/fetch-blob/file.js
var _File2, File4, file_default2;
var init_file2 = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob2();
    _File2 = class File3 extends fetch_blob_default2 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default2 && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File4 = _File2;
    file_default2 = File4;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob2(F3, B = fetch_blob_default2) {
  var b = `${r2()}${r2()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F3.forEach((v, n) => typeof v == "string" ? c.push(p + e2(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e2(n) + `"; filename="${e2(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t2, i2, h2, r2, m2, f3, e2, x2, FormData3;
var init_esm_min2 = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob2();
    init_file2();
    ({ toStringTag: t2, iterator: i2, hasInstance: h2 } = Symbol);
    r2 = Math.random;
    m2 = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f3 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t2]) ? [(c = c !== void 0 ? c + "" : b[t2] == "File" ? b.name : "blob", a), b.name !== c || b[t2] == "blob" ? new file_default2([b], c, b) : b] : [a, b + ""]);
    e2 = (c, f5) => (f5 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x2 = (n, a, e3) => {
      if (a.length < e3) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e3} arguments required, but only ${a.length} present.`);
      }
    };
    FormData3 = class FormData4 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t2]() {
        return "FormData";
      }
      [i2]() {
        return this.entries();
      }
      static [h2](o) {
        return o && typeof o === "object" && o[t2] === "FormData" && !m2.some((m3) => typeof o[m3] != "function");
      }
      append(...a) {
        x2("append", arguments, 2);
        this.#d.push(f3(...a));
      }
      delete(a) {
        x2("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x2("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x2("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x2("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x2("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x2("set", arguments, 2);
        var b = [], c = true;
        a = f3(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/base.js
var FetchBaseError2;
var init_base2 = __esm({
  "node_modules/node-fetch/src/errors/base.js"() {
    FetchBaseError2 = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/fetch-error.js
var FetchError2;
var init_fetch_error2 = __esm({
  "node_modules/node-fetch/src/errors/fetch-error.js"() {
    init_base2();
    FetchError2 = class extends FetchBaseError2 {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
  }
});

// node_modules/node-fetch/src/utils/is.js
var NAME2, isURLSearchParameters2, isBlob2, isAbortSignal2, isDomainOrSubdomain2, isSameProtocol2;
var init_is2 = __esm({
  "node_modules/node-fetch/src/utils/is.js"() {
    NAME2 = Symbol.toStringTag;
    isURLSearchParameters2 = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME2] === "URLSearchParams";
    };
    isBlob2 = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME2]);
    };
    isAbortSignal2 = (object) => {
      return typeof object === "object" && (object[NAME2] === "AbortSignal" || object[NAME2] === "EventTarget");
    };
    isDomainOrSubdomain2 = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    isSameProtocol2 = (destination, original) => {
      const orig = new URL(original).protocol;
      const dest = new URL(destination).protocol;
      return orig === dest;
    };
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception2 = __commonJS({
  "node_modules/node-domexception/index.js"(exports, module2) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module2.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
var import_node_fs2, import_node_path2, import_node_domexception2, stat2, blobFromSync2, blobFrom2, fileFrom2, fileFromSync2, fromBlob2, fromFile2, BlobDataItem2;
var init_from2 = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_fs2 = require("node:fs");
    import_node_path2 = require("node:path");
    import_node_domexception2 = __toESM(require_node_domexception2(), 1);
    init_file2();
    init_fetch_blob2();
    ({ stat: stat2 } = import_node_fs2.promises);
    blobFromSync2 = (path, type) => fromBlob2((0, import_node_fs2.statSync)(path), path, type);
    blobFrom2 = (path, type) => stat2(path).then((stat3) => fromBlob2(stat3, path, type));
    fileFrom2 = (path, type) => stat2(path).then((stat3) => fromFile2(stat3, path, type));
    fileFromSync2 = (path, type) => fromFile2((0, import_node_fs2.statSync)(path), path, type);
    fromBlob2 = (stat3, path, type = "") => new fetch_blob_default2([new BlobDataItem2({
      path,
      size: stat3.size,
      lastModified: stat3.mtimeMs,
      start: 0
    })], { type });
    fromFile2 = (stat3, path, type = "") => new file_default2([new BlobDataItem2({
      path,
      size: stat3.size,
      lastModified: stat3.mtimeMs,
      start: 0
    })], (0, import_node_path2.basename)(path), { type, lastModified: stat3.mtimeMs });
    BlobDataItem2 = class {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      slice(start, end) {
        return new BlobDataItem2({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat2(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception2.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* (0, import_node_fs2.createReadStream)(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports2 = {};
__export(multipart_parser_exports2, {
  toFormData: () => toFormData2
});
function _fileName2(headerValue) {
  const m3 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m3) {
    return;
  }
  const match = m3[2] || m3[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m4, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData2(Body3, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m3 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m3) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser2(m3[1] || m3[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData3();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default2(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m4 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m4) {
        entryName = m4[2] || m4[3] || "";
      }
      filename = _fileName2(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body3) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s2, S2, f4, F2, LF2, CR2, SPACE2, HYPHEN2, COLON2, A2, Z2, lower2, noop2, MultipartParser2;
var init_multipart_parser2 = __esm({
  "node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from2();
    init_esm_min2();
    s2 = 0;
    S2 = {
      START_BOUNDARY: s2++,
      HEADER_FIELD_START: s2++,
      HEADER_FIELD: s2++,
      HEADER_VALUE_START: s2++,
      HEADER_VALUE: s2++,
      HEADER_VALUE_ALMOST_DONE: s2++,
      HEADERS_ALMOST_DONE: s2++,
      PART_DATA_START: s2++,
      PART_DATA: s2++,
      END: s2++
    };
    f4 = 1;
    F2 = {
      PART_BOUNDARY: f4,
      LAST_BOUNDARY: f4 *= 2
    };
    LF2 = 10;
    CR2 = 13;
    SPACE2 = 32;
    HYPHEN2 = 45;
    COLON2 = 58;
    A2 = 97;
    Z2 = 122;
    lower2 = (c) => c | 32;
    noop2 = () => {
    };
    MultipartParser2 = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop2;
        this.onHeaderField = noop2;
        this.onHeadersEnd = noop2;
        this.onHeaderValue = noop2;
        this.onPartBegin = noop2;
        this.onPartData = noop2;
        this.onPartEnd = noop2;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i3 = 0; i3 < boundary.length; i3++) {
          ui8a[i3] = boundary.charCodeAt(i3);
          this.boundaryChars[ui8a[i3]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S2.START_BOUNDARY;
      }
      write(data) {
        let i3 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state: state2, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name2) => {
          this[name2 + "Mark"] = i3;
        };
        const clear = (name2) => {
          delete this[name2 + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name2, clear2) => {
          const markSymbol = name2 + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name2, this[markSymbol], i3, data);
            delete this[markSymbol];
          } else {
            callback(name2, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i3 = 0; i3 < length_; i3++) {
          c = data[i3];
          switch (state2) {
            case S2.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN2) {
                  flags |= F2.LAST_BOUNDARY;
                } else if (c !== CR2) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F2.LAST_BOUNDARY && c === HYPHEN2) {
                  state2 = S2.END;
                  flags = 0;
                } else if (!(flags & F2.LAST_BOUNDARY) && c === LF2) {
                  index = 0;
                  callback("onPartBegin");
                  state2 = S2.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S2.HEADER_FIELD_START:
              state2 = S2.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S2.HEADER_FIELD:
              if (c === CR2) {
                clear("onHeaderField");
                state2 = S2.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN2) {
                break;
              }
              if (c === COLON2) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state2 = S2.HEADER_VALUE_START;
                break;
              }
              cl = lower2(c);
              if (cl < A2 || cl > Z2) {
                return;
              }
              break;
            case S2.HEADER_VALUE_START:
              if (c === SPACE2) {
                break;
              }
              mark("onHeaderValue");
              state2 = S2.HEADER_VALUE;
            case S2.HEADER_VALUE:
              if (c === CR2) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state2 = S2.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S2.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF2) {
                return;
              }
              state2 = S2.HEADER_FIELD_START;
              break;
            case S2.HEADERS_ALMOST_DONE:
              if (c !== LF2) {
                return;
              }
              callback("onHeadersEnd");
              state2 = S2.PART_DATA_START;
              break;
            case S2.PART_DATA_START:
              state2 = S2.PART_DATA;
              mark("onPartData");
            case S2.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i3 += boundaryEnd;
                while (i3 < bufferLength && !(data[i3] in boundaryChars)) {
                  i3 += boundaryLength;
                }
                i3 -= boundaryEnd;
                c = data[i3];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR2) {
                  flags |= F2.PART_BOUNDARY;
                } else if (c === HYPHEN2) {
                  flags |= F2.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F2.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF2) {
                    flags &= ~F2.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state2 = S2.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F2.LAST_BOUNDARY) {
                  if (c === HYPHEN2) {
                    callback("onPartEnd");
                    state2 = S2.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i3--;
              }
              break;
            case S2.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state2}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state2;
        this.flags = flags;
      }
      end() {
        if (this.state === S2.HEADER_FIELD_START && this.index === 0 || this.state === S2.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S2.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/node-fetch/src/body.js
async function consumeBody2(data) {
  if (data[INTERNALS4].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS4].disturbed = true;
  if (data[INTERNALS4].error) {
    throw data[INTERNALS4].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer3.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream3.default)) {
    return import_node_buffer3.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError2(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError2 ? error : new FetchError2(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer3.Buffer.from(accum.join(""));
      }
      return import_node_buffer3.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError2(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError2(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var import_node_stream3, import_node_util4, import_node_buffer3, pipeline2, INTERNALS4, Body2, clone2, getNonSpecFormDataBoundary2, extractContentType2, getTotalBytes2, writeToStream2;
var init_body2 = __esm({
  "node_modules/node-fetch/src/body.js"() {
    import_node_stream3 = __toESM(require("node:stream"), 1);
    import_node_util4 = require("node:util");
    import_node_buffer3 = require("node:buffer");
    init_fetch_blob2();
    init_esm_min2();
    init_fetch_error2();
    init_base2();
    init_is2();
    pipeline2 = (0, import_node_util4.promisify)(import_node_stream3.default.pipeline);
    INTERNALS4 = Symbol("Body internals");
    Body2 = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters2(body)) {
          body = import_node_buffer3.Buffer.from(body.toString());
        } else if (isBlob2(body)) {
        } else if (import_node_buffer3.Buffer.isBuffer(body)) {
        } else if (import_node_util4.types.isAnyArrayBuffer(body)) {
          body = import_node_buffer3.Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = import_node_buffer3.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream3.default) {
        } else if (body instanceof FormData3) {
          body = formDataToBlob2(body);
          boundary = body.type.split("=")[1];
        } else {
          body = import_node_buffer3.Buffer.from(String(body));
        }
        let stream = body;
        if (import_node_buffer3.Buffer.isBuffer(body)) {
          stream = import_node_stream3.default.Readable.from(body);
        } else if (isBlob2(body)) {
          stream = import_node_stream3.default.Readable.from(body.stream());
        }
        this[INTERNALS4] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream3.default) {
          body.on("error", (error_) => {
            const error = error_ instanceof FetchBaseError2 ? error_ : new FetchError2(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS4].error = error;
          });
        }
      }
      get body() {
        return this[INTERNALS4].stream;
      }
      get bodyUsed() {
        return this[INTERNALS4].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody2(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData3();
          const parameters = new URLSearchParams(await this.text());
          for (const [name2, value] of parameters) {
            formData.append(name2, value);
          }
          return formData;
        }
        const { toFormData: toFormData3 } = await Promise.resolve().then(() => (init_multipart_parser2(), multipart_parser_exports2));
        return toFormData3(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS4].body && this[INTERNALS4].body.type || "";
        const buf = await this.arrayBuffer();
        return new fetch_blob_default2([buf], {
          type: ct
        });
      }
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      async text() {
        const buffer = await consumeBody2(this);
        return new TextDecoder().decode(buffer);
      }
      buffer() {
        return consumeBody2(this);
      }
    };
    Body2.prototype.buffer = (0, import_node_util4.deprecate)(Body2.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body2.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util4.deprecate)(() => {
      }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
    });
    clone2 = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS4];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream3.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream3.PassThrough({ highWaterMark });
        p2 = new import_node_stream3.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS4].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary2 = (0, import_node_util4.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType2 = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters2(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob2(body)) {
        return body.type || null;
      }
      if (import_node_buffer3.Buffer.isBuffer(body) || import_node_util4.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData3) {
        return `multipart/form-data; boundary=${request[INTERNALS4].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary2(body)}`;
      }
      if (body instanceof import_node_stream3.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes2 = (request) => {
      const { body } = request[INTERNALS4];
      if (body === null) {
        return 0;
      }
      if (isBlob2(body)) {
        return body.size;
      }
      if (import_node_buffer3.Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream2 = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline2(body, dest);
      }
    };
  }
});

// node_modules/node-fetch/src/headers.js
function fromRawHeaders2(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name2, value]) => {
    try {
      validateHeaderName2(name2);
      validateHeaderValue2(name2, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var import_node_util5, import_node_http3, validateHeaderName2, validateHeaderValue2, Headers2;
var init_headers2 = __esm({
  "node_modules/node-fetch/src/headers.js"() {
    import_node_util5 = require("node:util");
    import_node_http3 = __toESM(require("node:http"), 1);
    validateHeaderName2 = typeof import_node_http3.default.validateHeaderName === "function" ? import_node_http3.default.validateHeaderName : (name2) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name2)) {
        const error = new TypeError(`Header name must be a valid HTTP token [${name2}]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error;
      }
    };
    validateHeaderValue2 = typeof import_node_http3.default.validateHeaderValue === "function" ? import_node_http3.default.validateHeaderValue : (name2, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error = new TypeError(`Invalid character in header content ["${name2}"]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
        throw error;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init) {
        let result = [];
        if (init instanceof Headers2) {
          const raw = init.raw();
          for (const [name2, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name2, value]));
          }
        } else if (init == null) {
        } else if (typeof init === "object" && !import_node_util5.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util5.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name2, value]) => {
          validateHeaderName2(name2);
          validateHeaderValue2(name2, String(value));
          return [String(name2).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name2, value) => {
                  validateHeaderName2(name2);
                  validateHeaderValue2(name2, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name2).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name2) => {
                  validateHeaderName2(name2);
                  return URLSearchParams.prototype[p].call(target, String(name2).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name2) {
        const values = this.getAll(name2);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name2)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name2 of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name2), name2, this]);
        }
      }
      *values() {
        for (const name2 of this.keys()) {
          yield this.get(name2);
        }
      }
      *entries() {
        for (const name2 of this.keys()) {
          yield [name2, this.get(name2)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
  }
});

// node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus2, isRedirect2;
var init_is_redirect2 = __esm({
  "node_modules/node-fetch/src/utils/is-redirect.js"() {
    redirectStatus2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect2 = (code) => {
      return redirectStatus2.has(code);
    };
  }
});

// node_modules/node-fetch/src/response.js
var INTERNALS5, Response2;
var init_response2 = __esm({
  "node_modules/node-fetch/src/response.js"() {
    init_headers2();
    init_body2();
    init_is_redirect2();
    INTERNALS5 = Symbol("Response internals");
    Response2 = class extends Body2 {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType2(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS5] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS5].type;
      }
      get url() {
        return this[INTERNALS5].url || "";
      }
      get status() {
        return this[INTERNALS5].status;
      }
      get ok() {
        return this[INTERNALS5].status >= 200 && this[INTERNALS5].status < 300;
      }
      get redirected() {
        return this[INTERNALS5].counter > 0;
      }
      get statusText() {
        return this[INTERNALS5].statusText;
      }
      get headers() {
        return this[INTERNALS5].headers;
      }
      get highWaterMark() {
        return this[INTERNALS5].highWaterMark;
      }
      clone() {
        return new Response2(clone2(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect2(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS5].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
  }
});

// node_modules/node-fetch/src/utils/get-search.js
var getSearch2;
var init_get_search2 = __esm({
  "node_modules/node-fetch/src/utils/get-search.js"() {
    getSearch2 = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
    };
  }
});

// node_modules/node-fetch/src/utils/referrer.js
function stripURLForUseAsAReferrer2(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy2(referrerPolicy) {
  if (!ReferrerPolicy2.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy2(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy2(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy2(url);
}
function determineRequestsReferrer2(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer2(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer2(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy2(referrerURL) && !isUrlPotentiallyTrustworthy2(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy2(referrerURL) && !isUrlPotentiallyTrustworthy2(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy2(referrerURL) && !isUrlPotentiallyTrustworthy2(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader2(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy2.has(token)) {
      policy = token;
    }
  }
  return policy;
}
var import_node_net2, ReferrerPolicy2, DEFAULT_REFERRER_POLICY2;
var init_referrer2 = __esm({
  "node_modules/node-fetch/src/utils/referrer.js"() {
    import_node_net2 = require("node:net");
    ReferrerPolicy2 = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY2 = "strict-origin-when-cross-origin";
  }
});

// node_modules/node-fetch/src/request.js
var import_node_url2, import_node_util6, INTERNALS6, isRequest2, doBadDataWarn2, Request2, getNodeRequestOptions2;
var init_request2 = __esm({
  "node_modules/node-fetch/src/request.js"() {
    import_node_url2 = require("node:url");
    import_node_util6 = require("node:util");
    init_headers2();
    init_body2();
    init_is2();
    init_get_search2();
    init_referrer2();
    INTERNALS6 = Symbol("Request internals");
    isRequest2 = (object) => {
      return typeof object === "object" && typeof object[INTERNALS6] === "object";
    };
    doBadDataWarn2 = (0, import_node_util6.deprecate)(() => {
    }, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
    Request2 = class extends Body2 {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest2(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if (!isRequest2(init) && "data" in init) {
          doBadDataWarn2();
        }
        if ((init.body != null || isRequest2(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest2(input) && input.body !== null ? clone2(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers2(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType2(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest2(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal2(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS6] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS6].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS6].parsedURL);
      }
      get headers() {
        return this[INTERNALS6].headers;
      }
      get redirect() {
        return this[INTERNALS6].redirect;
      }
      get signal() {
        return this[INTERNALS6].signal;
      }
      get referrer() {
        if (this[INTERNALS6].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS6].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS6].referrer) {
          return this[INTERNALS6].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS6].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS6].referrerPolicy = validateReferrerPolicy2(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions2 = (request) => {
      const { parsedURL } = request[INTERNALS6];
      const headers = new Headers2(request[INTERNALS6].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes2(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY2;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS6].referrer = determineRequestsReferrer2(request);
      } else {
        request[INTERNALS6].referrer = "no-referrer";
      }
      if (request[INTERNALS6].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip, deflate, br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch2(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
  }
});

// node_modules/node-fetch/src/errors/abort-error.js
var AbortError2;
var init_abort_error2 = __esm({
  "node_modules/node-fetch/src/errors/abort-error.js"() {
    init_base2();
    AbortError2 = class extends FetchBaseError2 {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
  }
});

// node_modules/node-fetch/src/index.js
var src_exports2 = {};
__export(src_exports2, {
  AbortError: () => AbortError2,
  Blob: () => fetch_blob_default2,
  FetchError: () => FetchError2,
  File: () => file_default2,
  FormData: () => FormData3,
  Headers: () => Headers2,
  Request: () => Request2,
  Response: () => Response2,
  blobFrom: () => blobFrom2,
  blobFromSync: () => blobFromSync2,
  default: () => fetch3,
  fileFrom: () => fileFrom2,
  fileFromSync: () => fileFromSync2,
  isRedirect: () => isRedirect2
});
async function fetch3(url, options_) {
  return new Promise((resolve3, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions2(request);
    if (!supportedSchemas2.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default2(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve3(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http4.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError2("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof import_node_stream4.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError2(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding2(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders2(response_.rawHeaders);
      if (isRedirect2(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError2(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError2(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError2(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone2(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain2(request.url, locationURL) || !isSameProtocol2(request.url, locationURL)) {
              for (const name2 of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name2);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream4.default.Readable) {
              reject(new FetchError2("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader2(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve3(fetch3(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream4.pipeline)(response_, new import_node_stream4.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve3(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream4.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response2(body, responseOptions);
        resolve3(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream4.pipeline)(response_, new import_node_stream4.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream4.pipeline)(body, import_node_zlib2.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = (0, import_node_stream4.pipeline)(body, import_node_zlib2.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response2(body, responseOptions);
          resolve3(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response2(body, responseOptions);
            resolve3(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream4.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response2(body, responseOptions);
        resolve3(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve3(response);
    });
    writeToStream2(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding2(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer4.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = import_node_buffer4.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer4.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer4.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var import_node_http4, import_node_https2, import_node_zlib2, import_node_stream4, import_node_buffer4, supportedSchemas2;
var init_src2 = __esm({
  "node_modules/node-fetch/src/index.js"() {
    import_node_http4 = __toESM(require("node:http"), 1);
    import_node_https2 = __toESM(require("node:https"), 1);
    import_node_zlib2 = __toESM(require("node:zlib"), 1);
    import_node_stream4 = __toESM(require("node:stream"), 1);
    import_node_buffer4 = require("node:buffer");
    init_dist2();
    init_body2();
    init_response2();
    init_headers2();
    init_request2();
    init_fetch_error2();
    init_abort_error2();
    init_is_redirect2();
    init_esm_min2();
    init_is2();
    init_referrer2();
    init_from2();
    supportedSchemas2 = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/cross-blob/index.js
var cross_blob_exports2 = {};
__export(cross_blob_exports2, {
  default: () => cross_blob_default2
});
var cross_blob_default2;
var init_cross_blob2 = __esm({
  "node_modules/cross-blob/index.js"() {
    init_fetch_blob2();
    cross_blob_default2 = Blob5;
  }
});

// index.ts
var core_exports = {};
__export(core_exports, {
  default: () => core_default
});
module.exports = __toCommonJS(core_exports);

// ../common/utils/languages.ts
var languages_exports = {};
__export(languages_exports, {
  js: () => js,
  json: () => json
});
var js = ["js", "mjs", "cjs", "javascript"];
var json = ["json"];

// ../common/utils/path.ts
var fullSuffix = (fileName = "") => fileName.split(".").slice(1);
var suffix = (fileName = "") => {
  const suffix2 = fullSuffix(fileName);
  return suffix2.join(".");
};

// ../../node_modules/remote-esm/utils/path.js
var urlSep = "://";
var get = (path, rel = "", keepRelativeImports = false) => {
  let prefix = "";
  const getPrefix = (str) => {
    prefix = str.includes(urlSep) ? str.split(urlSep).splice(0, 1) : void 0;
    if (prefix)
      return str.replace(`${prefix}${urlSep}`, "");
    else
      return str;
  };
  if (path.includes(urlSep))
    path = getPrefix(path);
  if (rel.includes(urlSep))
    rel = getPrefix(rel);
  if (!keepRelativeImports)
    rel = rel.split("/").filter((v) => v != "..").join("/");
  if (rel[rel.length - 1] === "/")
    rel = rel.slice(0, -1);
  let dirTokens = rel.split("/");
  if (dirTokens.length === 1 && dirTokens[0] === "")
    dirTokens = [];
  const potentialFile = dirTokens.pop();
  if (potentialFile) {
    const splitPath2 = potentialFile.split(".");
    if (splitPath2.length == 1 || splitPath2.length > 1 && splitPath2.includes(""))
      dirTokens.push(potentialFile);
  }
  const splitPath = path.split("/");
  const pathTokens = splitPath.filter((str, i3) => !!str);
  const extensionTokens = pathTokens.filter((str, i3) => {
    if (str === "..") {
      dirTokens.pop();
      return false;
    } else if (str === ".")
      return false;
    else
      return true;
  });
  const newPath = [...dirTokens, ...extensionTokens].join("/");
  if (prefix)
    return prefix + "://" + newPath;
  else
    return newPath;
};

// ../../node_modules/remote-esm/utils/request.js
var getURL = (path) => {
  let url;
  try {
    url = new URL(path).href;
  } catch {
    url = get(path, globalThis.location.href);
  }
  return url;
};
var handleFetch = async (path, options = {}, progressCallback) => {
  if (!options.mode)
    options.mode = "cors";
  const url = getURL(path);
  const response = await fetchRemote(url, options, progressCallback);
  if (!response)
    throw new Error("No response received.");
  const type = response.type.split(";")[0];
  return {
    url,
    type,
    buffer: response.buffer
  };
};
var fetchRemote = async (url, options = {}, progressCallback) => {
  const response = await globalThis.fetch(url, options);
  return new Promise(async (resolve3) => {
    if (response) {
      const type = response.headers.get("Content-Type");
      if (globalThis.REMOTEESM_NODE) {
        const buffer = await response.arrayBuffer();
        resolve3({ buffer, type });
      } else {
        const reader = response.body.getReader();
        const bytes = parseInt(response.headers.get("Content-Length"), 10);
        let bytesReceived = 0;
        let buffer = [];
        const processBuffer = async ({ done, value }) => {
          if (done) {
            const config = {};
            if (typeof type === "string")
              config.type = type;
            const blob = new Blob(buffer, config);
            const ab = await blob.arrayBuffer();
            resolve3({ buffer: new Uint8Array(ab), type });
            return;
          }
          bytesReceived += value.length;
          const chunk = value;
          buffer.push(chunk);
          if (progressCallback instanceof Function)
            progressCallback(response.headers.get("Range"), bytesReceived / bytes, bytes);
          return reader.read().then(processBuffer);
        };
        reader.read().then(processBuffer);
      }
    } else {
      console.warn("Response not received!", options.headers);
      resolve3(void 0);
    }
  });
};

// ../../node_modules/remote-esm/index.js
var datauri = {};
var ready = new Promise(async (resolve3, reject) => {
  try {
    if (typeof process === "object") {
      globalThis.fetch = (await Promise.resolve().then(() => (init_src(), src_exports))).default;
      if (typeof globalThis.fetch !== "function")
        globalThis.fetch = fetch;
      const Blob6 = (await Promise.resolve().then(() => (init_cross_blob(), cross_blob_exports))).default;
      globalThis.Blob = Blob6;
      if (typeof globalThis.Blob !== "function")
        globalThis.Blob = Blob6;
      resolve3(true);
    } else
      resolve3(true);
  } catch (err) {
    console.log(err);
    reject(err);
  }
});
var re = /import([ \n\t]*(?:(?:\* (?:as .+))|(?:[^ \n\t\{\}]+[ \n\t]*,?)|(?:[ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\}))[ \n\t]*)from[ \n\t]*(['"])([^'"\n]+)(?:['"])([ \n\t]*assert[ \n\t]*{type:[ \n\t]*(['"])([^'"\n]+)(?:['"])})?/g;
var moduleDataURI = (text, mimeType = "text/javascript") => `data:${mimeType};base64,` + btoa(text);
var importFromText = async (text, path, collection = {}) => {
  const extension = path.split(".").slice(-1)[0];
  const isJSON = extension === "json";
  let mimeType = isJSON ? "application/json" : "application/javascript";
  const uri = moduleDataURI(text, mimeType);
  let imported = await (isJSON ? import(uri, { assert: { type: "json" } }) : import(uri)).catch((e3) => {
    if (e3.message.includes("Unexpected token"))
      throw new Error("Failed to fetch");
    else
      throw e3;
  });
  const ref = {};
  for (let key in imported) {
    Object.defineProperty(ref, key, {
      get: () => imported[key],
      enumerable: true
    });
  }
  collection[path] = uri;
  return imported;
};
var resolve = get;
var getText = async (uri) => await globalThis.fetch(uri).then((res) => res.text());
var safeImport = async (uri, opts = {}) => {
  const {
    root,
    onImport = () => {
    },
    outputText,
    forceImportFromText
  } = opts;
  const uriCollection = opts.datauri || datauri;
  await ready;
  if (opts.dependencies)
    opts.dependencies[uri] = {};
  const extension = uri.split(".").slice(-1)[0];
  const isJSON = extension === "json";
  let module2 = !forceImportFromText ? await (isJSON ? import(uri, { assert: { type: "json" } }) : import(uri)).catch(() => {
  }) : void 0;
  let text, originalText;
  if (!module2) {
    text = originalText = await getText(uri);
    try {
      module2 = await importFromText(text, uri, uriCollection);
    } catch (e3) {
      const base = get("", uri);
      let childBase = base;
      const importInfo = [];
      let m3;
      do {
        m3 = re.exec(text);
        if (m3 == null)
          m3 = re.exec(text);
        if (m3) {
          text = text.replace(m3[0], ``);
          const wildcard = !!m3[1].match(/\*\s+as/);
          const variables = m3[1].replace(/\*\s+as/, "").trim();
          importInfo.push({
            path: m3[3],
            variables,
            wildcard
          });
        }
      } while (m3);
      for (let i3 in importInfo) {
        const { variables, wildcard, path } = importInfo[i3];
        let correctPath = get(path, childBase);
        const dependentFilePath = get(correctPath);
        const dependentFileWithoutRoot = get(dependentFilePath.replace(root ?? "", ""));
        if (opts.dependencies)
          opts.dependencies[uri][dependentFileWithoutRoot] = importInfo[i3];
        let ref = uriCollection[dependentFilePath];
        if (!ref) {
          const extension2 = correctPath.split(".").slice(-1)[0];
          const info = await handleFetch(correctPath);
          let blob = new Blob([info.buffer], { type: info.type });
          const isJS = extension2.includes("js");
          const newURI = dependentFileWithoutRoot;
          const newText = await blob.text();
          let importedText = isJS ? await new Promise(async (resolve3) => {
            await safeImport(newURI, {
              root: uri,
              onImport: (path2, info2) => {
                onImport(path2, info2);
                if (path2 == newURI)
                  resolve3(info2.text);
              },
              outputText: true,
              forceImportFromText
            });
          }) : newText;
          await importFromText(importedText, correctPath, uriCollection);
        }
        text = `import ${wildcard ? "* as " : ""}${variables} from "${uriCollection[correctPath]}";
${text}`;
      }
      module2 = await importFromText(text, uri, uriCollection);
    }
  }
  let txt = outputText ? text ?? await getText(uri) : void 0;
  onImport(uri, {
    text: txt,
    file: outputText ? originalText ?? txt : void 0,
    module: module2
  });
  return module2;
};
var remote_esm_default = safeImport;

// ../common/get.ts
var cache = {};
var get2 = async (relPath, relativeTo = "", onImport) => {
  let type = suffix(relPath);
  const isJSON = !type || type.includes("json");
  const fullPath = resolve(relPath, relativeTo);
  const isFunc = typeof onImport === "function";
  const imported = cache[fullPath]?.imported ?? [];
  if (!cache[fullPath]) {
    const imported2 = [];
    cache[fullPath] = remote_esm_default(fullPath, {
      onImport: (...args) => {
        if (isFunc) {
          imported2.push(args);
          onImport(...args);
        }
      },
      outputText: true
    }).catch((e3) => {
      if (e3.message.includes("Failed to fetch"))
        throw new Error("404");
      else
        throw e3;
    });
    cache[fullPath].imported = imported2;
    const res = await cache[fullPath];
    if (isJSON)
      cache[fullPath] = res?.default ?? {};
    else
      cache[fullPath] = res;
  } else if (isFunc)
    imported.forEach((args) => onImport(...args));
  return isJSON ? JSON.parse(JSON.stringify(cache[fullPath])) : cache[fullPath];
};
var get_default = get2;

// ../common/utils/check.ts
var import_meta = {};
var valid = (input, options, location) => {
  const errors = [];
  const isUndefined = options?.relativeTo === void 0;
  const isString = typeof input === "string";
  const isObject = typeof input === "object";
  let error;
  if (isString) {
    const hasRelTo = !isUndefined && "relativeTo" in options;
    if (!hasRelTo && !options._remote) {
      if (import_meta.url) {
        error = { message: "Not a valid relativeTo key (required) in options", file: input };
        console.warn(`[wasl-${location}] Import Mode Error: Please pass a valid string to options.relativeTo (ideally import.meta.url).`);
      } else {
        error = { message: "import.meta.url is not supported", file: input };
        console.warn(`[wasl-${location}] Import Mode Error: import.meta.url is not available. Does your bundler support it?`);
      }
    }
  } else if (!isObject) {
    error = { message: "Not a valid object passed in the first argument", file: null };
    console.warn(`[wasl-${location}] Reference Mode Error: Please pass a valid object in the first argument and pass file object references via the options.filesystem field.`);
  }
  if (error) {
    error.function = location;
    errors.push(error);
  }
  return errors;
};

// utils.ts
var isSrc = (str) => {
  return typeof str === "string" && Object.values(languages_exports).find((arr) => arr.includes(str.split(".").slice(-1)[0]));
};
var merge = (main, override, deleteSrc = false) => {
  const copy = Object.assign({}, main);
  if (override) {
    if (deleteSrc) {
      const ogSrc = override.src ?? override;
      delete override.src;
      if ("default" in ogSrc)
        return ogSrc.default;
    }
    const keys = Object.keys(copy);
    const newKeys = new Set(Object.keys(override));
    keys.forEach((k) => {
      newKeys.delete(k);
      if (typeof override[k] === "object" && !Array.isArray(override[k]))
        copy[k] = merge(copy[k], override[k]);
      else if (k in override)
        copy[k] = override[k];
    });
    newKeys.forEach((k) => {
      copy[k] = override[k];
    });
  }
  return copy;
};
var checkFiles = (key, filesystem) => {
  const isJSON = suffix(key).slice(-4) === "json" ? true : false;
  const output = isJSON && filesystem[key] ? JSON.parse(JSON.stringify(filesystem[key])) : filesystem[key];
  return output;
};
var remove = (original, search, key = original, o) => {
  console.error(`Source was not ${original ? `resolved for ${original}` : `specified for ${key}`}. ${search ? `If available, refer to this object directly as options.filesystem["${search}"]. ` : ""}${o ? `Automatically removing ${key} from the WASL file.` : ""}`);
  if (o)
    delete o[key];
};

// node_modules/remote-esm/utils/path.js
var urlSep2 = "://";
var get3 = (path, rel = "", keepRelativeImports = false) => {
  let prefix = "";
  const getPrefix = (str) => {
    prefix = str.includes(urlSep2) ? str.split(urlSep2).splice(0, 1) : void 0;
    if (prefix)
      return str.replace(`${prefix}${urlSep2}`, "");
    else
      return str;
  };
  if (path.includes(urlSep2))
    path = getPrefix(path);
  if (rel.includes(urlSep2))
    rel = getPrefix(rel);
  if (!keepRelativeImports)
    rel = rel.split("/").filter((v) => v != "..").join("/");
  if (rel[rel.length - 1] === "/")
    rel = rel.slice(0, -1);
  let dirTokens = rel.split("/");
  if (dirTokens.length === 1 && dirTokens[0] === "")
    dirTokens = [];
  const potentialFile = dirTokens.pop();
  if (potentialFile) {
    const splitPath2 = potentialFile.split(".");
    if (splitPath2.length == 1 || splitPath2.length > 1 && splitPath2.includes(""))
      dirTokens.push(potentialFile);
  }
  const splitPath = path.split("/");
  const pathTokens = splitPath.filter((str, i3) => !!str);
  const extensionTokens = pathTokens.filter((str, i3) => {
    if (str === "..") {
      dirTokens.pop();
      return false;
    } else if (str === ".")
      return false;
    else
      return true;
  });
  const newPath = [...dirTokens, ...extensionTokens].join("/");
  if (prefix)
    return prefix + "://" + newPath;
  else
    return newPath;
};

// node_modules/remote-esm/index.js
var ready2 = new Promise(async (resolve3, reject) => {
  try {
    if (typeof process === "object") {
      globalThis.fetch = (await Promise.resolve().then(() => (init_src2(), src_exports2))).default;
      if (typeof globalThis.fetch !== "function")
        globalThis.fetch = fetch;
      const Blob6 = (await Promise.resolve().then(() => (init_cross_blob2(), cross_blob_exports2))).default;
      globalThis.Blob = Blob6;
      if (typeof globalThis.Blob !== "function")
        globalThis.Blob = Blob6;
      resolve3(true);
    } else
      resolve3(true);
  } catch (err) {
    console.log(err);
    reject(err);
  }
});
var moduleDataURI2 = (text, mimeType = "text/javascript") => `data:${mimeType};base64,` + btoa(text);
var importFromText2 = async (text, path, collection = {}) => {
  const extension = path.split(".").slice(-1)[0];
  const isJSON = extension === "json";
  let mimeType = isJSON ? "application/json" : "application/javascript";
  const uri = moduleDataURI2(text, mimeType);
  let imported = await (isJSON ? import(uri, { assert: { type: "json" } }) : import(uri)).catch((e3) => {
    if (e3.message.includes("Unexpected token"))
      throw new Error("Failed to fetch");
    else
      throw e3;
  });
  const ref = {};
  for (let key in imported) {
    Object.defineProperty(ref, key, {
      get: () => imported[key],
      enumerable: true
    });
  }
  collection[path] = uri;
  return imported;
};
var resolve2 = get3;

// node_modules/es-plugins/dist/index.esm.js
function parseFunctionFromText(method = "") {
  let getFunctionBody = (methodString) => {
    return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, "$2$3$4");
  };
  let getFunctionHead = (methodString) => {
    let startindex = methodString.indexOf("=>") + 1;
    if (startindex <= 0) {
      startindex = methodString.indexOf("){");
    }
    if (startindex <= 0) {
      startindex = methodString.indexOf(") {");
    }
    return methodString.slice(0, methodString.indexOf("{", startindex) + 1);
  };
  let newFuncHead = getFunctionHead(method);
  let newFuncBody = getFunctionBody(method);
  let newFunc;
  if (newFuncHead.includes("function")) {
    let varName = newFuncHead.split("(")[1].split(")")[0];
    newFunc = new Function(varName, newFuncBody);
  } else {
    if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
      let varName = newFuncHead.split("(")[1].split(")")[0];
      newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf("{") + 1, newFuncBody.length - 1));
    } else {
      try {
        newFunc = (0, eval)(newFuncHead + newFuncBody + "}");
      } catch {
      }
    }
  }
  return newFunc;
}
var EventHandler = class {
  constructor() {
    this.pushToState = {};
    this.data = {};
    this.triggers = {};
    this.setState = (updateObj) => {
      Object.assign(this.data, updateObj);
      for (const prop of Object.getOwnPropertyNames(updateObj)) {
        if (this.triggers[prop])
          this.triggers[prop].forEach((obj) => obj.onchange(this.data[prop]));
      }
      return this.data;
    };
    this.subscribeTrigger = (key, onchange) => {
      if (key) {
        if (!this.triggers[key]) {
          this.triggers[key] = [];
        }
        let l = this.triggers[key].length;
        this.triggers[key].push({ idx: l, onchange });
        return this.triggers[key].length - 1;
      } else
        return void 0;
    };
    this.unsubscribeTrigger = (key, sub) => {
      let triggers = this.triggers[key];
      if (triggers) {
        if (!sub)
          delete this.triggers[key];
        else {
          let idx = void 0;
          let obj = triggers.find((o, i3) => {
            if (o.idx === sub) {
              idx = i3;
              return true;
            }
          });
          if (obj)
            triggers.splice(idx, 1);
          return true;
        }
      }
    };
    this.subscribeTriggerOnce = (key, onchange) => {
      let sub;
      let changed = (value) => {
        onchange(value);
        this.unsubscribeTrigger(key, sub);
      };
      sub = this.subscribeTrigger(key, changed);
    };
  }
};
var state = new EventHandler();
function addLocalState(props) {
  if (!this._state)
    this._state = {};
  for (let k in props) {
    if (k === "_state" || k === "graph")
      continue;
    else {
      this._state[k] = props[k];
      if (k in this)
        this[k] = props[k];
      else
        Object.defineProperty(this, k, {
          get: () => {
            this._state[k];
          },
          set: (v) => {
            this._state[k] = v;
            if (this.state.triggers[this._unique])
              this.setState({ [this._unique]: this._state });
          },
          enumerable: true,
          configurable: true
        });
    }
  }
}
var GraphNode = class {
  constructor(properties = {}, parent, graph) {
    this.nodes = /* @__PURE__ */ new Map();
    this._initial = {};
    this._unique = `${Math.random()}`;
    this.state = state;
    this.isLooping = false;
    this.isAnimating = false;
    this.looper = void 0;
    this.animation = void 0;
    this.forward = true;
    this.backward = false;
    this.reactive = false;
    this.runSync = false;
    this.firstRun = true;
    this.DEBUGNODE = false;
    this.addLocalState = addLocalState;
    this.operator = (...args) => {
      return args;
    };
    this.runOp = (...args) => {
      if (this.DEBUGNODE)
        console.time(this.tag);
      let result = this.operator(...args);
      if (result instanceof Promise) {
        result.then((res) => {
          if (res !== void 0)
            this.setState({ [this.tag]: res });
          if (this.DEBUGNODE) {
            console.timeEnd(this.tag);
            if (result !== void 0)
              console.log(`${this.tag} result:`, result);
          }
          ;
          return res;
        });
      } else {
        if (result !== void 0)
          this.setState({ [this.tag]: result });
        if (this.DEBUGNODE) {
          console.timeEnd(this.tag);
          if (result !== void 0)
            console.log(`${this.tag} result:`, result);
        }
        ;
      }
      return result;
    };
    this.setOperator = (operator) => {
      if (typeof operator !== "function")
        return operator;
      this.operator = operator.bind(this);
      return operator;
    };
    this.runAsync = (...args) => {
      return new Promise((res, rej) => {
        res(this.run(...args));
      });
    };
    this.transformArgs = (args = []) => args;
    this.isRunSync = () => {
      return !(this.children && this.forward || this.parent && this.backward || this.repeat || this.delay || this.frame || this.recursive || this.branch);
    };
    this.run = (...args) => {
      if (typeof this.transformArgs === "function")
        args = this.transformArgs(args, this);
      if (this.firstRun) {
        this.firstRun = false;
        this.runSync = this.isRunSync();
        if (this.animate && !this.isAnimating) {
          this.runAnimation(this.animation, args);
        }
        if (this.loop && typeof this.loop === "number" && !this.isLooping) {
          this.runLoop(this.looper, args);
        }
        if (this.loop || this.animate)
          return;
      }
      if (this.runSync) {
        let res = this.runOp(...args);
        return res;
      }
      return new Promise(async (resolve3) => {
        if (this) {
          let run = (node, tick = 0, ...input) => {
            return new Promise(async (r3) => {
              tick++;
              let res = await node.runOp(...input);
              if (node.repeat) {
                while (tick < node.repeat) {
                  if (node.delay) {
                    setTimeout(async () => {
                      r3(await run(node, tick, ...input));
                    }, node.delay);
                    break;
                  } else if (node.frame && window?.requestAnimationFrame) {
                    requestAnimationFrame(async () => {
                      r3(await run(node, tick, ...input));
                    });
                    break;
                  } else
                    res = await node.runOp(...input);
                  tick++;
                }
                if (tick === node.repeat) {
                  r3(res);
                  return;
                }
              } else if (node.recursive) {
                while (tick < node.recursive) {
                  if (node.delay) {
                    setTimeout(async () => {
                      r3(await run(node, tick, ...res));
                    }, node.delay);
                    break;
                  } else if (node.frame && window?.requestAnimationFrame) {
                    requestAnimationFrame(async () => {
                      r3(await run(node, tick, ...res));
                    });
                    break;
                  } else
                    res = await node.runOp(...res);
                  tick++;
                }
                if (tick === node.recursive) {
                  r3(res);
                  return;
                }
              } else {
                r3(res);
                return;
              }
            });
          };
          let runnode = async () => {
            let res = await run(this, void 0, ...args);
            if (res !== void 0) {
              if (this.backward && this.parent instanceof GraphNode) {
                if (Array.isArray(res))
                  await this.runParent(this, ...res);
                else
                  await this.runParent(this, res);
              }
              if (this.children && this.forward) {
                if (Array.isArray(res))
                  await this.runChildren(this, ...res);
                else
                  await this.runChildren(this, res);
              }
              if (this.branch) {
                this.runBranch(this, res);
              }
            }
            return res;
          };
          if (this.delay) {
            setTimeout(async () => {
              resolve3(await runnode());
            }, this.delay);
          } else if (this.frame && window?.requestAnimationFrame) {
            requestAnimationFrame(async () => {
              resolve3(await runnode());
            });
          } else {
            resolve3(await runnode());
          }
        } else
          resolve3(void 0);
      });
    };
    this.runParent = async (n, ...args) => {
      if (n.backward && n.parent) {
        if (typeof n.parent === "string") {
          if (n.graph && n.graph?.get(n.parent)) {
            n.parent = n.graph;
            if (n.parent)
              this.nodes.set(n.parent.tag, n.parent);
          } else
            n.parent = this.nodes.get(n.parent);
        }
        if (n.parent instanceof GraphNode)
          await n.parent.run(...args);
      }
    };
    this.runChildren = async (n, ...args) => {
      if (typeof n.children === "object") {
        for (const key in n.children) {
          if (typeof n.children[key] === "string") {
            if (n.graph && n.graph?.get(n.children[key])) {
              n.children[key] = n.graph.get(n.children[key]);
              if (!n.nodes.get(n.children[key].tag))
                n.nodes.set(n.children[key].tag, n.children[key]);
            }
            if (!n.children[key] && n.nodes.get(n.children[key]))
              n.children[key] = n.nodes.get(n.children[key]);
          } else if (typeof n.children[key] === "undefined" || n.children[key] === true) {
            if (n.graph && n.graph?.get(key)) {
              n.children[key] = n.graph.get(key);
              if (!n.nodes.get(n.children[key].tag))
                n.nodes.set(n.children[key].tag, n.children[key]);
            }
            if (!n.children[key] && n.nodes.get(key))
              n.children[key] = n.nodes.get(key);
          }
          if (n.children[key]?.runOp)
            await n.children[key].run(...args);
        }
      }
    };
    this.runBranch = async (n, output) => {
      if (n.branch) {
        let keys = Object.keys(n.branch);
        await Promise.all(keys.map(async (k) => {
          if (typeof n.branch[k].if === "object")
            n.branch[k].if = stringifyFast(n.branch[k].if);
          let pass = false;
          if (typeof n.branch[k].if === "function") {
            pass = n.branch[k].if(output);
          } else {
            if (typeof output === "object") {
              if (stringifyFast(output) === n.branch[k].if)
                pass = true;
            } else if (output === n.branch[k].if)
              pass = true;
          }
          if (pass) {
            if (n.branch[k].then.run) {
              if (Array.isArray(output))
                await n.branch[k].then.run(...output);
              else
                await n.branch[k].then.run(...output);
            } else if (typeof n.branch[k].then === "function") {
              if (Array.isArray(output))
                await n.branch[k].then(...output);
              else
                await n.branch[k].then(output);
            } else if (typeof n.branch[k].then === "string") {
              if (n.graph)
                n.branch[k].then = n.graph.nodes.get(n.branch[k].then);
              else
                n.branch[k].then = n.nodes.get(n.branch[k].then);
              if (n.branch[k].then.run) {
                if (Array.isArray(output))
                  await n.branch[k].then.run(...output);
                else
                  await n.branch[k].then.run(...output);
              }
            }
          }
          return pass;
        }));
      }
    };
    this.runAnimation = (animation = this.animation, args = []) => {
      this.animation = animation;
      if (!animation)
        this.animation = this.operator;
      if (this.animate && !this.isAnimating && "requestAnimationFrame" in window) {
        this.isAnimating = true;
        let anim = async () => {
          if (this.isAnimating) {
            if (this.DEBUGNODE)
              console.time(this.tag);
            let result = this.animation.call(this, ...args);
            if (result instanceof Promise) {
              result = await result;
            }
            if (this.DEBUGNODE) {
              console.timeEnd(this.tag);
              if (result !== void 0)
                console.log(`${this.tag} result:`, result);
            }
            ;
            if (result !== void 0) {
              if (this.tag)
                this.setState({ [this.tag]: result });
              if (this.backward && this.parent?.run) {
                if (Array.isArray(result))
                  await this.runParent(this, ...result);
                else
                  await this.runParent(this, result);
              }
              if (this.children && this.forward) {
                if (Array.isArray(result))
                  await this.runChildren(this, ...result);
                else
                  await this.runChildren(this, result);
              }
              if (this.branch) {
                this.runBranch(this, result);
              }
              this.setState({ [this.tag]: result });
            }
            requestAnimationFrame(anim);
          }
        };
        requestAnimationFrame(anim);
      }
    };
    this.runLoop = (loop = this.looper, args = [], timeout = this.loop) => {
      this.looper = loop;
      if (!loop)
        this.looper = this.operator;
      if (typeof timeout === "number" && !this.isLooping) {
        this.isLooping = true;
        let looping = async () => {
          if (this.isLooping) {
            if (this.DEBUGNODE)
              console.time(this.tag);
            let result = this.looper.call(this, ...args);
            if (result instanceof Promise) {
              result = await result;
            }
            if (this.DEBUGNODE) {
              console.timeEnd(this.tag);
              if (result !== void 0)
                console.log(`${this.tag} result:`, result);
            }
            ;
            if (result !== void 0) {
              if (this.tag)
                this.setState({ [this.tag]: result });
              if (this.backward && this.parent?.run) {
                if (Array.isArray(result))
                  await this.runParent(this, ...result);
                else
                  await this.runParent(this, result);
              }
              if (this.children && this.forward) {
                if (Array.isArray(result))
                  await this.runChildren(this, ...result);
                else
                  await this.runChildren(this, result);
              }
              if (this.branch) {
                this.runBranch(this, result);
              }
              this.setState({ [this.tag]: result });
            }
            setTimeout(async () => {
              await looping();
            }, timeout);
          }
        };
        looping();
      }
    };
    this.setParent = (parent2) => {
      this.parent = parent2;
      if (this.backward)
        this.runSync = false;
    };
    this.setChildren = (children) => {
      this.children = children;
      if (this.forward)
        this.runSync = false;
    };
    this.add = (n = {}) => {
      if (typeof n === "function")
        n = { operator: n };
      if (n?.node instanceof GraphNode)
        n = n.node;
      if (!(n instanceof GraphNode))
        n = new GraphNode(n.node ?? n, this, this.graph);
      this.nodes.set(n.tag, n);
      if (this.graph) {
        this.graph.nodes.set(n.tag, n);
        this.graph.nNodes = this.graph.nodes.size;
      }
      return n;
    };
    this.remove = (n) => {
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n?.tag) {
        this.nodes.delete(n.tag);
        if (this.children[n.tag])
          delete this.children[n.tag];
        if (this.graph) {
          this.graph.nodes.delete(n.tag);
          this.graph.nNodes = this.graph.nodes.size;
        }
        this.nodes.forEach((n2) => {
          if (n2.nodes.get(n2.tag)) {
            n2.nodes.delete(n2.tag);
            if (n2.children[n2.tag])
              delete n2.children[n2.tag];
            if (n2.parent?.tag === n2.tag)
              delete n2.parent;
          }
        });
        if (n.ondelete)
          n.ondelete(n);
      }
      if (typeof this._state === "object") {
        this.state.unsubscribeTrigger(this._unique);
      }
    };
    this.append = (n, parentNode = this) => {
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n?.nodes) {
        parentNode.addChildren(n);
        if (n.forward)
          n.runSync = false;
      }
    };
    this.subscribe = (callback, tag = this.tag) => {
      if (typeof callback === "string") {
        if (this.graph)
          callback = this.graph.get(callback);
        else
          callback = this.nodes.get(callback);
      }
      if (typeof callback === "function") {
        return this.state.subscribeTrigger(tag, callback);
      } else if (callback)
        return this.state.subscribeTrigger(tag, (res) => {
          callback.run(res);
        });
    };
    this.unsubscribe = (sub, tag = this.tag) => {
      return this.state.unsubscribeTrigger(tag, sub);
    };
    this.subscribeState = (callback) => {
      if (!this.reactive) {
        return void 0;
      } else {
        if (typeof callback === "string") {
          if (this.graph)
            callback = this.graph.get(callback);
          else
            callback = this.nodes.get(callback);
        }
        if (typeof callback === "function") {
          return this.state.subscribeTrigger(this._unique, callback);
        } else if (callback)
          return this.state.subscribeTrigger(this._unique, (_state) => {
            callback.run(_state);
          });
      }
    };
    this.addChildren = (children) => {
      if (!this.children)
        this.children = {};
      if (typeof children === "object") {
        Object.assign(this.children, children);
      }
      this.convertChildrenToNodes();
      if (this.forward)
        this.runSync = false;
    };
    this.callParent = (...args) => {
      if (typeof this.parent === "string") {
        if (this.graph && this.graph?.get(this.parent)) {
          this.parent = this.graph;
          if (this.parent)
            this.nodes.set(this.parent.tag, this.parent);
        } else
          this.parent = this.nodes.get(this.parent);
      }
      if (typeof this.parent?.operator === "function")
        return this.parent.runOp(...args);
    };
    this.callChildren = (...args) => {
      let result;
      if (typeof this.children === "object") {
        for (const key in this.children) {
          if (this.children[key]?.runOp)
            this.children[key].runOp(...args);
        }
      }
      return result;
    };
    this.getProps = (n = this, getInitial = true) => {
      let baseprops = {
        tag: n.tag,
        operator: n.operator,
        graph: n.graph,
        children: n.children,
        parent: n.parent,
        forward: n.forward,
        backward: n.bacward,
        loop: n.loop,
        animate: n.animate,
        frame: n.frame,
        delay: n.delay,
        recursive: n.recursive,
        repeat: n.repeat,
        branch: n.branch,
        oncreate: n.oncreate,
        reactive: n.reactive,
        DEBUGNODE: n.DEBUGNODE
      };
      if (!getInitial) {
        let uniqueprops = {};
        for (const key in this._initial) {
          uniqueprops[key] = this[key];
        }
        return Object.assign(baseprops, uniqueprops);
      } else
        return {
          tag: n.tag,
          operator: n.operator,
          graph: n.graph,
          children: n.children,
          parent: n.parent,
          forward: n.forward,
          backward: n.bacward,
          loop: n.loop,
          animate: n.animate,
          frame: n.frame,
          delay: n.delay,
          recursive: n.recursive,
          repeat: n.repeat,
          branch: n.branch,
          oncreate: n.oncreate,
          reactive: n.reactive,
          DEBUGNODE: n.DEBUGNODE,
          ...this._initial
        };
    };
    this.setProps = (props = {}) => {
      let tmp = Object.assign({}, props);
      if (tmp.children) {
        this.addChildren(props.children);
        delete tmp.children;
      }
      if (tmp.operator) {
        this.setOperator(props.operator);
        delete tmp.operator;
      }
      Object.assign(tmp, props);
      this.runSync = this.isRunSync();
    };
    this.removeTree = (n) => {
      if (n) {
        if (typeof n === "string")
          n = this.nodes.get(n);
      }
      if (n?.nodes) {
        let checked = {};
        const recursivelyRemove = (node) => {
          if (typeof node.children === "object" && !checked[node.tag]) {
            checked[node.tag] = true;
            for (const key in node.children) {
              if (node.children[key].stopNode)
                node.children[key].stopNode();
              if (node.children[key].tag) {
                if (this.nodes.get(node.children[key].tag))
                  this.nodes.delete(node.children[key].tag);
                this.nodes.forEach((n2) => {
                  if (n2.nodes.get(node.children[key].tag))
                    n2.nodes.delete(node.children[key].tag);
                  if (n2.children[key] instanceof GraphNode)
                    delete n2.children[key];
                });
                recursivelyRemove(node.children[key]);
              }
            }
          }
        };
        if (n.stopNode)
          n.stopNode();
        if (n.tag) {
          this.nodes.delete(n.tag);
          if (this.children[n.tag])
            delete this.children[n.tag];
          if (this.parent?.tag === n.tag)
            delete this.parent;
          if (this[n.tag] instanceof GraphNode)
            delete this[n.tag];
          this.nodes.forEach((n2) => {
            if (n2?.tag) {
              if (n2.nodes.get(n2.tag))
                n2.nodes.delete(n2.tag);
              if (n2.children[n2.tag] instanceof GraphNode)
                delete n2.children[n2.tag];
            }
          });
          recursivelyRemove(n);
          if (this.graph)
            this.graph.removeTree(n, checked);
          else if (n.ondelete)
            n.ondelete(n);
        }
      }
    };
    this.checkNodesHaveChildMapped = (n, child, checked = {}) => {
      let tag = n.tag;
      if (!tag)
        tag = n.name;
      if (!checked[tag]) {
        checked[tag] = true;
        if (n.children) {
          if (child.tag in n.children) {
            if (n.children[child.tag] instanceof GraphNode) {
              if (!n.nodes.get(child.tag))
                n.nodes.set(child.tag, child);
              n.children[child.tag] = child;
              if (!n.firstRun)
                n.firstRun = true;
            }
          }
        }
        if (n.parent instanceof GraphNode) {
          if (n.nodes.get(child.tag))
            n.parent.nodes.set(child.tag, child);
          if (n.parent.children) {
            this.checkNodesHaveChildMapped(n.parent, child, checked);
          } else if (n.nodes) {
            n.nodes.forEach((n2) => {
              if (!checked[n2.tag]) {
                this.checkNodesHaveChildMapped(n2, child, checked);
              }
            });
          }
        }
        if (n.graph) {
          if (n.parent && n.parent.name !== n.graph.name) {
            n.graph.nodes.forEach((n2) => {
              if (!checked[n2.tag]) {
                this.checkNodesHaveChildMapped(n2, child, checked);
              }
            });
          }
        }
      }
    };
    this.convertChildrenToNodes = (n = this) => {
      if (n?.children) {
        for (const key in n.children) {
          if (!(n.children[key] instanceof GraphNode)) {
            if (typeof n.children[key] === "object") {
              if (!n.children[key].tag)
                n.children[key].tag = key;
              if (!n.nodes.get(n.children[key].tag)) {
                n.children[key] = new GraphNode(n.children[key], n, n.graph);
                this.checkNodesHaveChildMapped(n, n.children[key]);
              }
            } else {
              if (typeof n.children[key] === "undefined" || n.children[key] == true) {
                n.children[key] = n.graph.get(key);
                if (!n.children[key])
                  n.children[key] = n.nodes.get(key);
              } else if (typeof n.children[key] === "string") {
                let k = n.children[key];
                n.children[key] = n.graph.get(k);
                if (!n.children[key])
                  n.children[key] = n.nodes.get(key);
              }
              if (n.children[key] instanceof GraphNode) {
                n.nodes.set(n.children[key].tag, n.children[key]);
                this.checkNodesHaveChildMapped(n, n.children[key]);
                if (!(n.children[key].tag in n))
                  n[n.children[key].tag] = n.children[key];
              }
            }
          }
        }
      }
      return n.children;
    };
    this.stopLooping = (n = this) => {
      n.isLooping = false;
    };
    this.stopAnimating = (n = this) => {
      n.isAnimating = false;
    };
    this.stopNode = (n = this) => {
      n.stopAnimating(n);
      n.stopLooping(n);
    };
    this.subscribeNode = (n) => {
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n.tag)
        this.nodes.set(n.tag, n);
      if (n)
        return this.state.subscribeTrigger(this.tag, (res) => {
          if (Array.isArray(res))
            n.run(...res);
          else
            n.run(res);
        });
    };
    this.print = (n = this, printChildren = true, nodesPrinted = []) => {
      let dummyNode = new GraphNode();
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n instanceof GraphNode) {
        nodesPrinted.push(n.tag);
        let jsonToPrint = {
          tag: n.tag,
          operator: n.operator.toString()
        };
        if (n.parent)
          jsonToPrint.parent = n.parent.tag;
        if (typeof n.children === "object") {
          for (const key in n.children) {
            if (typeof n.children[key] === "string")
              return n.children[key];
            if (nodesPrinted.includes(n.children[key].tag))
              return n.children[key].tag;
            else if (!printChildren) {
              return n.children[key].tag;
            } else
              return n.children[key].print(n.children[key], printChildren, nodesPrinted);
          }
        }
        for (const prop in n) {
          if (prop === "parent" || prop === "children")
            continue;
          if (typeof dummyNode[prop] === "undefined") {
            if (typeof n[prop] === "function") {
              jsonToPrint[prop] = n[prop].toString();
            } else if (typeof n[prop] === "object") {
              jsonToPrint[prop] = JSON.stringifyWithCircularRefs(n[prop]);
            } else {
              jsonToPrint[prop] = n[prop];
            }
          }
        }
        return JSON.stringify(jsonToPrint);
      }
    };
    this.reconstruct = (json2) => {
      let parsed = reconstructObject(json2);
      if (parsed)
        return this.add(parsed);
    };
    this.setState = (data) => {
      this.state.setState(data);
    };
    this.DEBUGNODES = (debugging = true) => {
      this.DEBUGNODE = debugging;
      this.nodes.forEach((n) => {
        if (debugging)
          n.DEBUGNODE = true;
        else
          n.DEBUGNODE = false;
      });
    };
    if (typeof properties === "function") {
      properties = { operator: properties };
    }
    if (typeof properties === "object") {
      if (properties instanceof GraphNode && properties._initial)
        Object.assign(properties, properties._initial);
      if (properties instanceof Graph) {
        let source = properties;
        properties = {
          source,
          operator: (input) => {
            if (typeof input === "object") {
              let result = {};
              for (const key in input) {
                if (typeof source[key] === "function") {
                  if (Array.isArray(input[key]))
                    result[key] = source[key](...input[key]);
                  else
                    result[key] = source[key](input[key]);
                } else {
                  source[key] = input[key];
                  result[key] = source[key];
                }
              }
              return result;
            }
            return source;
          }
        };
        if (source.operator)
          properties.operator = source.operator;
        if (source.children)
          properties.children = source.children;
        if (source.forward)
          properties.forward = source.forward;
        if (source.backward)
          properties.backward = source.backward;
        if (source.repeat)
          properties.repeat = source.repeat;
        if (source.recursive)
          properties.recursive = source.recursive;
        if (source.loop)
          properties.loop = source.loop;
        if (source.animate)
          properties.animate = source.animate;
        if (source.looper)
          properties.looper = source.looper;
        if (source.animation)
          properties.animation = source.animation;
        if (source.delay)
          properties.delay = source.delay;
        if (source.oncreate)
          properties.oncreate = source.oncreate;
        if (source.node) {
          if (source.node._initial)
            Object.assign(properties, source.node._initial);
        }
        if (source._initial)
          Object.assign(properties, source._initial);
        if (source.tag)
          properties.tag = source.tag;
        this.nodes = source.nodes;
        source.node = this;
        if (graph) {
          source.nodes.forEach((n) => {
            if (!graph.nodes.get(n.tag)) {
              graph.nodes.set(n.tag, n);
              graph.nNodes++;
            }
          });
        }
      }
      if (typeof parent === "string") {
        if (graph)
          parent = graph.nodes.get(parent);
        else
          parent = void 0;
      }
      if (properties.tag && (graph || parent)) {
        let hasnode;
        if (graph?.nodes) {
          hasnode = graph.nodes.get(properties.tag);
        }
        if (!hasnode && parent?.nodes) {
          hasnode = parent.nodes.get(properties.tag);
        }
        if (hasnode) {
          if (this.reactive) {
            this.addLocalState(hasnode);
          }
          if (!this.source)
            this.source = hasnode;
          let props = hasnode.getProps();
          delete props.graph;
          delete props.parent;
          for (let k in props)
            properties[k] = props[k];
        }
      }
      if (properties?.operator) {
        properties.operator = this.setOperator(properties.operator);
      }
      if (!properties.tag && graph) {
        properties.tag = `node${graph.nNodes}`;
      } else if (!properties.tag) {
        properties.tag = `node${Math.floor(Math.random() * 1e10)}`;
      }
      let keys = Object.getOwnPropertyNames(this);
      for (const key in properties) {
        if (!keys.includes(key))
          this._initial[key] = properties[key];
      }
      if (properties.children)
        this._initial.children = Object.assign({}, properties.children);
      if (properties.run) {
        console.log("Transferring", properties, "to", this);
      }
      Object.assign(this, properties);
      if (!this.tag) {
        if (graph) {
          this.tag = `node${graph.nNodes}`;
        } else {
          this.tag = `node${Math.floor(Math.random() * 1e10)}`;
        }
      }
      if (graph) {
        this.graph = graph;
        if (graph.nodes.get(this.tag)) {
          this.tag = `${this.tag}${graph.nNodes + 1}`;
        }
        graph.nodes.set(this.tag, this);
        graph.nNodes++;
        this.state = graph.state;
      }
      if (this.reactive) {
        addLocalState(properties);
        if (typeof this.reactive === "function") {
          this.state.subscribeTrigger(this._unique, this.reactive);
        }
      }
      if (typeof parent === "object") {
        this.parent = parent;
        if (parent instanceof GraphNode || parent instanceof Graph)
          parent.nodes.set(this.tag, this);
      }
      if (typeof properties.tree === "object") {
        for (const key in properties.tree) {
          if (typeof properties.tree[key] === "object") {
            if ((!properties.tree[key]).tag) {
              properties.tree[key].tag = key;
            }
          }
          let node = new GraphNode(properties.tree[key], this, graph);
          this.nodes.set(node.tag, node);
        }
      }
      if (this.children)
        this.convertChildrenToNodes(this);
      if (this.parent instanceof GraphNode || this.parent instanceof Graph)
        this.checkNodesHaveChildMapped(this.parent, this);
      if (typeof this.oncreate === "function")
        this.oncreate(this);
      if (!this.firstRun)
        this.firstRun = true;
      if (this.animation && !this.animate)
        this.animate = true;
    } else
      return properties;
  }
};
var Graph = class {
  constructor(tree, tag, props) {
    this.nNodes = 0;
    this.nodes = /* @__PURE__ */ new Map();
    this.state = new EventHandler();
    this._unique = `${Math.random()}`;
    this.tree = {};
    this.addLocalState = addLocalState;
    this.add = (n = {}) => {
      if (n?.node instanceof GraphNode)
        n = n.node;
      let props2 = n;
      if (!(n instanceof GraphNode))
        n = new GraphNode(props2?.node ?? props2, this, this);
      else {
        this.nNodes = this.nodes.size;
        if (n.tag) {
          this.tree[n.tag] = props2;
          this.nodes.set(n.tag, n);
        }
      }
      return n;
    };
    this.setTree = (tree2 = this.tree) => {
      if (!tree2)
        return;
      for (const node in tree2) {
        const n = this.nodes.get(node);
        if (!n) {
          if (typeof tree2[node] === "function") {
            this.add({ tag: node, operator: tree2[node] });
          } else if (typeof tree2[node] === "object" && !Array.isArray(tree2[node])) {
            if (!tree2[node].tag)
              tree2[node].tag = node;
            let newNode = this.add(tree2[node]);
            if (tree2[node].aliases) {
              tree2[node].aliases.forEach((a) => {
                this.nodes.set(a, newNode);
              });
            }
          } else {
            this.add({ tag: node, operator: (...args) => {
              return tree2[node];
            } });
          }
        } else {
          if (typeof tree2[node] === "function") {
            n.setOperator(tree2[node]);
          } else if (typeof tree2[node] === "object") {
            if (tree2[node] instanceof GraphNode) {
              this.add(tree2[node]);
            } else if (tree2[node] instanceof Graph) {
              let source = tree2[node];
              let properties = {};
              if (source.operator)
                properties.operator = source.operator;
              if (source.children)
                properties.children = source.children;
              if (source.forward)
                properties.forward = source.forward;
              if (source.backward)
                properties.backward = source.backward;
              if (source.repeat)
                properties.repeat = source.repeat;
              if (source.recursive)
                properties.recursive = source.recursive;
              if (source.loop)
                properties.loop = source.loop;
              if (source.animate)
                properties.animate = source.animate;
              if (source.looper)
                properties.looper = source.looper;
              if (source.animation)
                properties.animation = source.animation;
              if (source.delay)
                properties.delay = source.delay;
              if (source.tag)
                properties.tag = source.tag;
              if (source.oncreate)
                properties.oncreate = source.oncreate;
              if (source.node?._initial)
                Object.assign(properties, source.node._initial);
              properties.nodes = source.nodes;
              properties.source = source;
              n.setProps(properties);
            } else {
              n.setProps(tree2[node]);
            }
          }
        }
      }
      this.nodes.forEach((node) => {
        if (typeof node.children === "object") {
          for (const key in node.children) {
            if (typeof node.children[key] === "string") {
              if (this.nodes.get(node.children[key])) {
                node.children[key] = this.nodes.get(node.children[key]);
              }
            } else if (node.children[key] === true || typeof node.children[key] === "undefined") {
              if (this.nodes.get(key)) {
                node.children[key] = this.nodes.get(key);
              }
            }
            if (node.children[key] instanceof GraphNode) {
              node.checkNodesHaveChildMapped(node, node.children[key]);
            }
          }
        }
        if (typeof node.parent === "string") {
          if (this.nodes.get(node.parent)) {
            node.parent = this.nodes.get(node.parent);
            node.nodes.set(node.parent.tag, node.parent);
          }
        }
      });
    };
    this.get = (tag2) => {
      return this.nodes.get(tag2);
    };
    this.set = (n) => {
      return this.nodes.set(n.tag, n);
    };
    this.run = (n, ...args) => {
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n?.run)
        return n.run(...args);
      else
        return void 0;
    };
    this.runAsync = (n, ...args) => {
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n?.run)
        return new Promise((res, rej) => {
          res(n.run(...args));
        });
      else
        return new Promise((res, rej) => {
          res(void 0);
        });
    };
    this.removeTree = (n, checked) => {
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n?.nodes) {
        if (!checked)
          checked = {};
        const recursivelyRemove = (node) => {
          if (node.children && !checked[node.tag]) {
            checked[node.tag] = true;
            if (Array.isArray(node.children)) {
              node.children.forEach((c) => {
                if (c.stopNode)
                  c.stopNode();
                if (c.tag) {
                  if (this.nodes.get(c.tag))
                    this.nodes.delete(c.tag);
                }
                this.nodes.forEach((n2) => {
                  if (n2.nodes.get(c.tag))
                    n2.nodes.delete(c.tag);
                });
                recursivelyRemove(c);
              });
            } else if (typeof node.children === "object") {
              if (node.stopNode)
                node.stopNode();
              if (node.tag) {
                if (this.nodes.get(node.tag))
                  this.nodes.delete(node.tag);
              }
              this.nodes.forEach((n2) => {
                if (n2.nodes.get(node.tag))
                  n2.nodes.delete(node.tag);
              });
              recursivelyRemove(node);
            }
          }
        };
        if (n.stopNode)
          n.stopNode();
        if (n.tag) {
          this.nodes.delete(n.tag);
          this.nodes.forEach((n2) => {
            if (n2.nodes.get(n2.tag))
              n2.nodes.delete(n2.tag);
          });
          this.nNodes = this.nodes.size;
          recursivelyRemove(n);
        }
        if (n.ondelete)
          n.ondelete(n);
      }
      return n;
    };
    this.remove = (n) => {
      if (typeof n === "string")
        n = this.nodes.get(n);
      if (n?.nodes) {
        if (n.stopNode)
          n.stopNode();
        if (n?.tag) {
          if (this.nodes.get(n.tag)) {
            this.nodes.delete(n.tag);
            this.nodes.forEach((n2) => {
              if (n2.nodes.get(n2.tag))
                n2.nodes.delete(n2.tag);
            });
          }
        }
        if (n.ondelete)
          n.ondelete(n);
      }
      return n;
    };
    this.append = (n, parentNode) => {
      parentNode.addChildren(n);
    };
    this.callParent = async (n, ...args) => {
      if (n?.parent) {
        return await n.callParent(...args);
      }
    };
    this.callChildren = async (n, ...args) => {
      if (n?.children) {
        return await n.callChildren(...args);
      }
    };
    this.subscribe = (n, callback) => {
      if (!callback)
        return;
      if (n?.subscribe && typeof callback === "function") {
        return n.subscribe(callback);
      } else if (callback instanceof GraphNode || typeof callback === "string")
        return this.subscribeNode(n, callback);
      else if (typeof n == "string") {
        return this.state.subscribeTrigger(n, callback);
      }
    };
    this.unsubscribe = (tag2, sub) => {
      return this.state.unsubscribeTrigger(tag2, sub);
    };
    this.subscribeState = (callback) => {
      if (!this.reactive) {
        return void 0;
      } else {
        if (typeof callback === "string") {
          if (this.graph)
            callback = this.graph.get(callback);
          else
            callback = this.nodes.get(callback);
        }
        if (typeof callback === "function") {
          return this.state.subscribeTrigger(this._unique, callback);
        } else if (callback)
          return this.state.subscribeTrigger(this._unique, (_state) => {
            callback.run(_state);
          });
      }
    };
    this.subscribeNode = (inputNode, outputNode) => {
      let tag2;
      if (inputNode?.tag)
        tag2 = inputNode.tag;
      else if (typeof inputNode === "string")
        tag2 = inputNode;
      if (typeof outputNode === "string")
        outputNode = this.nodes.get(outputNode);
      if (inputNode && outputNode) {
        let sub = this.state.subscribeTrigger(tag2, (res) => {
          if (Array.isArray(res))
            outputNode.run(...res);
          else
            outputNode.run(res);
        });
        return sub;
      }
    };
    this.stopNode = (n) => {
      if (typeof n === "string") {
        n = this.nodes.get(n);
      }
      if (n?.stopNode) {
        n.stopNode();
      }
    };
    this.print = (n, printChildren = true) => {
      if (n?.print)
        return n.print(n, printChildren);
      else {
        let printed = `{`;
        this.nodes.forEach((n2) => {
          printed += `
"${n2.tag}:${n2.print(n2, printChildren)}"`;
        });
        return printed;
      }
    };
    this.reconstruct = (json2) => {
      let parsed = reconstructObject(json2);
      if (parsed)
        return this.add(parsed);
    };
    this.create = (operator, parentNode, props2) => {
      return createNode(operator, parentNode, props2, this);
    };
    this.setState = (data) => {
      this.state.setState(data);
    };
    this.DEBUGNODES = (debugging = true) => {
      this.nodes.forEach((n) => {
        if (debugging)
          n.DEBUGNODE = true;
        else
          n.DEBUGNODE = false;
      });
    };
    this.tag = tag ? tag : `graph${Math.floor(Math.random() * 1e11)}`;
    if (props) {
      if (props.reactive) {
        this.addLocalState(props);
      } else
        Object.assign(this, props);
      this._initial = props;
    }
    if (tree || Object.keys(this.tree).length > 0)
      this.setTree(tree);
  }
};
function reconstructObject(json2 = "{}") {
  try {
    let parsed = typeof json2 === "string" ? JSON.parse(json2) : json2;
    const parseObj = (obj) => {
      for (const prop in obj) {
        if (typeof obj[prop] === "string") {
          let funcParsed = parseFunctionFromText(obj[prop]);
          if (typeof funcParsed === "function") {
            obj[prop] = funcParsed;
          }
        } else if (typeof obj[prop] === "object") {
          parseObj(obj[prop]);
        }
      }
      return obj;
    };
    return parseObj(parsed);
  } catch (err) {
    console.error(err);
    return void 0;
  }
}
var stringifyWithCircularRefs = function() {
  const refs = /* @__PURE__ */ new Map();
  const parents = [];
  const path = ["this"];
  function clear() {
    refs.clear();
    parents.length = 0;
    path.length = 1;
  }
  function updateParents(key, value) {
    var idx = parents.length - 1;
    var prev = parents[idx];
    if (typeof prev === "object") {
      if (prev[key] === value || idx === 0) {
        path.push(key);
        parents.push(value.pushed);
      } else {
        while (idx-- >= 0) {
          prev = parents[idx];
          if (typeof prev === "object") {
            if (prev[key] === value) {
              idx += 2;
              parents.length = idx;
              path.length = idx;
              --idx;
              parents[idx] = value;
              path[idx] = key;
              break;
            }
          }
          idx--;
        }
      }
    }
  }
  function checkCircular(key, value) {
    if (value != null) {
      if (typeof value === "object") {
        if (key) {
          updateParents(key, value);
        }
        let other = refs.get(value);
        if (other) {
          return "[Circular Reference]" + other;
        } else {
          refs.set(value, path.join("."));
        }
      }
    }
    return value;
  }
  return function stringifyWithCircularRefs2(obj, space) {
    try {
      parents.push(obj);
      return JSON.stringify(obj, checkCircular, space);
    } finally {
      clear();
    }
  };
}();
if (JSON.stringifyWithCircularRefs === void 0) {
  JSON.stringifyWithCircularRefs = stringifyWithCircularRefs;
}
var stringifyFast = function() {
  const refs = /* @__PURE__ */ new Map();
  const parents = [];
  const path = ["this"];
  function clear() {
    refs.clear();
    parents.length = 0;
    path.length = 1;
  }
  function updateParents(key, value) {
    var idx = parents.length - 1;
    if (parents[idx]) {
      var prev = parents[idx];
      if (typeof prev === "object") {
        if (prev[key] === value || idx === 0) {
          path.push(key);
          parents.push(value.pushed);
        } else {
          while (idx-- >= 0) {
            prev = parents[idx];
            if (typeof prev === "object") {
              if (prev[key] === value) {
                idx += 2;
                parents.length = idx;
                path.length = idx;
                --idx;
                parents[idx] = value;
                path[idx] = key;
                break;
              }
            }
            idx++;
          }
        }
      }
    }
  }
  function checkValues(key, value) {
    let val;
    if (value != null) {
      if (typeof value === "object") {
        let c = value.constructor.name;
        if (key && c === "Object") {
          updateParents(key, value);
        }
        let other = refs.get(value);
        if (other) {
          return "[Circular Reference]" + other;
        } else {
          refs.set(value, path.join("."));
        }
        if (c === "Array") {
          if (value.length > 20) {
            val = value.slice(value.length - 20);
          } else
            val = value;
        } else if (c.includes("Set")) {
          val = Array.from(value);
        } else if (c !== "Object" && c !== "Number" && c !== "String" && c !== "Boolean") {
          val = "instanceof_" + c;
        } else if (c === "Object") {
          let obj = {};
          for (const prop in value) {
            if (value[prop] == null) {
              obj[prop] = value[prop];
            } else if (Array.isArray(value[prop])) {
              if (value[prop].length > 20)
                obj[prop] = value[prop].slice(value[prop].length - 20);
              else
                obj[prop] = value[prop];
            } else if (value[prop].constructor.name === "Object") {
              obj[prop] = {};
              for (const p in value[prop]) {
                if (Array.isArray(value[prop][p])) {
                  if (value[prop][p].length > 20)
                    obj[prop][p] = value[prop][p].slice(value[prop][p].length - 20);
                  else
                    obj[prop][p] = value[prop][p];
                } else {
                  if (value[prop][p] != null) {
                    let con = value[prop][p].constructor.name;
                    if (con.includes("Set")) {
                      obj[prop][p] = Array.from(value[prop][p]);
                    } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                      obj[prop][p] = "instanceof_" + con;
                    } else {
                      obj[prop][p] = value[prop][p];
                    }
                  } else {
                    obj[prop][p] = value[prop][p];
                  }
                }
              }
            } else {
              let con = value[prop].constructor.name;
              if (con.includes("Set")) {
                obj[prop] = Array.from(value[prop]);
              } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                obj[prop] = "instanceof_" + con;
              } else {
                obj[prop] = value[prop];
              }
            }
          }
          val = obj;
        } else {
          val = value;
        }
      } else {
        val = value;
      }
    }
    return val;
  }
  return function stringifyFast2(obj, space) {
    parents.push(obj);
    let res = JSON.stringify(obj, checkValues, space);
    clear();
    return res;
  };
}();
if (JSON.stringifyFast === void 0) {
  JSON.stringifyFast = stringifyFast;
}
function createNode(operator, parentNode, props, graph) {
  if (typeof props === "object") {
    props.operator = operator;
    return new GraphNode(props, parentNode, graph);
  }
  return new GraphNode({ operator }, parentNode, graph);
}
var DOMElement = class extends HTMLElement {
  template = function(self2 = this, props) {
    return `<div> Custom Fragment Props: ${JSON.stringify(props)} </div>`;
  };
  props = {};
  useShadow = false;
  styles;
  oncreate;
  onresize;
  ondelete;
  onchanged;
  renderonchanged = false;
  FRAGMENT;
  STYLE;
  attachedShadow = false;
  obsAttributes = ["props", "options", "onchanged", "onresize", "ondelete", "oncreate", "template"];
  get observedAttributes() {
    return this.obsAttributes;
  }
  get obsAttributes() {
    return this.obsAttributes;
  }
  set obsAttributes(att) {
    if (typeof att === "string") {
      this.obsAttributes.push(att);
    } else if (Array.isArray(att))
      this.obsAttributes = att;
  }
  static get tag() {
    return this.name.toLowerCase() + "-";
  }
  static addElement(tag = this.tag, cls = this, extend = void 0) {
    addCustomElement(cls, tag, extend);
  }
  attributeChangedCallback = (name2, old, val) => {
    if (name2 === "onchanged") {
      let onchanged = val;
      if (typeof onchanged === "string")
        onchanged = parseFunctionFromText2(onchanged);
      if (typeof onchanged === "function") {
        this.onchanged = onchanged;
        this.state.data.props = this.props;
        this.state.unsubscribeTrigger("props");
        this.state.subscribeTrigger("props", this.onchanged);
        let changed = new CustomEvent("changed", { detail: { props: this.props, self: this } });
        this.state.subscribeTrigger("props", () => {
          this.dispatchEvent(changed);
        });
      }
    } else if (name2 === "onresize") {
      let onresize = val;
      if (typeof onresize === "string")
        onresize = parseFunctionFromText2(onresize);
      if (typeof onresize === "function") {
        if (this.ONRESIZE) {
          try {
            window.removeEventListener("resize", this.ONRESIZE);
          } catch (err) {
          }
        }
        this.ONRESIZE = (ev) => {
          this.onresize(this.props, this);
        };
        this.onresize = onresize;
        window.addEventListener("resize", this.ONRESIZE);
      }
    } else if (name2 === "ondelete") {
      let ondelete = val;
      if (typeof ondelete === "string")
        ondelete = parseFunctionFromText2(ondelete);
      if (typeof ondelete === "function") {
        this.ondelete = () => {
          if (this.ONRESIZE)
            window.removeEventListener("resize", this.ONRESIZE);
          this.state.unsubscribeTrigger("props");
          if (ondelete)
            ondelete(this.props, this);
        };
      }
    } else if (name2 === "oncreate") {
      let oncreate = val;
      if (typeof oncreate === "string")
        oncreate = parseFunctionFromText2(oncreate);
      if (typeof oncreate === "function") {
        this.oncreate = oncreate;
      }
    } else if (name2 === "renderonchanged") {
      let rpc = val;
      if (typeof this.renderonchanged === "number")
        this.unsubscribeTrigger(this.renderonchanged);
      if (typeof rpc === "string")
        rpc = parseFunctionFromText2(rpc);
      if (typeof rpc === "function") {
        this.renderonchanged = this.state.subscribeTrigger("props", (p) => {
          this.render(p);
          rpc(this, p);
        });
      } else if (rpc != false)
        this.renderonchanged = this.state.subscribeTrigger("props", this.render);
    } else if (name2 === "props") {
      let newProps = val;
      if (typeof newProps === "string")
        newProps = JSON.parse(newProps);
      Object.assign(this.props, newProps);
      this.state.setState({ props: this.props });
    } else if (name2 === "template") {
      let template = val;
      this.template = template;
      this.render(this.props);
      let created = new CustomEvent("created", { detail: { props: this.props } });
      this.dispatchEvent(created);
    } else {
      let parsed = val;
      if (name2.includes("eval_")) {
        name2 = name2.split("_");
        name2.shift();
        name2 = name2.join();
        parsed = parseFunctionFromText2(val);
      } else if (typeof val === "string") {
        try {
          parsed = JSON.parse(val);
        } catch (err) {
          parsed = val;
        }
      }
      this[name2] = parsed;
      if (name2 !== "props" && this.props)
        this.props[name2] = parsed;
    }
  };
  connectedCallback() {
    if (!this.props)
      this.props = {};
    let newProps = this.getAttribute("props");
    if (typeof newProps === "string")
      newProps = JSON.parse(newProps);
    Object.assign(this.props, newProps);
    this.state.setState({ props: this.props });
    Array.from(this.attributes).forEach((att) => {
      let name2 = att.name;
      let parsed = att.value;
      if (name2.includes("eval_") || name2.includes("()")) {
        if (name2.includes("eval_"))
          name2 = name2.split("_");
        else if (name2.includes("()"))
          name2 = name2.substring(0, name2.indexOf("("));
        name2.shift();
        name2 = name2.join();
        parsed = parseFunctionFromText2(att.value);
      } else if (typeof att.value === "string") {
        try {
          parsed = JSON.parse(att.value);
        } catch (err) {
          parsed = att.value;
        }
      }
      if (!this[name2]) {
        Object.defineProperties(this, att, {
          value: parsed,
          writable: true,
          get() {
            return this[name2];
          },
          set(val) {
            this.setAttribute(name2, val);
          }
        });
      }
      this[name2] = parsed;
      if (name2 !== "props")
        this.props[name2] = parsed;
      this.obsAttributes.push(name2);
    });
    let resizeevent = new CustomEvent("resized", { detail: { props: this.props, self: this } });
    let changed = new CustomEvent("changed", { detail: { props: this.props, self: this } });
    let deleted = new CustomEvent("deleted", { detail: { props: this.props, self: this } });
    let created = new CustomEvent("created", { detail: { props: this.props, self: this } });
    this.render(this.props);
    this.dispatchEvent(created);
    this.state.subscribeTrigger("props", () => {
      this.dispatchEvent(changed);
    });
    if (typeof this.onresize === "function") {
      if (this.ONRESIZE) {
        try {
          window.removeEventListener("resize", this.ONRESIZE);
        } catch (err) {
        }
      }
      this.ONRESIZE = (ev) => {
        this.onresize(this, this.props);
        this.dispatchEvent(resizeevent);
      };
      window.addEventListener("resize", this.ONRESIZE);
    }
    if (typeof this.ondelete === "function") {
      let ondelete = this.ondelete;
      this.ondelete = (props = this.props) => {
        if (this.ONRESIZE)
          window.removeEventListener("resize", this.ONRESIZE);
        this.state.unsubscribeTrigger("props");
        this.dispatchEvent(deleted);
        ondelete(this, props);
      };
    }
    if (typeof this.onchanged === "function") {
      this.state.data.props = this.props;
      this.state.subscribeTrigger("props", this.onchanged);
    }
    if (this.renderonchanged) {
      let rpc = this.renderonchanged;
      if (typeof this.renderonchanged === "number")
        this.unsubscribeTrigger(this.renderonchanged);
      if (typeof rpc === "string")
        rpc = parseFunctionFromText2(rpc);
      if (typeof rpc === "function") {
        this.renderonchanged = this.state.subscribeTrigger("props", (p) => {
          this.render(p);
          rpc(this, p);
        });
      } else if (rpc !== false)
        this.renderonchanged = this.state.subscribeTrigger("props", this.render);
    }
  }
  constructor() {
    super();
  }
  delete = () => {
    this.remove();
    if (typeof this.ondelete === "function")
      this.ondelete(this.props);
  };
  render = (props = this.props) => {
    if (typeof this.template === "function")
      this.templateResult = this.template(this, props);
    else
      this.templateResult = this.template;
    if (this.styles)
      this.templateResult = `<style>${this.styles}</style>${this.templateResult}`;
    const t3 = document.createElement("template");
    if (typeof this.templateResult === "string")
      t3.innerHTML = this.templateResult;
    else if (this.templateResult instanceof HTMLElement) {
      if (this.templateResult.parentNode) {
        this.templateResult.parentNode.removeChild(this.templateResult);
      }
      t3.appendChild(this.templateResult);
    }
    const fragment = t3.content;
    if (this.FRAGMENT) {
      if (this.useShadow) {
        if (this.STYLE)
          this.shadowRoot.removeChild(this.STYLE);
        this.shadowRoot.removeChild(this.FRAGMENT);
      } else
        this.removeChild(this.FRAGMENT);
    }
    if (this.useShadow) {
      if (!this.attachedShadow) {
        this.attachShadow({ mode: "open" }).innerHTML = "<slot></slot>";
        this.attachedShadow = true;
      }
      if (this.styles) {
        let style = document.createElement("style");
        style.textContent = this.styles;
        this.shadowRoot.prepend(style);
        this.STYLE = style;
      }
      this.shadowRoot.prepend(fragment);
      this.FRAGMENT = this.shadowRoot.childNodes[0];
    } else {
      this.prepend(fragment);
      this.FRAGMENT = this.childNodes[0];
    }
    let rendered = new CustomEvent("rendered", { detail: { props: this.props, self: this } });
    this.dispatchEvent(rendered);
    if (this.oncreate)
      this.oncreate(this, props);
  };
  state = {
    pushToState: {},
    data: {},
    triggers: {},
    setState(updateObj) {
      Object.assign(this.pushToState, updateObj);
      if (Object.keys(this.triggers).length > 0) {
        for (const prop of Object.getOwnPropertyNames(this.triggers)) {
          if (this.pushToState[prop]) {
            this.data[prop] = this.pushToState[prop];
            delete this.pushToState[prop];
            this.triggers[prop].forEach((obj) => {
              obj.onchanged(this.data[prop]);
            });
          }
        }
      }
      return this.pushToState;
    },
    subscribeTrigger(key, onchanged = (res) => {
    }) {
      if (key) {
        if (!this.triggers[key]) {
          this.triggers[key] = [];
        }
        let l = this.triggers[key].length;
        this.triggers[key].push({ idx: l, onchanged });
        return this.triggers[key].length - 1;
      } else
        return void 0;
    },
    unsubscribeTrigger(key, sub) {
      let triggers = this.triggers[key];
      if (triggers) {
        if (!sub)
          delete this.triggers[key];
        else {
          let idx = void 0;
          let obj = triggers.find((o, i3) => {
            if (o.idx === sub) {
              idx = i3;
              return true;
            }
          });
          if (obj)
            triggers.splice(idx, 1);
          return true;
        }
      }
    },
    subscribeTriggerOnce(key = void 0, onchanged = (value) => {
    }) {
      let sub;
      let changed = (value) => {
        onchanged(value);
        this.unsubscribeTrigger(key, sub);
      };
      sub = this.subscribeTrigger(key, changed);
    }
  };
  get props() {
    return this.props;
  }
  set props(newProps = {}) {
    this.setAttribute("props", newProps);
  }
  get template() {
    return this.template;
  }
  set template(template) {
    this.setAttribute("template", template);
  }
  get render() {
    return this.render;
  }
  get delete() {
    return this.delete;
  }
  get state() {
    return this.state;
  }
  get onchanged() {
    return this.onchanged;
  }
  set onchanged(onchanged) {
    this.setAttribute("onchanged", onchanged);
  }
  get styles() {
    return this.styles;
  }
  set styles(templateStr) {
    this.styles = templateStr;
    if (this.querySelector("style")) {
      this.querySelector("style").innerHTML = templateStr;
    } else {
      this.render();
    }
  }
  get renderonchanged() {
    return this.renderonchanged;
  }
  set renderonchanged(onchanged) {
    this.setAttribute("renderonchanged", onchanged);
  }
  get onresize() {
    return this.props;
  }
  set onresize(onresize) {
    this.setAttribute("onresize", onresize);
  }
  get ondelete() {
    return this.props;
  }
  set ondelete(ondelete) {
    this.setAttribute("ondelete", ondelete);
  }
  get oncreate() {
    return this.oncreate;
  }
  set oncreate(oncreate) {
    this.setAttribute("oncreated", oncreate);
  }
};
function addCustomElement(cls, tag, extend = null) {
  try {
    if (extend) {
      if (tag)
        window.customElements.define(tag, cls, { extends: extend });
      else
        window.customElements.define(cls.name.toLowerCase() + "-", cls, { extends: extend });
    } else {
      if (tag)
        window.customElements.define(tag, cls);
      else
        window.customElements.define(cls.name.toLowerCase() + "-", cls);
    }
  } catch (err) {
  }
}
function parseFunctionFromText2(method) {
  let getFunctionBody = (methodString) => {
    return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, "$2$3$4");
  };
  let getFunctionHead = (methodString) => {
    let startindex = methodString.indexOf(")");
    return methodString.slice(0, methodString.indexOf("{", startindex) + 1);
  };
  let newFuncHead = getFunctionHead(method);
  let newFuncBody = getFunctionBody(method);
  let newFunc;
  try {
    if (newFuncHead.includes("function")) {
      let varName = newFuncHead.split("(")[1].split(")")[0];
      newFunc = new Function(varName, newFuncBody);
    } else {
      if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
        let varName = newFuncHead.split("(")[1].split(")")[0];
        newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf("{") + 1, newFuncBody.length - 1));
      } else {
        try {
          newFunc = (0, eval)(newFuncHead + newFuncBody + "}");
        } catch (err) {
          newFunc = (0, eval)(method);
        }
      }
    }
  } catch (err) {
  }
  return newFunc;
}
var Service = class extends Graph {
  constructor(options = {}) {
    super(void 0, options.name ? options.name : `service${Math.floor(Math.random() * 1e14)}`, options.props);
    this.routes = {};
    this.loadDefaultRoutes = false;
    this.keepState = true;
    this.firstLoad = true;
    this.customRoutes = {};
    this.customChildren = {};
    this.init = (options2) => {
      if (options2)
        options2 = Object.assign({}, options2);
      else
        options2 = {};
      if (options2.customRoutes)
        Object.assign(options2.customRoutes, this.customRoutes);
      else
        options2.customRoutes = this.customRoutes;
      if (options2.customChildren)
        Object.assign(options2.customChildren, this.customChildren);
      else
        options2.customChildren = this.customChildren;
      if (Array.isArray(options2.routes)) {
        options2.routes.forEach((r3) => {
          this.load(r3, options2.includeClassName, options2.routeFormat, options2.customRoutes, options2.customChildren, options2.sharedState);
        });
      } else if (options2.routes || (Object.keys(this.routes).length > 0 || this.loadDefaultRoutes) && this.firstLoad)
        this.load(options2.routes, options2.includeClassName, options2.routeFormat, options2.customRoutes, options2.customChildren, options2.sharedState);
    };
    this.load = (routes, includeClassName = true, routeFormat = ".", customRoutes, customChildren, sharedState = true) => {
      if (!routes && !this.loadDefaultRoutes && (Object.keys(this.routes).length > 0 || this.firstLoad))
        return;
      if (this.firstLoad)
        this.firstLoad = false;
      if (customRoutes)
        customRoutes = Object.assign(this.customRoutes, customRoutes);
      else
        customRoutes = this.customRoutes;
      let service;
      let allRoutes = {};
      if (routes) {
        if (!(routes instanceof Graph) && routes?.name && !routes.setTree) {
          if (routes.module) {
            let mod = routes;
            routes = {};
            Object.getOwnPropertyNames(routes.module).forEach((prop) => {
              if (includeClassName)
                routes[mod.name + routeFormat + prop] = routes.module[prop];
              else
                routes[prop] = routes.module[prop];
            });
          } else if (typeof routes === "function") {
            service = new routes({ loadDefaultRoutes: this.loadDefaultRoutes });
            service.load();
            if (sharedState)
              service.state = this.state;
            routes = service.routes;
            if (service.customRoutes && !this.customRoutes)
              this.customRoutes = service.customRoutes;
            else if (service.customRoutes && this.customRoutes)
              Object.assign(this.customRoutes, service.customRoutes);
            if (service.customChildren && !this.customChildren)
              this.customChildren = service.customChildren;
            else if (service.customChildren && this.customChildren)
              Object.assign(this.customChildren, service.customChildren);
          }
        } else if (routes instanceof Graph || routes.source instanceof Graph || routes.setTree) {
          service = routes;
          routes = {};
          if (sharedState)
            service.state = this.state;
          if (includeClassName) {
            let name2 = service.name;
            if (!name2) {
              name2 = service.tag;
              service.name = name2;
            }
            if (!name2) {
              name2 = `graph${Math.floor(Math.random() * 1e15)}`;
              service.name = name2;
              service.tag = name2;
            }
          }
          if (service.customRoutes && !this.customRoutes)
            this.customRoutes = service.customRoutes;
          else if (service.customRoutes && this.customRoutes)
            Object.assign(this.customRoutes, service.customRoutes);
          if (service.customChildren && !this.customChildren)
            this.customChildren = service.customChildren;
          else if (service.customChildren && this.customChildren)
            Object.assign(this.customChildren, service.customChildren);
          service.nodes.forEach((node) => {
            routes[node.tag] = node;
            let checked = {};
            let checkChildGraphNodes = (nd, par) => {
              if (!checked[nd.tag] || par && includeClassName && !checked[par?.tag + routeFormat + nd.tag]) {
                if (!par)
                  checked[nd.tag] = true;
                else
                  checked[par.tag + routeFormat + nd.tag] = true;
                if (nd instanceof Graph || nd.source instanceof Graph || nd.setTree) {
                  if (sharedState)
                    nd.state = this.state;
                  if (includeClassName) {
                    let nm = nd.name;
                    if (!nm) {
                      nm = nd.tag;
                      nd.name = nm;
                    }
                    if (!nm) {
                      nm = `graph${Math.floor(Math.random() * 1e15)}`;
                      nd.name = nm;
                      nd.tag = nm;
                    }
                  }
                  nd.nodes.forEach((n) => {
                    if (includeClassName && !routes[nd.tag + routeFormat + n.tag])
                      routes[nd.tag + routeFormat + n.tag] = n;
                    else if (!routes[n.tag])
                      routes[n.tag] = n;
                    checkChildGraphNodes(n, nd);
                  });
                }
              }
            };
            checkChildGraphNodes(node);
          });
        } else if (typeof routes === "object") {
          let name2 = routes.constructor.name;
          if (name2 === "Object") {
            name2 = Object.prototype.toString.call(routes);
            if (name2)
              name2 = name2.split(" ")[1];
            if (name2)
              name2 = name2.split("]")[0];
          }
          if (name2 && name2 !== "Object") {
            let module2 = routes;
            routes = {};
            Object.getOwnPropertyNames(module2).forEach((route) => {
              if (includeClassName)
                routes[name2 + routeFormat + route] = module2[route];
              else
                routes[route] = module2[route];
            });
          }
        }
        if ((service instanceof Graph || service?.setTree) && service.name && includeClassName) {
          routes = Object.assign({}, routes);
          for (const prop in routes) {
            let route = routes[prop];
            delete routes[prop];
            routes[service.name + routeFormat + prop] = route;
          }
        }
      }
      if (this.loadDefaultRoutes) {
        let rts = Object.assign({}, this.defaultRoutes);
        if (routes) {
          Object.assign(rts, this.routes);
          routes = Object.assign(rts, routes);
        } else
          routes = Object.assign(rts, this.routes);
        this.loadDefaultRoutes = false;
      }
      if (!routes)
        routes = this.routes;
      let incr = 0;
      for (const tag in routes) {
        incr++;
        let childrenIter = (route, routeKey) => {
          if (typeof route === "object") {
            if (!route.tag)
              route.tag = routeKey;
            if (typeof route?.children === "object") {
              nested:
                for (const key in route.children) {
                  incr++;
                  if (typeof route.children[key] === "object") {
                    let rt = route.children[key];
                    if (rt.tag && allRoutes[rt.tag])
                      continue;
                    if (customChildren) {
                      for (const k2 in customChildren) {
                        rt = customChildren[k2](rt, key, route, routes, allRoutes);
                        if (!rt)
                          continue nested;
                      }
                    }
                    if (rt.id && !rt.tag) {
                      rt.tag = rt.id;
                    }
                    let k;
                    if (rt.tag) {
                      if (allRoutes[rt.tag]) {
                        let randkey = `${rt.tag}${incr}`;
                        allRoutes[randkey] = rt;
                        rt.tag = randkey;
                        childrenIter(allRoutes[randkey], key);
                        k = randkey;
                      } else {
                        allRoutes[rt.tag] = rt;
                        childrenIter(allRoutes[rt.tag], key);
                        k = rt.tag;
                      }
                    } else {
                      if (allRoutes[key]) {
                        let randkey = `${key}${incr}`;
                        allRoutes[randkey] = rt;
                        rt.tag = randkey;
                        childrenIter(allRoutes[randkey], key);
                        k = randkey;
                      } else {
                        allRoutes[key] = rt;
                        childrenIter(allRoutes[key], key);
                        k = key;
                      }
                    }
                    if (service?.name && includeClassName) {
                      allRoutes[service.name + routeFormat + k] = rt;
                      delete allRoutes[k];
                    } else
                      allRoutes[k] = rt;
                  }
                }
            }
          }
        };
        allRoutes[tag] = routes[tag];
        childrenIter(routes[tag], tag);
      }
      top:
        for (const route in allRoutes) {
          if (typeof allRoutes[route] === "object") {
            let r3 = allRoutes[route];
            if (typeof r3 === "object") {
              if (customRoutes) {
                for (const key in customRoutes) {
                  r3 = customRoutes[key](r3, route, allRoutes);
                  if (!r3)
                    continue top;
                }
              }
              if (r3.get) {
                if (typeof r3.get == "object") {
                }
              }
              if (r3.post) {
              }
              if (r3.delete) {
              }
              if (r3.put) {
              }
              if (r3.head) {
              }
              if (r3.patch) {
              }
              if (r3.options) {
              }
              if (r3.connect) {
              }
              if (r3.trace) {
              }
              if (r3.post && !r3.operator) {
                allRoutes[route].operator = r3.post;
              } else if (!r3.operator && typeof r3.get == "function") {
                allRoutes[route].operator = r3.get;
              }
            }
          }
        }
      for (const route in routes) {
        if (typeof routes[route] === "object") {
          if (this.routes[route]) {
            if (typeof this.routes[route] === "object")
              Object.assign(this.routes[route], routes[route]);
            else
              this.routes[route] = routes[route];
          } else
            this.routes[route] = routes[route];
        } else if (this.routes[route]) {
          if (typeof this.routes[route] === "object")
            Object.assign(this.routes[route], routes[route]);
          else
            this.routes[route] = routes[route];
        } else
          this.routes[route] = routes[route];
      }
      if (service) {
        for (const key in this.routes) {
          if (this.routes[key] instanceof GraphNode || this.routes[key].constructor.name.includes("GraphNode")) {
            this.nodes.set(key, this.routes[key]);
            this.nNodes = this.nodes.size;
          }
        }
      } else
        this.setTree(this.routes);
      for (const prop in this.routes) {
        if (this.routes[prop]?.aliases) {
          let aliases = this.routes[prop].aliases;
          aliases.forEach((a) => {
            if (service?.name && includeClassName)
              routes[service.name + routeFormat + a] = this.routes[prop];
            else
              routes[a] = this.routes[prop];
          });
        }
      }
      return this.routes;
    };
    this.unload = (routes = this.routes) => {
      if (!routes)
        return;
      let service;
      if (!(routes instanceof Service) && typeof routes === "function") {
        service = new Service();
        routes = service.routes;
      } else if (routes instanceof Service) {
        routes = routes.routes;
      }
      for (const r3 in routes) {
        delete this.routes[r3];
        if (this.nodes.get(r3))
          this.remove(r3);
      }
      return this.routes;
    };
    this.handleMethod = (route, method, args) => {
      let m3 = method.toLowerCase();
      let src = this.nodes.get(route);
      if (!src) {
        src = this.routes[route];
        if (!src)
          src = this.tree[route];
      }
      if (src?.[m3]) {
        if (!(src[m3] instanceof Function)) {
          if (args)
            src[m3] = args;
          return src[m3];
        } else
          return src[m3](args);
      } else
        return this.handleServiceMessage({ route, args, method });
    };
    this.transmit = (...args) => {
      if (typeof args[0] === "object") {
        if (args[0].method) {
          return this.handleMethod(args[0].route, args[0].method, args[0].args);
        } else if (args[0].route) {
          return this.handleServiceMessage(args[0]);
        } else if (args[0].node) {
          return this.handleGraphNodeCall(args[0].node, args[0].args);
        } else if (this.keepState) {
          if (args[0].route)
            this.setState({ [args[0].route]: args[0].args });
          if (args[0].node)
            this.setState({ [args[0].node]: args[0].args });
        }
        return args;
      } else
        return args;
    };
    this.receive = (...args) => {
      if (args[0]) {
        if (typeof args[0] === "string") {
          let substr = args[0].substring(0, 8);
          if (substr.includes("{") || substr.includes("[")) {
            if (substr.includes("\\"))
              args[0] = args[0].replace(/\\/g, "");
            if (args[0][0] === '"') {
              args[0] = args[0].substring(1, args[0].length - 1);
            }
            ;
            args[0] = JSON.parse(args[0]);
          }
        }
      }
      if (typeof args[0] === "object") {
        if (args[0].method) {
          return this.handleMethod(args[0].route, args[0].method, args[0].args);
        } else if (args[0].route) {
          return this.handleServiceMessage(args[0]);
        } else if (args[0].node) {
          return this.handleGraphNodeCall(args[0].node, args[0].args);
        } else if (this.keepState) {
          if (args[0].route)
            this.setState({ [args[0].route]: args[0].args });
          if (args[0].node)
            this.setState({ [args[0].node]: args[0].args });
        }
        return args;
      } else
        return args;
    };
    this.pipe = (source, destination, endpoint, method, callback) => {
      if (source instanceof GraphNode) {
        if (callback)
          return source.subscribe((res) => {
            let mod = callback(res);
            if (mod !== void 0)
              this.transmit({ route: destination, args: mod, method });
            else
              this.transmit({ route: destination, args: res, method }, endpoint);
          });
        else
          return this.subscribe(source, (res) => {
            this.transmit({ route: destination, args: res, method }, endpoint);
          });
      } else if (typeof source === "string")
        return this.subscribe(source, (res) => {
          this.transmit({ route: destination, args: res, method }, endpoint);
        });
    };
    this.pipeOnce = (source, destination, endpoint, method, callback) => {
      if (source instanceof GraphNode) {
        if (callback)
          return source.state.subscribeTriggerOnce(source.tag, (res) => {
            let mod = callback(res);
            if (mod !== void 0)
              this.transmit({ route: destination, args: mod, method });
            else
              this.transmit({ route: destination, args: res, method }, endpoint);
          });
        else
          return this.state.subscribeTriggerOnce(source.tag, (res) => {
            this.transmit({ route: destination, args: res, method }, endpoint);
          });
      } else if (typeof source === "string")
        return this.state.subscribeTriggerOnce(source, (res) => {
          this.transmit({ route: destination, args: res, method }, endpoint);
        });
    };
    this.terminate = (...args) => {
      this.nodes.forEach((n) => {
        n.stopNode();
      });
    };
    this.recursivelyAssign = (target, obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          if (typeof target[key] === "object" && !Array.isArray(target[key]))
            this.recursivelyAssign(target[key], obj[key]);
          else
            target[key] = this.recursivelyAssign({}, obj[key]);
        } else
          target[key] = obj[key];
      }
      return target;
    };
    this.defaultRoutes = {
      "/": {
        get: () => {
          return this.print();
        },
        aliases: [""]
      },
      ping: () => {
        console.log("ping");
        return "pong";
      },
      echo: (...args) => {
        this.transmit(...args);
        return args;
      },
      assign: (source) => {
        if (typeof source === "object") {
          Object.assign(this, source);
          return true;
        }
        return false;
      },
      recursivelyAssign: (source) => {
        if (typeof source === "object") {
          this.recursivelyAssign(this, source);
          return true;
        }
        return false;
      },
      log: {
        post: (...args) => {
          console.log("Log: ", ...args);
        },
        aliases: ["info"]
      },
      error: (message) => {
        let er = new Error(message);
        console.error(message);
        return er;
      },
      state: (key) => {
        if (key) {
          return this.state.data[key];
        } else
          return this.state.data;
      },
      printState: (key) => {
        if (key) {
          return stringifyWithCircularRefs(this.state.data[key]);
        } else
          return stringifyWithCircularRefs(this.state.data);
      },
      spliceTypedArray: this.spliceTypedArray,
      transmit: this.transmit,
      receive: this.receive,
      load: this.load,
      unload: this.unload,
      pipe: this.pipe,
      terminate: this.terminate,
      run: this.run,
      subscribe: this.subscribe,
      subscribeNode: this.subscribeNode,
      unsubscribe: this.unsubscribe,
      stopNode: this.stopNode,
      get: this.get,
      add: this.add,
      remove: this.remove,
      setTree: this.setTree,
      setState: this.setState,
      print: this.print,
      reconstruct: this.reconstruct,
      handleMethod: this.handleMethod,
      handleServiceMessage: this.handleServiceMessage,
      handleGraphNodeCall: this.handleGraphNodeCall
    };
    if (options.name)
      this.name = options.name;
    else
      options.name = this.tag;
    if ("loadDefaultRoutes" in options) {
      this.loadDefaultRoutes = options.loadDefaultRoutes;
      this.routes = Object.assign(this.defaultRoutes, this.routes);
    }
    if (options || Object.keys(this.routes).length > 0)
      this.init(options);
  }
  handleServiceMessage(message) {
    let call;
    if (typeof message === "object") {
      if (message.route)
        call = message.route;
      else if (message.node)
        call = message.node;
    }
    if (call) {
      if (Array.isArray(message.args))
        return this.run(call, ...message.args);
      else
        return this.run(call, message.args);
    } else
      return message;
  }
  handleGraphNodeCall(route, args) {
    if (!route)
      return args;
    if (args?.args) {
      this.handleServiceMessage(args);
    } else if (Array.isArray(args))
      return this.run(route, ...args);
    else
      return this.run(route, args);
  }
  isTypedArray(x3) {
    return ArrayBuffer.isView(x3) && Object.prototype.toString.call(x3) !== "[object DataView]";
  }
  spliceTypedArray(arr, start, end) {
    let s3 = arr.subarray(0, start);
    let e3;
    if (end) {
      e3 = arr.subarray(end + 1);
    }
    let n;
    if (s3.length > 0 || e3?.length > 0)
      n = new arr.constructor(s3.length + e3.length);
    if (s3.length > 0)
      n.set(s3);
    if (e3 && e3.length > 0)
      n.set(e3, s3.length);
    return n;
  }
};
var DOMService = class extends Service {
  constructor(options, parentNode, interpreters) {
    super({ props: options?.props, name: options?.name ? options.name : `dom${Math.floor(Math.random() * 1e15)}` });
    this.loadDefaultRoutes = false;
    this.keepState = true;
    this.parentNode = document.body;
    this.interpreters = {
      md: (template, options2) => {
        if (typeof markdownit === "undefined") {
          document.head.insertAdjacentHTML("beforeend", `
                    <script src='https://unpkg.com/markdown-it@latest/dist/markdown-it.min.js'><\/script>`);
        }
        let md = globalThis.markdownit();
        let html = md.render(template);
        options2.template = html;
      },
      jsx: (template, options2) => {
        if (!options2.parentNode)
          options2.parentNode = this.parentNode;
        if (typeof options2.parentNode === "string")
          options2.parentNode = document.getElementById(options2.parentNode);
        if (typeof ReactDOM === "undefined") {
          document.head.insertAdjacentHTML("beforeend", `
                    <script src='https://unpkg.com/react@latest/umd/react.production.min.js'><\/script>
                    <script src='https://unpkg.com/react-dom@latest/umd/react-dom.production.min.js'><\/script>`);
        }
        options2.template = "";
        let onrender = options2.onrender;
        options2.onrender = (self2, info) => {
          const modal = ReactDOM.createPortal(template, options2.id);
          onrender(self2, info);
        };
      }
    };
    this.customRoutes = {
      "dom": (r3, route, routes) => {
        if (!(r3 instanceof GraphNode)) {
          if (r3.element?.parentNode?.id && r3.graph?.parentNode?.id) {
            if (r3.graph.parentNode.id === r3.element.id) {
              r3.parentNode = this.parentNode;
            }
          } else {
            if (r3.template) {
              if (!r3.tag)
                r3.tag = route;
              this.addComponent(r3, r3.generateChildElementNodes);
            } else if (r3.context) {
              if (!r3.tag)
                r3.tag = route;
              this.addCanvasComponent(r3);
            } else if (r3.tagName || r3.element) {
              if (!r3.tag)
                r3.tag = route;
              this.addElement(r3, r3.generateChildElementNodes);
            }
          }
        }
        return r3;
      }
    };
    this.customChildren = {
      "dom": (rt, routeKey, parent, routes, checked) => {
        if ((parent.tag || parent.id) && (parent.template || parent.context || parent.tagName || parent.element) && (rt.template || rt.context || rt.tagName || rt.element) && !rt.parentNode) {
          if (parent.tag)
            rt.parentNode = parent.tag;
          if (parent.id)
            rt.parentNode = parent.id;
        }
        return rt;
      }
    };
    this.elements = {};
    this.components = {};
    this.templates = {};
    this.addElement = (options2, generateChildElementNodes = false) => {
      let elm = this.createElement(options2);
      if (!options2.element)
        options2.element = elm;
      if (!options2.operator)
        options2.operator = function(props) {
          if (typeof props === "object")
            for (const key in props) {
              if (this.element) {
                if (typeof this.element[key] === "function" && typeof props[key] !== "function") {
                  if (Array.isArray(props[key]))
                    this.element[key](...props[key]);
                  else
                    this.element[key](props[key]);
                } else if (key === "style") {
                  Object.assign(this.element[key], props[key]);
                } else
                  this.element[key] = props[key];
              }
            }
          return props;
        };
      let node = this.resolveGraphNode(elm, options2);
      let divs = Array.from(elm.querySelectorAll("*"));
      if (generateChildElementNodes) {
        divs = divs.map((d, i3) => this.addElement({ element: d }));
      }
      this.elements[options2.id] = { element: elm, node, parentNode: options2.parentNode, divs };
      if (!node.ondelete)
        node.ondelete = (node2) => {
          elm.remove();
          if (options2.onremove)
            options2.onremove.call(this.elements[options2.id].node, elm, this.elements[options2.id]);
        };
      if (options2.onresize) {
        let onresize = options2.onresize;
        options2.onresize = (ev) => {
          onresize.call(this.elements[options2.id].node, ev, elm, this.elements[options2.id]);
        };
        window.addEventListener("resize", options2.onresize);
      }
      return this.elements[options2.id];
    };
    this.createElement = (options2) => {
      let elm;
      if (options2.element) {
        if (typeof options2.element === "string") {
          elm = document.querySelector(options2.element);
          if (!elm)
            elm = document.getElementById(options2.element);
        } else
          elm = options2.element;
      } else if (options2.tagName)
        elm = document.createElement(options2.tagName);
      else if (options2.id && document.getElementById(options2.id))
        elm = document.getElementById(options2.id);
      if (!elm)
        return void 0;
      this.updateOptions(options2, elm);
      return elm;
    };
    this.updateOptions = (options2, element) => {
      if (!options2.id && options2.tag)
        options2.id = options2.tag;
      if (!options2.tag && options2.id)
        options2.tag = options2.id;
      if (!options2.id)
        options2.id = `${options2.tagName ?? "element"}${Math.floor(Math.random() * 1e15)}`;
      let p = options2.parentNode;
      delete options2.parentNode;
      Object.defineProperty(options2, "parentNode", {
        get: function() {
          return element.parentNode;
        },
        set: (v) => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
          this.resolveParentNode(element, v ? v : this.parentNode, options2, options2.onrender);
        },
        enumerable: true,
        configurable: true
      });
      options2.parentNode = p ? p : this.parentNode;
      element.id = options2.id;
      if (options2.style)
        Object.assign(element.style, options2.style);
      if (options2.attributes) {
        for (let key in options2.attributes) {
          if (typeof options2.attributes[key] === "function")
            element[key] = (...args) => options2.attributes[key](...args);
          else
            element[key] = options2.attributes[key];
        }
      }
      if (!options2.attributes?.innerHTML && options2.innerHTML) {
        element.innerHTML = options2.innerHTML;
      } else if (!options2.attributes?.innerText && options2.innerText) {
        element.innerText = options2.innerText;
      }
      return options2;
    };
    this.resolveParentNode = (elm, parentNode2, options2, oncreate) => {
      if (!elm.parentNode) {
        setTimeout(() => {
          if (typeof parentNode2 === "string")
            parentNode2 = document.getElementById(parentNode2);
          if (parentNode2 && typeof parentNode2 === "object") {
            parentNode2.appendChild(elm);
          }
          if (oncreate)
            oncreate.call(elm.node, elm, this.elements[options2.id]);
          if (elm.node.animation || elm.node.animate) {
            elm.node.runAnimation();
          }
          if (elm.node.looper || typeof elm.node.loop === "number" && elm.node.loop) {
            elm.node.runLoop();
          }
        }, 0.01);
      }
    };
    this.resolveGraphNode = (element, options2) => {
      let node;
      if (this.nodes.get(options2.id)?.element?.parentNode?.id === options2.parentNode || this.nodes.get(options2.id)?.parentNode === options2.parentNode) {
        node = this.nodes.get(options2.id);
      } else {
        let parentId = options2.parentNode instanceof HTMLElement ? options2.parentNode?.id : typeof options2.parentNode === "string" ? options2.parentNode : void 0;
        let parent;
        if (parentId)
          parent = this.nodes.get(parentId);
        node = new GraphNode(options2 instanceof Graph ? options2 : Object.assign({}, options2), parent, this);
      }
      delete node.parentNode;
      Object.defineProperty(node, "parentNode", {
        get: function() {
          return element.parentNode;
        },
        set: (v) => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
          this.resolveParentNode(element, v ? v : this.parentNode, options2, options2.onrender);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(node, "element", {
        get: () => element,
        set: (v) => {
          element = v;
          node.nodes.forEach((n) => {
            if (node.source?._unique === n.graph?._unique)
              n.parentNode = element;
          });
        }
      });
      node.element = element;
      element.node = node;
      const initialOptions = options2._initial ?? options2;
      for (let key in initialOptions) {
        if (typeof initialOptions[key] === "function")
          initialOptions[key] = initialOptions[key].bind(node);
        else if (key === "attributes") {
          for (let key2 in initialOptions.attributes) {
            if (typeof initialOptions.attributes[key2] === "function") {
              initialOptions.attributes[key2] = initialOptions.attributes[key2].bind(node);
            }
          }
        }
      }
      return node;
    };
    this.addComponent = (options2, generateChildElementNodes = true) => {
      if (options2.onrender) {
        let oncreate = options2.onrender;
        options2.onrender = (element) => {
          oncreate.call(element.node, element, options2);
        };
      }
      if (options2.onresize) {
        let onresize = options2.onresize;
        options2.onresize = (element) => {
          onresize.call(element.node, element, options2);
        };
      }
      if (options2.onremove) {
        let ondelete = options2.onremove;
        options2.onremove = (element) => {
          ondelete.call(element.node, self, options2);
        };
      }
      if (typeof options2.renderonchanged === "function") {
        let renderonchanged = options2.renderonchanged;
        options2.renderonchanged = (element) => {
          renderonchanged.call(element.node, element, options2);
        };
      }
      if (options2.interpreter && options2.interpreter !== "wc") {
        this.interpreters[options2.interpreter](options2.template, options2);
      }
      class CustomElement extends DOMElement {
        constructor() {
          super(...arguments);
          this.props = options2.props;
          this.styles = options2.styles;
          this.useShadow = options2.useShadow;
          this.template = options2.template;
          this.oncreate = options2.onrender;
          this.onresize = options2.onresize;
          this.ondelete = options2.onremove;
          this.renderonchanged = options2.renderonchanged;
        }
      }
      if (!options2.tagName)
        options2.tagName = `custom-element${Math.random() * 1e15}`;
      CustomElement.addElement(options2.tagName);
      let elm = document.createElement(options2.tagName);
      let completeOptions = this.updateOptions(options2, elm);
      this.templates[completeOptions.id] = completeOptions;
      let divs = Array.from(elm.querySelectorAll("*"));
      if (generateChildElementNodes) {
        divs = divs.map((d) => this.addElement({ element: d }));
      }
      if (!options2.element)
        options2.element = elm;
      if (!options2.operator)
        options2.operator = function op(props) {
          if (typeof props === "object")
            for (const key in props) {
              if (this.element) {
                if (typeof this.element[key] === "function" && typeof props[key] !== "function") {
                  if (Array.isArray(props[key]))
                    this.element[key](...props[key]);
                  else
                    this.element[key](props[key]);
                } else if (key === "style") {
                  Object.assign(this.element[key], props[key]);
                } else
                  this.element[key] = props[key];
              }
            }
          return props;
        };
      let node = this.resolveGraphNode(elm, options2);
      if (!node.ondelete)
        node.ondelete = (node2) => {
          elm.delete();
        };
      this.components[completeOptions.id] = {
        element: elm,
        class: CustomElement,
        node,
        divs,
        ...completeOptions
      };
      return this.components[completeOptions.id];
    };
    this.addCanvasComponent = (options2) => {
      if (!options2.canvas) {
        options2.template = `<canvas `;
        if (options2.width)
          options2.template += `width="${options2.width}"`;
        if (options2.height)
          options2.template += `height="${options2.height}"`;
        options2.template += ` ></canvas>`;
      } else
        options2.template = options2.canvas;
      if (options2.onrender) {
        let oncreate = options2.onrender;
        options2.onrender = (element) => {
          oncreate.call(element.node, element, options2);
        };
      }
      if (options2.onresize) {
        let onresize = options2.onresize;
        options2.onresize = (element) => {
          onresize.call(element.node, element, options2);
        };
      }
      if (options2.ondelete) {
        let ondelete = options2.onremove;
        options2.onremove = (element) => {
          ondelete.call(element.node, element, options2);
        };
      }
      if (typeof options2.renderonchanged === "function") {
        let renderonchanged = options2.renderonchanged;
        options2.renderonchanged = (element) => {
          renderonchanged.call(element.node, element, options2);
        };
      }
      class CustomElement extends DOMElement {
        constructor() {
          super(...arguments);
          this.props = options2.props;
          this.styles = options2.styles;
          this.template = options2.template;
          this.oncreate = options2.onrender;
          this.onresize = options2.onresize;
          this.ondelete = options2.onremove;
          this.renderonchanged = options2.renderonchanged;
        }
      }
      if (!options2.tagName)
        options2.tagName = `custom-element${Math.random() * 1e15}`;
      CustomElement.addElement(options2.tagName);
      let elm = document.createElement(options2.tagName);
      const completeOptions = this.updateOptions(options2, elm);
      let animation = () => {
        if (this.components[completeOptions.id]?.animating) {
          this.components[completeOptions.id].draw(this.components[completeOptions.id].element, this.components[completeOptions.id]);
          requestAnimationFrame(animation);
        }
      };
      this.templates[completeOptions.id] = completeOptions;
      if (!options2.element)
        options2.element = elm;
      if (!options2.operator)
        options2.operator = function op(props) {
          if (typeof props === "object")
            for (const key in props) {
              if (this.element) {
                if (typeof this.element[key] === "function" && typeof props[key] !== "function") {
                  if (Array.isArray(props[key]))
                    this.element[key](...props[key]);
                  else
                    this.element[key](props[key]);
                } else if (key === "style") {
                  Object.assign(this.element[key], props[key]);
                } else
                  this.element[key] = props[key];
              }
            }
          return props;
        };
      let node = this.resolveGraphNode(elm, options2);
      if (!node.ondelete)
        node.ondelete = (node2) => {
          elm.delete();
        };
      let canvas = elm.querySelector("canvas");
      if (completeOptions.style)
        Object.assign(canvas.style, completeOptions.style);
      let context;
      if (typeof completeOptions.context === "object")
        context = options2.context;
      else if (typeof completeOptions.context === "string")
        context = canvas.getContext(completeOptions.context);
      this.components[completeOptions.id] = {
        element: elm,
        class: CustomElement,
        template: completeOptions.template,
        canvas,
        node,
        ...completeOptions
      };
      this.components[completeOptions.id].context = context;
      elm.canvas = canvas;
      elm.context = context;
      node.canvas = canvas;
      node.context = context;
      return this.components[completeOptions.id];
    };
    this.terminate = (element) => {
      if (typeof element === "object") {
        if (element.animating)
          element.animating = false;
        if (element.element)
          element = element.element;
      } else if (typeof element === "string" && this.components[element]) {
        if (this.components[element].node.isAnimating)
          this.components[element].node.stopNode();
        if (this.components[element].divs)
          this.components[element].divs.forEach((d) => this.terminate(d));
        let temp = this.components[element].element;
        delete this.components[element];
        element = temp;
      } else if (typeof element === "string" && this.elements[element]) {
        if (this.elements[element].divs)
          this.elements[element].divs.forEach((d) => this.terminate(d));
        let temp = this.elements[element].element;
        if (this.elements[element].onresize)
          window.removeEventListener("resize", this.elements[element].onresize);
        if (this.elements[element].ondelete)
          this.elements[element].ondelete(temp, this.elements[element]);
        delete this.elements[element];
        element = temp;
      }
      if (element) {
        if (this.nodes.get(element.id)) {
          this.removeTree(element.id);
        }
        if (element instanceof DOMElement)
          element.delete();
        else if (element?.parentNode) {
          element.parentNode.removeChild(element);
        }
        return true;
      }
      return false;
    };
    this.defaultRoutes = {
      addElement: this.addElement,
      addComponent: this.addComponent,
      addCanvasComponent: this.addCanvasComponent,
      terminate: this.terminate
    };
    if (options?.parentNode)
      parentNode = options.parentNode;
    if (typeof parentNode === "string")
      parentNode = document.getElementById(parentNode);
    if (parentNode instanceof HTMLElement)
      this.parentNode = parentNode;
    if (interpreters) {
      Object.assign(this.interpreters, interpreters);
    }
    this.init(options);
  }
};
var Router = class extends Service {
  constructor(options) {
    super(options);
    this.name = "router";
    this.connections = {};
    this.sources = {};
    this.services = {};
    this.serviceConnections = {};
    this.users = {};
    this.addUser = async (info, connections, config, receiving) => {
      if (!info._id) {
        info._id = `user${Math.floor(Math.random() * 1e15)}`;
      }
      let user = Object.assign({}, info);
      if (connections) {
        for (const key in connections) {
          if (typeof connections[key] === "object") {
            if (!connections[key].connection._id) {
              await new Promise((res, rej) => {
                let start = performance.now();
                let checker = () => {
                  if (!connections[key].connection._id) {
                    if (performance.now() - start > 3e3) {
                      delete connections[key];
                      rej(false);
                    } else {
                      setTimeout(() => {
                        checker();
                      }, 100);
                    }
                  } else {
                    res(true);
                  }
                };
                checker();
              }).catch((er) => {
                console.error("Connections timed out:", er);
              });
            }
          }
        }
        for (const key in connections) {
          connections[key] = this.addConnection(connections[key], user._id);
        }
      }
      if (config) {
        for (const c in config) {
          this.openConnection(config[c].service, config[c], user._id, config[c].args);
        }
      }
      let send = (message, ...a) => {
        let connection = this.getConnection(user._id, "send");
        if (connection?.send)
          return connection.send(message, ...a);
      };
      let request = (message, method, ...a) => {
        let connection = this.getConnection(user._id, "request");
        if (connection?.request)
          return connection.request(message, method, ...a);
      };
      let post = (route, args, method, ...a) => {
        let connection = this.getConnection(user._id, "post");
        if (connection?.post)
          return connection.post(route, args, method, ...a);
      };
      let run = (route, args, method, ...a) => {
        let connection = this.getConnection(user._id, "run");
        if (connection?.run)
          return connection.run(route, args, method, ...a);
      };
      let subscribe = (route, callback, ...a) => {
        let connection = this.getConnection(user._id, "subscribe");
        if (connection?.subscribe)
          return connection.subscribe(route, callback, ...a);
      };
      let unsubscribe = (route, sub, ...a) => {
        let connection = this.getConnection(user._id, "unsubscribe");
        if (connection?.unsubscribe)
          return connection.unsubscribe(route, sub, ...a);
      };
      let terminate = () => {
        return this.removeUser(user);
      };
      user.send = send;
      user.request = request;
      user.post = post;
      user.run = run;
      user.subscribe = subscribe;
      user.unsubscribe = unsubscribe;
      user.terminate = terminate;
      this.users[user._id] = user;
      if (connections && !receiving) {
        let connectionIds = {};
        let pass = false;
        Object.keys(connections).map((k, i3) => {
          if (connections[k]?._id) {
            connectionIds[`${i3}`] = connections[k]?._id;
            pass = true;
          }
        });
        if (pass) {
          user.send({
            route: "addUser",
            args: [
              { _id: user._id },
              connectionIds,
              void 0,
              true
            ]
          });
        }
      }
      return user;
    };
    this.getConnection = (sourceId, hasMethod) => {
      if (this.sources[sourceId]) {
        if (this.order) {
          for (let i3 = 0; i3 < this.order.length; i3++) {
            let k = this.order[i3];
            for (const key in this.sources[sourceId]) {
              if (this.sources[sourceId][key].service) {
                if (typeof this.sources[sourceId][key].service === "object") {
                  if (this.sources[sourceId][key].service.tag === k) {
                    if (this.sources[sourceId][key].connectionType && this.sources[sourceId][key].service?.name) {
                      if (!this.serviceConnections[this.sources[sourceId][key].service.name]) {
                        this.removeConnection(this.sources[sourceId][key]);
                        continue;
                      }
                    }
                    return this.sources[sourceId][key];
                  }
                } else if (this.sources[sourceId][key].service === k) {
                  if (this.sources[sourceId][key].connectionType && this.sources[sourceId][key].service?.name) {
                    if (!this.serviceConnections[this.sources[sourceId][key].service.name])
                      this.removeConnection(this.sources[sourceId][key]);
                    continue;
                  }
                  return this.sources[sourceId][key];
                }
              }
            }
          }
        } else {
          for (const k in this.sources[sourceId]) {
            if (this.sources[sourceId][k].connectionType && this.sources[sourceId][k].service?.name) {
              if (!this.serviceConnections[this.sources[sourceId][k].service.name]) {
                this.removeConnection(this.sources[sourceId][k]);
                continue;
              }
            }
            if (hasMethod && this.sources[sourceId][k][hasMethod]) {
              return this.sources[sourceId][k];
            } else {
              return this.sources[sourceId][k];
            }
          }
        }
      } else if (this.order) {
        for (let i3 = 0; i3 < this.order.length; i3++) {
          let k = this.order[i3];
          if (this.sources[k]?.[sourceId]) {
            if (this.sources[k][sourceId].connectionType && this.sources[k][sourceId].service?.name) {
              if (!this.serviceConnections[this.sources[k][sourceId].service.service.name]) {
                this.removeConnection(this.sources[k][sourceId].service);
                continue;
              }
            }
            if (hasMethod && this.sources[k][sourceId]?.[hasMethod]) {
              return this.sources[k][sourceId];
            } else {
              return this.sources[k][sourceId];
            }
          }
        }
      }
      if (typeof sourceId === "string" && this.connections[sourceId] && this.connections[sourceId].send) {
        return this.connections[sourceId];
      }
    };
    this.getConnections = (sourceId, hasMethod, props) => {
      if (this.sources[sourceId]) {
        if (!props && !hasMethod)
          return this.sources[sourceId];
        let found = {};
        for (const key in this.sources[sourceId]) {
          if (typeof this.sources[sourceId][key] === "object") {
            if (!this.sources[sourceId][key]._id) {
              for (const k in this.sources[sourceId][key]) {
                if (typeof this.sources[sourceId][key][k] === "object") {
                  let pass = true;
                  if (hasMethod && !this.sources[sourceId][key][k][hasMethod])
                    pass = false;
                  for (const p in props) {
                    if (typeof this.sources[sourceId][key][k][p] === "object" && typeof props[p] === "object") {
                      for (const pp in props[p]) {
                        if (props[p][pp] !== this.sources[sourceId][key][k][p][pp]) {
                          pass = false;
                          break;
                        }
                      }
                    } else if (this.sources[sourceId][key][k][p] !== props[p]) {
                      pass = false;
                    } else {
                      pass = false;
                      break;
                    }
                  }
                  if (pass) {
                    found[this.sources[sourceId][key][k]._id] = this.sources[sourceId][key][k];
                  }
                }
              }
            } else {
              let pass = true;
              if (hasMethod && !this.sources[sourceId][key][hasMethod])
                pass = false;
              for (const p in props) {
                if (typeof this.sources[sourceId][key][p] === "object" && typeof props[p] === "object") {
                  for (const pp in props[p]) {
                    if (props[p][pp] !== this.sources[sourceId][key][p][pp]) {
                      pass = false;
                      break;
                    }
                  }
                } else if (this.sources[sourceId][key][p] !== props[p]) {
                  pass = false;
                } else {
                  pass = false;
                  break;
                }
              }
              if (pass) {
                if (this.getConnection(this.sources[sourceId][key], hasMethod))
                  found[this.sources[sourceId][key]._id] = this.sources[sourceId][key];
              }
            }
          }
        }
      }
    };
    this.addConnection = (options2, source) => {
      let settings = {};
      if (typeof options2 === "string") {
        if (this.connections[options2]) {
          options2 = this.connections[options2];
        } else {
          for (const j in this.serviceConnections) {
            for (const k in this.serviceConnections[j]) {
              if (this.serviceConnections[j][k][options2]) {
                options2 = { connection: this.serviceConnections[j][k][options2] };
                options2.service = j;
                settings.connectionType = j;
                settings.connectionsKey = k;
                break;
              }
            }
          }
        }
        if (typeof options2 === "string" && this.nodes.get(options2))
          options2 = { connection: this.nodes.get(options2) };
      }
      if (!options2 || typeof options2 === "string")
        return void 0;
      if (source)
        settings.source = source;
      if (options2.connection instanceof GraphNode) {
        settings.connection = options2.connection;
        let node = settings.connection;
        settings.send = async (message) => {
          if (message.method) {
            if (Array.isArray(message.args)) {
              return node[message.method]?.(...message.args);
            } else
              return node[message.method]?.(message.args);
          } else {
            if (Array.isArray(message.args)) {
              return node.run(...message.args);
            } else
              return node.run(message.args);
          }
        };
        settings.request = async (message, method) => {
          if (method) {
            if (Array.isArray(message.args)) {
              return node[method]?.(...message.args);
            } else
              return node[method]?.(message.args);
          } else {
            if (Array.isArray(message.args)) {
              return node.run(...message.args);
            } else
              return node.run(message.args);
          }
        };
        settings.post = async (route, args, method) => {
          if (route && node.get(route)) {
            let n = node.get(route);
            if (method) {
              if (Array.isArray(args)) {
                return n[method]?.(...args);
              } else
                return n[method]?.(args);
            } else {
              if (Array.isArray(args)) {
                return n.run(...args);
              } else
                return n.run(args);
            }
          } else {
            if (method) {
              if (Array.isArray(args)) {
                return node[method]?.(...args);
              } else
                return node[method]?.(args);
            } else {
              if (Array.isArray(args)) {
                return node.run(...args);
              } else
                return node.run(args);
            }
          }
        };
        settings.run = settings.post;
        settings.subscribe = async (route, callback) => {
          return node.subscribe(callback, route);
        };
        settings.unsubscribe = async (route, sub) => {
          return node.unsubscribe(sub, route);
        };
        settings.terminate = () => {
          node.graph.remove(node);
          return true;
        };
        settings.onclose = options2.onclose;
        if (settings.onclose) {
          let oldondelete;
          if (node.ondelete)
            oldondelete = node.ondelete;
          node.ondelete = (n) => {
            if (settings.onclose)
              settings.onclose(settings, n);
            if (oldondelete)
              oldondelete(n);
          };
        }
      } else if (options2.connection instanceof Graph) {
        if (options2.connection.nodes.get("open"))
          settings.service = options2.connection;
        let graph = settings.connection;
        settings.send = async (message) => {
          if (Array.isArray(message.args))
            graph.run(message.route, ...message.args);
          else
            graph.run(message.route, message.args);
        };
        settings.request = async (message, method) => {
          if (!message.route)
            return void 0;
          if (method) {
            if (Array.isArray(message.args)) {
              return graph.nodes.get(message.route)[method]?.(...message.args);
            } else
              return graph.nodes.get(message.route)[method]?.(message.args);
          } else {
            if (Array.isArray(message.args)) {
              return graph.run(message.route, ...message.args);
            } else
              return graph.run(message.route, message.args);
          }
        };
        settings.post = async (route, args, method) => {
          if (route && graph.get(route)) {
            let n = graph.get(route);
            if (method) {
              if (Array.isArray(args)) {
                return n[method]?.(...args);
              } else
                return n[method]?.(args);
            } else {
              if (Array.isArray(args)) {
                return n.run(...args);
              } else
                return n.run(args);
            }
          }
        };
        settings.run = settings.post;
        settings.subscribe = async (route, callback) => {
          return graph.subscribe(route, callback);
        };
        settings.unsubscribe = async (route, sub) => {
          return graph.unsubscribe(route, sub);
        };
        settings.terminate = (n) => {
          graph.remove(n);
          return true;
        };
      } else if (!(options2._id && this.connections[options2._id])) {
        let c = options2.connection;
        if (typeof c === "string") {
          if (this.connections[c])
            c = this.connections[c];
          else if (options2.service) {
            if (typeof options2.service === "string") {
              options2.service = this.services[options2.service];
            }
            if (typeof options2.service === "object") {
              if (options2.service.connections) {
                for (const key in options2.service.connections) {
                  if (options2.service.connections[key][c]) {
                    c = options2.service.connections[key][c];
                    settings.connectionType = key;
                    settings.connectionsKey = c;
                    break;
                  }
                }
              }
            }
          } else {
            for (const j in this.serviceConnections) {
              for (const k in this.serviceConnections[j]) {
                if (this.serviceConnections[j][k][c]) {
                  c = this.serviceConnections[j][k][c];
                  options2.service = j;
                  settings.connectionType = j;
                  settings.connectionsKey = k;
                  break;
                }
              }
            }
          }
        }
        if (typeof c !== "object")
          return void 0;
        settings._id = c._id;
        settings.send = c.send;
        settings.request = c.request;
        settings.run = c.run;
        settings.post = c.post;
        settings.subscribe = c.subscribe;
        settings.unsubscribe = c.unsubscribe;
        settings.terminate = c.terminate;
        settings.onclose = options2.onclose;
        if (settings.onclose) {
          if (!(c.onclose && settings.onclose.toString() === c.onclose.toString())) {
            let oldonclose = c.onclose;
            c.onclose = (...args) => {
              if (settings.onclose)
                settings.onclose(settings, ...args);
              if (this.users[settings.source] && Object.keys(this.sources[settings.source]).length === 0) {
                this.removeUser(settings.source, false);
              }
              if (oldonclose)
                oldonclose(...args);
            };
          }
        } else {
          let oldonclose = c.onclose;
          c.onclose = (...args) => {
            this.removeConnection(settings);
            if (this.users[settings.source] && Object.keys(this.sources[settings.source]).length === 0) {
              this.removeUser(settings.source, false);
            }
            if (oldonclose)
              oldonclose(...args);
          };
        }
        if (options2.service) {
          if (typeof options2.service === "string")
            options2.service = this.services[options2.service];
          settings.service = options2.service;
        } else if (c.graph)
          settings.service = c.graph;
      }
      if (!settings.source && options2.source) {
        settings.source = options2.source;
      } else if (!settings.source && options2.service) {
        settings.source = typeof options2.service === "object" ? options2.service.name : void 0;
      } else if (!settings.source && (settings.connection instanceof GraphNode || settings.connection instanceof Graph)) {
        settings.source = "local";
        if (!this.order.indexOf("local"))
          this.order.unshift("local");
      }
      if (!settings._id)
        settings._id = `connection${Math.floor(Math.random() * 1e15)}`;
      if (settings.source) {
        if (!this.sources[settings.source])
          this.sources[settings.source] = {};
        this.sources[settings.source][settings._id] = settings;
      }
      if (!this.connections[settings._id])
        this.connections[settings._id] = settings;
      return settings;
    };
    this.removeConnection = (connection, terminate = false) => {
      if (typeof connection === "object" && connection._id)
        connection = connection._id;
      if (typeof connection === "string") {
        if (this.connections[connection]) {
          if (terminate && this.connections[connection])
            this.connections[connection].terminate();
          delete this.connections[connection];
          for (const key in this.sources) {
            if (this.sources[key][connection])
              delete this.sources[key][connection];
            else {
              for (const k in this.sources[key]) {
                if (this.sources[key][k]?.[connection]) {
                  delete this.sources[key][connection];
                }
              }
            }
          }
          return true;
        } else if (this.sources[connection]) {
          for (const key in this.sources[connection]) {
            this.removeConnection(this.sources[connection][key], terminate);
          }
          return true;
        }
      }
    };
    this.addService = (service, connections, includeClassName, routeFormat, syncServices, source, order) => {
      this.load(service, includeClassName, routeFormat, this.customRoutes, this.customChildren);
      this.services[service.name] = service;
      if (connections) {
        if (typeof connections === "string")
          this.addServiceConnections(service, connections, source);
        else {
          for (const c in connections) {
            this.addServiceConnections(service, c, source);
          }
        }
      }
      if (syncServices)
        this.syncServices();
      if (order)
        this.order = order;
      else {
        if (!this.order)
          this.order = [];
        this.order.push(service.name);
      }
    };
    this.addServiceConnections = (service, connectionsKey, source) => {
      if (typeof service === "string") {
        service = this.services[service];
      }
      if (connectionsKey && service[connectionsKey]) {
        let newConnections = {};
        if (!this.serviceConnections[service.name])
          this.serviceConnections[service.name] = {};
        this.serviceConnections[service.name][connectionsKey] = service[connectionsKey];
        for (const key in service[connectionsKey]) {
          if (!this.connections[key]) {
            newConnections[key] = this.addConnection({ connection: service[connectionsKey][key], service }, source);
            newConnections[key].connectionType = connectionsKey;
          }
        }
        return newConnections;
      }
    };
    this.openConnection = async (service, options2, source, ...args) => {
      if (typeof service === "string") {
        service = this.services[service];
      }
      if (service instanceof Service) {
        let connection = service.run("open", options2, ...args);
        if (connection instanceof Promise) {
          return connection.then(async (info) => {
            if (!info._id) {
              await new Promise((res, rej) => {
                let start = performance.now();
                let checker = () => {
                  if (!info._id) {
                    if (performance.now() - start > 3e3) {
                      rej(false);
                    } else {
                      setTimeout(() => {
                        checker();
                      }, 100);
                    }
                  } else {
                    res(true);
                  }
                };
                checker();
              }).catch((er) => {
                console.error("Connections timed out:", er);
              });
            }
            if (info._id)
              this.addConnection({ connection: info, service }, source);
          });
        } else if (connection) {
          if (!connection._id) {
            await new Promise((res, rej) => {
              let start = performance.now();
              let checker = () => {
                if (!connection._id) {
                  if (performance.now() - start > 3e3) {
                    rej(false);
                  } else {
                    setTimeout(() => {
                      checker();
                    }, 100);
                  }
                } else {
                  res(true);
                }
              };
              checker();
            }).catch((er) => {
              console.error("Connections timed out:", er);
            });
          }
          if (connection._id)
            return this.addConnection({ connection, service }, source);
        }
      }
    };
    this.terminate = (connection) => {
      if (typeof connection === "string")
        connection = this.connections[connection];
      return connection.terminate();
    };
    this.subscribeThroughConnection = (route, relay, endpoint, callback, ...args) => {
      if (typeof relay === "string") {
        relay = this.getConnection(relay, "run");
      }
      if (typeof relay === "object")
        return new Promise((res, rej) => {
          relay.run("routeConnections", [route, endpoint, relay._id, ...args]).then((sub) => {
            this.subscribe(endpoint, (res2) => {
              if (res2?.callbackId === route) {
                if (!callback)
                  this.setState({ [endpoint]: res2.args });
                else if (typeof callback === "string") {
                  this.setState({ [callback]: res2.args });
                } else
                  callback(res2.args);
              }
            });
            res(sub);
          }).catch(rej);
        });
    };
    this.routeConnections = (route, transmitter, receiver, ...args) => {
      let rxsrc;
      if (typeof receiver === "string") {
        if (this.sources[receiver]) {
          rxsrc = receiver;
        }
        receiver = this.getConnection(receiver, "send");
      }
      if (typeof transmitter === "string") {
        transmitter = this.getConnection(transmitter, "subscribe");
      }
      if (transmitter?.subscribe && receiver?.send) {
        let res = new Promise((res2, rej) => {
          transmitter.subscribe(route, transmitter._id, (res3) => {
            if (!this.connections[receiver._id] && rxsrc) {
              if (this.sources[rxsrc]) {
                rxsrc = receiver;
                Object.keys(this.sources[rxsrc]).forEach((k) => {
                  if (this.sources[receiver][k].send) {
                    receiver = this.sources[receiver][k];
                  }
                });
              }
            }
            if (this.connections[receiver._id])
              receiver.send({ callbackId: route, args: res3 });
          }, ...args).then((sub) => {
            res2(sub);
          });
        });
        return res;
      }
    };
    this.syncServices = () => {
      for (const name2 in this.services) {
        if ("users" in this.services[name2])
          this.services[name2].users = this.users;
        this.nodes.forEach((n, tag) => {
          if (!this.services[name2].nodes.get(n.tag)) {
            this.services[name2].nodes.set(n.tag, n);
          } else {
            if (!this.services[name2].nodes.get(tag) && n._UNIQUE !== this.services[name2].nodes.get(n.tag)._UNIQUE)
              this.services[name2].nodes.set(tag, n);
          }
        });
      }
    };
    this.setUserData = (user, data) => {
      if (user) {
        if (typeof user === "string") {
          user = this.users[user];
          if (!user)
            return false;
        }
      }
      if (data) {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
      }
      if (typeof data === "object") {
        this.recursivelyAssign(user, data);
        return true;
      }
    };
    this.routes = {
      addUser: this.addUser,
      removeUser: this.removeUser,
      getConnection: this.getConnection,
      addConnection: this.addConnection,
      removeConnection: this.removeConnection,
      addService: this.addService,
      addServiceConnections: this.addServiceConnections,
      openConnection: this.openConnection,
      terminate: this.terminate,
      routeConnections: this.routeConnections,
      subscribeThroughConnection: this.subscribeThroughConnection,
      syncServices: this.syncServices
    };
    this.load(this.routes);
    if (options) {
      if (options.order)
        this.order = options.order;
      if (options.services) {
        for (const key in options.services) {
          let opt = options.services[key];
          if (opt instanceof Service) {
            opt.service.name = key;
            opt.service.tag = key;
            this.addService(opt.service, opt.connections, options.includeClassName, options.routeFormat, options.syncServices);
          } else if (typeof opt === "function") {
            let service = new opt();
            service.name = key;
            service.tag = key;
            if (service)
              this.addService(service, service.connections, options.includeClassName, options.routeFormat, options.syncServices);
          } else {
            if (typeof opt.service === "function") {
              let service = new opt.service({ name: key });
              service.name = key;
              service.tag = key;
              if (service)
                this.addService(service, void 0, options.includeClassName, options.routeFormat, options.syncServices);
              opt.service = service;
            } else if (opt.service instanceof Service) {
              opt.service.name = key;
              opt.service.tag = key;
              this.addService(opt.service, void 0, options.includeClassName, options.routeFormat, options.syncServices);
            }
            if (typeof opt.service === "object") {
              if (opt.connections) {
                if (Array.isArray(opt.connections)) {
                  opt.connections.forEach((k) => {
                    this.addServiceConnections(opt[key].service, k);
                  });
                } else
                  this.addServiceConnections(opt.service, opt.connections);
              }
              if (opt.config) {
                for (const c in opt.config) {
                  this.openConnection(opt.service, opt.config[c], opt.config[c].source, opt.config[c].args);
                }
              }
            }
          }
        }
      }
    }
  }
  removeUser(profile, terminate) {
    if (terminate)
      this.removeConnection(profile, terminate);
    if (typeof profile === "string")
      profile = this.users[profile];
    if (typeof profile === "object" && profile._id) {
      delete this.users[profile._id];
      if (profile.onclose)
        profile.onclose(profile);
    }
    return true;
  }
};
var transform_default = (tag, node) => {
  const args = node.arguments;
  let graph;
  Array.from(args.keys()).forEach((arg, i3) => node[`${arg}`] = args.get(arg).state);
  const originalOperator = node.operator;
  if (typeof originalOperator === "function") {
    node.operator = function(...argsArr) {
      let updatedArgs = [];
      let i3 = 0;
      args.forEach((o, k) => {
        const argO = args.get(k);
        const proxy = `${k}`;
        const currentArg = argO.spread ? argsArr.slice(i3) : argsArr[i3];
        const target = graph.node ?? graph;
        let update = currentArg !== void 0 ? currentArg : target[proxy];
        target[proxy] = update;
        if (!argO.spread)
          update = [update];
        updatedArgs.push(...update);
        i3++;
      });
      return originalOperator.call(this ?? node, ...updatedArgs);
    };
  } else {
    console.error("Operator is not a function for", node.tag, node, originalOperator);
    node.operator = (...args2) => args2;
  }
  graph = new Graph({}, tag, node);
  return graph;
};
var ARGUMENT_NAMES = /([^,]*)/g;
function getFnParamInfo(fn) {
  var fstr = fn.toString();
  const openPar = fstr.indexOf("(");
  const closePar = fstr.indexOf(")");
  const getFirstBracket = (str, offset = 0) => {
    const fb = offset + str.indexOf("{");
    if (fb < closePar && fb > openPar) {
      return getFirstBracket(str.slice(fb), offset + fb);
    } else
      return fb;
  };
  const firstBracket = getFirstBracket(fstr);
  let innerMatch;
  if (firstBracket === -1 || closePar < firstBracket)
    innerMatch = fstr.slice(fstr.indexOf("(") + 1, fstr.indexOf(")"));
  else
    innerMatch = fstr.match(/([a-zA-Z]\w*|\([a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\)) =>/)?.[1];
  if (!innerMatch)
    return void 0;
  const matches = innerMatch.match(ARGUMENT_NAMES).filter((e3) => !!e3);
  const info = /* @__PURE__ */ new Map();
  matches.forEach((v) => {
    let [name2, value] = v.split("=");
    name2 = name2.trim();
    name2 = name2.replace(/\d+$/, "");
    const spread = name2.includes("...");
    name2 = name2.replace("...", "");
    try {
      if (name2)
        info.set(name2, {
          state: value ? (0, eval)(`(${value})`) : value,
          spread
        });
    } catch (e3) {
      info.set(name2, {});
      console.warn(`Argument ${name2} could not be parsed for`, fn.toString(), value);
    }
  });
  return info;
}
var parse_default = getFnParamInfo;
var isNode = "process" in globalThis;
var ESPlugin = class {
  #initial;
  #options;
  #instance;
  #graph;
  #router;
  #cache = {};
  #plugins = {};
  #active = false;
  plugins = {};
  #toRun = false;
  #runProps = true;
  get initial() {
    return this.#initial;
  }
  get instance() {
    return this.#instance;
  }
  get graph() {
    return this.#graph;
  }
  set graph(v) {
    this.#graph = v;
  }
  constructor(node, options = {}) {
    this.#initial = node;
    this.#options = options;
    this.#router = options._router ? options._router : options._router = new Router({
      linkServices: false,
      includeClassName: false
    });
    do {
      this.#initial = this.initial.initial ?? this.initial;
    } while (this.initial instanceof ESPlugin);
    const isFunction = typeof this.initial === "function";
    const hasDefault = "default" in this.initial;
    let hasGraph = !!node.graph;
    if (!hasDefault && !hasGraph) {
      let newNode = { graph: { nodes: {} } };
      for (let namedExport in node)
        newNode.graph.nodes[namedExport] = { default: node[namedExport] };
      this.#initial = newNode;
      hasGraph = true;
      this.#runProps = false;
    }
    if (hasDefault || isFunction) {
      this.graph = this.#create(options.tag ?? "defaultESPluginTag", this.initial);
    }
    if (hasGraph) {
      const toNotify = [];
      const nodes = this.initial.graph.nodes;
      for (let tag in nodes) {
        const node2 = nodes[tag];
        if (!(node2 instanceof ESPlugin)) {
          const clonedOptions = Object.assign({}, Object.assign(options));
          const plugin = new ESPlugin(node2, Object.assign(clonedOptions, { tag }));
          this.#plugins[tag] = plugin;
          toNotify.push(plugin);
        } else
          this.#cache[tag] = this.#plugins[tag] = node2;
      }
      const thisTag = this.#options.tag;
      toNotify.forEach((o) => {
        let tag = o.#options.tag;
        if (thisTag)
          tag = `${thisTag}.${tag}`;
        this.plugins[o.#options.tag] = o;
        if (typeof options.onPlugin === "function")
          options.onPlugin(tag, o);
      });
    }
    Object.defineProperty(this, "tag", {
      get: () => this.graph?.tag,
      enumerable: true
    });
  }
  #createTree = () => {
    let tree = {};
    for (let tag in this.#plugins) {
      let thisNode = this.#plugins[tag].graph;
      if (this.#cache[tag]) {
        let gs = this.#cache[tag].graph;
        const ref = gs.node ? gs.node : gs;
        thisNode = {};
        for (let key in ref._initial)
          thisNode[key] = ref[key];
        thisNode.tag = tag;
        gs.state.triggers = {};
      }
      tree[tag] = this.#create(tag, thisNode);
    }
    let listeningFor = {};
    let quickLookup = {};
    let resolve3 = (path) => {
      if (quickLookup[path] === void 0) {
        const splitEdge = path.split(".");
        const first = splitEdge.shift();
        const lastKey = splitEdge.pop();
        let last = tree[first];
        if (last) {
          splitEdge.forEach((str) => last = last.nodes.get(str));
          const resolved = lastKey ? last.nodes.get(lastKey) : last;
          quickLookup[path] = { resolved, last, lastKey };
        } else
          console.error(`Target associated with ${path} was not found`);
      }
      return quickLookup[path];
    };
    let activate = async (edges2, data) => {
      for (let input in edges2) {
        let { resolved, last, lastKey } = resolve3(input);
        if (resolved) {
          const target = resolved.node ?? resolved;
          if (Array.isArray(data))
            target.run(...data);
          else
            target.run(data);
        } else {
          const target = last.node ?? last;
          let res;
          if (typeof target[lastKey] === "function") {
            if (Array.isArray(data))
              res = await target[lastKey](...data);
            else
              res = await target[lastKey](data);
          } else
            res = target[lastKey] = data;
          if (listeningFor[input])
            activate(listeningFor[input], res);
        }
      }
    };
    const edges = this.initial.graph.edges;
    for (let output in edges) {
      let { resolved } = resolve3(output);
      if (resolved) {
        if (!resolved.children)
          resolved.children = {};
        const callback = (data) => {
          activate(edges[output], data);
        };
        if (resolved instanceof GraphNode)
          resolved.subscribe(callback);
        else
          this.#router.state.subscribeTrigger(resolved.tag, callback);
      } else
        listeningFor[output] = edges[output];
    }
    return tree;
  };
  #activate = () => {
    if (this.initial.graph) {
      let tree = this.#createTree();
      const props = this.#instance ?? this.initial;
      this.graph = isNode ? new Graph(tree, this.#options.tag, props) : new DOMService({ routes: tree, name: this.#options.tag, props: this.#runProps ? props : void 0 }, this.#options.parentNode);
      this.#router.load(this.graph);
      for (let tag in this.#plugins) {
        const cache2 = this.#cache[tag];
        if (cache2)
          cache2.graph = tree[tag];
      }
    }
  };
  start = async (defer) => {
    if (this.#active === false) {
      this.#active = true;
      const activateFuncs = [];
      for (let key in this.plugins) {
        const o = this.plugins[key];
        await o.start((f22) => {
          activateFuncs.push(f22);
        });
      }
      this.#activate();
      const f5 = async () => {
        for (let f22 of activateFuncs)
          await f22();
        if (this.#toRun)
          await this.run();
      };
      const graph = this.initial.graph;
      if (graph) {
        const ports = graph.ports;
        let firstNode, lastNode;
        if (ports) {
          firstNode = await this.graph.get(ports.input);
          lastNode = this.graph.get(ports.output);
        } else {
          const nodes = Array.from(this.graph.nodes.values());
          firstNode = nodes[0];
          lastNode = nodes.slice(-1)[0];
        }
        if (lastNode)
          lastNode.subscribe((...args) => {
            for (let tag in lastNode.graph.children)
              this.#runGraph(lastNode.graph.children[tag], ...args);
          });
        if (firstNode)
          this.#initial.operator = async function(...args) {
            await firstNode.run(...args);
          };
      }
      if (typeof defer === "function")
        defer(f5);
      else
        await f5();
    }
  };
  stop = () => {
    if (this.#active === true) {
      for (let k in this.nested)
        this.nested[k].stop();
      if (this.graph)
        this.graph.nodes.forEach((n) => {
          this.graph.removeTree(n);
          n.stopNode();
          this.graph.state.triggers = {};
        });
      this.#active = false;
    }
  };
  #create = (tag, info) => {
    if (typeof info === "function")
      info = { default: info };
    if (!("default" in info) || info instanceof Graph)
      return info;
    else {
      let activeInfo;
      if (info instanceof ESPlugin) {
        activeInfo = info.instance;
        info = info.initial;
      }
      const args = parse_default(info.default) ?? /* @__PURE__ */ new Map();
      if (args.size === 0)
        args.set("default", {});
      let argsArray = Array.from(args.entries());
      const input = argsArray[0][0];
      if (info.arguments) {
        const isArray = Array.isArray(info.arguments);
        let i3 = 0;
        for (let key in info.arguments) {
          const v = info.arguments[key];
          if (isArray) {
            argsArray[i3].state = v;
            if (i3 == 0)
              this.#toRun = true;
          } else {
            args.get(key).state = v;
            if (input === key)
              this.#toRun = true;
          }
          i3++;
        }
      }
      const gsIn = {
        arguments: args,
        operator: info.default,
        tag,
        default: info.default
      };
      var props = Object.getOwnPropertyNames(info);
      const onActive = ["arguments", "default", "tag", "operator"];
      props.forEach((key) => {
        if (!onActive.includes(key))
          gsIn[key] = info[key];
      });
      if (activeInfo) {
        for (let key in activeInfo) {
          if (!onActive.includes(key))
            gsIn[key] = activeInfo[key];
        }
      }
      this.#instance = gsIn;
      return transform_default(tag, gsIn);
    }
  };
  #runGraph = async (graph = this.graph, ...args) => {
    if (graph instanceof Graph) {
      if (graph.node)
        return graph.node.run(...args);
      else {
        if (args.length === 0)
          return this.#runDefault(graph);
        else if (graph.nodes.has(args[0]))
          return graph.run(...args);
        else
          return this.#runDefault(graph, ...args);
      }
    } else
      return await graph.run(...args);
  };
  #runDefault = (graph, ...args) => graph.run(graph.nodes.values().next().value, ...args);
  run = async (...args) => this.#runGraph(this.graph, ...args);
};
var src_default = ESPlugin;

// index.ts
var basePkgPath = "./package.json";
var startTime = Date.now();
var _filesystem, _input, _options, _url, _cache, _main, _mode, _onImport, _throw;
var WASL = class {
  constructor(urlOrObject, options = {}, url) {
    this.errors = [];
    this.warnings = [];
    this.files = {};
    this.original = {};
    this.debug = void 0;
    __privateAdd(this, _filesystem, void 0);
    __privateAdd(this, _input, {});
    __privateAdd(this, _options, {});
    __privateAdd(this, _url, void 0);
    __privateAdd(this, _cache, {});
    __privateAdd(this, _main, "");
    __privateAdd(this, _mode, "import");
    __privateAdd(this, _onImport, (path, info) => this.files[path] = info);
    __privateAdd(this, _throw, (e3) => {
      const item = {
        message: e3.message,
        file: e3.file,
        node: e3.node
      };
      const arr = e3.type === "warning" ? this.warnings : this.errors;
      arr.push(item);
    });
    this.get = async (...args) => {
      const path = args[0];
      return await get_default(args[0], args[1], __privateGet(this, _onImport)).catch((e3) => __privateGet(this, _throw).call(this, {
        message: e3.message,
        file: path
      }));
    };
    this.load = async (node, info, options, id, symbols, counter) => {
      if (node.plugins) {
        for (let nestedName in node.plugins) {
          const nestedNode = node.src.graph?.nodes?.[nestedName];
          for (let key in node.plugins[nestedName]) {
            const newInfo = node.plugins[nestedName][key];
            if (typeof newInfo === "object" && !Array.isArray(newInfo)) {
              const ogSrc = newInfo.src;
              let newInfoForNode;
              if (id)
                newInfoForNode = __privateGet(this, _cache)[id]?.[key];
              if (!newInfoForNode) {
                const optsCopy = Object.assign({}, options);
                if (key === "graph")
                  optsCopy._deleteSrc = false;
                else
                  optsCopy._deleteSrc = true;
                newInfoForNode = await this.resolve({ [key]: newInfo }, info, optsCopy, {
                  nodes: newInfo
                }, symbols, counter);
                if (id) {
                  if (!__privateGet(this, _cache)[id])
                    __privateGet(this, _cache)[id] = {};
                  __privateGet(this, _cache)[id][key] = newInfoForNode;
                }
              }
              if (nestedNode) {
                const newVal = newInfoForNode[key];
                if (newVal) {
                  let chosenVal = newVal.src ?? newVal;
                  if ("default" in chosenVal && Object.keys(chosenVal).length === 1)
                    chosenVal = chosenVal.default;
                  if (nestedNode)
                    nestedNode[key] = chosenVal;
                } else {
                  __privateGet(this, _throw).call(this, { message: `Could not resolve ${ogSrc}` });
                }
              }
            } else if (nestedNode)
              nestedNode[key] = newInfo;
          }
          if (node.src.graph && !nestedNode) {
            __privateGet(this, _throw).call(this, {
              message: `Plugin target '${nestedName}' does not exist`,
              node: name
            });
          }
        }
      }
    };
    this.resolve = async (target, info, options, graph = {}, symbols = [], counter) => {
      const nodes = graph.nodes;
      const edges = graph.edges;
      counter++;
      const id = Symbol("unique");
      let { url } = info;
      const mainPath = info.mainPath || __privateGet(this, _main);
      const symbolsRegistry = {};
      for (let name2 in target) {
        let symbolsCopy = symbolsRegistry[name2] = [...symbols];
        const node = target[name2];
        const isObj = node && typeof node === "object" && !Array.isArray(node);
        if (isObj) {
          await this.load(node, info, options, id, symbolsCopy, counter);
          let ogSrc = node.src ?? "";
          if (isSrc(ogSrc) || nodes && edges && !ogSrc) {
            node.src = null;
            let _internal = "";
            let _modeOverride = options._modeOverride;
            let fullPath;
            try {
              new URL(ogSrc);
              if (!options._overrideRemote || options._modeOverride === "import") {
                _modeOverride = "import";
                _internal = fullPath = ogSrc;
              } else
                fullPath = `${ogSrc.split("://").slice(1).join("/")}`;
            } catch {
              if (ogSrc)
                fullPath = mainPath ? resolve2(ogSrc, mainPath) : resolve2(ogSrc);
            }
            let mode = options._modeOverride ?? __privateGet(this, _mode);
            if (ogSrc) {
              if (this.debug) {
                let target2 = this.debug.flow;
                symbolsCopy.forEach((str) => {
                  if (str) {
                    if (!target2[str])
                      target2[str] = {};
                    target2 = target2[str];
                  }
                });
                if (!this.debug.resolutions[name2])
                  this.debug.resolutions[name2] = {};
                let nameRes = this.debug.resolutions[name2];
                if (!nameRes[fullPath])
                  nameRes[fullPath] = { _resolutions: 0, _depth: [], _time: [] };
                nameRes[fullPath]._resolutions++;
                nameRes[fullPath]._depth.push(counter);
                nameRes[fullPath]._time.push(Date.now() - startTime);
                if (target2)
                  target2[fullPath] = {};
              }
              if (_internal || mode === "import") {
                let res = await this.get(fullPath, void 0);
                if (res)
                  node.src = res;
                if (!node.src && !node.graph)
                  remove(ogSrc, fullPath, name2, target);
              } else {
                if (__privateGet(this, _filesystem)) {
                  let res;
                  res = checkFiles(fullPath, __privateGet(this, _filesystem));
                  if (res) {
                    if (res.default || fullPath.includes(".json"))
                      node.src = res;
                    else {
                      __privateGet(this, _throw).call(this, {
                        type: "warning",
                        message: `Node (${name2}) at ${fullPath} does not have a default export.`,
                        file: ogSrc
                      });
                      node.src = { default: res };
                    }
                    _internal = fullPath;
                  } else if (ogSrc)
                    remove(ogSrc, fullPath, name2, target);
                } else {
                  __privateGet(this, _throw).call(this, {
                    message: "No options.filesystem field to get JavaScript objects",
                    file: ogSrc
                  });
                }
              }
            }
            if (!_internal)
              _internal = ogSrc ? resolve2(ogSrc, url, true) : true;
            let _top = false;
            if (node.graph) {
              _top = true;
              if (!node.src)
                node.src = {};
              node.src.graph = node.graph;
              delete node.graph;
            }
            if (node.src && node.src.graph) {
              await this.init(node.src, {
                _internal,
                _deleteSrc: options._deleteSrc,
                _top,
                _modeOverride,
                _overrideRemote: options._overrideRemote
              }, void 0, symbolsCopy, counter);
            } else
              symbolsCopy.push(fullPath);
          }
          for (let key in node) {
            if (!isObj && key === "src" && node.src) {
              const language = node.src.language;
              if (!language || js.includes(language)) {
                if (node.src.text) {
                  const esmImport = async (text) => {
                    try {
                      let imported = await importFromText2(text);
                      if (imported.default && Object.keys(imported).length === 1)
                        imported = imported.default;
                      return imported;
                    } catch (e3) {
                      console.error("Import did not work. Probably relies on something...");
                      __privateGet(this, _throw).call(this, {
                        message: e3.message,
                        file: name2
                      });
                    }
                  };
                  const esm = await esmImport(node.src.text);
                  if (esm) {
                    delete node.src.text;
                    if (typeof esm === "object")
                      node.src = { default: Object.assign(node.src, esm) };
                    else
                      node.src = esm;
                  } else {
                    __privateGet(this, _throw).call(this, {
                      message: "Could not import this text as ESM",
                      file: node.src
                    });
                  }
                } else {
                  const expectedFunctions = ["default", "oncreate", "onrender"];
                  for (let key2 in node.src) {
                    try {
                      if (expectedFunctions.includes(key2) && typeof node.src[key2] === "string")
                        node.src[key2] = (0, eval)(`(${node.src[key2]})`);
                    } catch (e3) {
                      __privateGet(this, _throw).call(this, {
                        message: `Field ${key2} could not be parsed`,
                        file: node.src[key2]
                      });
                    }
                  }
                }
              } else {
                console.warn(`Text is in ${language}, not JavaScript. This is not currently parsable automatically.`);
                __privateGet(this, _throw).call(this, {
                  message: `Source is in ${language}. Currently only JavaScript is supported.`,
                  file: ogSrc
                });
              }
            } else if (node[key]) {
              if (typeof node[key] === "object" && !Array.isArray(node[key])) {
                const optsCopy = Object.assign({}, options);
                optsCopy._deleteSrc = key !== "nodes" && name2 !== "graph";
                await this.resolve(node[key], info, optsCopy, { nodes: node[key] }, symbolsCopy, counter);
              }
            }
          }
        }
      }
      for (let name2 in nodes) {
        const node = nodes[name2];
        if (node?.src && typeof node?.src === "object") {
          if (node.src.graph)
            await this.load(node, info, options, id, symbolsRegistry[name2]);
          else if (edges) {
            if (!("default" in node.src)) {
              __privateGet(this, _throw).call(this, {
                message: "No default export.",
                node: name2
              });
            }
          }
          nodes[name2] = merge(node.src, node, options._deleteSrc);
          if (nodes[name2].src?.graph)
            nodes[name2].src.graph = JSON.parse(JSON.stringify(nodes[name2].graph));
        }
      }
      return target;
    };
    this.init = async (urlOrObject = __privateGet(this, _input), options = __privateGet(this, _options), url = "", symbols = [], counter = 0) => {
      if (options.debug)
        this.debug = { flow: {}, resolutions: {} };
      else
        this.debug = void 0;
      const internalLoadCall = options._internal;
      const isFromValidator = !__privateGet(this, _main) && typeof internalLoadCall === "string";
      if (!__privateGet(this, _input))
        __privateSet(this, _input, urlOrObject);
      if (!__privateGet(this, _options))
        __privateSet(this, _options, options);
      if (!__privateGet(this, _filesystem))
        __privateSet(this, _filesystem, options.filesystem);
      if (!internalLoadCall) {
        if (!url)
          url = __privateGet(this, _url);
        try {
          new URL(url ?? urlOrObject);
          options.relativeTo = "";
        } catch {
        }
      } else if (internalLoadCall === true)
        url = __privateGet(this, _main);
      if (isFromValidator)
        url = __privateSet(this, _main, internalLoadCall);
      const clonedOptions = Object.assign({}, options);
      const innerTopLevel = clonedOptions._top === true;
      const isString = typeof urlOrObject === "string";
      let mode, object, mainPath;
      if (typeof urlOrObject === "object") {
        object = Object.assign({}, urlOrObject);
        if (typeof internalLoadCall === "string")
          url = mainPath = resolve2(internalLoadCall);
        mode = "reference";
      } else if (url || isString) {
        if (!url)
          url = resolve2(urlOrObject, options.relativeTo ?? "");
        mode = "import";
      } else
        console.error("Mode is not supported...");
      if (!internalLoadCall)
        __privateSet(this, _mode, mode);
      mode = clonedOptions._modeOverride ?? __privateGet(this, _mode);
      this.errors.push(...valid(urlOrObject, clonedOptions, "load"));
      switch (mode) {
        case "reference":
          if (!innerTopLevel) {
            if (__privateGet(this, _filesystem)) {
              const pkgPath = resolve2(basePkgPath, url);
              const pkg = checkFiles(pkgPath, __privateGet(this, _filesystem));
              if (pkg)
                object = Object.assign(pkg, isString ? {} : object);
            }
          }
        default:
          if (!object) {
            mainPath = await resolve2(url);
            object = await this.get(mainPath, void 0);
            if (!innerTopLevel) {
              const pkgUrl = resolve2(basePkgPath, mainPath, true);
              const pkg = await this.get(pkgUrl, void 0);
              if (pkg)
                object = Object.assign(pkg, object);
            }
          }
      }
      if (!internalLoadCall)
        __privateSet(this, _main, mainPath);
      else if (__privateGet(this, _mode) === "reference" && !__privateGet(this, _main))
        __privateSet(this, _main, "");
      if (this.debug) {
        let target = this.debug.flow;
        symbols.forEach((str) => target = target[str]);
        target[mainPath] = {};
        symbols.push(mainPath);
        if (mainPath) {
          if (!this.debug.resolutions[mainPath])
            this.debug.resolutions[mainPath] = { _resolutions: 0, _depth: [], _time: [] };
          const res = this.debug.resolutions;
          res[mainPath]._resolutions++;
          res[mainPath]._depth.push(counter);
          res[mainPath]._time.push(Date.now() - startTime);
        }
      }
      if (this.errors.length === 0) {
        const nodes = object.graph.nodes;
        await this.resolve(nodes, {
          mainPath,
          url,
          object
        }, clonedOptions, object.graph, symbols, counter);
        const drill = (parent, callback) => {
          const nodes2 = parent.graph.nodes;
          for (let tag in nodes2) {
            const res = callback(nodes2[tag], {
              tag,
              parent,
              options: clonedOptions
            });
            if (res)
              nodes2[tag] = res;
          }
        };
        const drillToTest = (target) => {
          drill(target, (node, info) => {
            const edges = info.parent.graph.edges;
            for (let output in edges) {
              const getTarget = (o, str) => o.graph?.nodes?.[str] ?? o[str];
              let outTarget = info.parent.graph.nodes;
              output.split(".").forEach((str) => outTarget = getTarget(outTarget, str));
              if (!outTarget) {
                __privateGet(this, _throw).call(this, {
                  message: `Node '${output}' (output) does not exist to create an edge.`,
                  file: url
                });
              }
              for (let input in edges[output]) {
                let inTarget = nodes;
                input.split(".").forEach((str) => inTarget = getTarget(inTarget, str));
                if (!inTarget) {
                  __privateGet(this, _throw).call(this, {
                    message: `Node '${input}' (input) does not exist to create an edge.`,
                    file: url
                  });
                }
              }
            }
          });
        };
        if (internalLoadCall === void 0) {
          if (clonedOptions.output !== "object") {
            this.plugin = new src_default(object, {
              activate: clonedOptions.activate,
              parentNode: clonedOptions.parentNode
            });
            this.original = Object.assign({}, this.plugin.initial);
            let drillCopy = (target) => {
              if (target?.graph) {
                let graph = Object.assign({}, target.graph);
                let nodes2 = graph.nodes = Object.assign({}, graph.nodes);
                if (nodes2) {
                  for (let k in nodes2) {
                    nodes2[k] = Object.assign({}, nodes2[k].initial);
                    drillCopy(nodes2[k]);
                  }
                }
                target.graph = graph;
              }
            };
            drillCopy(this.original);
            return this.plugin;
          } else
            this.original = object;
          drillToTest(object);
        }
        return object;
      }
    };
    this.start = async () => {
      if (this.plugin)
        return await this.plugin.start();
    };
    this.stop = async () => {
      if (this.plugin)
        return await this.plugin.stop();
    };
    __privateSet(this, _input, urlOrObject);
    __privateSet(this, _options, options);
    __privateSet(this, _url, url);
  }
};
_filesystem = new WeakMap();
_input = new WeakMap();
_options = new WeakMap();
_url = new WeakMap();
_cache = new WeakMap();
_main = new WeakMap();
_mode = new WeakMap();
_onImport = new WeakMap();
_throw = new WeakMap();
var core_default = WASL;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
//# sourceMappingURL=index.node.js.map
