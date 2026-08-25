import Image from 'next/image'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className=' w-full max-w-sm'>
      <Card>
        <CardHeader>
          <CardTitle>login</CardTitle>
          <CardDescription>login yourself</CardDescription>
          <CardAction>
            <Button variant='link'>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}
