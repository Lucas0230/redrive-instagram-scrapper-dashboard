import { RocketIcon } from "@radix-ui/react-icons";


export function Logo() {
    return (
        <div className="bg-primary h-6 w-6 flex items-center justify-center rounded-md">
            <RocketIcon className="h-3 w-3 text-primary-foreground" />
        </div>
    )
}