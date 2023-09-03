import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { jobId: string } }
) {}
