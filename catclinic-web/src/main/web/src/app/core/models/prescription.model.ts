import { Link } from ".";

export interface Prescription {
    id: number,
    medicine: string,
    instructions: string,
    _links: {
        self: Link,
        medicine: Link,
        appointment: Link
    }
}