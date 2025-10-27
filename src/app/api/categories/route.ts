import { connectToDatabase } from '@/lib/database';
import Category from '@/lib/database/models/Category';
import { handleError } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

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
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category name already exists' },
        { status: 400 }
      );
    }

    const category = await Category.create({ name: name.trim() });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const categories = await Category.find();

//     if (!categories || categories.length === 0) {
//       return new Response(
//         JSON.stringify({ message: 'No categories found' }), 
//         { status: 404 }
//       );
//     }

//     return new Response(JSON.stringify(categories), { status: 200 });
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const categories = await req.json();
//     const createdCategories = await Category.create(categories);
//     return NextResponse.json(createdCategories, { status: 201 });
//   } catch (error) {
//     return handleError(error);
//   }
// }