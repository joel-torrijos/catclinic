import { Condition } from ".";
import { Link } from "./link.model";

export interface Conditions {
    _embedded: {
        conditions: Condition[]
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