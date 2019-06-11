import { Link, Gender } from ".";

export interface Genders {
    _embedded: {
        genders: Gender[]
    },
    _links: {
        self: Link
    },
}