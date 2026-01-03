import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Service from '@/lib/models/Service';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    let query: any = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (city) {
      // You might want to filter services by city availability
      // This would require additional data model
    }
    
    const services = await Service.find(query)
      .limit(limit)
      .sort({ isPopular: -1, createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: services,
      count: services.length
    });
    
  } catch (error: any) {
    console.error('Fetch services error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch services',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Name and category are required' },
        { status: 400 }
      );
    }
    
    // Generate slug
    const slug = body.slug || body.name.toLowerCase().replace(/\s+/g, '-');
    
    const service = new Service({
      ...body,
      slug,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await service.save();
    
    return NextResponse.json({
      success: true,
      data: service,
      message: 'Service created successfully'
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Create service error:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Service with this slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create service',
        error: error.message 
      },
      { status: 500 }
    );
  }
}