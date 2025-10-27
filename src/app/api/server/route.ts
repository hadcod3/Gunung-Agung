import { connectToDatabase } from '@/lib/database';
import Server from '@/lib/database/models/Server';
import { handleError } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const server = await Server.find().sort({ name: 1 });
    return NextResponse.json({ success: true, data: server });
  } catch (error: any) {
    console.error('Error fetching server:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch server' },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     await connectToDatabase();
//     const body = await request.json();
//     const { name } = body;

//     if (!name?.trim()) {
//       return NextResponse.json(
//         { success: false, error: 'Server name is required' },
//         { status: 400 }
//       );
//     }

//     // Check if server already exists
//     const existingServer = await Server.findOne({ name: name.trim() });
//     if (existingServer) {
//       return NextResponse.json(
//         { success: false, error: 'Server name already exists' },
//         { status: 400 }
//       );
//     }

//     const server = await Server.create({ name: name.trim() });
//     return NextResponse.json({ success: true, data: server }, { status: 201 });
//   } catch (error: any) {
//     console.error('Error creating server:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to create server' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const server = await Server.find();

//     if (!server || server.length === 0) {
//       return new Response(
//         JSON.stringify({ message: 'No server found' }), 
//         { status: 404 }
//       );
//     }

//     return new Response(JSON.stringify(server), { status: 200 });
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const servers = await req.json();
//     const createdServers = await Server.create(servers);
//     return NextResponse.json(createdServers, { status: 201 });
//   } catch (error) {
//     return handleError(error);
//   }
// }

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await Server.findOne({ name: name.trim() });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category name already exists' },
        { status: 400 }
      );
    }

    const category = await Server.create({ name: name.trim() });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}