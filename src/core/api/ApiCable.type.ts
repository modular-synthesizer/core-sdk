type ApiCableEnd = {
  module: string
  port: string
}

export type ApiCable = {
  id: string
  from: ApiCableEnd
  to: ApiCableEnd
  color: string
}