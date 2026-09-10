import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tokenMint, amount, walletAddress } = body;

    if (!tokenMint || !amount || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // This is a placeholder for actual Phantom integration
    // In production, you would create a proper swap instruction
    // using Jupiter API or similar DEX aggregator

    return NextResponse.json({
      data: {
        success: true,
        message: 'Transaction initiated. Please confirm in your Phantom wallet.',
        tokenMint,
        amount,
      },
    });
  } catch (error) {
    console.error('Buy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}