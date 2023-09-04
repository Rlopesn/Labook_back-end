import { BaseError } from "./BaseError";

export class ConflictError extends BaseError{
    constructor(
        message: string = "conflicting request."
    ) {
        super(409, message)
    }
}