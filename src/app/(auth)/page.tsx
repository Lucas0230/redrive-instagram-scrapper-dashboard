import Image from "next/image"

import { Form } from "./_components/form"


import BackgroundImage from '../../../public/bg.png';

export default async function Page() {

    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-[100vh]">

            <div className="flex items-center justify-center py-12 relative">
                <div className="mx-auto grid w-[450px] gap-6">
                    <div className="grid gap-2 text-left">
                        <h1 className="text-3xl font-bold">Entrar</h1>
                        <p className="text-lg text-muted-foreground">
                            Digite seu email abaixo para acessar a plataforma
                        </p>
                    </div>
                    <Form />
                </div>

                <p className="absolute bottom-[20px] text-sm text-muted-foreground">
                    @ {new Date().getFullYear()}, Todos os direitos reservados
                </p>

            </div>

            <div className="hidden bg-muted lg:block"

            >
                <Image
                    src={BackgroundImage}
                    quality={100}
                    alt="Escritório da V4 Company"
                    width="2560"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>

        </div>
    )
}
