import { Link } from ".";

export interface Appointment {
    id: number,
    notes: string,
    _links: {
        self: Link,
        condition: Link,
        patient: Link
    }
}