import { Link } from ".";

export interface Condition {
    id: number,
    name: string,
    description: string,
    _links: {
        self: Link,
        condition: Link
    }
}