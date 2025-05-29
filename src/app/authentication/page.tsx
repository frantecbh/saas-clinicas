import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import SignUpForm from './_components/sign-up-form'
import SingInForm from './_components/sing-in-form'

const AuthenticationPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <SingInForm />
        </TabsContent>
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthenticationPage
