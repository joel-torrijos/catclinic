import { Link } from "./link.model";

export interface Patient {
    firstName: string,
    lastName: string,
    _links: {
        self: Link,
        patient: Link
    }
}