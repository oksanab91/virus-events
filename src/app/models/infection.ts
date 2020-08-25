export class Infection {
    id: number
    location: {lon: number, lat: number}
    datetime: string
}

export class InfectionMap extends Infection {
    map: string
}