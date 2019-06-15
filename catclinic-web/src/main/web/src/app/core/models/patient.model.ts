import { Link } from "./link.model";
import { Gender } from "./gender.model";

export interface Patient {
    id: number,
    firstName: string,
    lastName: string,
    gender: Gender,
    birthDate: Date,
    amountPaid: number,
    _links: {
        self: Link,
        patient: Link
    }
}