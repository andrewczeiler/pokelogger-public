import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { username, email, password } = (await req.json()) as {
            username: string;
            email: string;
            password: string;
        }

        if(!/^[A-Za-z0-9_-].{3,20}$/.test(username)) {
            return NextResponse.json({status: 'fail', message: 'Unable to create account, invalid username.'});
        }
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return NextResponse.json({status: 'fail', message: 'Unable to create account, invalid email.'});
        }
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
            return NextResponse.json({status: 'fail', message: 'Unable to create account, invalid password.'});
        }

        const hashed_password = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                username,
                email: email.toLowerCase(),
                password: hashed_password,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return NextResponse.json({
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } 
    catch (e: any) {
        if (e.code === 'P2002') {
            if (e.meta.target[0] === 'username') {
                return NextResponse.json({status: 'fail', message: 'Unable to create account, username already taken.'});
            }
            else if (e.meta.target[0] === 'email') {
                return NextResponse.json({status: 'fail', message: 'Unable to create account, email already taken.'});
            }
        }
        console.log(e);

        return NextResponse.json({status: 'fail', message: 'Unable to create account.'})
    }
}