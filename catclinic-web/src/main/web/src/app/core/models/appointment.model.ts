import { Link } from ".";
import { Patient } from "./patient.model";

export interface Appointment {
    id: number,
    patient: Patient,
    notes: string,
    createdDate : Date,
    _links: {
        self: Link,
        condition: Link,
        patient: Link,
        diagnose?: Link,
        pay?: Link,
        cancel?: Link
    }
}