import { Link } from "./link.model";

export interface Patient {
    id: number,
    firstName: string,
    lastName: string,
    _links: {
        self: Link,
        patient: Link
    }
}