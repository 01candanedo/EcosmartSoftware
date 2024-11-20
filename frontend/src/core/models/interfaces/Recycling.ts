interface RecyclingCenter {
  centers: Center[]
  ok: boolean
}

interface Center {
  center_id: number
  location: string
  name: string
  phone: string
}

export {RecyclingCenter, Center}
