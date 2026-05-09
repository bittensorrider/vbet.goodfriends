import { User } from "@/types/user.types";

export type Message = {
    id: string;
    author: User['info'];
    message: string;
    created_at: string;
}