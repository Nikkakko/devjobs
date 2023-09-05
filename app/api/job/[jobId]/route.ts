import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const {
      userName,
      company,
      logo,
      logoBackground,
      position,
      contract,
      location,
      description,
      website,
      apply,
      requirements,
      role,
    } = body;

    if (!params.jobId) {
      return new NextResponse('Job id is required', { status: 400 });
    }

    if (!user) {
      return new NextResponse('User is not authenticated', { status: 401 });
    }

    // check if every field is filled in
    if (
      !userName ||
      !company ||
      !logo ||
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

    const job = await prismadb.job.update({
      where: {
        id: params.jobId,
        userId: user.id,
      },
      data: {
        apply,
        company,
        contract,
        description,
        location,
        logo,
        logoBackground,
        position,
        requirements,
        role,
        userName,
        website,
        userId: user.id,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log(error, 'JOB PATCH ERROR');
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.jobId) {
      return new NextResponse('Job id is required', { status: 400 });
    }

    if (!userId) {
      return new NextResponse('User is not authenticated', { status: 401 });
    }

    const job = await prismadb.job.delete({
      where: {
        id: params.jobId,
        userId,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log(error, 'JOB DELETE ERROR');
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}
