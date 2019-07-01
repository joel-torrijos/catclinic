import { Link } from ".";

export interface Procedure {
    id: number,
    name: string,
    description: string,
    _links: {
        self: Link,
        procedure: Link
    }
}