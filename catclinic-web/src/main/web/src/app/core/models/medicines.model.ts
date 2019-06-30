import { Link, Medicine } from ".";

export interface Medicines {
    _embedded: {
        medicines: Medicine[]
    },
    _links: {
        self: Link,
        profile: Link,
        first?: Link,
        prev?: Link,
        next?: Link,
        last?: Link
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}