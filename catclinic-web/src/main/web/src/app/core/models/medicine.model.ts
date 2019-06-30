import { Link } from ".";

export interface Medicine {
    id: number,
    name: string,
    description: string,
    _links: {
        self: Link,
        condition: Link
    }
}