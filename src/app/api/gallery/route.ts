import { connectToDatabase } from '@/lib/database';
import Photo from '@/lib/database/models/Photo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category && category !== 'All') {
      query = { category };
    }
    
    const photos = await Photo.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: photos });
  } catch (error: any) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    console.log('📨 Received request to save photo:', body);

    const { imgUrl, category, serverId, serverName, orientation } = body;

    if (!imgUrl || !category || !serverId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const photo = new Photo({
      imgUrl,
      category,
      serverId,
      serverName,
      orientation: orientation || 'horizontal',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPhoto = await photo.save();
    console.log('💾 Photo saved to MongoDB:', savedPhoto);

    return NextResponse.json({
      success: true,
      data: savedPhoto,
    });

  } catch (error) {
    console.error('❌ Error saving photo:', error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Photo ID is required' },
        { status: 400 }
      );
    }
    
    const result = await Photo.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Photo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}