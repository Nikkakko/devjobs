import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const {
      company,
      logo,
      logoBackground,
      position,
      contract,
      location,
      website,
      apply,
      description,
      requirements,
      role,
    } = body;

    if (!user) {
      return new NextResponse('User is not authenticated', { status: 401 });
    }

    // check if every field is filled in

    if (
      !company ||
      !logo ||
      !logoBackground ||
      !position ||
      !contract ||
      !location ||
      !description ||
      !website ||
      !apply ||
      !requirements ||
      !role
    ) {
      return new NextResponse('Please fill in all fields', { status: 400 });
    }

    const job = await prismadb.job.create({
      data: {
        userId: user.id,
        userName: user.firstName as string,
        company,
        logo,
        logoBackground,
        position,
        contract,
        location,
        website,
        apply,
        description,
        requirements,
        role,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
