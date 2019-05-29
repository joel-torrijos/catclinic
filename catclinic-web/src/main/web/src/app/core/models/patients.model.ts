import { Patient } from "./patient.model";
import { Link } from "./link.model";

export interface Patients {
    _embedded: {
        patients: Patient[]
    },
    _links: {
        self: Link,
        profile: Link
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}