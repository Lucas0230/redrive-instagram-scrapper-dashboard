
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const FormSchema = z.object({
    profile: z.string().optional(),
    batch: z.string({
        required_error: 'Digite um nome para sua lista'
    })
})

import { ChevronRightIcon } from "@radix-ui/react-icons"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"

import { CheckCircle2Icon, LoaderCircle, XIcon } from "lucide-react"
import { CreateRedriveScrapperBatchProps } from "../types"
import { createRedriveScrapperBatch } from "../actions"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "@/components/ui/alert-dialog"

type Props = {
    batches: string[]
}

export function CreateTasksBatchDialog({ batches }: Props) {

    const router = useRouter()

    const [isSuccessfulPopUpVisible, setIsSuccessfulPopUpVisible] = useState(false);

    const [type, setType] = useState<'POSTS' | 'PROFILE'>('PROFILE')
    const [posts, setPosts] = useState([] as string[])

    const [isLoading, setIsLoading] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true)

            const data: CreateRedriveScrapperBatchProps = {
                batch: form.getValues('batch'),
            }

            if (type == 'POSTS' && !posts.length) {
                toast({ title: "Adicione pelo menos um post para continuar!" })
                throw new Error();
            }

            if (type == 'POSTS') {
                data.posts = posts.map(p => {
                    const POST_BASE_URL = 'https://www.instagram.com/p/'
                    return p.includes(POST_BASE_URL) ? p.replace(POST_BASE_URL, '') : p
                });
            }

            const profile = form.getValues('profile');

            if (type == 'PROFILE' && !profile) {
                form.setError('profile', { message: 'Digite um perfil para continuar' })
                throw new Error();
            }

            if (profile) {
                const BASE_PROFILE_URL = 'https://instagram.com/'
                data.profile = profile.includes(BASE_PROFILE_URL) ? profile.replace(BASE_PROFILE_URL, '') : profile;
            }

            await createRedriveScrapperBatch(data);

            setIsSuccessfulPopUpVisible(true)

            setTimeout(() => {
                setIsSuccessfulPopUpVisible(false)
            }, 5000);

            setIsDialogOpen(false)
            form.reset();
            setPosts([]);

            router.refresh();

            if (!profile) {
                router.push(`?batch=${data.batch}`)
            }

        } catch (e) {
            console.log(`❌ Error creating redrive batch!`);
            toast({
                title: 'Não foi possível cadastrar sua lista!',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Dialog open={isDialogOpen}>
                <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                    <Button variant="secondary">
                        Gerar nova lista +
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[625px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, (d) => console.log(d))} className=" space-y-6">
                            <DialogHeader>
                                <DialogTitle>Geração de Lista</DialogTitle>
                                <DialogDescription>
                                    Faça a configuração da sua lista por aqui. Clique em próximo quando estiver pronto.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 mb-2">

                                <FormField
                                    control={form.control}
                                    name="batch"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome da Lista</FormLabel>
                                            <FormControl>
                                                <Input placeholder="ClaxClub (AA1)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormItem className="space-y-3">
                                    <FormLabel>Gerar lista com base em:</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => setType(value as "POSTS" | "PROFILE")}
                                            defaultValue={type}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="PROFILE" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Perfil do Instagram
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="POSTS" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Posts do Instagram
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                                {type == 'PROFILE' && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="profile"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Perfil do Instagram

                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://www.instagram.com/claxclub" {...field} />
                                                    </FormControl>
                                                    <FormDescription>Digite o link do perfil do instagram</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                {type == 'POSTS' && (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2 mt-2">
                                            <p className="text-sm font-medium">Posts do Instagram</p>
                                            <Input
                                                form="none"
                                                onKeyUp={(e) => {
                                                    if (e.key == 'Enter') {
                                                        const { value } = e.target as HTMLInputElement;

                                                        setPosts(prevState => {

                                                            const POST_BASE_URL = 'https://www.instagram.com/p/'
                                                            const p = value.includes(POST_BASE_URL) ? value.replace(POST_BASE_URL, '') : value;

                                                            if (prevState.includes(p)) return prevState;
                                                            else {
                                                                return [...prevState, p]
                                                            }
                                                        });

                                                        //@ts-ignore
                                                        e.target.value = ""
                                                    }
                                                }}
                                                placeholder="https://instagram.com/p/C-5GUplANaP"
                                            />
                                            <p className="text-[0.8rem] text-muted-foreground">Digite o link ou o ID do post do instagram</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 w-full">
                                            {posts.map(p => (
                                                <button
                                                    type="button"
                                                    key={p}
                                                    onClick={() => {
                                                        setPosts(prevState => prevState.filter(post => post != p))
                                                    }}
                                                    className="flex flex-row items-center gap-1 text-xs bg-zinc-100 text-zinc-600 p-2 rounded-md group"
                                                >
                                                    {p}
                                                    <p className="p-0.5 group-hover:flex hover:bg-zinc-200 transition-all duration-300 hidden">
                                                        <XIcon className="w-3 h-3" />
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}


                            </div>
                            <DialogFooter className="flex flex-row !justify-between">
                                <Button type="button" disabled={isLoading} variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                                <Button type="submit" disabled={isLoading}>

                                    {isLoading && (
                                        <LoaderCircle className="animate-spin w-3 h-3 mx-4" />
                                    )}

                                    {!isLoading && (
                                        <>
                                            Próximo
                                            <ChevronRightIcon className="w-3 h-3 ml-1" />
                                        </>
                                    )}

                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>




            <AlertDialog open={isSuccessfulPopUpVisible}>
                <AlertDialogContent className="items-center justify-center flex flex-col">
                    <CheckCircle2Icon fill="" className="text-white fill-green-500 h-16 w-16" />
                    <AlertDialogTitle className="text-center text-2xl">Sucesso!</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        Estamos gerando sua lista e em breve será possível exportar os leads selecionados.
                    </AlertDialogDescription>
                    <AlertDialogFooter className="flex flex-row justify-between mt-2">
                        <Button type="submit" variant="outline" onClick={() => setIsSuccessfulPopUpVisible(false)}>
                            Continuar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )

}