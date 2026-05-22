// app/api/admin/update-balance/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 1. Verify Admin Session/Token here (Middleware or direct check)
    // const session = await verifyAdminSession(request);
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { userId, additionalAmount, description } = body;

    if (!userId || additionalAmount === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Perform server-side database transaction ensuring data integrity
    const result = await prisma.$transaction(async (tx) => {
      // Update the user's balance
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          balance: { increment: additionalAmount },
        },
      });

      // Log the admin override in transaction history
      const newTx = await tx.transaction.create({
        data: {
          userId: userId,
          type: 'ADMIN_ADJUSTMENT',
          amount: additionalAmount,
          status: 'COMPLETED',
          description: description || 'Admin manual balance adjustment',
        },
      });

      return { updatedUser, newTx };
    });

    // 3. (Optional but recommended) Trigger WebSocket event here for real-time frontend update
    // e.g., socket.to(userId).emit('balance_updated', result.updatedUser.balance);

    return NextResponse.json({ success: true, newBalance: result.updatedUser.balance });
    
  } catch (error) {
    console.error("Balance Update Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
