import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginStore } from "../store/login-store"
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { password, setPassword, login, isAuthenticated } = useLoginStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login()
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Bienvenue sur S-G-R-H</h1>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <div className="m-10 flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-bold">Province de tiznit</h1>
                            <h1>gestion des ressources humaines</h1>
                            <img 
                                src="assets/images/login_background.png" 
                                alt="" 
                                className="object-contain h-48 w-48 m-28"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}