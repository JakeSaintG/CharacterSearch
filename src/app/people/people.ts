export interface IPeople {
    id: number,
    name: string,
    birthDate: string,
    address: IPeopleAddress,
    interests: string[],
    image: string

}

interface IPeopleAddress {
    street: string,
    city: string,
    state: string,
    zip: number
}