import { Link } from ".";
import { Appointment } from "./appointment.model";

export interface Appointments {
    _embedded: {
        appointments: Appointment[]
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