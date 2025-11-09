export class UnauthenticatedException extends Error {
  constructor(private _data: { key: string, message: string }) {
    super(`${_data.key}.${_data.message}`)
  }
  public get data() {
    return this._data
  }
}