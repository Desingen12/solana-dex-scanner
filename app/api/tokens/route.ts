import { NextRequest, NextResponse } from 'next/server';
import { searchTokens, getTokenByAddress } from '@/lib/dexscreener';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const address = searchParams.get('address');

  try {
    if (address) {
      const token = await getTokenByAddress(address);
      return NextResponse.json({ data: token });
    } else if (query) {
      const tokens = await searchTokens(query);
      return NextResponse.json({ data: tokens });
    } else {
      return NextResponse.json({ error: 'Query or address required' }, { status: 400 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}