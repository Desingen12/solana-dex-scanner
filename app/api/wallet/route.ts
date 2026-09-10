import { NextRequest, NextResponse } from 'next/server';
import { getTokenPrice, getSolBalance, getTokenAccountBalance } from '@/lib/solana';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  const tokenMint = searchParams.get('tokenMint');
  const walletAddress = searchParams.get('wallet');

  try {
    if (action === 'price' && tokenMint) {
      const price = await getTokenPrice(tokenMint);
      return NextResponse.json({ data: { price } });
    } else if (action === 'solBalance' && walletAddress) {
      const balance = await getSolBalance(walletAddress);
      return NextResponse.json({ data: { balance } });
    } else if (action === 'tokenBalance' && tokenMint && walletAddress) {
      const balance = await getTokenAccountBalance(tokenMint, walletAddress);
      return NextResponse.json({ data: { balance } });
    } else {
      return NextResponse.json({ error: 'Invalid action or missing parameters' }, { status: 400 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}