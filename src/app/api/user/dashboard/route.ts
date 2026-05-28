import { NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id:    true,
      name:  true,
      email: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Fetch transactions — extend schema later to add Transaction model
  // For now returns empty array; replace with real query once schema is extended
  const transactions: {
    id: string;
    type: string;
    asset: string;
    amount: number;
    status: string;
    createdAt: string;
  }[] = [];

  return NextResponse.json({
    user: {
      id:               user.id,
      name:             user.name,
      email:            user.email,
      portfolioBalance: 24_850.00,
      changePercent:    3.42,
    },
    transactions,
  });
}
